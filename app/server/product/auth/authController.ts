/**
 * @name authController
 * @description 认证控制器，处理用户登录、注册和登出
 * @author AI
 * @date 2025-12-22
 * @copyright dbxiao@foxmail.com. All rights reserved.
 */

import { Request, Response } from 'express'
import { getUserByEmail, getUserByUsername, createUser } from '@database/product/userDB'
import { generateToken } from '@widget/libs/jwt'
import { sha256 } from '@widget/libs/hash'
import { Code } from '@widget/constant/code'

/**
 * @name login
 * @description 用户登录
 * @param req 请求对象
 * @param res 响应对象
 * @returns 登录结果
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    // 验证请求参数
    if (!email || !password) {
      res.status(400).json(Code[4001]);
      return;
    }
    
    // 根据邮箱获取用户信息
    const user = await getUserByEmail(email);
    
    if (!user) {
      res.status(401).json(Code[4010]);
      return;
    }
    
    // 验证密码（使用sha256加密）
    const hashedPassword = sha256(password);
    if (user.password !== hashedPassword) {
      res.status(401).json(Code[4010]);
      return;
    }
    
    // 验证用户状态
    if (user.status !== 1) {
      res.status(403).json(Code[4030]);
      return;
    }
    
    // 生成JWT令牌
    const token = generateToken({
      userId: user.id,
      email: user.email,
      username: user.username
    });
    
    // 准备用户基本信息
    const userInfo = {
      username: user.username,
      gender: user.gender
    };
    
    // 将token和用户信息设置到cookie中
    res.cookie('u_token', token, {
      httpOnly: true, // 防止XSS攻击
      maxAge: 24 * 60 * 60 * 1000, // 24小时过期
      sameSite: 'strict' // 防止CSRF攻击
    }).cookie('u_info', JSON.stringify(userInfo), {
      maxAge: 24 * 60 * 60 * 1000, // 24小时过期
      sameSite: 'strict' // 防止CSRF攻击
    }).status(200).json({
      ...Code[0],
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          real_name: user.real_name,
          phone: user.phone,
          avatar_url: user.avatar_url,
          birthdate: user.birthdate,
          gender: user.gender
        }
      }
    });
  } catch (error) {
    console.error('登录失败:', error);
    res.status(500).json(Code[500]);
  }
};

/**
 * @name register
 * @description 用户注册
 * @param req 请求对象
 * @param res 响应对象
 * @returns 注册结果
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    
    // 验证请求参数
    if (!username || !email || !password || !confirmPassword) {
      res.status(400).json(Code[4002]);
      return;
    }
    
    // 验证密码一致性
    if (password !== confirmPassword) {
      res.status(400).json(Code[4003]);
      return;
    }
    
    // 验证密码长度
    if (password.length < 6) {
      res.status(400).json(Code[4004]);
      return;
    }
    
    // 检查邮箱是否已存在
    const userInfo = await getUserByEmail(email);
    if (userInfo && userInfo.email) {
      res.status(400).json(Code[4005]);
      return;
    }
    
    // 检查用户名是否已存在
    const existingUserByUsername = await getUserByUsername(username);
    if (existingUserByUsername) {
      res.status(400).json(Code[4006]);
      return;
    }
    
    // 加密密码
    const hashedPassword = sha256(password);
    
    // 创建用户
    const result = await createUser({
      username,
      email,
      password: hashedPassword
    });

    if (result.affectedRows > 0) {
      res.status(200).json({
        ...Code[0],
        data: {
          id: result.insertId
        }
      }).end()
    }
  } catch (error) {
    console.error('注册失败:', error);
    res.status(500).json(Code[500]);
  }
};

/**
 * @name logout
 * @description 用户登出，清除cookie中的token和用户信息
 * @param req 请求对象
 * @param res 响应对象
 * @returns 登出结果
 */
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    // 清除cookie中的token和用户信息
    res.clearCookie('uToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    }).clearCookie('uInfo', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    
    // 返回登出成功
    res.status(200).json({
      code: Code[0].code,
      message: '登出成功'
    });
  } catch (error) {
    console.error('登出失败:', error);
    res.status(500).json(Code[500]);
  }
};