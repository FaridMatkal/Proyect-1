var express = require('express');
var app = express();

// Cors
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// API endpoint for /api/:date?
app.get("/api/:date?", function (req, res) {
  let dateParam = req.params.date;
  
  // If no date is provided, use current date
  if (!dateParam) {
    let now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }
  
  // Check if the dateParam is a number (timestamp in milliseconds)
  let date;
  if (!isNaN(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    // If it's not a number, try to parse it as a date string
    date = new Date(dateParam);
  }
  
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }
  
  // Return the date in both unix and utc formats
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
