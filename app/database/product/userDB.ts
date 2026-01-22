/**
 * @name userDB
 * @description 用户数据库操作
 * @author AI
 * @date 2025-12-22
 * @copyright dbxiao@foxmail.com. All rights reserved.
 */

import { select, insert, update } from '@database/comm/sqlQuery';

// 用户表名
const TABLE_NAME = 'users';

// 用户信息接口
export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  real_name?: string;
  phone?: string;
  status: number;
  avatar_url?: string;
  birthdate?: Date;
  gender: number;
  theme: string;
  font_size: string;
  created_at: Date;
  updated_at: Date;
}

// 创建用户接口
export interface CreateUser {
  username: string;
  password: string;
  email: string;
  real_name?: string;
  phone?: string;
  status?: number;
  avatar_url?: string;
  birthdate?: Date;
  gender?: number;
}

// 更新用户接口
export interface UpdateUser {
  username?: string;
  password?: string;
  email?: string;
  real_name?: string;
  phone?: string;
  status?: number;
  avatar_url?: string;
  birthdate?: Date;
  gender?: number;
  theme?: string;
  font_size?: string;
}

/**
 * @name getUserByEmail
 * @description 根据邮箱获取用户信息
 * @param email 邮箱
 * @returns 用户信息
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await select(TABLE_NAME, ['*'], { email });
  return result.length > 0 ? result[0] as User : null;
}

/**
 * @name getUserByUsername
 * @description 根据用户名获取用户信息
 * @param username 用户名
 * @returns 用户信息
 */
export async function getUserByUsername(username: string): Promise<User | null> {
  const result = await select(TABLE_NAME, ['*'], { username });
  return result.length > 0 ? result[0] as User : null;
}

/**
 * @name getUserById
 * @description 根据ID获取用户信息
 * @param id 用户ID
 * @returns 用户信息
 */
export async function getUserById(id: number): Promise<User | null> {
  const result = await select(TABLE_NAME, ['*'], { id });
  return result.length > 0 ? result[0] as User : null;
}

/**
 * @name createUser
 * @description 创建用户
 * @param user 用户信息
 * @returns 创建结果
 */
export async function createUser(user: CreateUser) {
  // 设置默认值
  const defaultUser: CreateUser = {
    status: 1,
    gender: 0,
    ...user
  };
  
  return await insert(TABLE_NAME, defaultUser);
}

/**
 * @name updateUser
 * @description 更新用户信息
 * @param id 用户ID
 * @param user 用户信息
 * @returns 更新结果
 */
export async function updateUser(id: number, user: UpdateUser) {
  return await update(TABLE_NAME, user, { id });
}

/**
 * @name getUsers
 * @description 获取用户列表
 * @param offset 偏移量
 * @param limit 限制数量
 * @returns 用户列表
 */
export async function getUsers(offset: number = 0, limit: number = 10) {
  return await select(TABLE_NAME, ['*'], undefined, { created_at: 'DESC' }, { offset, count: limit });
}
