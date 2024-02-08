# Overview

![example workflow](https://github.com/github/docs/actions/workflows/main.yml/badge.svg)

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

