/**
 * @name authMiddleware
 * @description JWT认证中间件
 * @author AI
 * @date 2025-12-22
 * @copyright dbxiao@foxmail.com. All rights reserved.
 */

import { Request, Response, NextFunction } from 'express';
import { verifyToken, JwtPayload } from '@widget/libs/jwt';

// 扩展Express请求接口，添加user属性
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

/**
 * @name authMiddleware
 * @description JWT认证中间件，支持从cookie和Authorization header中获取token
 * @param req 请求对象
 * @param res 响应对象
 * @param next 下一个中间件
 * @returns 无
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // 优先从cookie中获取token
  let token = req.cookies?.token;
  
  // 如果cookie中没有token，尝试从Authorization header中获取
  if (!token) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      res.status(401).json({ code: 401, message: '未提供认证令牌' });
      return;
    }
    
    // 提取令牌（Bearer token格式）
    token = authHeader.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ code: 401, message: '无效的认证令牌格式' });
      return;
    }
  }
  
  // 验证令牌
  const result = verifyToken(token);
  
  if (!result) {
    res.status(401).json({ code: 401, message: '无效的认证令牌' });
    return;
  }
  
  // 将解码后的用户信息添加到请求对象中
  req.user = result.user;
  
  // 继续处理请求
  next();
};