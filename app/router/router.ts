/**
 * @author dbxiao
 * @description router manager
 * @copyright 2023 dbxiao
 */

import dotenv from 'dotenv'
import express, { Request, Response, NextFunction } from 'express'
import { routerMaps, RouterMapsProps } from '@router/conf/routerMaps'
import { Console, isClass, matchPath } from '@plugin/libs'
import { Code } from '@plugin/constant/code'
dotenv.config()
const router = express.Router()

/**
 * 请求业务处理
 * @param {Object} req 请求参数
 * @param {Object} res 返回值参数
 * @param {Object} next
 */
const routerAction = (req: Request, res: Response, next: NextFunction) => {
    // Get the request path from 'req'.
    const {path: reqPath, method, protocol, url, hostname, headers} = req
    // Iterate over the 'routerMaps' array to find a match for the request path
    const targetRoute: RouterMapsProps = routerMaps.find((item) => {
        const { path } = item
        return matchPath(path, reqPath)
    }) || { path: '/404' }
    // Extract the 'server' and 'view' properties from 'targetRoute'
    const { server, view } = targetRoute

    Console.log(`[${method}] ${protocol}://${hostname}${url} | ${headers["user-agent"]}`)


    if (server) {
        if (view) {
            isClass(server) ? new server({req, res, next, view }) : server(req, res, next, view)
        } else {
            isClass(server) ? new server({req, res, next}): server(req, res, next)
        }
    } else if (view) {
        // Has view. render the 'view' using the response
        res.render(view)
    } else {
        // No view. send 404 msg
        res.render('404.html')
    }

    Console.log(`@routerAction::targetRoute: ${JSON.stringify(targetRoute)} ]`)
    next()
}

router.get('/*', [routerAction])
router.post('/*', [routerAction])
router.put('/*', [routerAction])
router.delete('/*', [routerAction])

export default router
