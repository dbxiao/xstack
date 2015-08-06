/**
 * @author [dbxiao]
 * @date   [2015-02-12]
 * @module [routerAgent]
 * @desc   [路由转发配置文件]
 */

var fs   = require('fs');
var routerAgent = new Array();

function formatRouter(files){
	var routerList  = new Array();
	var path = null;
	for(x in files){
		path = files[x].split(".js")[0]; 
		routerList[path] = require('../routerConf/'+path);
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
	return routerAgent
}

fs.readdir(GLOBAL.nodeConf.ROUT_DIR+"/routerConf", function(err, files){
	formatAgent(formatRouter(files));
});


module.exports = routerAgent;

