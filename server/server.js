'use strict';
const http = require('http');
const messageController = require('./message/messageController');
const fs = require('fs');
const mongoose = require('mongoose');

let connectedToDB = false;

mongoose.connect(JSON.parse(fs.readFileSync(__dirname + '/config.json','utf8')).uri, () => {
  connectedToDB = true;
  // console.log('connected to mongo');
});

const server = http.createServer((request, response) => {
  if (request.method === 'GET') {
    if (request.url === '/') {
      response.setHeader('Content-Type', 'text/html');
      return response.end(fs.readFileSync(__dirname + '/../index.html'));
    }
    if (request.url === '/messages'){
      return messageController.getMessages(request, response);
    }
    if (request.url.match(/.js$|.html$|.css$|.woff|.woff2|.tff$/)) {
      return response.end(fs.readFileSync(__dirname + "/.." + request.url));
    }
  }

  if (request.method === 'POST') {
    if (request.url === '/messages'){
      return messageController.postMessage(request, response);
    }
  }

  if (request.method === 'PUT'){
    //task - modify the original message
    
  }

  response.statusCode = 404;
  response.end("Cannot Find Resource");

}).listen(3000);

server.isConnected = () => {
  return connectedToDB;
};

module.exports = server;
