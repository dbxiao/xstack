
/**
 * @name routerMaps
 * @author dbxiao@msn.cn
 * @description Maps application routes to their respective views or server handlers.
 * @warning 新增或修改路由时，需确保路由的唯一性。
 * @copyright dbxiao@msn.cn All rights reserved.
 */
import { defaultRoute } from './default'
import { apiRoute } from './apiRoute'
import { RouterMapsProps } from '../types'

export const routerMaps: RouterMapsProps[] = [
    {
        'path': '/',
        'view': '../res/libsx',
    },
    ...apiRoute,
    ...defaultRoute
]