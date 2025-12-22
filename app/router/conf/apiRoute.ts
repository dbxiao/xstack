/**
 * @name apiRoute
 * @author dbxiao@msn.cn
 * @description Maps API routes to their respective server handlers.
 * @copyright dbxiao@msn.cn All rights reserved.
 */
import { RouterMapsProps } from '../types'
import { createUser, getUsers, updateUser, deleteUser } from '@server/product/xmanager/user/userManager'
import test from '@server/product/test'

export const apiRoute: RouterMapsProps[] = [
    {
        'path': '/',
        'view': '../res/libsx',
    }, {
        'path': '/api/v1/abc/:id$',
        'server': test
    }, {
        'path': '/api/v1/users/createUser',
        'server': createUser
    },{
        'path': '/api/v1/users/getUsers',
        'server': getUsers
    },
    {
        'path': '/api/v1/users/updateUser/:id',
        'server': updateUser
    },
    {
        'path': '/api/v1/users/deleteUser/:id',
        'server': deleteUser
    }
]