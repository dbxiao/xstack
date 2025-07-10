/**
 * @name server.conf.ts
 * @author AI
 * @date 2024-07-25
 * @description 定义服务器的全局配置，包含模板引擎、静态文件目录、数据库目录等路径配置，以及开发环境的 IP 和端口信息。
 * @warning 修改配置前请确认各路径是否正确，避免影响服务正常运行。
 * @copyright dbxiao@foxmail.com. All rights reserved.
 */

// 静态资源目录常量
const RES = 'res'
// 模板文件目录常量
const VIEW = 'view'

/**
 * 服务器配置对象，包含各种路径配置和开发环境信息
 */
const serverConf = {
    // 模板引擎类型
    VIEWS_ENGINE: 'html',
    // 静态资源目录常量引用
    RES: RES,
    // 模板文件目录常量引用
    VIEW: VIEW,
    // 应用程序根目录路径
    APP_DIR: './app',
    // Web 根目录路径
    WEBROOT_DIR: './webroot/',
    // 静态文件目录路径
    STATIC_DIR: './webroot/' + RES + '/',
    // 模板文件目录路径
    VIEW_DIR: './webroot/' + VIEW + '/',
    // 配置文件目录路径
    CONF_DIR: './config/',
    // 数据库文件目录路径
    DATA_DIR: './app/database/',
    // 服务器逻辑目录路径
    SERV_DIR: './app/server/',
    // 路由配置目录路径
    ROUTER_DIR: './app/router/',
    // 临时文件目录路径
    TEMP_DIR: './temp/',
    // 日志文件目录路径
    LOGS_DIR: './logs/',
    // 网站图标文件路径
    FAVICONS_DIR: './config/favicon.ico',
    // 生成环境IP
    IP: '0,0,0,0',
    // 生成环境端口
    PORT: 80,
    // 开发环境使用的 IP 地址
    DEV_IP: '127.0.0.1',
    // 开发环境使用的端口号
    DEV_PORT: 18080,
}

export default serverConf