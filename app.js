/*
* @author:dbxiao
* @data:2014-11-11
* @module:app
* @function:nodeJS主程序，开启服务执行：node app
*/


////////////////////////////////////////////////
//============  module 引入    =================//
////////////////////////////////////////////////
//提供全局配置
var globalConfig = require('./config/globalConfig');
//提供WEB框架服务
var express     = require('express');
//提供WEB PATH服务
var path = require('path');
//提供WEB ICON服务
var favicon = require('static-favicon');
//提供COOKIE服务
var cookieParser = require('cookie-parser');
//HTTP
var http = require('http');
//提供数据解析服务
var bodyParser = require('body-parser');
//提供文件解析服务
var multipart = require('connect-multiparty');
//提供路由服务
var router = require(GLOBAL.nodeConf.ROUT_DIR + 'router');
//实例化app服务
var app = express();
/** socket */
// var server = http.createServer(app).listen(GLOBAL.nodeConf.PORT);
// //io
// io = require('socket.io').listen(server);
// 
// var socketIO = require(GLOBAL.nodeConf.EXT_DIR + '/socketIO/socketIO');
// socketIO(io);

////////////////////////////////////////////////
//=================app配置====================//
////////////////////////////////////////////////
//set template
app.set('views', GLOBAL.nodeConf.VIEW_DIR);
//app.engine('html', engine);
app.engine('html', require('ejs').__express);
app.set('view engine', GLOBAL.nodeConf.VIEWS_ENGINE);
//express 解析上传文件files支持
app.use(multipart({
    uploadDir : './app/webroot/upload',
    keepExtensions : true,
    limit : 8 * 1024 * 1024 //文件限制5M
}));
//express 静态文件目录定义STATIC_DIR
app.use("/"+GLOBAL.nodeConf.RES, express.static(GLOBAL.nodeConf.STATIC_DIR));
//express 页面icon定义
app.use(favicon());
app.use(bodyParser.urlencoded({
    extended : true
}));
//express 解析post请求支持
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//express 静态文件目录定义
app.use(cookieParser());
//自定义路由
app.use(router);
//端口 (和socket合并开启端口监听)
app.listen(GLOBAL.nodeConf.PORT);

module.exports = app;
