const express = require('express');
const path = require('path');
const utils = require('./utils');
const sse = require('./sse');
const fs = require('fs');

const app = express();
const BASE_DIR = path.join(__dirname, './demo-files');

let connections = [];

app.use('/static', express.static(path.join(__dirname, './build/static')));

// app.use('/static', express.static(path.join(__dirname, './demo-files')));

app.use(sse);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './build/index.html'));
});

app.get('/get-dir-tree', function(req, res) {
  var tree = utils.getDirTree(BASE_DIR);
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify(tree));
});

app.get('/get-file', function(req, res) {
  res.sendFile(req.query.filepath);
});

app.get('/stream', function(req, res) {
  res.sseSetup();
  connections.push(res);
  res.sseSend('hello');
});

app.listen(8080);


fs.watch(BASE_DIR, {recursive: true}, function(event, filename) {
  for (const connection of connections) {
    connection.sseSend({
      filename: BASE_DIR + '/' + filename,
      event
    })
  }
});

