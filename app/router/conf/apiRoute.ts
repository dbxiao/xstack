/**
 * @name apiRoute
 * @author dbxiao@msn.cn
 * @description Maps API routes to their respective server handlers.
 * @copyright dbxiao@msn.cn All rights reserved.
 */
import { RouterMapsProps } from '../types'
import { createUser, getUsers, updateUser, deleteUser } from '@server/product/xmanager/user/userManager'
import { login, register, logout } from '@server/product/auth/authController'
import { getUserInfo, updateUserInfo, changePassword, changeEmail, saveThemeSettings } from '@server/product/user/userController'
import test from '@server/product/test'

export const apiRoute: RouterMapsProps[] = [
    {
        'path': '/',
        'view': '../res/libsx',
    },
    // 认证接口
    {
        'path': '/api/auth/login',
        'server': login
    },
    // 注册接口
    {
        'path': '/api/auth/register',
        'server': register
    },
    // 登出接口
    {
        'path': '/api/auth/logout',
        'server': logout
    },
    // 用户信息接口
    {
        'path': '/api/user/info',
        'server': getUserInfo
    },
    {
        'path': '/api/user/info',
        'server': updateUserInfo
    },
    // 修改密码接口
    {
        'path': '/api/user/password',
        'server': changePassword
    },
    // 修改邮箱接口
    {
        'path': '/api/user/email',
        'server': changeEmail
    },
    // 主题设置接口
    {
        'path': '/api/user/theme',
        'server': saveThemeSettings
    },
    // 用户管理接口
    {
        'path': '/api/users/createUser',
        'server': createUser
    },
    {
        'path': '/api/users/getUsers',
        'server': getUsers
    },
    {
        'path': '/api/users/updateUser/:id',
        'server': updateUser
    },
    {
        'path': '/api/users/deleteUser/:id',
        'server': deleteUser
    }
]