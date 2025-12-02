/**
 * @name restAPI.js
 * @author AI
 * @date 2025-08-01
 * @description 定义项目中使用的各种 RESTful API 接口地址，包括飞书相关、Web 页面和认证相关的 URL。
 *              该文件集中管理所有 API 地址，便于统一维护和修改。同时提供了自动为 URL 添加前缀的功能，
 *              使代码更加灵活和可配置。
 */
const { PREFIX } = process.env

const RestAPI = {
    // Feishu API 地址
    FS_ACCESS_TOKEN_URI: 'https://passport.feishu.cn/suite/passport/oauth/token', // 获取飞书访问令牌
    FS_USERINFO_URI: 'https://passport.feishu.cn/suite/passport/oauth/userinfo', // 获取飞书用户信息
    FS_AUTHORIZE_URI: 'https://passport.feishu.cn/suite/passport/oauth/authorize', // 飞书授权地址
    
    // Web 页面地址
    WEB_OPERATION_URI: `/operation/index`, // 操作页面
    WEB_XENGINE_URI: `/demo`, // X-Engine 页面
    WEB_LOGIN_URI: `/login`, // 登录页面
    WEB_REDIRECT_URI: `/redirect`, // 登录重定向页面

    // 认证相关地址
    AUTH_SIGNIN_URI: `/auth/signin`, // 签到地址
    AUTH_LOGIN_URI: `/auth/login`, // 登录地址
    AUTH_LOGOUT_URI: `/auth/logout`, // 登出地址
    AUTH_USER_INFO_URI: `/auth/userInfo`, // 用户信息地址
    AUTH_PINGAN_4A_URI: `/auth/pingan_4aticket`, // 平安4A票据地址

    // API 接口地址
    API_LOGIN_URI: '/api/login', // 登录API
    API_USER_LOGIN: '/api/auth/login', // 用户登录API
    API_PINGAN_CASCHECK: '/api/auth/casCheck' // 平安CAS检查API
}

/**
 * @description 遍历 RestAPI 对象，为非 http 和 /api/ 开头的 URL 添加 PREFIX
 * @param {string} index - RestAPI 对象的键
 * @returns {void} - 无返回值，直接修改 RestAPI 对象
 */
Object.keys(RestAPI).forEach((index) => {
    if (RestAPI[index].match(/^(http|\/api\/)/) === null) {
        RestAPI[index] = `${PREFIX}${RestAPI[index]}`
    }
})

module.exports = RestAPI
