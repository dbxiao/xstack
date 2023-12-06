require('dotenv').config()
const { PM2_WATCH, PM2_INSTANCES } = process.env

module.exports = {
    apps: [
        {
            // 名称
            name: 'web-server',
            // 应用程序目录
            cwd: './',
            // 启动入口
            script: "./dist/app/app.js",
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

            // 开发环境: pm2 start app.js --env_dev
            env_development: {
                PORT: 8000,
                IP: '127.0.0.1',
                NODE_ENV: "development"
            },
            // 测试环境
            env_test: {
                PORT: 9000,
                IP: '127.0.0.1',
                NODE_ENV: "test"
            },
            // 预发布环境 (sudo)
            env_staging: {
                PORT: 80,
                IP: '0.0.0.0',
                NODE_ENV: "staging"
            },
            // 生产环境 (sudo)
            env_production: {
                PORT: 80,
                IP: '0.0.0.0',
                NODE_ENV: "production"
            }
        }
    ]
}