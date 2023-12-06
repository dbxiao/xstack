/**
 * @author doublexiao
 * @description 环境类，用于提供公共运行环境输出
 */
const os = require('os')
const platform = os.platform()

let env = {
    isLocalEnv: () => {
        if (platform === 'darwin' || platform === 'win32') {
            return true;
        } 
        return false
    },
    isDevEnv: () => {
        return process.env.NODE_ENV === 'development'
    }
};

export default env