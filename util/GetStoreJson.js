/**
 * http://usejsdoc.org/
 */
var http = require('http');
var Client =  require('node-rest-client').Client;
var logger = require('winston').loggers.get('storedb');
var Promise = require('bluebird');

exports.getStoreJson = function(faUri,username,password,path, params, cb){
	
	return new Promise((resolve,reject) => {
		
		var options = {
			  'password': password.toString(),
			  'user':username.toString()			
			};
		var client = new Client(options);
		var method = getMethod(path);
		//var methodUrl = getMethodUrl(path);
		client.registerMethod(method, faUri+ path, 'GET');
		var Args = {
			    parameters: params
			};
		
		client.methods[method](Args, function (data, response) {
			logger.info('STATUS for server ' + faUri + '  ' + response.statusCode + " for path " + path);
	  		if(response.statusCode.toString() !== '200' ){
	  			if( response.statusCode.toString() !== '201'){
	  				logger.info("REJECTING RESPONSE")
	  				reject(response.statusCode.toString());
	  			}
	  		}

		  //logger.info(path);	  		
	  		

	  		
	  		//logger.info('HEADERS: ' + JSON.stringify(res.headers));
	  		response.setEncoding('utf8');
	  		response.on('data',function(chunk){
	  			fullJson += chunk;
	  			logger.info("OUTPUT OF GET " + JSON.stringify(chunk))
	  		});
	  		response.on('end',function(){
	 
	  			fullJson = JSON.parse(fullJson);

	  			resolve(fullJson);

	  			typeof cb === 'function' && cb(fullJson);
	  		});
	  	});		
	    //request.on('error', reject);
		//request.end();
		
	})

}

var getMethod = function(path){
	//var start_pos = path.lastIndexOf('/') + 1;
	var start_pos = path.lastIndexOf('/')+1;
	var method = path.substring(start_pos, path.length);
	logger.info("METHOD : " + method);
	return method;
}

var getMethodUrl = function(path){
	var methodUrl = path.substring(0, path.indexOf('?') );
	logger.info("METHODURL : " + methodUrl);
	return methodUrl;
}