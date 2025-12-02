
/**
 * @name routerMaps
 * @description Maps application routes to their respective views or server handlers.
 * @author dbxiao@foxmail.com
 * @copyright dbxiao@foxmail.com All rights reserved.
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
        'path': '/abc/:id$',
        'server': test
    }, {
        'path': '/api/users/createUser',
        'server': createUser
    },{
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
    },
    ...defaultRoute
]