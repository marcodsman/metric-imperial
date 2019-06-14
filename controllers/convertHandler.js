/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  //==================
  //GET INITIAL NUMBER
  //==================
  this.getNum = function(input) {
    var result;
    var num;
    var regex = /[a-zA-Z]/;
    var error;
  
    // Test for double fractions and return error if it is
    if(/\//g.test(input)){
      var numOfSlash = input.match(/\//g).length;
      if(numOfSlash > 1){
        error = "invalid number"; 
        return error;
      }
    }
    
    // Find index where the unit starts
    var unitIndex = input.search(regex);
    num = input.slice(0, unitIndex);
    
    // If only unit is entered, defaults to 1
    if(num==""){
      result = 1;
      return result;
    }
    
    // Evaluate fractions
    result = eval(num);
    return result;
  };
  
  
  //==================
  // GET INITIAL UNIT
  //==================
  this.getUnit = function(input) {
    var result;
    var error;
    var regex = /[a-zA-Z]/;
    var validUnits = ['gal','l','mi','km','lbs','kg'];
    
    // Remove number. Leave only unit
    var unitIndex = input.search(regex);
    var unit = input.slice(unitIndex);
    // Convert all to lowercase and trim whitespace
    unit = unit.toLowerCase();
    unit = unit.trim();
    // Check that the unit is valid
    if(!validUnits.includes(unit)){
      error = "invalid unit"
      return error
    }
    // If unit is valid, return it
    result = unit;
    return result;
  };
  
  
  //===============
  //GET RETURN UNIT
  //===============
  this.getReturnUnit = function(initUnit) {
    var result;
    var lookup = {
      'gal': 'l',
      'l': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    result = lookup[initUnit];
    return result;
  };
  
  
  //==========
  // SPELL OUT
  //==========
  this.spellOutUnit = function(unit) {
    var result;
    var lookup = {
      'gal': 'gallons',
      'l': 'litres',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    result = lookup[unit];
    return result;
  };
  
  
  //=========
  //CONVERT
  //=========
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    
    switch(initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
    }
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;
    if(initNum === "invalid number" && initUnit === "invalid unit"){
      result = "invalid number and unit"
      return result;
    } else if(initNum === "invalid number"){
      result = "invalid number"
      return result;
    } else if(initUnit === "invalid unit"){
      result = "invalid unit";
      return result;
    }
    result = initNum + " " + this.spellOutUnit(initUnit) + " converts to " +  returnNum + " " + this.spellOutUnit(returnUnit);
    return result;
  };
  
}

module.exports = ConvertHandler;
