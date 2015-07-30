/**
 * @author [dbxiao | dbxiao@foxmail.com]
 * @date   [2015-02-11]
 * @desc   [数据库通用基础方法]
 * @other  [$mysql.createPool(option),mysql.createConnection(option)]
 */


/** 依赖模块 */
var $mysql = require('mysql');
var $sqlConf = require('./sqlConf');
var $client  = null;


/** 数据库配置信息 */
var option = {
    host : $sqlConf.host,
    port : $sqlConf.port,
    user : $sqlConf.user,
    password : $sqlConf.password,
    database : $sqlConf.database
};


/** 数据库连接方法 */
function sqlConnect(req, res, callback) {
    $client = $mysql.createPool(option);    //创建数据库连接池
    $client.on('error', function(err) {     //数据库错误处理
        if (err.errno != 'ECONNRESET') {
            throw err;
        };
        $client = $sqlConn();
    });
    $client.query('USE ' + $sqlConf.database);
    return $client;
}

module.exports = sqlConnect;


