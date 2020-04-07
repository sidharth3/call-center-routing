// var assert = require('chai').assert;
// var numbers = [1, 2, 3, 4, 5];

// //Assert style
// assert.isArray(numbers, 'is array of numbers');
// assert.include(numbers, 2, 'array contains 2');
// assert.lengthOf(numbers, 5, 'array contains 5 numbers');


// //Expect style
// var expect = require('chai').expect;
// expect(numbers).to.be.an('array').that.includes(2);
// expect(numbers).to.have.lengthOf(5);

// //Should style
// var should = require('chai').should();
// numbers.should.be.an('array').that.includes(2);
// numbers.should.have.lengthOf(5);


// const sum = () => {
//     return 0
// }
// var expect = require('chai').expect;

// describe('#sum()', function() {

//     context('without arguments', function() {
//         it('should return 0', function() {
//             expect(sum()).to.equal(0)
//         })
//     })

//     context('with number arguments', function() {
//         it('should return sum of arguments', function() {
//             expect(sum(1, 2, 3, 4, 5)).to.equal(15)
//         })

//         it('should return argument when only one argument is passed', function() {
//             expect(sum(5)).to.equal(5)
//         })
//     })

//     context('with non-number arguments', function() {
//         it('should throw error', function() {
//             expect(function() {
//                 sum(1, 2, '3', [4], 5)
//             }).to.throw(TypeError, 'sum() expects only numbers.')
//         })
//     })

// })