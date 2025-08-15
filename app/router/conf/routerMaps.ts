
import { defaultRoute } from '../conf/default'
import { RouterMapsProps } from '../types'
import { createUser } from '@server/product/xmamager/user/userManager'
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
    },
    ...defaultRoute
]