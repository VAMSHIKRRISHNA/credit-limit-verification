const server = require('./server');
const assert = require('assert');
const http = require('http');

describe('server', function () {
  before(function () {
    server.listen(8000);
  });

  after(function () {
    server.close();
  });

  it('Should respond with status code 200', function (done) {
    http.get('http://127.0.0.1:8000', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });

});
