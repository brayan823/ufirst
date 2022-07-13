$.getJSON("http://localhost:3000/", function (data) {
  methodChart(data);
  sizeChart(data);
  answersCodeChart(data);
  requestsMinutesChart(data);
  return data;
});

function methodChart(data) {
  const MethodRequest = [];
  MethodRequest.push(data.filter((log) => log.request.method === "GET").length);
  MethodRequest.push(
    data.filter((log) => log.request.method === "POST").length
  );
  MethodRequest.push(
    data.filter((log) => log.request.method === "HEAD").length
  );
  MethodRequest.push(
    data.filter((log) => log.request.method === "INVALID REQUEST").length
  );

  const $chart = document.querySelector("#methodChart");
  const labels = ["GET", "POST", "HEAD", "INVALID"];
  const methodChart = {
    label: "Distribution of HTTP methods",
    data: MethodRequest,
    backgroundColor: "rgba(54, 162, 235, 0.2)",
    borderColor: "rgba(54, 162, 235, 1)",
    borderWidth: 1,
  };
  new Chart($chart, {
    type: "bar",
    data: {
      labels,
      datasets: [methodChart],
    },
    options: {
      responsive: true,
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Request",
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Method",
            },
          },
        ],
      },
    },
  });
}

function sizeChart(data) {
  let size = [];
  size = data.filter(
    (log) => log.response_code === "200" && Number(log.document_size) < 1000
  );

  const sizeDataList = size.reduce(
    (acc, { document_size }) =>
      acc.set(document_size, (acc.get(document_size) || 0) + 1),
    new Map()
  );

  const dataToChart = [];
  [...sizeDataList.entries()].map(([x, y]) => {
    dataToChart.push({
      x,
      y,
    });
  });

  const $chart = document.querySelector("#documentSizeChart");
  const sizeChart = {
    label: "Distribution of documents size",
    data: dataToChart,
    backgroundColor: "rgba(54, 162, 235, 0.2)",
    borderColor: "rgba(54, 162, 235, 1)",
    borderWidth: 1,
  };
  new Chart($chart, {
    type: "scatter",
    data: {
      datasets: [sizeChart],
    },
    options: {
      responsive: true,
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Ocurrence",
            },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Size in bytes",
            },
          },
        ],
      },
    },
  });
}

function answersCodeChart(data) {
  const answerDataList = data.reduce(
    (acc, { response_code }) =>
      acc.set(response_code, (acc.get(response_code) || 0) + 1),
    new Map()
  );
  const $chart = document.querySelector("#responseCodeChart");

  new Chart($chart, {
    type: "pie",
    data: {
      labels: [...answerDataList.keys()],
      datasets: [
        {
          data: [...answerDataList.values()],
          backgroundColor: [
            "#1ce860",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850",
            "#e37c22",
            "#e34522",
            "#ff5850",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  });
}

function requestsMinutesChart(data) {
  const minutesDataList = data.reduce(
    (acc, { datetime }) =>
      acc.set(
        `${datetime.day}${datetime.minute}`,
        (acc.get(`${datetime.day}${datetime.minute}`) || 0) + 1
      ),
    new Map()
  );
  const minutesDataListSorted = new Map([...minutesDataList.entries()].sort());
  console.log("minutesDataListSorted", minutesDataListSorted);

  const $grafica = document.querySelector("#requestsPerMinuteChart");

  new Chart($grafica, {
    type: "line",
    data: {
      labels: [...minutesDataListSorted.keys()],
      datasets: [
        {
          xAxisID: "xAxis1",
          data: [...minutesDataListSorted.values()],
          backgroundColor: "rgba(54, 162, 235, 0.2)",
        },
        {
          xAxisID: "xAxis2",
          data: [...minutesDataListSorted.values()],
          backgroundColor: "#1ce860",
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Requests per Minute",
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Number of requests",
            },
          },
        ],
        xAxes: [
          {
            id: "xAxis1",
            xAxisID: "xAxis1",
            type: "category",
            scaleLabel: {
              display: true,
              labelString: "Minutes",
            },
            ticks: {
              callback: function (label) {
                var minute = String(label).substring(2, 4);
                return minute;
              },
            },
          },
          {
            id: "xAxis2",
            xAxisID: "xAxis2",
            type: "category",
            scaleLabel: {
              display: true,
              labelString: "days",
            },
            gridLines: {
              drawOnChartArea: false,
            },
            ticks: {
              callback: function (label) {
                var day = String(label).substring(0, 2);
                if (day === "29") {
                  return day;
                } else {
                  return "30";
                }
              },
            },
          },
        ],
      },
      legend: {
        display: false,
      },
    },
  });
}
