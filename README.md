# Overview

![xStack](https://avatars.githubusercontent.com/u/155172281?s=48&v=4)

## About XStack

XStack 是一个轻量级web服务，使用express、ejs、typescript、pm2构建项目。我们的目标是将XStack定义为全栈公共web服务，可以适用于多种前端场景，包括但不限于：Web SSR服务、微服务、代理转发、CDN等。
XStack作为公共Web服务，不限于任何前端框架，你可以使用React、Vue、JQuery或者其他任何项目构建，遵循XStack部署规则即可。
项目质量：使用cypress进行代码UT

## Features

- 基础功能
  - [x] HTTPS支持
  - [x] 路由管理
  - [x] 代理管理
  - [ ] React SSR、VUE SSR
  - [ ] 微服务
  - [x] 403、404、500公共页面预留
  - [ ] 运行环境支持
  - [x] EJS
  - [ ] CDN服务
- 开发调试
  - [x] 浏览器inspect调试（node启动）
  - [x] 开发环境调试（PM2启动）
  - [x] 生产环境模拟调试（PM2启动）
  - [x] 热更新（热加载）
  - [x] Typescript sourcemap支持
- 性能服务
  - [x] gzip
  - [ ] 静态资源强缓存
  - [ ] 静态资源协商缓存
- 监控服务
  - [x] 运行监控
  - [ ] 性能监控
  - [ ] 错误监控
  - [ ] 日志监控
- 日志服务
  - [x] 日志打印（log、error、warn）
  - [ ] 日志远程查看
  - [ ] 日志远程分析
- 持久化存储
  - [x] 数据库连接（Mysql\MariaDB）
  - [x] 数据库连接（PostgresSql）
  - [x] 数据库（Redis）
- 安全
  - [ ] 安全防护（CSRF、XSS、SQL注入）
  - [ ] 安全防护（JWT、RSA、AES）
- 部署
  - [ ] Docker部署
  - [ ] Kubernetes部署
  - [ ] 私有化部署 - 单机部署
  - [ ] 私有化部署 - 集群部署
- 运维
  - [ ] 自动重启（PM2）
  - [ ] 单机部署
  - [ ] 集群部署
  - [ ] 运行监控

## 开发文档

### 本地运行

- bun（推荐）

```
bun install
bun run dev
```

- node

```
npm install
npm run dev
```

- pnpm

```
pnpm install
pnpm run dev
```



### MariaDB 安装和使用

#### 安装Brew 
- 安装
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

> 官网：https://mariadb.org/

#### 安装Mariadb


```bash
brew install mariadb
```

- 启动
```bash
mysql.server start
```
- 命令
```bash
mysql.server  start|stop|restart|reload|force-reload|status|configtest|bootstrap
```

- 更新MariaDB
```bash
brew upgrade mariadb
```

#### 数据库使用

```bash
-- 登陆数据库
mysql -u root -p12345678;
SHOW DATABASES;
SHOW TABLES;

-- 使用数据库
use 数据库名;

-- 查询当前数据库所有表
SHOW TABLES;

-- 查询指定数据库的所有表
SHOW TABLES FROM 数据库名;

-- 查询表结构
DESCRIBE 表名;
```


