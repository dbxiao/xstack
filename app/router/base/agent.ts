/**
 * @author dbxiao
 * @module Agent
 * @desc 提供路由转发规则，提供url、view、server配置
 */

import fs from 'fs'
import serverConf from '@config/server.conf'

import { Console } from '@plugin/libs/index'
const files = fs.readdirSync(serverConf.ROUT_DIR + '/conf')

console.log(222222, files)


const routerAgent: any = {}
const formatRouter = (files: string[]) => {
    Console.log('@files::files', files)
    const routerCollects: any = {}
    let path = null

    for (let x in files) {
        path = files[x].split('.js')[0]
        routerCollects[path] = require('../conf/' + path)
        Console.log('@agent.js::formatRouter', `${path} route configuration is ready.`)
    }
    return routerCollects
}

// 为没有设置 prefix: false 的路径添加 prefix
const formatAgent = (routerCollects: { [x: string]: { [x: string]: any } }) => {
    for (let fileName in routerCollects) {
        Object.keys(routerCollects[fileName]).forEach((domain) => {
            routerAgent[domain] = routerCollects[fileName][domain]
        })
    }
    return routerAgent
}

formatAgent(formatRouter(files))
export default routerAgent
