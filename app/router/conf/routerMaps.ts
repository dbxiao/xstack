import page404 from '@server/product/404'
import test from '@server/product/test'

export interface RouterMapsProps {
    path: string
    server?: Function | any
    view?: string
}

export const routerMaps: RouterMapsProps[] = [
    {
        'path': '^/$',
        'view': 'index.html',
    }, {
        'path': '/abc/:id$',
        'server': test,
        'view': 'index.html',
    },
    {
        'path': '/abc',
        'server': test,
        'view': 'index.html',
    }
]