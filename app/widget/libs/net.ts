/**
 * @file net.ts
 * @author dbxiao@msn.cn
 * @description 提供网络相关的工具方法，当前实现了获取本地非回环 IPv4 地址的功能，可用于服务监听、网络通信等场景。
 * @copyright dbxiao@msn.cn. All rights reserved.
 */
import os from 'os'

/**
 * 网络工具对象，封装网络相关的工具方法。
 */
export const net = {
    /**
     * 获取本地非回环 IPv4 地址。遍历系统所有网络接口，查找第一个符合条件的非回环 IPv4 地址。
     * @returns 本地非回环 IPv4 地址，若未找到符合条件的地址则返回 undefined。
     * @example
     * const localIP = net.getLocalIPAddr();
     * console.log(localIP); // 输出本地非回环 IPv4 地址，如 '192.168.1.100'
     */
    getLocalIPAddr: () => {
        // 获取系统所有网络接口信息
        const interfaces = os.networkInterfaces()
        
        // 遍历所有网络接口
        for (const devName in interfaces) {
            const iface: any = interfaces[devName]
            
            // 遍历当前接口的所有地址信息
            for (let i = 0; i < iface.length; i++) {
                const alias: any = iface[i]
                
                // 检查地址是否为 IPv4 且非回环地址
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    return alias.address
                }
            }
        }
    }
}