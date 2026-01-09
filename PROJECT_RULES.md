# 后端项目开发规范

> **📌 本文档是后端项目的特定规范**  
> 公共规则请参考：`../.rules/project_rules.md`  
> 本文档仅包含后端（Node.js + Express + TypeScript）特定的开发规范

## 技术栈

- **Node.js**: 运行时环境
- **Express**: 4.18.2 - Web 框架
- **TypeScript**: 5.1.6 - 类型系统
- **MariaDB**: 3.4.4 - 数据库
- **MySQL2**: 3.6.5 - MySQL 驱动
- **Redis**: 4.6.11 - 缓存
- **JWT**: 9.0.3 - 认证令牌
- **PM2**: 5.3.0 - 进程管理

## 目录规范

```
app/
├── database/            # 数据库目录
│   ├── comm/            # 数据库公共目录
│   │   ├── conf/        # 数据库配置目录
│   │   └── sqlQuery.ts  # 统一数据库操作方法
│   ├── ddl/             # 数据库DDL定义目录
│   └── product/         # 产品数据库目录
│       ├── userDB.ts    # 用户数据库操作
│       └── ...
├── widget/              # 工具和中间件目录
│   ├── constant/        # 常量定义目录
│   │   ├── code.ts      # 全局错误码集合（重要：统一管理所有 API 错误码）
│   │   └── index.ts     # 常量模块的入口文件
│   ├── libs/            # 工具库目录
│   │   ├── jwt.ts       # JWT 生成和验证工具
│   │   ├── console.ts   # 自定义控制台日志输出工具
│   │   ├── hash.ts      # 哈希相关工具函数
│   │   ├── net.ts       # 网络相关工具函数
│   │   ├── util.ts      # 通用工具函数
│   │   └── index.ts     # 工具库模块的入口文件
│   └── middleware/      # 中间件目录
│       └── authMiddleware.ts  # JWT 认证中间件（保护受限路由）
├── router/              # 路由目录
│   ├── conf/            # 路由配置目录
│   │   ├── apiRoute.ts  # API 路由配置
│   │   ├── default.ts   # 默认路由配置文件
│   │   └── routerMaps.ts# 路由映射表配置文件（重要：所有路由都在此定义）
│   ├── index.ts         # 路由主入口文件
│   ├── router.ts        # 路由中间件实现文件（请求匹配和路由分发）
│   └── types.ts         # 路由相关类型定义文件
├── server/              # 服务器逻辑目录
│   ├── comm/            # 通用业务逻辑目录
│   │   ├── account.js   # 账户相关业务逻辑
│   │   ├── oa.js        # 企业 IT 智能网关
│   │   ├── restAPI.js   # RESTful API 管理
│   │   └── readme.md    # 通用业务说明文档
│   └── product/         # 具体业务模块目录
│       ├── base/        # 基础业务模块
│       ├── auth/        # 认证模块（登录、注册、密码重置等）
│       │   ├── authController.ts  # 认证控制器
│       │   └── ...
│       ├── user/        # 用户管理模块
│       │   ├── userController.ts  # 用户控制器
│       │   └── ...
│       └── xmanager/    # 管理模块
├── app.ts               # 程序入口文件
└── config/
    └── server.conf.ts    # 服务器配置文件
```

## 后端特定规范

### 1. 模块别名规范

**强制要求**：必须使用配置的模块别名，禁止使用相对路径。

- `@database` - 数据库相关模块
- `@router` - 路由相关模块
- `@server` - 服务器逻辑模块
- `@widget` - 工具和中间件模块
- `@config` - 配置文件模块

**正确示例**：
```typescript
import { getUserById } from '@database/product/userDB';
import { Code } from '@widget/constant/code';
```

**错误示例**：
```typescript
import { getUserById } from '../../../database/product/userDB'; // ❌
```

### 2. Express 路由规范

#### 2.1 路由定义

- 路由配置统一在 `app/router/conf/routerMaps.ts` 中管理
- 路由路径必须使用小写字母，采用驼峰命名法或短横线分隔
- RESTful API 路由遵循 REST 规范

#### 2.2 路由处理

- 控制器函数必须使用 `async/await` 处理异步操作
- 必须处理所有可能的错误情况
- 使用统一的错误码返回错误信息

#### 2.3 中间件使用

- 认证中间件统一使用 `@widget/middleware/authMiddleware`
- 日志中间件统一使用 `@widget/libs` 中的日志工具
- 自定义中间件放在 `app/widget/middleware` 目录

### 3. 数据库操作规范

#### 3.1 数据库操作

- **强制要求**：统一使用 `@database/comm/sqlQuery` 提供的数据库操作方法
- 禁止直接使用数据库连接对象
- 所有数据库操作必须使用事务（如需要）

#### 3.2 SQL 安全

- **强制要求**：禁止拼接 SQL 语句，必须使用参数化查询
- 所有用户输入必须进行验证和转义
- 敏感操作必须记录日志

#### 3.3 数据库文件组织

- 数据库操作文件放在 `app/database/product` 目录
- 文件命名格式：`模块名DB.ts`，如 `userDB.ts`
- 每个数据库操作函数必须添加完整的注释

### 4. API 响应格式规范

#### 4.1 成功响应

```typescript
{
  code: 0,
  message: '操作成功',
  data: { ... }
}
```

#### 4.2 错误响应

```typescript
{
  code: 错误码,
  message: '错误信息',
  data: null
}
```

#### 4.3 错误码管理

- **强制要求**：统一使用 `@widget/constant/code` 中定义的错误码
- 新增错误码必须在 `code.ts` 中定义
- 错误码必须唯一且有明确含义

### 5. 安全规范

#### 5.1 认证授权

