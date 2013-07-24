var fs = require('fs');
var express = require('express');
var app = express();

app.use(express.bodyParser());

var listenPort = 4010;
var targetDirectory = process.env.HOME + "/received_alerts/";
fs.mkdir(targetDirectory, function (err) {
	// Tolerate "dir already exists" error, but throw others:
	if (err && err.errno != 47) {
		throw err;
	}
});

app.post('/wormlyalert', function(req, res){
	if (req.body.wormlyalert.length > 1024) {
		throw new Error("Payload is too large at " + req.body.wormlyalert.length + " bytes");
	}

	var alert = JSON.parse(req.body.wormlyalert);
	var hostid = parseInt(alert.hostid);

	if (hostid < 0) throw new Error("Invalid host id" + req.body.wormlyalert);

	var filename = targetDirectory + hostid + ".json";
	fs.writeFile(filename, JSON.stringify(alert), function (argument) {
		res.end('OK');
	});

});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.send(500, 'Invalid alert supplied (JSON required, 1kB max)');
});

app.listen(listenPort);

