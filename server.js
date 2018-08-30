

var express = require('express');
var logger = require('winston').loggers.get('growthhack');
var flightAware = require('./util/flightAware')
var routes = require('./rest/routes')
var flightAwareObj;

var server = function(port,config){
	logger.info("in server apiKey : " + config.api_key + " apiUsername " + config.username  + " fligthAwareURI " + config.flight_uri )
	flightAwareObj = new flightAware(config);
	
	init(port,config)
}
var init = function(s_port,config){
	app = express(),
	port = process.env.PORT || s_port;
	
	bodyParser = require('body-parser');
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	
	var routes = require('./rest/routes');
	routes(app,config);
	
	app.listen(port);
	console.log('todo list RESTful API server started on: ' + port);
}
module.exports = server;