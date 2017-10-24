let parseString = require('xml2js').parseString;

exports.xmlToObjext = function(xmlStr, callback) {

  parseString(xmlStr, function(err, result) {
    if(err) {
      console.log(err);
    } else {
      callback(result);
    }
  })
}
