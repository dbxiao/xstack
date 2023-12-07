/**
 * @author dbxiao@foxmail.com
 * @description This function provides the XStack routing middleware service. 
 * It separates the middleware functionality into an independent service that is customizable
 * and scalable to adapt to different project scenarios.
 */
import dotenv from 'dotenv'
import express, { Request, Response, NextFunction } from 'express'
import { routerMaps, RouterMapsProps } from '@router/index'
import { Console, isClass, matchPath } from '@plugin/libs'
dotenv.config()
const router = express.Router()

/**
 * Request processing function
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next next function
 */
const routerAction = (req: Request, res: Response, next: NextFunction) => {
    // Get the request path from 'req'.
    const {path: reqPath, method, protocol, url, hostname, headers} = req
    // Iterate over the 'routerMaps' array to find a match for the request path
    const targetRoute: RouterMapsProps = routerMaps.find((item) => {
        const { path } = item
        return matchPath(path, reqPath)
    }) || { path: '/404', view: '404.html' }
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
        return next()
    }

    Console.log(`@routerAction::targetRoute: ${JSON.stringify(targetRoute)} ]`)
    next()
}

router.get('/*', [routerAction])
router.post('/*', [routerAction])
router.put('/*', [routerAction])
router.delete('/*', [routerAction])

export default router