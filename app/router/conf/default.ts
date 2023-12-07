/**
 * @author dbxiao@foxmail.com
 * @description It is used to configure common default routes for web services, such as 403, 404, 500, and so on. 
 * You can add other default routes and default pages to the webroot/view directory. 
 * @example http://127.0.0.1:18080/403
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