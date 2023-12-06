/**
 * @author dbxiao
 * @function 检查路由信息
 */

// 获取路由配置
import Agent from './agent'

/**
 * @name routerCheckAction
 * @description 检查访问的_path是否在routerAgent表中，如果存在，将_path复制给action
 * 判断_path 是否包含/static/结构，存在action为空，url直接访问。
 */
const routerAction = (hostname: string, _path: string) => {
    // 默认配置为404页面，如果没有在routerAgent匹配，直接进入404
    let action = {
        path: _path,
        view: '',
        server: '',
    };

    // 根据域名匹配一次 域名如果匹配不到 那么再去通用路由匹配一次
    const defaultRouter = Agent['global']
    let routerList = Agent[hostname] ? Agent[hostname] : defaultRouter

    const getAction = (routerArg: any) => {
        for (let x of routerArg) {
            if (x.path && x.path === _path) {
                action = x
                return action
            } else if (_path.match(new RegExp(x.path))) {
                action = x
                return action
            } else if (_path.match(/^(\/webroot\/static)/gi)) {
                action.view = ''
                return action
            }
        }
    };

    const matchedAction = getAction(routerList);
    // 没有匹配路由则走 global 路由。
    if (!matchedAction) {
        getAction(defaultRouter);
    }
    return action
}

export default routerAction
