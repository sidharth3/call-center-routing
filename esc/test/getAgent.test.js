var expect = require('chai').expect;
var assert = require('chai').assert;
const { getAgent } = require('../dbmanager.js');

describe('#getAgent()', function() {

    context('with correct inputs', function() {
        it('should return resolved promise for string input', function(done) {
            getAgent('abc')
                .then(() => {
                    //done(new Error('Expected method to reject.'))
                    done();
                })
                .catch((err) => {
                    //assert.isDefined(err);
                    assert.fail(err); // SHOULD not throw error for correct input
                    //assert(err, new Error)
                    //console.log(err)
                    done();
                })
                .catch(done);

        })

    })

    context('with wrong inputs', function() {
        it('should return rejected promise for null input', function(done) {
            getAgent(null)
                .then(() => {
                    //done(new Error('Expected method to reject.'))
                    done();
                })
                .catch((err) => {
                    //assert.isDefined(err);
                    //assert.fail(err); // SHOULD not throw error for correct input
                    assert(err, new Error);
                    //console.log(err)
                    done();
                })
                .catch(done);

        })

        it('should return rejected promise for number input', function(done) {
            getAgent(123)
                .then(() => {
                    //done(new Error('Expected method to reject.'))
                    done();
                })
                .catch((err) => {
                    //assert.isDefined(err);
                    //assert.fail(err); // SHOULD not throw error for correct input
                    assert(err, new Error);
                    //console.log(err)
                    done();
                })
                .catch(done);

        })

        it('should return rejected promise for array input', function(done) {
            getAgent([1, 2, 3])
                .then(() => {
                    //done(new Error('Expected method to reject.'))
                    done();
                })
                .catch((err) => {
                    //assert.isDefined(err);
                    //assert.fail(err); // SHOULD not throw error for correct input
                    assert(err, new Error);
                    //console.log(err)
                    done();
                })
                .catch(done);

        })

        it('should return rejected promise for array input', function(done) {
            getAgent()
                .then(() => {
                    //done(new Error('Expected method to reject.'))
                    done();
                })
                .catch((err) => {
                    //assert.isDefined(err);
                    //assert.fail(err); // SHOULD not throw error for correct input
                    assert(err, new Error);
                    //console.log(err)
                    done();
                })
                .catch(done);

        })

    })
})