/**
 * @author [dbxiao]
 * @date   [2015-02-12]
 * @module [routerAgent]
 * @desc   [路由转发配置文件]
 */

var arr = new Array();
var routerAgent = new Array();

var routerList = {
	home     : require('../routerConf/home.js')
};


routerAgent = arr.concat(
	routerList['home']
);

module.exports = routerAgent;

