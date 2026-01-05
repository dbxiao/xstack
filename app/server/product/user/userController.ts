/**
 * @name userController
 * @description 用户信息控制器，处理用户信息相关请求
 * @author AI
 * @date 2025-12-22
 * @copyright dbxiao@foxmail.com. All rights reserved.
 */

import { Request, Response } from 'express';
import { getUserById, updateUser } from '@database/product/userDB';
import { authMiddleware } from '@widget/middleware/authMiddleware';

/**
 * @name getUserInfo
 * @description 获取当前用户信息
 * @param req 请求对象
 * @param res 响应对象
 * @returns 用户信息
 */
export const getUserInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    // 从请求对象中获取用户信息（由authMiddleware添加）
    if (!req.user) {
      res.status(401).json({ code: 401, message: '用户未认证' });
      return;
    }
    
    // 根据用户ID获取详细信息
    const user = await getUserById(req.user.userId);
    
    if (!user) {
      res.status(404).json({ code: 404, message: '用户不存在' });
      return;
    }
    
    // 返回用户信息（不包含密码等敏感信息）
    res.status(200).json({
      code: 200,
      message: '获取用户信息成功',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        real_name: user.real_name,
        phone: user.phone,
        avatar_url: user.avatar_url,
        birthdate: user.birthdate,
        gender: user.gender
      }
    });
  } catch (error) {
    console.error('获取用户信息失败:', error);
    res.status(500).json({ code: 500, message: '获取用户信息失败，请稍后重试' });
  }
};

/**
 * @name updateUserInfo
 * @description 更新当前用户信息
 * @param req 请求对象
 * @param res 响应对象
 * @returns 更新结果
 */
export const updateUserInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    // 从请求对象中获取用户信息（由authMiddleware添加）
    if (!req.user) {
      res.status(401).json({ code: 401, message: '用户未认证' });
      return;
    }
    
    // 获取要更新的用户信息
    const updateData = req.body;
    
    // 更新用户信息
    await updateUser(req.user.userId, updateData);
    
    // 返回更新结果
    res.status(200).json({
      code: 200,
      message: '更新用户信息成功'
    });
  } catch (error) {
    console.error('更新用户信息失败:', error);
    res.status(500).json({ code: 500, message: '更新用户信息失败，请稍后重试' });
  }
};
