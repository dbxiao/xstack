/**
 * @author dbxiao@foxmail.com
 * @description Provide a quick encrypt method and common md5, sha1, sha256 methods, 
 * and also allow you to extend these methods in your project.
 * @example 
 * import { encrypt, md5 } from '@plugin/libs'
 * console.log(encrypt('123456','md5'))
 * console.log(md5('123456'))
 */

import crypto, { BinaryLike } from 'crypto'

export const encrypt = (content: BinaryLike, type: string) => {
    const fn = crypto.createHash(type)
    const hash = fn.update(content).digest('hex')
    return hash;
}

export const md5 = (content: BinaryLike) => {
    return encrypt(content, 'md5')
}

export const sha1 = (content: BinaryLike) => {
    return encrypt(content, 'sha1')
}

export const sha256 = (content: BinaryLike) => {
    return encrypt(content,'sha256')
}