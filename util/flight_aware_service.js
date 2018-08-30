//var es = require('./connection');
var fs = require('fs');
var http = require('http');
var logger = require('winston').loggers.get('storedb');
var Promise = require('bluebird');
var  getJson = require('./GetStoreJson'); 
var async = require('async');
//var Connection = require('./connection');
var clone = require('clone');
var logger = require('winston').loggers.get('growthhack');
var apiKey;
var apiUsername;
var flightAwareRestURI;
var flight_aware_service = function(apiKey,apiUsername,flightAwareRestURI){
	apiKey = apiKey;
	apiUsername = apiUsername;
	flightAwareRestURI = flightAwareRestURI;
	logger.info("in flight aware service obj : " + apiKey + " " + apiUsername + " " + flightAwareRestURI)
}

var get_flight_aware_service = function(apiKey,apiUsername,flightAwareRestURI){
	return new flight_aware_service(apiKey,apiUsername,flightAwareRestURI)
}

flight_aware_service.prototype.getAllFlightNums = function(req,res,payload,config){
	var promises = [];
	//var server = payload.flights[0];
	logger.info("in flight aware service : " + config.api_key + " " + config.username + " " + config.flight_uri)
	Promise.map(payload.flights,function(flight){
		flightAwareRestURI = config.flight_uri;
		apiKey = config.api_key;
		apiUsername = config.username;
		var flightDepTS = new Date(flight.TravelDate);
		var start_date = flightDepTS - 10800; 
		var end_date = flightDepTS + 10800;
		var params = {}
		params['ident'] = flight.FlightNo;
		params['date_start'] = start_date;
		params['date_end'] = end_date;
		params['channels'] = "{16 e_filed e_departure e_arrival e_diverted e_cancelled}"
		return getJson.getStoreJson(flightAwareRestURI,apiUsername,apiKey,'/json/FlightXML2/SetAlert',params)},{concurrency:1}).then(function(alertResults){
		logger.info("ALERT RESULTS " + alertResults);
		return res.json(alertResults);
		
		
	})
}

module.exports = flight_aware_service;