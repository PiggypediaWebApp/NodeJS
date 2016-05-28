var express = require("express");
var bodyParser = require("body-parser");
var app = express();
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
var routes = require("./routes/routes.js")(app);
var router = express.Router();

router.post('/', function(req, res) {
	var sys = require('sys');
	var exec = require('child_process').exec;
	var child
	var http = require('request');
	var tempString = '';


	child = exec("ls", function(error, stdout, stderr) {
		sys.print('stdout: ' + stdout);
		tempString = stdout;
		res.json({ "message" : req.body.message, "child" : tempString});
		sys.print('stderr: ' + stderr);
		if ( error !== null ) {
			sys.print(error);
		}
	});

	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Methids', 'POST');	
});
 
app.use('/api', router);

var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});
