/**
 * @name router.ts
 * @author dbxiao@msn.cn
 * @description 提供 XStack 统一的路由中间件服务，将路由功能抽离为独立服务，支持自定义和扩展，以适配不同项目场景。
 * @warning 新增或修改路由时，需确保路由的唯一性。
 * @copyright 2025 dbxiao. All rights reserved.
 */
import express, { Request, Response, NextFunction } from 'express'
import { routerMaps, RouterMapsProps } from '@router/index'
import { info, isClass, matchPath } from '@widget/libs'

// 创建 Express 路由器实例
const router = express.Router()

// 路由匹配缓存，提升重复请求的匹配速度
const routeMatchCache = new Map<string, RouterMapsProps>()

// 按路由类型预分类，静态路由（无:参数）和动态路由（有:参数）
// 静态路由优先匹配，提高匹配效率
const [staticRoutes, dynamicRoutes] = routerMaps.reduce(
    ([staticRoutesAcc, dynamicRoutesAcc], route) => {
        if (route.path.includes(':')) {
            return [staticRoutesAcc, [...dynamicRoutesAcc, route]]
        }
        return [[...staticRoutesAcc, route], dynamicRoutesAcc]
    },
    [[], []] as [RouterMapsProps[], RouterMapsProps[]]
)

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
    
    // 首先检查缓存
    let targetRoute = routeMatchCache.get(reqPath)
    
    // 如果缓存中没有找到，进行路由匹配
    if (!targetRoute) {
        // 优先匹配静态路由
        targetRoute = staticRoutes.find((item) => matchPath(item.path, reqPath))
        
        // 静态路由未匹配，再匹配动态路由
        if (!targetRoute) {
            targetRoute = dynamicRoutes.find((item) => matchPath(item.path, reqPath))
        }
        
        // 都未匹配，使用默认404路由
        targetRoute = targetRoute || { path: '/404', view: '404.html' }
        
        // 将匹配结果存入缓存
        routeMatchCache.set(reqPath, targetRoute)
    }
    
    // 从匹配的路由规则中提取服务器处理函数和视图文件路径
    const { server, view } = targetRoute

    // 记录请求日志（移除不必要的复杂格式化，提升性能）
    info(`[${method}] ${protocol}://${hostname}${url}`)

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

    // 记录匹配的路由规则日志（仅记录路径信息，避免JSON.stringify序列化）
    info(`@routerAction::targetRoute: path=${targetRoute.path}`)
}

router.all('/*', [routerAction])

export default router