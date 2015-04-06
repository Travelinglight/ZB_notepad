var fs = require('fs');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var path = require("path");
var express = require('express');
var app = express();

dbclient = mysql.createConnection({
  host: "bernarville.mysql.rds.aliyuncs.com",
  user: "kingston",
  password: "cjd123456",
  database: "zblibrary"
});

app.use(bodyParser());

app.get("/", function(req, res){
  var realpath = __dirname + "/public/main.html";
  //res.writeHead(200, {"Access-Control-Allow-Origin" : "*"})
  res.setHeader("Access-Control-Allow-Origin", "*");
	res.sendFile(realpath);
})

app.get('*.*', function(req, res) {
  var realpath = __dirname + req.url;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.sendFile(realpath);
});

app.post("/show", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  var pingyin = "";
  var i = 0;
  for (i = 0; i < req.body.array.length; i++) {
    pingyin += String.fromCharCode(parseInt(req.body.array[i]) + 32);
  }
  console.log(pingyin);
  var queryString = "";
  queryString = 'SELECT square FROM zbl WHERE py="' + pingyin +'" ORDER BY code';
  console.log(queryString);
  dbclient.query(queryString, function(err, results, fields) {
    console.log(results);
    res.send(results);
  });
})

dbclient.connect(function(err, results){
  console.log("mysql has started");
});
var server = app.listen(2333, function() {
	console.log("Server has started.");
})
