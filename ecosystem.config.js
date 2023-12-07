/**
 * @author dbxiao@foxmail.com
 * @description PM2 configuration, with default configuration for development, staging and production environments. 
 * You can also add new test or other environments. See the start command in package.json -> script -> dev or prod.
 */

require('dotenv').config()
const serverConf = require('./config/server.conf')
const { PM2_WATCH = 'false', PM2_INSTANCES } = process.env
const { DEV_IP, DEV_PORT, IP, PORT } = serverConf

module.exports = {
    apps: [
        {
            // 名称
            name: 'xstack',
            // 应用程序目录
            cwd: './',
            // 启动入口
            script: './dist/app/app.js',
            // 最大启动数
            instances: PM2_INSTANCES,
            // 启动形态
            exec_mode: 'cluster',
            // 观察模式
            watch: JSON.parse(PM2_WATCH),
            // 观察延迟
            watch_delay: 2000,
            // 不用监听的文件
            ignore_watch: [
                'node_modules',
                'temp',
                'logs',
                'upload',
                'di-deploy',
                '.git'
            ],
            // 禁用自动重启代码
            stop_exit_codes: [0],
            // 最大内存阈值自动重载
            max_memory_restart: '100M',
            // 内存最大可分配
            node_args: "--max-old-space-size=2048",
            // 日志
            error_file: './logs/app-err.log',
            out_file: './logs/app-out.log',
            log_file: './logs/app-log.log',
            pid_file: './logs/app-pid.log',
            // 设置追加日志而不是新建日志
            merge_logs: true,
            no_legend: true,
            // 指定日志文件的时间格式
            log_date_format: '',

            // 开发环境: npx pm2 start ./dist/ecosystem.config.js --env development
            env_development: {
                PORT: DEV_PORT,
                IP: DEV_IP,
                NODE_ENV: "development"
            },

            // 生产环境: npx pm2 start ./dist/ecosystem.config.js --env production
            env_production: {
                PORT: 80,
                IP: '0.0.0.0',
                NODE_ENV: "production"
            }
        }
    ]
}
