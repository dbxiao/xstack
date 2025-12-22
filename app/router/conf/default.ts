/**
 * @name defaultRoute
 * @author dbxiao@msn.cn
 * @description Maps common default routes to their respective views.
 * @warning 新增或修改默认路由时，需确保路由的唯一性。
 * @copyright dbxiao@msn.cn All rights reserved.
 */
import { RouterMapsProps } from '../types'

export const defaultRoute: RouterMapsProps[] = [
    { 
        'path': '/403',
        'view': '403.html'
    },
    {
        'path': '/404',
        'view': '404.html',
    },
    {
        'path': '/500',
        'view': '500.html',
    }
]