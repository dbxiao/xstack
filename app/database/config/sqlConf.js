/**
 * @author [dbxiao | dbxiao@foxmail.com]
 * @data   [2015-02-11]
 * @class  [sqlConf]
 * @desc   [数据库配置文件sql config file]
 */


/**
 * [sqlConf 线上数据库配置，database online config]
 */
// var sqlConf = {
//     user : '线上数据库用户名',
//     host : 'sqld.duapp.com',
//     password : '线上数据库密码',
//     port : '4050',
//     connectTimeout : 50000,
//     queueLimit:0,
//     waitForConnection: true,
//     connectionLimit: 50,
//     database : '数据库名称'
// };


/**
 * [sqlConf 线下数据库配置，database offline config]
 */
var sqlConf = {
    user : 'root',
    host : 'localhost',
    password : '123456',
    port : '3306',
    queueLimit:0,
    waitForConnection: true,
    connectionLimit: 50,
    database : 'xpluse'
};

module.exports = sqlConf;