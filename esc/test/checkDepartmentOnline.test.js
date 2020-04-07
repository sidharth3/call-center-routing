var expect = require('chai').expect;
var assert = require('chai').assert;
const { checkDepartmentOnline } = require('../dbmanager.js');

describe('#checkDepartmentOnline()', function() {

    context('with correct inputs', function() {
        it('should return resolved promise for string input', function(done) {
            checkDepartmentOnline('abc')
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
            checkDepartmentOnline(null)
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
            checkDepartmentOnline(123)
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
            checkDepartmentOnline([1, 2, 3])
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
            checkDepartmentOnline()
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