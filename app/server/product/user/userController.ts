/**
 * @name userController
 * @description 用户信息控制器，处理用户信息相关请求
 * @author AI
 * @date 2025-12-22
 * @copyright dbxiao@foxmail.com. All rights reserved.
 */

import { Request, Response } from 'express';
import { getUserById, updateUser, getUserByEmail } from '@database/product/userDB';
import { authMiddleware } from '@widget/middleware/authMiddleware';
import { sha256 } from '@widget/libs/hash';

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
        gender: user.gender,
        theme: user.theme,
        font_size: user.font_size
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

/**
 * @name changePassword
 * @description 修改用户密码
 * @param req 请求对象
 * @param res 响应对象
 * @returns 修改结果
 */
export const changePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    // 从请求对象中获取用户信息（由authMiddleware添加）
    if (!req.user) {
      res.status(401).json({ code: 401, message: '用户未认证' });
      return;
    }
    
    // 获取请求参数
    const { oldPassword, newPassword, confirmPassword } = req.body;
    
    // 验证请求参数
    if (!oldPassword || !newPassword || !confirmPassword) {
      res.status(400).json({ code: 400, message: '旧密码、新密码和确认密码不能为空' });
      return;
    }
    
    // 验证新密码与确认密码是否一致
    if (newPassword !== confirmPassword) {
      res.status(400).json({ code: 400, message: '新密码与确认密码不一致' });
      return;
    }
    
    // 验证新密码长度
    if (newPassword.length < 6) {
      res.status(400).json({ code: 400, message: '新密码长度不能少于6位' });
      return;
    }
    
    // 根据用户ID获取详细信息
    const user = await getUserById(req.user.userId);
    
    if (!user) {
      res.status(404).json({ code: 404, message: '用户不存在' });
      return;
    }
    
    // 验证旧密码是否正确
    const hashedOldPassword = sha256(oldPassword);
    if (user.password !== hashedOldPassword) {
      res.status(401).json({ code: 401, message: '旧密码错误' });
      return;
    }
    
    // 加密新密码
    const hashedNewPassword = sha256(newPassword);
    
    // 更新密码
    await updateUser(req.user.userId, { password: hashedNewPassword });
    
    // 返回修改结果
    res.status(200).json({
      code: 200,
      message: '密码修改成功'
    });
  } catch (error) {
    console.error('修改密码失败:', error);
    res.status(500).json({ code: 500, message: '修改密码失败，请稍后重试' });
  }
};

/**
 * @name changeEmail
 * @description 修改用户邮箱
 * @param req 请求对象
 * @param res 响应对象
 * @returns 修改结果
 */
export const changeEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    // 从请求对象中获取用户信息（由authMiddleware添加）
    if (!req.user) {
      res.status(401).json({ code: 401, message: '用户未认证' });
      return;
    }
    
    // 获取请求参数
    const { password, newEmail } = req.body;
    
    // 验证请求参数
    if (!password || !newEmail) {
      res.status(400).json({ code: 400, message: '密码和新邮箱不能为空' });
      return;
    }
    
    // 验证新邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      res.status(400).json({ code: 400, message: '邮箱格式不正确' });
      return;
    }
    
    // 根据用户ID获取详细信息
    const user = await getUserById(req.user.userId);
    
    if (!user) {
      res.status(404).json({ code: 404, message: '用户不存在' });
      return;
    }
    
    // 验证密码是否正确
    const hashedPassword = sha256(password);
    if (user.password !== hashedPassword) {
      res.status(401).json({ code: 401, message: '密码错误' });
      return;
    }
    
    // 检查新邮箱是否已被使用
    const existingUser = await getUserByEmail(newEmail);
    if (existingUser && existingUser.id !== req.user.userId) {
      res.status(400).json({ code: 400, message: '该邮箱已被使用' });
      return;
    }
    
    // 更新邮箱
    await updateUser(req.user.userId, { email: newEmail });
    
    // 返回修改结果
    res.status(200).json({
      code: 200,
      message: '邮箱修改成功'
    });
  } catch (error) {
    console.error('修改邮箱失败:', error);
    res.status(500).json({ code: 500, message: '修改邮箱失败，请稍后重试' });
  }
};

/**
 * @name saveThemeSettings
 * @description 保存主题设置
 * @param req 请求对象
 * @param res 响应对象
 * @returns 保存结果
 */
export const saveThemeSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    // 从请求对象中获取用户信息（由authMiddleware添加）
    if (!req.user) {
      res.status(401).json({ code: 401, message: '用户未认证' });
      return;
    }
    
    // 获取请求参数
    const { theme, fontSize } = req.body;
    
    // 验证请求参数
    if (theme && !['light', 'dark'].includes(theme)) {
      res.status(400).json({ code: 400, message: '主题设置无效' });
      return;
    }
    
    if (fontSize && !['compact', 'standard', 'large'].includes(fontSize)) {
      res.status(400).json({ code: 400, message: '字体大小设置无效' });
      return;
    }
    
    // 构建更新数据
    const updateData: any = {};
    if (theme) updateData.theme = theme;
    if (fontSize) updateData.font_size = fontSize;
    
    // 更新用户主题设置
    await updateUser(req.user.userId, updateData);
    
    // 返回保存结果
    res.status(200).json({
      code: 200,
      message: '主题设置保存成功'
    });
  } catch (error) {
    console.error('保存主题设置失败:', error);
    res.status(500).json({ code: 500, message: '保存主题设置失败，请稍后重试' });
  }
};
