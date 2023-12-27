import test from '@server/product/test'
import home from '@server/product/libsx/home'
import { defaultRoute } from '../conf/default'
import { RouterMapsProps } from '../types'

export const routerMaps: RouterMapsProps[] = [
    {
        'path': '/',
        'server': home,
    }, {
        'path': '/abc/:id$',
        'server': test,
        'view': '403.html',
    },
    ...defaultRoute
]

