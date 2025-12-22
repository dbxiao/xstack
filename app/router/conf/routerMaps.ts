
/**
 * @name routerMaps
 * @author dbxiao@msn.cn
 * @description Maps application routes to their respective views or server handlers.
 * @copyright dbxiao@msn.cn All rights reserved.
 */
import { defaultRoute } from '../conf/default'
import { RouterMapsProps } from '../types'
import { createUser, getUsers, updateUser, deleteUser } from '@server/product/xmanager/user/userManager'
import test from '@server/product/test'

export const routerMaps: RouterMapsProps[] = [
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
    },
    ...defaultRoute
]