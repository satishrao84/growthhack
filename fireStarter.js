/**
 * http://usejsdoc.org/
 */

var cluster = require('cluster');
var winston = require('winston');
var flightAware = require('./util/flightAware');
//const numCPUs = require('os').cpus().length;
var cbU = require('./util/growthHackUtil');
//var Oapi = require('./cbStats_api');
var Oapi = require('./server');
var getJson = require('./util/GetStoreJson');

var args = null;

var fireStarter = function(arguments){
	args = arguments;
}
fireStarter.prototype.masterProc = function(){
    cbU.readConfigFile(args[0], function(err, config) {
    	cbU.getLogger(config, function(log) {
    		log.info('logger is ready, file ' + config.winston.file.filename);
    		logger = log;
            // house keeping in main thread
        	logger.info(JSON.stringify(config));
    	});
    	var flightAwareApiKey = config.api_key;
    	var flightAwareUserName = config.username;
    	var flightAwareURI = config.flight_uri;
    	//var airportURI = config.airport_uri;
    	var alertURI = config.alert_uri;
    	var parameters = {}
    	parameters['address'] = alertURI
    	parameters['format_type'] = "json/post"
    	var oapi = new Oapi(config.port,config)	
    	getJson.getStoreJson(flightAwareURI,flightAwareUserName,flightAwareApiKey,'/json/FlightXML2/RegisterAlertEndpoint',parameters).then(function(registrationResult){
    		logger.info("REGISTRATION RESULT "+registrationResult);
    		
    	})
    	
    })
}

module.exports = fireStarter;
