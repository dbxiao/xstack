/**
 * @name mysqlConf
 * @description mysql 配置. 使用 mariadb 作为关系型数据库
 * @author dbxiao@foxmail.com
 * @copyright dbxiao@foxmail.com
 */

export const mysqlConf = {
    LOCAL: {
        host: 'localhost',
        user: 'root',
        password: '12345678',
        port: '3306',
        queueLimit: 0,
        waitForConnection: true,
        connectionLimit: 50,
        database: 'xmanager',
        accessIp: ['localhost']
    }
}