/**
 * 生成随机ID
 * @returns {String} 随机ID字符串
 */
export const getUnitId = ():String => {
    return Math.floor(Math.random() * new Date().getTime()).toString(36)
}

/**
 * 转义HTML特殊字符
 * @param text 待转义的字符串
 * @returns 转义后的字符串
 */
export const escapeHtml =  (text: string | null | undefined) => {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    }

    if (text === undefined || text === null) {
        return text
    }

    return text.replace(/[&<>"']/gi, (m) => {
        return (map as any)[m];
    })
}


/**
 * 深拷贝
 * @param {Any} source - 源对象
 * @returns {Any} 深拷贝后的对象    
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
 * @param {Any} obj - any
 * @returns Boolean
 */
export const isClass = (obj: any):Boolean => {
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
 * @param {String} pattern - 路由模式，例如 '/user/:id'
 * @param {String} path - 待匹配的路径，例如 '/user/123'
 * @returns {Array|null} 匹配结果数组，或null表示不匹配
 */
// 缓存正则表达式，避免重复编译提升性能
const regexCache = new Map<string, RegExp>()

export const matchPath = (pattern: string, path: string):Array<string>|null => {
    // 从缓存获取正则表达式，不存在则创建并缓存
    let regex = regexCache.get(pattern)
    if (!regex) {
        const regexPattern = pattern.replace(/:([^\/]+)/g, '([^\/]+)')
        regex = new RegExp(`^${regexPattern}$`)
        regexCache.set(pattern, regex)
    }
    const matches = path.match(regex)
    if (matches) {
        return matches.slice(1)
    }
    return null
}

/**
 * 将对象转换为查询字符串
 * @param obj 包含键值对的对象
 * @returns 查询字符串
 */
export const obj2Str =  (obj: { [x: string]: string }) => {
    var str = "";
    for (var x in obj) {
        str += str === "" ? x + "=" + obj[x] : "&" + x + "=" + obj[x];
    }
    return str;
}

/**
 * 判断对象是否为空对象
 * @param {Object} obj - 待判断的对象
 * @returns {Boolean} 是否为空对象
 */
export const objIsEmpty = (obj: {[x:string]: any}): boolean => {
    return Object.keys(obj).length === 0;
}


/**
 * 获取Cookie值
 * @param {String} name - Cookie名称
 * @param {String} cookieStr - Cookie字符串
 * @returns {String} Cookie值
 */
export const getCookie = (name: string, cookieStr: string) => {
    let c_start = '',
        c_end = null;

    if (cookieStr && cookieStr.length > 0) {
        c_start = cookieStr.indexOf(name + '=').toString()
        if (parseInt(c_start) !== -1) {
            c_start = c_start + name.length + 1
            c_end = cookieStr.indexOf(';', parseInt(c_start))
            if (c_end === -1) {
                c_end = cookieStr.length
            }
            return decodeURIComponent(cookieStr.substring(parseInt(c_start), c_end))
        }
    }
    return ''
}
