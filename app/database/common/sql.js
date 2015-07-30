var $sqlConf  = require( GLOBAL.nodeConf.DATA_DIR + 'config/sqlConf');
var $sqlConn  = require( GLOBAL.nodeConf.DATA_DIR + 'config/sqlConnect');
var $client   = $sqlConn();

var sql = {
	select : function(query, callback){
	    $client.query(query , function selectCb(err, results, fields) {
	        if(typeof callback == "function"){
	        	callback(err, results, fields);	
	        }
	    });
	},
	insert : function(query, callback){
	    $client.query(query , function selectCb(err, results, fields) {
	        if(typeof callback == "function"){
	        	callback(err, results, fields);	
	        }
	    });
	},
	updata : function(query, callback){
	    $client.query(query , function selectCb(err, results, fields) {
	        if(typeof callback == "function"){
	        	callback(err, results, fields);	
	        }
	    });
	},
	delete : function(query, callback){
	    $client.query(query , function selectCb(err, results, fields) {
	        if(typeof callback == "function"){
	        	callback(err, results, fields);	
	        }
	    });
	}
};

module.exports = sql;