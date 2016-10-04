var express = require('express');
var app = express();

function isValidUnixTimeStamp(date) {
  var reg = /^\d+$/g;
  var allNums = reg.test(date);
  return allNums;
};

function isValidNaturalTimeStamp(date) {
  var reg = /[A-Za-z]+\s\d+,\s\d+$/g
  var naturalDate = reg.test(date);
  return naturalDate;
}

function dateToJson(date) {
  
  // maybe make one function that determins of unix or natural or null and returns the object if either and returns null object if not.
  var jsonString;
  var d;
  
  // Determine if unix or natural by checking of entire string is number or not
  var isUnix    = isValidUnixTimeStamp(date);
  var isNatural = isValidNaturalTimeStamp(date);
  
  if (isUnix) {
    d = new Date(date * 1000);
    jsonString = JSON.stringify({'unix': parseInt(date), 'natural': getDateString(d)});
  } else if (isNatural) {
    d = new Date(date);
    jsonString = JSON.stringify({'unix': d.getTime() / 1000, 'natural': date});
  } else {
    jsonString = JSON.stringify({'unix': null, 'natural': null});
  }
  
  return jsonString;
}

function getDateString(date) {
  
  var months = new Array();
  months[0]  = "January";
  months[1]  = "February";
  months[2]  = "March";
  months[3]  = "April";
  months[4]  = "May";
  months[5]  = "June";
  months[6]  = "July";
  months[7]  = "August";
  months[8]  = "September";
  months[9]  = "October";
  months[10] = "November";
  months[11] = "December";
  
  var month = months[date.getMonth()];
  var day   = date.getDate();
  var year  = date.getUTCFullYear();
  
  var dateString = month + ' ' + day + ', ' + year;
  
  return dateString;
}

// Use *? to allow for optional parameters (i.e. no parameters given)
app.get('/:date*?', function (req, res) {
  
  // If no parameters given, return nulls
  if (Object.keys(req.params).length <= 0) {
    res.send(JSON.stringify({'unix': null, 'natural': null}));
  }
  
  var date = req.params.date;
  
  var jsonString = dateToJson(date);
  
  res.send(jsonString);

  res.end()
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening on port 8080!');
});