// messageModel.js connects to a real database. if tests are running slow, you
// can comment out line 4 and comment in line 5 to use a hardcoded 'mock' database
// (Note: you need to do the same in the node-chatroom-test.js file to run tests)
const Message = require('./messageModel');
// const Message = require('./messageModelMock');

module.exports = {
  getMessages: (request, response) => {
    console.log("GETTT : ",request);
    return Message.find({ created_by : "Andy"}, (err, foundMessages) => {
      if (err) {
        response.statusCode = 400;
        return response.end(JSON.stringify(err));
      }
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');
      return response.end(JSON.stringify(foundMessages.slice(-25)));

    });
  },
  postMessage: (request, response) => {
    console.log("POSTTT : ",request);
    let messageToSave = '';
    request.on('data', function(chunk){
      messageToSave += chunk;
    });
    request.on('end', function(){
      return Message.create(JSON.parse(messageToSave), (err) => {
        if (err) {
          response.writeHead(400);
          return response.end(JSON.stringify(err));
        }
        response.writeHead(200);
        return response.end();
        });
    });
  }
};
