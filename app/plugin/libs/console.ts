const console = global && global.console || window && window.console

// 定义 Consoles 对象，包含 log、info、error、count、getStack 和 ISO8Time 方法
const Consoles = {
    log: (...msg: any) => {
        console.log(`${Consoles.ISO8Time()} [LOG] [${Consoles.getStack()}] -- ${JSON.stringify(msg)}`)
    },
    info: (...msg: any) => {
        console.info(`${Consoles.ISO8Time()} [INFO] [${Consoles.getStack()}] -- ${JSON.stringify(msg)}`)
    },
    error: (...msg: any) => {
        console.error(`${Consoles.ISO8Time()} [ERROR] [${Consoles.getStack()}] -- ${JSON.stringify(msg)}`)
    },
    count: (...msg: any) => {
        console.count(`${Consoles.ISO8Time()} [COUNT] [${Consoles.getStack()}] -- ${msg}`)
    },
    getStack: () => {
        // 返回当前调用栈的第 3 行到第 4 行之间的代码行
        const stackTrace = new Error().stack;
        if (stackTrace) {
            return stackTrace.split('\n').slice(3, 4).join('\n').trim();
        } else {
            return 'Stack trace is not available.';
        }
    },
    ISO8Time: () => {
        // 返回当前时间的 ISO8601 格式，并替换 'Z' 为 ''
        const now = new Date()
        now.setHours(now.getHours() + 8) // 将时间偏移东8
        return now.toISOString().replace('Z', '')
    }
}

export default Consoles