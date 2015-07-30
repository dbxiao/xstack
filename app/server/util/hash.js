/*
 * @author:dbxiao
 * @data:2015-01-19
 * @module:依赖crypto
 * @function:提供md5等加密算法，
 * 			 attention：不支持中文md5，请谨慎操作
 */
var crypto = require('crypto');

var hash = {
    md5 : function(content){
    	var md5Fn = crypto.createHash('md5');
    	var md5   = md5Fn.update(content).digest('hex');
    	return md5;
    },
    sha1 : function(){
    	var sha1Fn = crypto.createHash('sha1');
    	var sha1   = sha1Fn.update(content).digest('hex');
    	return sha1;
    },
    getUserToken : function(){
    	
    }
};

module.exports = hash;

