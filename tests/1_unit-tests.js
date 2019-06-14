/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      var input = '24.3ml';
      assert.equal(convertHandler.getNum(input),24.3);
      done();
    });
    
    test('Fractional Input', function(done) {
      var input = '3/8gal';
      assert.equal(convertHandler.getNum(input),0.375);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      var input = '5.3/7m';
      assert.equal(convertHandler.getNum(input),0.7571428571428571);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      var input = '4/5/6';
      assert.equal(convertHandler.getNum(input), "invalid number")
      done();
    });
    
    test('No Numerical Input', function(done) {
      var input = "GAL";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['50gal','1/2l','2mi','20km','15lbs','5kg','4GAL','9L','6MI','8KM','50LBS','20KG'];
      var validUnits = ['gal','l','mi','km','lbs','kg'];
      
      input.forEach(function(ele) {
        assert.include(validUnits, convertHandler.getUnit(ele));
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      var input = 'balloon';
      assert.equal(convertHandler.getUnit(input), "invalid unit")
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('Convert the units', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('Spell out the units', function(done) {
      //see above example for hint
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['gallons','litres','miles','kilometers','pounds','kilograms'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      var input = [17, 'l'];
      var expected = 4.49092;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Mi to Km', function(done) {
      var input = [12, 'mi'];
      var expected = 19.3121;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Km to Mi', function(done) {
      var input = [30, 'km'];
      var expected = 18.6411;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Lbs to Kg', function(done) {
      var input = [15, 'lbs'];
      var expected = 6.80389;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Kg to Lbs', function(done) {
      var input = [16, 'kg'];
      var expected = 35.274;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
  });

});