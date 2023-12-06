import os from 'os'
const net = {
    /**
     * 获取本地IP地址
     */
    getLocalIPAddr: () => {
        var interfaces = os.networkInterfaces()
        for (var devName in interfaces) {
            var iface: any = interfaces[devName]
            for (var i = 0; i < iface.length; i++) {
                var alias: any = iface[i]
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    return alias.address
                }
            }
        }
    }
}

export default net