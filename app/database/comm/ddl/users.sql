-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
    -- 用户 ID，自增主键
    id INT AUTO_INCREMENT PRIMARY KEY,
    -- 用户名，唯一且不能为空
    username VARCHAR(50) UNIQUE NOT NULL,
    -- 密码，不能为空
    password VARCHAR(255) NOT NULL,
    -- 邮箱，唯一且不能为空
    email VARCHAR(100) UNIQUE NOT NULL,
    -- 真实姓名
    real_name VARCHAR(100),
    -- 手机号
    phone VARCHAR(20),
    -- 用户状态，0 表示禁用，1 表示启用，默认启用
    status TINYINT DEFAULT 1,
    -- 创建时间，默认当前时间
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- 更新时间，默认当前时间，且在更新时自动更新
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- 头像 URL
    avatar_url VARCHAR(255),
    -- 出生日期
    birthdate DATE,
    -- 性别，0 表示未知，1 表示男性，2 表示女性
    gender TINYINT DEFAULT 0
);