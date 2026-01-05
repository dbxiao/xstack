/**
 * @name jwt
 * @description JWT认证工具
 * @author AI
 * @date 2025-12-22
 * @copyright dbxiao@foxmail.com. All rights reserved.
 */

import jwt from 'jsonwebtoken';

// JWT配置
const JWT_CONFIG = {
  secret: process.env.JWT_SECRET, // 从环境变量获取密钥
  expiresIn: '24h', // 过期时间
};

// JWT Payload接口
export interface JwtPayload {
  userId: number;
  email: string;
  username: string;
  iat?: number;
  exp?: number;
}

/**
 * @name generateToken
 * @description 生成JWT令牌
 * @param payload JWT负载
 * @returns JWT令牌
 */
export function generateToken(payload: JwtPayload): string {
  if (!JWT_CONFIG.secret) {
    throw new Error('JWT_SECRET 未配置');
  }
  return jwt.sign(payload, JWT_CONFIG.secret as jwt.Secret, { expiresIn: JWT_CONFIG.expiresIn });
}

/**
 * @name verifyToken
 * @description 验证JWT令牌
 * @param token JWT令牌
 * @returns 验证结果
 */
export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_CONFIG.secret) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * @name decodeToken
 * @description 解码JWT令牌（不验证）
 * @param token JWT令牌
 * @returns 解码结果
 */
export function decodeToken(token: string): JwtPayload | null {
  const decoded = jwt.decode(token) as JwtPayload;
  return decoded;
}
