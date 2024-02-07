import test from '@server/product/test'
import { defaultRoute } from '../conf/default'
import { RouterMapsProps } from '../types'

export const routerMaps: RouterMapsProps[] = [
    {
        'path': '/',
        'view': '../res/libsx',
    }, {
        'path': '/abc/:id$',
        'server': test,
        'view': '403.html',
    },
    ...defaultRoute
]