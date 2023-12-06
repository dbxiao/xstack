/**
 * Deep Clone
 * @param source 
 * @returns 
 */
export const deepClone = (source: any) => {
    if (typeof source !== 'object' || source === null) {
        return source
    }
    const target: any = Array.isArray(source) ? [] : {}
    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (typeof source[key] === 'object' && source[key] !== null) {
                target[key] = deepClone(source[key])
            } else {
                target[key] = source[key]
            }
        }
    }
    return target
}

/**
 * 判断是否为类函数
 * @param obj - any
 * @returns Boolean
 */
export const isClass = (obj: any) => {
    const str = obj.toString()
    if (typeof obj != "function") {
        return false
    }

    // ES6 class
    if (typeof obj === 'function' && str.slice(0, 5) == "class") {
        return true;
    }
    // no prototype
    if (obj.prototype === undefined) {
        return false;
    }
    // generator function or malformed definition
    if (obj.prototype.constructor !== obj) {
        return false;
    }
    // anonymous function
    if (/^function\s+\(|^function\s+anonymous\(/.test(str)) {
        return false
    }
    return false
}

/**
 * 匹配(动态)路由
 * @param pattern 正则表达式
 * @param path 路径
 * @returns 
 */
export const matchPath = (pattern: string, path: string) => {
    const regexPattern = pattern.replace(/:([^\/]+)/g, '([^\/]+)')
    const regex = new RegExp(`^${regexPattern}$`)
    const matches = path.match(regex)
    if (matches) {
        return matches.slice(1)
    }
    return null
}
