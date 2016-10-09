var express = require('express');
var moment = require('moment');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

function isValidUnixTimeStamp(date) {
  var reg = /^\d+$/g;
  var allNums = reg.test(date);
  return allNums;
};

function isValidNaturalDate(date) {
  var reg = /[A-Za-z]+\s\d+,\s\d+$/g
  var naturalDate = reg.test(date);
  return naturalDate;
}

function dateToJson(date) {
  
  var jsonString;
  var d;
  
  // Determine if unix or natural by checking of entire string is number or not
  var isUnix    = isValidUnixTimeStamp(date);
  var isNatural = isValidNaturalDate(date);
  
  if (isUnix) {
    d = moment.unix(date);
    jsonString = JSON.stringify({'unix': parseInt(date), 'natural': d.format("MMMM DD, YYYY")});
  } else if (isNatural) {
    d = moment(date, "MMMM DD, YYYY");
    jsonString = JSON.stringify({'unix': d.format('x') / 1000, 'natural': date});
  } else {
    jsonString = JSON.stringify({'unix': null, 'natural': null});
  }
  
  return jsonString;
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