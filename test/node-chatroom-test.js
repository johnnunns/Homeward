const server = require('./../server/server');
const request = require('supertest')(server);
// To use mock database instead, comment out line 4 and comment in line 5
const Message = require('./../server/message/messageModel');
// const Message = require('./../server/message/messageModelMock');
const expect = require('chai').expect;

function checkConnection(done) {
  console.log('connecting to mongo');
  if (server.isConnected()) return done();
  setTimeout(checkConnection, 1000, done);
}

describe('GET Node Calendar', () => {
  before(checkConnection)

  beforeEach((done) => {
    Message.create({created_by: 'Codesmith', message: 'I love testing'}, (err) => {
      if (err) throw err;
      done();
    })
  });

  afterEach((done) => {
    Message.remove({created_by: 'Codesmith'}, (err, message) => {
      if (err) throw err;
      done();
    });
  });

  it('should serve index.html on GET request to /',(done) => {
    request
      .get('/')
      .set('Accept','text/html')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });

  it('should invalidate GET request to invalid urls', (done) => {
  	request
      .get('/error-route-that-shouldnt-exist')
      .expect(404, done);
  });

  it('should respond to GET request for /messages with 200 status code', (done) => {
    request
      .get('/messages')
      .expect(200, done)
  });

  it('should respond to GET request for /messages with JSON object', (done) => {
    request
      .get('/messages')
      .expect('Content-Type', /json/)
      .expect((res) => {
        try {
          JSON.parse(res.text);
        } catch (e) {
          throw new Error('not json');
        }
      })
      .end(done);
  });

  it('should respond to GET request for /messages with message object with created_by and message property', (done) => {
  	request
  	  .get('/messages')
  	  .expect((res) => {
        const message = JSON.parse(res.text)[0];
        if (!('created_by' in message)) throw new Error("missing created_by");
        if (!('message' in message)) throw new Error("missing message");
      })
  	  .end(done);
  });

  it('should respond to POST request to /messages with status code 200', (done) => {
    request
      .post('/messages')
      .send({created_by: 'Codesmith', message: 'we love testing'})
      .expect(200, done);
  });

  it('should POST request to /messages and store in database', (done) => {
    request
      .post('/messages')
      .send({created_by: "Codesmith", message:"I testing"})
      .end((err) => {
      	request
      	  .get('/messages')
      	  .expect((res) => {
            if (JSON.parse(res.text).length <= 1) throw new Error("message not correctly posted");
          })
      	  .end(done);
      });
  });

  it('should send POST request to /messages and return 200 status code if post is successful', (done) => {
    request
      .post('/messages')
      .send({created_by: "Codesmith", message:"I testing"})
      .expect(200, done);
  });

  it('should send POST request to /messages and return 400 status code if post is unsuccessful', (done) => {
    request
      .post('/messages')
      .send({created_by: "Codesmith"})
      .expect(400, done);
  });
});
