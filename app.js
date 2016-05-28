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

	http({
    		url: 'http://52.77.244.73:50070/webhdfs/v1/user/webapp1/input.txt?op=APPEND',
    		method: 'POST',
    		body: req.body.message
	});

	child = exec("pig ~/pig/search.pig", function(error, stdout, stderr) {
		if ( error !== null ) {
			sys.print(error);
		}
	});

	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Methods', 'POST');	

	http("http://52.77.244.73:50070/webhdfs/v1/user/webapp1/output/my_search_pig_out?op=OPEN", function(error, response, body) {
  		res.json(body);
	});
});
 
app.use('/api', router);

var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});