- 使用 JWT 进行用户认证
- 敏感接口必须使用认证中间件
- Token 必须设置合理的过期时间

#### 5.2 数据验证

- 所有用户输入必须进行验证
- 使用参数验证中间件（如 express-validator）
- 验证失败必须返回明确的错误信息

#### 5.3 密码安全

- 密码必须使用 SHA256 或更强的加密算法
- 禁止明文存储密码
- 使用 `@widget/libs/hash` 中的哈希函数

#### 5.4 SQL 注入防护

- **强制要求**：必须使用参数化查询
- **强制要求**：禁止拼接 SQL 语句
- 所有用户输入必须转义

### 6. 错误处理规范

#### 6.1 错误捕获

- 所有异步操作必须使用 try-catch 捕获错误
- 错误必须记录日志
- 错误信息必须友好，不暴露系统内部信息

#### 6.2 错误日志

- 使用 `@widget/libs` 中的日志工具记录错误
- 错误日志必须包含完整的错误堆栈
- 生产环境不输出详细错误信息给客户端

#### 6.3 错误响应

- 统一使用 `Code` 对象返回错误码
- HTTP 状态码与业务错误码分离
- 错误信息必须中文化

### 7. 性能优化规范

#### 7.1 数据库优化

- 合理使用数据库索引
- 避免 N+1 查询问题
- 使用连接池管理数据库连接

#### 7.2 缓存使用

- 合理使用 Redis 缓存
- 缓存键命名规范：`模块名:功能名:参数`
- 设置合理的缓存过期时间

#### 7.3 异步处理

- 耗时操作使用异步处理
- 使用消息队列处理批量任务（如适用）

### 8. TypeScript 使用规范（后端特定）

1. **类型定义位置**：
   - 类型定义统一放在对应模块的 `types.ts` 文件中
   - 路由类型定义在 `app/router/types.ts`

2. **模块别名**：
   - 必须使用配置的模块别名
   - 禁止使用相对路径 `../../../`

## 开发流程

### 创建新 API 接口

1. 在 `app/server/product` 目录下创建业务模块目录
2. 创建控制器文件（如 `userController.ts`）
3. 在 `app/database/product` 目录下创建数据库操作文件（如 `userDB.ts`）
4. 在 `app/router/conf/routerMaps.ts` 中配置路由
5. 在控制器中实现业务逻辑

### 创建数据库操作

1. 在 `app/database/product` 目录下创建数据库操作文件
2. 文件命名格式：`模块名DB.ts`
3. 使用 `@database/comm/sqlQuery` 提供的方法
4. 必须定义函数参数和返回值类型
5. 必须添加完整的注释（参考公共规则，包含 `@copyright`）

### 创建工具函数

1. 在 `app/widget/libs` 目录下创建工具文件
2. 文件使用小写驼峰命名
3. 必须定义函数参数和返回值类型
4. 必须添加完整的注释和使用示例（包含 `@copyright`）

## 代码示例

### 控制器示例

```typescript
/**
 * @name getUserInfo
 * @description 获取用户信息
 * @author AI
 * @date 2025-01-15
 * @copyright dbxiao@msn.cn. All rights reserved.
 * @param req 请求对象
 * @param res 响应对象
 * @returns 用户信息
 */
export const getUserInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      res.status(400).json(Code[4001]);
      return;
    }
    
    const user = await getUserById(Number(userId));
    
    if (!user) {
      res.status(404).json(Code[4040]);
      return;
    }
    
    res.status(200).json({
      ...Code[0],
      data: user
    });
  } catch (error) {
    console.error('获取用户信息失败:', error);
    res.status(500).json(Code[500]);
  }
};
```

### 数据库操作示例

```typescript
/**
 * @name getUserById
 * @description 根据ID获取用户信息
 * @author AI
 * @date 2025-01-15
 * @copyright dbxiao@msn.cn. All rights reserved.
 * @param id 用户ID
 * @returns 用户信息
 */
export const getUserById = async (id: number): Promise<User | null> => {
  const result = await select('users', { id });
  return result.length > 0 ? result[0] : null;
};
```

### 路由配置示例

```typescript
{
  path: '/api/user/:userId',
  method: 'GET',
  server: getUserInfo
}
```

## 数据库启动和连接

1. 数据库服务必须在应用启动前启动
2. 数据库连接必须使用配置文件中的参数
3. 必须使用连接池管理数据库连接
4. 数据库操作必须在异步函数中执行

### 本地数据库启动

- 启动
```bash
mysql.server start
```

### 数据库使用

```bash
--> 登陆数据库
mysql -u root -p12345678;
```

### 数据表

```bash

-- > 启动数据库
mysql.server start

-- > 登陆数据库
mysql -u root -p12345678;

-- > 显示所有数据库
SHOW DATABASES;

-- > 使用xmanager数据库
use xmanager;

-- > 显示xmanager数据库所有表
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| xmanager           |
+--------------------+

show tables;
-- > 
+--------------------+
| Tables_in_xmanager |
+--------------------+
| users              |
+--------------------+

```



## 注意事项

1. **模块别名**：必须使用配置的模块别名，禁止使用相对路径
2. **错误处理**：所有异步操作必须处理错误情况
3. **类型安全**：充分利用 TypeScript 类型系统，避免使用 `any`
4. **安全防护**：所有用户输入必须验证，防止 SQL 注入和 XSS 攻击
5. **代码复用**：相同逻辑必须抽取为工具函数或中间件
6. **日志记录**：重要操作必须记录日志
7. **性能优化**：合理使用缓存，避免不必要的数据库查询
8. **版权信息**：所有文件必须包含 `@copyright` 标签

---

**更多公共规范请参考：`../.rules/project_rules.md`**
