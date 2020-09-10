const {
    changeFormatToJSON,
    calcCombinedUtil,
    logCreditBreach
} = require('./helper');
const assert = require('assert');
const dataString = 'entity,parent,limit,utilisation\r\nA,,100,100\r\nB,A,90,10';

describe('Helper module test', function () {
    let jsonObj = null;
    let breachedEntities = null;
    
    it('Should convert input CSV string into JSON Object', function(done) {
        jsonObj = changeFormatToJSON(dataString, '');
        assert.ok(typeof jsonObj === 'object');
        done();
    });

    it('Should calculate combined utilisation and capture limit breached Entities', async function() {
        breachedEntities = await calcCombinedUtil(jsonObj);
        assert.ok(typeof breachedEntities === 'object');
        assert.ok(Object.keys(breachedEntities).length === 1);
    });

    it('Should match with expected entity limit breach', function(done) {
        assert.ok(breachedEntities[0].entity === "A/B");
        done();
    });

    it('Should print breached entity record string', function(done) {
        const output = logCreditBreach(breachedEntities);
        assert.ok(typeof output === "string");
        done();
    });
});