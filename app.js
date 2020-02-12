var express = require('express')
var fs = require("fs");
var app = express();
const port = 6969;

var lineReader = require('line-reader');
var Promise = require('bluebird');
var eachLine = Promise.promisify(lineReader.eachLine);

var util = require('util');
var exec = require('child_process').exec;

app.get('/', function(request, response){
  response.sendFile(__dirname + '/index.html');
});

app.get('/get-data', function(request, response) {
  var data = {
    avg_ping: 3,
    avg_down: 300,
    avg_up: 500,
    speedtests: []
  }

  var amount = 0;
  var ping = 0;
  var down = 0;
  var up = 0;

  eachLine(__dirname + '/speedtests/speedtest-registry', function(line) {
    var content = fs.readFileSync(line);
    var speedtest = JSON.parse(content);
    amount++;
    ping += speedtest.ping.latency;
    down += speedtest.download.mbps;
    up += speedtest.upload.mbps;
    data.speedtests.push(speedtest);
  }).then(function (err) {
    data.avg_ping = Math.round((ping/amount + Number.EPSILON) * 100) / 100;
    data.avg_down = Math.round((down/amount + Number.EPSILON) * 100) / 100;
    data.avg_up = Math.round((up/amount + Number.EPSILON) * 100) / 100;
    response.json(data);
  });

});

app.get('/run-speedtest', function(request, response) {
  exec("bash run-speedtest.sh", function(err, stdout, stderr) {
    if (err) {
      response.json({state:500});
    }
    response.json({state:200});
  });
});

var speedtestTimer = 60 * 60 * 1000;
const intervalID = setInterval(() => exec("bash run-speedtest.sh", function(err, stdout, stderr) {}), speedtestTimer);

app.listen(port, () => console.log(`Service started at http://localhost:${port}!`));
