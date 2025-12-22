/**
 * @name router.ts
 * @description 提供 XStack 统一的路由中间件服务，将路由功能抽离为独立服务，支持自定义和扩展，以适配不同项目场景。
 * @author dbxiao@msn.cn
 * @copyright 2025 dbxiao. All rights reserved.
 */
import express, { Request, Response, NextFunction } from 'express'
import { routerMaps, RouterMapsProps } from '@router/index'
import { info, isClass, matchPath } from '@widget/libs'

// 创建 Express 路由器实例
const router = express.Router()

/**
 * 请求处理函数，根据请求路径匹配路由规则，并执行相应的服务器逻辑或渲染视图。
 * @param {Request} req - Express 请求对象，包含请求相关信息。
 * @param {Response} res - Express 响应对象，用于返回响应给客户端。
 * @param {NextFunction} next - Express 中间件的 next 函数，用于调用下一个中间件。
 * @returns {void} - 无返回值
 */
const routerAction = (req: Request, res: Response, next: NextFunction) => {
    // 从请求对象中获取请求路径、方法、协议、URL、主机名和请求头
    const { path: reqPath, method, protocol, url, hostname, headers } = req
    
    // 遍历路由映射表，查找与请求路径匹配的路由规则
    const targetRoute: RouterMapsProps = routerMaps.find((item) => {
        const { path } = item
        return matchPath(path, reqPath)
    }) || { path: '/404', view: '404.html' }
    
    // 从匹配的路由规则中提取服务器处理函数和视图文件路径
    const { server, view } = targetRoute

    // 记录请求日志
    info(`[${method}] ${protocol}://${hostname}${url} | ${headers["user-agent"]}`)

    if (server) {
        if (view) {
            // 如果服务器处理函数是类，则创建实例并调用；否则直接调用函数
            isClass(server) 
                ? new server({ req, res, next, view }) 
                : server(req, res, next, view)
        } else {
            isClass(server) 
                ? new server({ req, res, next }) 
                : server(req, res, next)
        }
    } else if (view) {
        // 没有服务器处理函数但有视图文件，渲染视图文件
        res.render(view)
    } else {
        // 没有服务器处理函数和视图文件，调用 next 函数继续处理请求
        return next()
    }

    // 记录匹配的路由规则日志
    info(`@routerAction::targetRoute: ${JSON.stringify(targetRoute)} ]`)
}

router.all('/*', [routerAction])
export default router