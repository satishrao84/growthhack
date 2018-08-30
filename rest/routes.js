'use strict';

var logger = require('winston').loggers.get('growthhack');
var flightAware = require('../util/flightAware');
var flightAwareObj;
var config;
module.exports = function(app, config) {
  
  flightAwareObj = new flightAware(config);
  // todoList Routes
  app.route('/growthHack/flightNum')
    .post(flightAwareObj.getSingleFlightNum)
  app.route('/growthhack/flightNums')
  	.post(flightAwareObj.getAllFlightNums)
  


 // app.route('/couchbase-inventory/:clusterid')
 //   .delete(todoList.delete_a_cluster);
};
