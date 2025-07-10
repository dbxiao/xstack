/**
 * @file console.ts
 * @author AI
 * @date 2024-07-25
 * @description 封装 Console 对象，用自定义的 Consoles 替换全局 console。支持在控制台输出包含代码位置、行号、日志级别和日志内容的信息，兼容浏览器和 Node.js 环境。
 * @warning 在生产环境中使用时，注意日志输出可能会影响性能。
 * @copyright dbxiao@foxmail.com. All rights reserved.
 */
// 获取全局 console 对象
const console = global && global.console || window && window.console

// 定义 Consoles 对象，包含 log、info、error、count、getStack 和 ISO8Time 方法
const Consoles = {
    /**
     * 输出日志信息
     * @param msg - 要输出的日志内容
     */
    log: (...msg: any) => {
        console.log(`${Consoles.ISO8Time()} [LOG] [${Consoles.getStack()}] -- ${JSON.stringify(msg)}`)
    },
    /**
     * 输出信息日志
     * @param msg - 要输出的信息内容
     */
    info: (...msg: any) => {
        console.info(`${Consoles.ISO8Time()} [INFO] [${Consoles.getStack()}] -- ${JSON.stringify(msg)}`)
    },
    /**
     * 输出错误日志
     * @param msg - 要输出的错误内容
     */
    error: (...msg: any) => {
        console.error(`${Consoles.ISO8Time()} [ERROR] [${Consoles.getStack()}] -- ${JSON.stringify(msg)}`)
    },
    /**
     * 输出计数日志
     * @param msg - 要输出的计数内容
     */
    count: (...msg: any) => {
        console.count(`${Consoles.ISO8Time()} [COUNT] [${Consoles.getStack()}] -- ${msg}`)
    },
    /**
     * 获取调用栈信息
     * @returns 调用栈的代码行信息
     */
    getStack: () => {
        // 返回调用栈中第 3 行信息
        const stackTrace = new Error().stack;
        if (stackTrace) {
            return stackTrace.split('\n').slice(3, 4).join('\n').trim();
        } else {
            return 'Stack trace is not available.';
        }
    },
    /**
     * 获取当前时间并转换为东八区的 ISO8601 格式
     * @returns 转换后的时间字符串
     */
    ISO8Time: () => {
        // 返回当前时间的 ISO8601 格式，并移除 'Z' 字符
        const now = new Date()
        // 将时间向东偏移 8 小时，转换为中国时区
        now.setHours(now.getHours() + 8) 
        return now.toISOString().replace('Z', '')
    }
}

export default Consoles