/**
 * @author:dbxiao
 * @module:routerAgent
 * @function:提供路由转发规则，提供url、view、server配置
 */

var fs   = require('fs');
var routerAgent = new Array();

function formatRouter(files){
	var routerList  = new Array();
	var path = null;
	for(x in files){
		path = files[x].split(".js")[0]; 
		routerList[path] = require('../conf/router/'+path);
	};
	return routerList;
}

function formatAgent(routerList){
	var arr  = new Array();
	for(x in routerList){
		for(var i=0; i<routerList[x].length; i++){
			routerAgent.push(routerList[x][i]);
		}
	};
	return routerAgent;
}

fs.readdir(GLOBAL.nodeConf.ROUT_DIR+"/conf/router", function(err, files){
	formatAgent(formatRouter(files));
});


module.exports = routerAgent;