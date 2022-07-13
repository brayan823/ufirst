## IMPORTANT TOPICS

The requirement text has an error, the correct distribution below:

46,014 GET requests
1,622 POST requests
106 HEAD requests (and not 107)
and 6 invalid requests

46014 + 1622 + 106 + 6 = 47748

## How to get started

The application was developed using node and express as web server, it's because browsers forbid to download a local file from file system, but if you want to generate the file in a standalone way you can execute epa.js file and put the json file into your web server preferred.

To test using nodejs, you need to install node in your computer and then go to js folder and execute npm start, the access_logs.json file will be generated and only need to open epa.html file to see charts. epa.html file uses ajax to connect the web server and client, also it download the file to obtain the data for create charts

### Improvements

1. It's better to use a framework like React or Angular and not JQuery
2. The chart about requests per minute in a 2 days period is too large for this exercise, I took the decision to group by minutes, example:

- day 30 hour 1 minute 1

- day 30 hour 2 minute 1

This represents two requests at minute 1 to be able to represent in a not too long graph

Perhaps a graph of requests per hour would be more appropriate
