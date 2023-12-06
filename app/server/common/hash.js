/*
 * @author:dbxiao
 * @data:2015-01-19
 * @module:依赖crypto
 * @function:提供md5等加密算法，
 * 			 attention：不支持中文md5，请谨慎操作
 */
const crypto = require('crypto')

const Hash = {
    md5: (content) => {
        return Hash.encrypt(content, 'md5')
    },
    
    sha1: (content) => {
        return Hash.encrypt(content, 'sha1')
    },

    encrypt: (content, type) => {
        const fn = crypto.createHash(type)
        const hash = fn.update(content).digest('hex')
        return hash;
    }
};

module.exports = Hash