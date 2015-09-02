/**
 * @author:dbxiao
 * @data:2014-11-11
 * @module:checkRouterPage
 * @function:检查路由信息
 */

//获取路由配置
var routerAgent = require('./routerAgent');

/**
 * @class：routerCheckAction
 * @parame：_path
 * @function: 检查访问的_path是否在routerAgent表中，如果存在，将_path复制给action
 *            判断_path 是否包含/static/结构，存在action为空，url直接访问。
 */
var routerAction = function(_path) {
    //默认配置为404页面，如果没有在routerAgent匹配，直接进入404
    var action = {
    	"path":_path , 
    	"view":"pc/home/page/index"
    };

    //_path进行遍历，查询匹配的action
    for (x in routerAgent ) {
        if (_path.match(routerAgent[x].path)) {
            action = routerAgent[x];
            break;
        } else if (_path.match(new RegExp("/"+GLOBAL.nodeConf.RES+"/"))){
            action.view = "";
            break;
        } else {
            continue;
        }
    }
    return action;
};

module.exports = routerAction;