var express = require('express');
var app = express();

var apiController = require('./controllers/apiController');

var port = process.env.PORT || 3100;

app.use('/', express.static(__dirname + '/public'));
app.use('/assets', express.static(__dirname + '/public'));

app.use('/', function (req, res, next) {
	console.log('Request Url:' + req.url);
	next();
});

apiController(app);

console.log("listening port: "+port);
app.listen(port);