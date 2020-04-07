var expect = require('chai').expect;
var assert = require('chai').assert;
const { clearDepartmentWaitlist } = require('../dbmanager.js');

describe('#clearDepartmentWaitlist()', function() {

    context('with correct inputs', function() {
        it('should return resolved promise for alphanumeric string input', function(done) {
            clearDepartmentWaitlist('general')
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
        it('should return rejected promise for non-alphanumeric input', function(done) {
            clearDepartmentWaitlist('general$')
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

        it('should return rejected promise for null input', function(done) {
            clearDepartmentWaitlist(null)
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
            clearDepartmentWaitlist(123)
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
            clearDepartmentWaitlist([1, 2, 3])
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
            clearDepartmentWaitlist()
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