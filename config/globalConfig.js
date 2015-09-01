/*
 * @author [dbxiao]
 * @data   [2014-11-11]
 * @class  [globalConfig]
 * @desc   [提供node全局配置参数]
 */
var path = require('path');
var ROOT_DIR = path.join( process.argv[1] || __dirname, '../');

GLOBAL.nodeConf = {
    //服务端口
    PORT : 18080,
    //模板引擎格式
    VIEWS_ENGINE   : 'html',
    //app目录
    APP_DIR : path.join( ROOT_DIR , "./app" ),
    
    //静态资源目录
    STATIC_DIR : path.join( ROOT_DIR ,"./app/x-output/res" ),
    //模版文件目录
    VIEW_DIR : path.join( ROOT_DIR , "./app/x-output/view/" ),
    
    
    //extend目录
    EXT_DIR : path.join( ROOT_DIR , "./extend" ),
    //config根目录
    CONF_DIR : path.join( ROOT_DIR , "./config/" ),
    //database根目录
    DATA_DIR : path.join( ROOT_DIR , "./app/database/" ),
    //Server根目录
    SERV_DIR : path.join( ROOT_DIR , "./app/server/" ),
    //router根目录
    ROUT_DIR : path.join( ROOT_DIR , "./app/router/" )
};



