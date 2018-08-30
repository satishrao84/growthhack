/**
 * http://usejsdoc.org/
 */

var winston = require('winston');
var logger;

exports.getLogger = function(config, cb) {
	var pid = "w-" + process.pid;

	if(config.winston) {
		config.winston.file.label = pid;
		console.log("Use log file: " + config.winston.file.filename);
		winston.loggers.add('storedb', config.winston);
	} else {
		winston.loggers.add('storedb', {
		    console: {
		        level: 'info',
		        colorize: 'true',
		        label: pid,
		        timestamp: true,
		        exitOnError: false,
		        json: false
		    }
		});
	}
	
	logger = winston.loggers.get('storedb');
	cb(winston.loggers.get('storedb'));
};

exports.readConfigFile = function(filename, cb) {
    require('fs').readFile(filename, 'utf8', function(err, data) {
    	var config = (err)? {}: JSON.parse(data);
    	config.port = (config.port)? config.port: 3000;
    	config.api_key = (config.api_key)? config.api_key: "5b70345c345e7079bc006925e8790b5324d94c09";
    	config.username = (config.username)?config.username:"satishrao";
    	config.flight_uri = (config.flight_uri)?config.flight_uri:"http://flightxml.flightaware.com";
    	config.alert_uri = (config.alert_uri)?config.alert_uri:"https://webhook.site/9cae4c6c-75b7-4adf-965e-8bf43652cb7c"
    	config.cb_user = (config.cb_user)?config.cb_user:"Administrator";
    	config.cb_pwd = (config.cb_pwd)?config.cb_pwd:"password";
    	config.cb_bucket = (config.cb_bucket)?config.cb_bucket:"growthhack-notify"
    	config.cb_url = (config.cb_url)?config.cb_url:"52.27.95.241:8091"
    	cb(null, config);
    })
}
