// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

/**
a través de la app.enable ('trust proxy'), Express tendrá conocimiento de que está detrás de un proxy y que los campos de encabezado X-Forwarded-* pueden ser de confianza, que de lo contrario podrían ser fácilmente falsificados.
*/
app.enable('trust proxy');

app.get('/api/whoami', function (req, res){
  //console.log("1", req.headers);
  //console.log("1", req.connection);
  /** obsoleto
  res.json({ipaddres: req.connection.remoteAddress, language: req.headers['accept-language'],
           software:req.headers['user-agent']});
  */
  res.json( {ipaddress: req.ip, language: req.get('Accept-Language'), software: req.get('user-agent')});
  
}); 

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
