/*
 * @author [dbxiao]
 * @data   [2014-11-11]
 * @desc   [路由主程序]
 */

var express           = require('express');
//初始化路由
var router            = express.Router();
//检查路由配置
var routerAction = require('./lib/routerAction.js');
//检查路由配置
var routerHost   = require('./lib/routerHost.js');
//定义默认的title
var title             = "Xstack!";

//format绝对路径
var directPath = function(path){
    var directPath = GLOBAL.nodeConf.SERV_DIR + path;
    return directPath;
};

/**
 * @param {Object} req 请求参数
 * @param {Object} res 返回值参数
 * @param {Object} next 
 */
var initAction = function(req, res, next){
    var reqPath= routerHost(req.host, req.path);
    var act    = routerAction(reqPath);
    var server = "";

    if(act.server && !act.view){
        server = require(directPath(act.server));
        server(req, res, next);
    }else if(act.server && act.view){
        server = require(directPath(act.server));
        server(req, res, next, act.view);
    }else if(!act.server && act.view){
        res.render(act.view , {
            title : title
        });
    }else {
        next();
    }
};

/**
 * 捕获get请求
 */
router.get('/*', function(req, res, next) {
    initAction(req, res, next);
});

/**
 * 捕获post请求
 */
router.post('/*', function(req, res, next) {
    initAction(req, res, next);
});

module.exports = router;