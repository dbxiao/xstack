/**
 * @name userManager
 * @description 用户管理平台，包括用户列表、用户详情、用户权限等功能
 * @date 2025-08-10
 * @copyright dbxiao#foxmail.com
 */

import { insert, select, update, deleteData } from '@database/comm/sqlQuery'
import { Code } from '@plugin/constant/code'
import { error, info } from '@plugin/libs'

/**
 * @name createUser
 * @description 创建新用户
 * @param req 请求对象，包含用户信息
 * @param res 响应对象
 * @returns 响应结果
 */
export const createUser = async (req: any, res: any) => {
    try {
        const { username, password, email, real_name, phone, status, avatar_url, birthdate, gender } = req.body;
        info('创建用户', req.body)
        // 验证必填字段
        if (!username || !password || !email) {
            return res.json(Code[1000]);
        }

        // 准备插入数据
        const userData = {
            username,
            password,
            email,
            real_name,
            phone,
            status: status !== undefined ? status : 1, // 默认启用
            avatar_url,
            birthdate,
            gender: gender !== undefined ? gender : 0 // 默认未知
        };

        // 插入数据
        const result = await insert('users', userData);

        // 检查结果
        if (!result || result.affectedRows === 0) {
            return res.json({
                code: 1005,
                msg: '创建用户失败'
            });
        }

        // 返回成功响应
        return res.json({
            code: 0,
            msg: '创建用户成功',
            data: {
                id: result.insertId,
                ...userData
            }
        });
    } catch (err) {
        error('创建用户失败:', err);
        return res.json(Code[500]);
    }
};

/**
 * @name getUser
 * @description 查询用户
 * @param req 请求对象，包含查询条件
 * @param res 响应对象
 * @returns 响应结果
 */
export const getUser = async (req: any, res: any) => {
    try {
        const { id, username, email, status, page = 1, pageSize = 10 } = req?.query || {};

        console.error(11111111, req.query)

        // 构建查询条件
        const where: { [key: string]: any } = {};
        if (id) where.id = id;
        if (username) where.username = username;
        if (email) where.email = email;
        if (status !== undefined) where.status = status;

        // 计算分页
        const offset = (Number(page)) * Number(pageSize);
        const limit = { offset, count: Number(pageSize) };

        // 查询用户
        const users = await select('users', ['*'], where, { id: 'DESC' }, limit);

        // 查询总数
        const totalResult = await select('users', ['COUNT(*) as total'], where);
        const total = totalResult[0]?.total || 0;

        // 返回结果
        return res.json({
            code: 0,
            msg: '查询成功',
            data: {
                list: users,
                pagination: {
                    total,
                    page: Number(page),
                    pageSize: Number(pageSize)
                }
            }
        });
    } catch (err) {
        error('查询用户失败:', err);
        return res.json(Code[500]);
    }
};

/**
 * @name updateUser
 * @description 更新用户
 * @param req 请求对象，包含用户ID和更新信息
 * @param res 响应对象
 * @returns 响应结果
 */
export const updateUser = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const { username, password, email, real_name, phone, status, avatar_url, birthdate, gender } = req.body;

        // 验证ID
        if (!id) {
            return res.json({
                code: 1006,
                msg: '用户ID不能为空'
            });
        }

        // 准备更新数据
        const updateData: { [key: string]: any } = {};
        if (username !== undefined) updateData.username = username;
        if (password !== undefined) updateData.password = password;
        if (email !== undefined) updateData.email = email;
        if (real_name !== undefined) updateData.real_name = real_name;
        if (phone !== undefined) updateData.phone = phone;
        if (status !== undefined) updateData.status = status;
        if (avatar_url !== undefined) updateData.avatar_url = avatar_url;
        if (birthdate !== undefined) updateData.birthdate = birthdate;
        if (gender !== undefined) updateData.gender = gender;

        // 验证是否有更新数据
        if (Object.keys(updateData).length === 0) {
            return res.json({
                code: 1007,
                msg: '没有需要更新的数据'
            });
        }

        // 更新用户
        const result = await update('users', updateData, { id });

        // 检查结果
        if (!result || result.affectedRows === 0) {
            return res.json({
                code: 1008,
                msg: '更新用户失败，未找到该用户或数据未变更'
            });
        }

        // 返回成功响应
        return res.json({
            code: 0,
            msg: '更新用户成功'
        });
    } catch (err) {
        error('更新用户失败:', err);
        return res.json(Code[500]);
    }
};

/**
 * @name deleteUser
 * @description 删除用户
 * @param req 请求对象，包含用户ID
 * @param res 响应对象
 * @returns 响应结果
 */
export const deleteUser = async (req: any, res: any) => {
    try {
        const { id } = req.params;

        // 验证ID
        if (!id) {
            return res.json({
                code: 1006,
                msg: '用户ID不能为空'
            });
        }

        // 删除用户
        const result = await deleteData('users', { id });

        // 检查结果
        if (!result || result.affectedRows === 0) {
            return res.json({
                code: 1009,
                msg: '删除用户失败，未找到该用户'
            });
        }

        // 返回成功响应
        return res.json({
            code: 0,
            msg: '删除用户成功'
        });
    } catch (err) {
        error('删除用户失败:', err);
        return res.json(Code[500]);
    }
};