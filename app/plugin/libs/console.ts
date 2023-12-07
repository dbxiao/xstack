/**
 * @author dbxiao@foxmail.com
 * @description Wrap the Console object and replace global console with Console. Log messages to the console,
 * including code position, line number, log level, and log content.
 * Console support Browser and Nodejs environment.
 */
const console = global && global.console || window && window.console

// Define a Consoles object that includes log, info, error, count, getStack, and ISO8Time methods.
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
        // Return the code lines between the 3rd and 4th call stack.
        const stackTrace = new Error().stack;
        if (stackTrace) {
            return stackTrace.split('\n').slice(3, 4).join('\n').trim();
        } else {
            return 'Stack trace is not available.';
        }
    },
    ISO8Time: () => {
        // Return the current time in ISO8601 format and replace 'Z' with ''.
        const now = new Date()
        // Shift the time by 8 hours eastward to China time zone.
        now.setHours(now.getHours() + 8) 
        return now.toISOString().replace('Z', '')
    }
}

export default Consoles