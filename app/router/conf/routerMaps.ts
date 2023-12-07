import test from '@server/product/test'
import { defaultRoute } from '../conf/default'
import { RouterMapsProps } from '../types'

export const routerMaps: RouterMapsProps[] = [
    {
        'path': '^/$',
        'view': '404.html',
    }, {
        'path': '/abc/:id$',
        'server': test,
        'view': '403.html',
    },
    ...defaultRoute
]

