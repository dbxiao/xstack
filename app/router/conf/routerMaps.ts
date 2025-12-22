
/**
 * @name routerMaps
 * @author dbxiao@msn.cn
 * @description Maps application routes to their respective views or server handlers.
 * @warning 新增或修改路由时，需确保路由的唯一性。
 * @copyright dbxiao@msn.cn All rights reserved.
 */
import { defaultRoute } from '../conf/default'
import { apiRoute } from '../conf/apiRoute'
import { RouterMapsProps } from '../types'
import test from '@server/product/test'

export const routerMaps: RouterMapsProps[] = [
    {
        'path': '/',
        'view': '../res/libsx',
    },
    ...apiRoute,
    ...defaultRoute
]