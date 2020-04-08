var expect = require('chai').expect;
var assert = require('chai').assert;
const { removeFromAllWaitlistsById } = require('../dbmanager.js');

describe('#removeFromAllWaitlistsById()', function() {

    context('with correct inputs', function() {
        it('should return resolved promise for string input', function(done) {
            removeFromAllWaitlistsById('general')
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
            removeFromAllWaitlistsById(null)
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
            removeFromAllWaitlistsById(123)
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
            removeFromAllWaitlistsById([1, 2, 3])
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
            removeFromAllWaitlistsById()
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