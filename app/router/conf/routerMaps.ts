
/**
 * @name routerMaps
 * @description Maps application routes to their respective views or server handlers.
 * @author dbxiao@foxmail.com
 * @copyright dbxiao@foxmail.com All rights reserved.
 */
import { defaultRoute } from '../conf/default'
import { RouterMapsProps } from '../types'
import { createUser, getUser, updateUser, deleteUser } from '@server/product/xmamager/user/userManager'
import test from '@server/product/test'

export const routerMaps: RouterMapsProps[] = [
    {
        'path': '/',
        'view': '../res/libsx',
    }, {
        'path': '/abc/:id$',
        'server': test
    }, {
        'path': '/users/createUser',
        'server': createUser
    },{
        'path': '/users/getUsers',
        'server': getUser
    },
    {
        'path': '/users/updateUser/:id',
        'server': updateUser
    },
    {
        'path': '/users/deleteUser/:id',
        'server': deleteUser
    },
    ...defaultRoute
]