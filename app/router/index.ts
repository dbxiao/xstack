/**
 * @name router
 * @description 
 * 路由主入口，
 * 主要功能包括路由映射配置、路由处理函数、请求参数解析、响应数据处理路由。
 * @author dbxiao@foxmail.com
 * @copyright 2025 dbxiao. All rights reserved.
 */

import { routerMaps } from './conf/routerMaps'
import router from './router'
export * from "./types"

export {
	router,
	routerMaps,
}