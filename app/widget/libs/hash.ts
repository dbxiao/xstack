/**
 * @file hash.ts
 * @author dbxiao@msn.cn
 * @description 提供加密工具方法，包含通用加密函数以及常用的 md5、sha1 和 sha256 加密方法，支持项目扩展。
 * @since 2024-01-01
 * @example 
 * import { encrypt, md5 } from '@widget/libs'
 * console.log(encrypt('123456','md5'))
 * console.log(md5('123456'))
 */
import crypto, { BinaryLike } from 'crypto'

/**
 * 通用加密函数，使用 Node.js 的 crypto 模块进行哈希加密。
 * @param content - 需要加密的内容，可以是字符串或 Buffer。
 * @param type - 加密算法类型，如 'md5', 'sha1', 'sha256' 等。
 * @returns 加密后的十六进制字符串。
 */
export const encrypt = (content: BinaryLike, type: string) => {
    const fn = crypto.createHash(type)
    const hash = fn.update(content).digest('hex')
    return hash;
}

/**
 * 使用 MD5 算法对内容进行加密。
 * @param content - 需要加密的内容，可以是字符串或 Buffer。
 * @returns MD5 加密后的十六进制字符串。
 */
export const md5 = (content: BinaryLike) => {
    return encrypt(content, 'md5')
}

/**
 * 使用 SHA1 算法对内容进行加密。
 * @param content - 需要加密的内容，可以是字符串或 Buffer。
 * @returns SHA1 加密后的十六进制字符串。
 */
export const sha1 = (content: BinaryLike) => {
    return encrypt(content, 'sha1')
}

/**
 * 使用 SHA256 算法对内容进行加密。
 * @param content - 需要加密的内容，可以是字符串或 Buffer。
 * @returns SHA256 加密后的十六进制字符串。
 */
export const sha256 = (content: BinaryLike) => {
    return encrypt(content,'sha256')
}