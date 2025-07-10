/**
 * @name ecosystem.config.js
 * @author AI
 * @date 2024-07-25
 * @description 此文件为 PM2 配置文件，定义了开发、生产等环境下的应用启动配置，可用于管理 Node.js 应用的集群模式、日志记录、监控等功能。
 * @warning 修改配置时需注意各环境变量的取值，避免影响应用正常运行。启动前确保 `dist/app/app.js` 文件存在。
 * @example 开发环境启动: npx pm2 start ./dist/ecosystem.config.js --env development
 * @copyright dbxiao@foxmail.com. All rights reserved.
 */

// 加载环境变量配置
require('dotenv').config()
// 引入服务器配置文件
const serverConf = require('./config/server.conf')
// 从环境变量中获取 PM2 观察模式配置，默认为 false
const { PM2_WATCH = 'false', PM2_INSTANCES } = process.env
// 从服务器配置中解构获取开发环境 IP、端口等配置
const { DEV_IP, DEV_PORT, IP, PORT } = serverConf

// 导出 PM2 应用配置对象
module.exports = {
    apps: [{
        // 应用名称，用于 PM2 管理
        name: 'xstack',
        // 应用程序运行的工作目录
        cwd: './',
        // 应用启动入口文件路径
        script: './dist/app/app.js',
        // 应用启动实例数量，从环境变量获取
        instances: PM2_INSTANCES,
        // 应用启动模式，使用集群模式
        exec_mode: 'cluster',
        // 是否开启文件变化监听，从环境变量获取并解析为布尔值
        watch: JSON.parse(PM2_WATCH),
        // 文件变化监听延迟时间（毫秒）
        watch_delay: 2000,
        // 不需要监听的文件或目录列表
        ignore_watch: [
            'node_modules',
            'temp',
            'logs',
            'upload',
            'di-deploy',
            '.git'
        ],
        // 禁用自动重启的退出码列表
        stop_exit_codes: [0],
        // 应用内存达到阈值时自动重启的阈值
        max_memory_restart: '100M',
        // Node.js 进程最大可分配内存大小
        node_args: "--max-old-space-size=2048",
        // 错误日志文件路径
        error_file: './logs/app-err.log',
        // 标准输出日志文件路径
        out_file: './logs/app-out.log',
        // 综合日志文件路径
        log_file: './logs/app-log.log',
        // 进程 ID 文件路径
        pid_file: './logs/app-pid.log',
        // 是否合并多个实例的日志
        merge_logs: true,
        // 是否隐藏日志图例
        no_legend: true,
        // 日志文件时间格式，当前为空
        log_date_format: '',
        // 开发环境配置
        env_development: {
            PORT: DEV_PORT,
            IP: DEV_IP,
            NODE_ENV: "development"
        },
        // 生产环境配置
        env_production: {
            PORT: PORT,
            IP: IP,
            NODE_ENV: "production"
        }
    }]
}