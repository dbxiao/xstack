/**
 * @name defaultRoute
 * @description Maps common default routes to their respective views.
 * @author dbxiao@msn.cn
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