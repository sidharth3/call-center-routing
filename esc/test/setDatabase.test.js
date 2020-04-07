var expect = require('chai').expect;
var assert = require('chai').assert;
// var { customError, loginInfo } = require('../public/modules/socketEventsClient.js');
// import { customError, loginInfo } from '../public/modules/socketEventsClient.js';
//var socketEventsClient = require('../public/modules/socketEventsClient.js');
const { setDatabase } = require('../dbmanager.js');

describe('#setDatabase()', function() {

    context('with alphanumeric inputs', function() {
        it('should not throw an Error for alpha', function() {
            expect(setDatabase('abc'));
        })
        it('should not throw an Error for numeric', function() {
            expect(setDatabase('123'));
        })
        it('should not throw an Error for alphanumeric', function() {
            expect(setDatabase('abc123'));
        })
    })

    context('with non-alphanumeric inputs', function() {
        it('should throw an Error for non-alphanumeric - 1', function() {
            expect(setDatabase.bind(setDatabase, ']]')).to.throw("database name must be alphanumeric");
        })
        it('should throw an Error for non-alphanumeric - 2', function() {
            expect(setDatabase.bind(setDatabase, 'abc]]')).to.throw("database name must be alphanumeric");
        })
    })

    context('with non-alphanumeric empty edge case inputs', function() {
        it('should throw an Error for empty string', function() {
            //expect(setDatabase());
            expect(setDatabase.bind(setDatabase, '')).to.throw("database name must be alphanumeric");
        })

        it('should throw an Error for null object', function() {
            //expect(setDatabase());
            expect(setDatabase.bind(setDatabase, null)).to.throw("database name must be alphanumeric");
        })

        it('should throw an Error for no input', function() {
            //expect(setDatabase());
            expect(setDatabase.bind(setDatabase, null)).to.throw("database name must be alphanumeric");
        })

    })
})