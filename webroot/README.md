# XStack 公司官网

这是XStack公司的官方网站，展示了公司的AI化未来愿景、服务内容和技术优势。

## 项目结构

```
webroot/
├── res/                # 资源文件
│   ├── css/            # 样式文件
│   │   └── style.css   # 主样式表
│   ├── js/             # JavaScript文件
│   │   └── main.js     # 主脚本文件
│   └── images/         # 图片资源
│       ├── hero-bg.svg # 英雄区背景
│       ├── about-us.svg # 关于我们图片
│       ├── case1.svg   # 案例公司1 Logo
│       ├── case2.svg   # 案例公司2 Logo
│       ├── case3.svg   # 案例公司3 Logo
│       └── icons.svg   # 图标集合
└── view/               # HTML视图文件
    ├── index.html      # 主页
    ├── 403.html        # 403错误页
    ├── 404.html        # 404错误页
    └── 500.html        # 500错误页
```

## 功能特点

- 响应式设计，适配各种设备尺寸
- 现代化UI界面，展示公司专业形象
- 交互式元素，提升用户体验
- 完整的公司介绍、服务内容、技术优势和联系方式

## 运行方式

### 本地开发

1. 克隆仓库到本地
2. 进入项目目录
3. 使用任意HTTP服务器启动项目

```bash
# 使用Python启动简易HTTP服务器
cd /Users/xiaoxiao72/Develop/dbxiao/autobyte/xstack
python -m http.server 8080
```

然后在浏览器中访问 `http://localhost:8080/webroot/view/index.html`

### 部署到生产环境

1. 将整个`webroot`目录上传到Web服务器
2. 配置Web服务器将根路径指向`webroot/view/index.html`

## 技术栈

- HTML5
- CSS3
- JavaScript (原生，无框架)

## 浏览器兼容性

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 未来计划

- 添加多语言支持
- 集成博客系统
- 添加客户案例详情页
- 实现在线演示功能

## 联系方式

- 电子邮件: contact@xstack.ai
- 电话: 400-888-XXXX
- 地址: 北京市海淀区中关村科技园区8号楼