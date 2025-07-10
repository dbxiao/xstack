/**
 * @name smart-proxy
 * @description 企业IT智能网关 ExpressJS调用中间件，用于验证办公网请求的合法性
 * @author bobbli@tencent.com
 * @document http://tapd.oa.com/rio/wikis/view/%2525E7%2525A7%2525BB%2525E5%25258A%2525A8%2525E7%2525BD%252591%2525E9%2525A1%2525B5%2525E5%2525BC%252580%2525E5%25258F%252591--mGate
 * @site http://rio.oa.com/opp/!appGateway
 */
const crypto = require('crypto')
const { Env } = require('../../plugin/libs')

const AN_TOKEN = 'a8wvGgIuDuffROk7FxCs6u5jqee1ut5V'
const TSA_TOKEN = 'X24KH3FSL5o2hekx0JmKmttYxGpJ9a7W'

/**
 * 验证办公网请求的合法性，包括时间戳和签名验证
 * @param {Object} req - Express 请求对象
 * @param {Object} res - Express 响应对象
 * @returns {Object} 包含验证结果的对象
 */
const oa = function (req, res) {
    // https://paas.oa.com/page/smartgate?paasId=anoa
    const host = req.hostname
    const token = host === 'an.oa.com' ? AN_TOKEN : host === 'tsa.oa.com' ? TSA_TOKEN : AN_TOKEN
    const timestamp = req.header('timestamp')
    const signature = req.header('signature')
    const staffId = req.header('staffid')
    const staffName = req.header('staffname')
    const xRioSeq = req.header('x-rio-seq')
    const xExtData = req.header('x-ext-data') || ''; // 办公网访问，这里要设置成空字符串
    const nowTimestamp = (new Date().getTime() / 1000).toFixed(0)

    // 本地环境，直接返回local，业务逻辑直接放行
    if (Env.isLocalEnv() === true) {
        return {
            ret: 0,
            message: 'is local env',
            data: {
                staffName: 'localhost'
            }
        }
    }

    // 校验时间戳,误差不得超过180秒
    if (Math.abs(nowTimestamp - timestamp) > 180) {
        res.status(403).send('@OA::smart-proxy timestamp check fail')
        return {
            ret: 2,
            message: '@OA::smart-proxy timestamp check fail'
        }
    }

    // 签名为大写英文
    var computedSignature = sha256(`${timestamp}${token}${xRioSeq},${staffId},${staffName},${xExtData}${timestamp}`).toUpperCase()

    // 校验签名
    if (computedSignature !== signature) {
        console.log(`smart-proxy signature check fail, before signature string: ${timestamp}${token}${xRioSeq},${staffId},${staffName},${xExtData}${timestamp}`)
        res.status(403).send('[403]Smart-proxy signature check fail')
        return {
            ret: 3,
            message: 'smart-proxy signature check fail'
        };
    }

    return {
        ret: 0,
        message: 'success',
        data: {
            staffName,
            staffId
        }
    };
};

/**
 * 计算字符串的 SHA-256 哈希值
 * @param {String} string - 待计算哈希的字符串
 * @returns {String} 16进制的哈希码
 */
function sha256(string) {
    var hash = crypto.createHash('sha256')
    hash.update(string)
    return hash.digest('hex') // 返回16进制hash码
}

module.exports = oa;