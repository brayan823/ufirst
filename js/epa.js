var fs = require("fs");
var readline = require("readline");

function readAndParse() {
  const result = [];

  const readStream = fs.createReadStream("epa-http.txt", "utf-8");
  let rl = readline.createInterface({ input: readStream });
  rl.on("line", (line) => {
    let protocol = "";
    let version = "";
    let url = "";
    const elementList = line.split(" ");

    const host = elementList[0];
    const date = elementList[1];
    const datetime = {
      day: date.replace(/[\[\]]+/g, "").split(":")[0],
      hour: date.replace(/[\[\]]+/g, "").split(":")[1],
      minute: date.replace(/[\[\]]+/g, "").split(":")[2],
      second: date.replace(/[\[\]]+/g, "").split(":")[3],
    };
    const httpResponse = elementList[elementList.length - 2];
    const bytes =
      elementList[elementList.length - 1] === "-"
        ? "0"
        : elementList[elementList.length - 1];
    const request = /(["])(?:(?=(\\?))\2.)*?\1/.exec(line)[0];

    const requestElements = request
      .replace(/[\\"\"\u0001\u0002\u001c\u0003\u0007\u0015]+/g, "")
      .split(" ");
    if (line.includes("HTTP/1.0")) {
      protocol = requestElements[requestElements.length - 1].split("/")[0];
      version = requestElements[requestElements.length - 1].split("/")[1];
      requestElements[requestElements.length - 1] = " ";
    }
    for (i = 1; i <= requestElements.length - 1; i++) {
      url = `${url} ${requestElements[i]}`;
    }

    let httpMethod =
      requestElements[0] === "GET" ||
      requestElements[0] === "POST" ||
      requestElements[0] === "HEAD"
        ? requestElements[0]
        : "INVALID REQUEST";

    const data = {
      host,
      datetime,
      request: {
        method: httpMethod,
        url: url.trim(),
        protocol,
        protocol_version: version,
      },
      response_code: httpResponse,
      document_size: bytes,
    };
    result.push(data);
  });
  rl.on("error", (error) => console.log(error.message));
  rl.on("close", () => {
    const jsonString = JSON.stringify(result);
    fs.writeFileSync("./access_logs.json", jsonString);
  });
}

readAndParse();
