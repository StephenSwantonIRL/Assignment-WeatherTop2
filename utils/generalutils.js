"use strict"

const generalUtils = {
  getNestedPropertyValuesFromArray(array, property, datatype){
    let values = ""
    for(let i=0; i<array.length; i++){
      if(datatype == "String"){
        values = values+"'"
      }
      values = values+ array[i][property]
      if(datatype == "String"){
        values = values+"'"
      }
      if(i<(array.length-1)){
        values = values+", "
      }
    }
    return values
  }
  }

module.exports = generalUtils