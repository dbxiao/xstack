# Overview

## About XStack

XStack 是一个轻量级web服务，使用express、ejs、typescript、pm2构建项目。我们的目标是将XStack定义为全栈公共web服务，可以适用于多种前端场景，包括但不限于：Web SSR服务、微服务、代理转发、CDN等。

XStack作为公共Web服务，不限于任何前端框架，你可以使用React、Vue、JQuery或者其他任何项目构建，遵循XStack部署规则即可。

项目质量：使用cypress进行代码UT


## Features

- 基础功能
  - [ ] HTTPS支持
  - [x] 路由管理
  - [x] 代理管理
  - [ ] React SSR、VUE SSR
  - [ ] 微服务
  - [ ] 403、404、500公共页面预留
  - [ ] 运行环境支持
  - [x] EJS
  - [ ] CDN服务
- 日志服务
  - [x] 日志打印（log、error、warn）
  - [ ] 日志远程查看
  - [ ] 日志远程分析
- 数据服务
  - [ ] 数据库（mysql）
  - [ ] 数据库（redis）
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

todo

