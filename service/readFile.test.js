const readFile = require('./readFile');
const assert = require('assert');


describe('readFile test', function () {
    const dataString = 'entity,parent,limit,utilisation\r\nA,,100,0\r\nB,A,90,10';
    const incorrectString = 'entity,parent,limit,utilisation\r\nA,,100,0\r\nB,A,90';

    it('Should match with content in the file', function(done) {
        readFile('./mock/data.csv').then(function(response) {
            assert.equal(dataString, response);
            done();
        });
    });

    it('Should not match with content in the file', function(done) {
        readFile('./mock/data.csv').then(function(response) {
            assert.notEqual(incorrectString, response);
            done();
        });
    });

    it('Should reject promise', function(done) {
        readFile('./mock/data1.csv').then(function(response) {
            assert.notEqual(incorrectString, response);
            done();
        },
        (err) => {
            assert.strictEqual(err.code, 'ENOENT');
            done();
        });
    });

});