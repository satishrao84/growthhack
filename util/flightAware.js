
var flightAwareService = require('./flight_aware_service')
//var kpiDirname = './etc/kpi';
var config;
var flightAwareServiceObj;
var apiKey;
var apiUsername;
var flightAwareURI;

/*var flightAware = function(apiKey,apiUsername,flightAwareURI){
	logger.info("in flightAware apiKey : " + apiKey + " apiUsername " + apiUsername  + " fligthAwareURI " + flightAwareURI )
	flightAwareURI = flightAwareURI;
	apiKey = apiKey;
	apiUsername = apiUsername;
	flightAwareServiceObj = new flightAwareService(apiKey,apiUsername,flightAwareURI);
};*/

var flightAware = function(arg_config){
	config = arg_config;
	flightAwareServiceObj = new flightAwareService(config.api_key,config.username,config.flight_uri);
}

flightAware.prototype.getSingleFlightNum = function(req,res){
	var payload = req.body;
	
	flightAwareServiceObj.getSingleFlightNumInfo(req,res,payload,config)
	
}

flightAware.prototype.getAllFlightNums = function(req,res){
	var payload = req.body;

	flightAwareServiceObj.getAllFlightNums(req,res,payload,config)
	
}

flightAware.prototype.storeAlerts = function(req,res){
	var payload = req.body;

	flightAwareServiceObj.storeAlerts(req,res,payload,config)
	
}

module.exports = flightAware;
