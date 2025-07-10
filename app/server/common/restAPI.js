/**
 * @description 定义项目中使用的各种 RESTful API 接口地址，包括飞书相关、Web 页面和认证相关的 URL
 */
const DEV_ENV = 'http://dev.dipeak.com'
const { PREFIX } = process.env

const RestAPI = {
    // Feishu API 地址
    FS_ACCESS_TOKEN_URI: 'https://passport.feishu.cn/suite/passport/oauth/token',
    FS_USERINFO_URI: 'https://passport.feishu.cn/suite/passport/oauth/userinfo',
    FS_AUTHORIZE_URI: 'https://passport.feishu.cn/suite/passport/oauth/authorize',
    
    // Web 页面地址
    WEB_OPERATION_URI: `/operation/index`, // 操作页面
    WEB_XENGINE_URI: `/demo`, // X-Engine 页面
    WEB_LOGIN_URI: `/login`, // 登录页面
    WEB_REDIRECT_URI: `/redirect`, // 登录重定向页面

    // 认证相关地址
    AUTH_FEISHU_LOGIN_URI: `${DEV_ENV}${PREFIX}/auth/login`,
    AUTH_SIGNIN_URI: `/auth/signin`,
    AUTH_LOGIN_URI: `/auth/login`,
    AUTH_LOGOUT_URI: `/auth/logout`,
    AUTH_USER_INFO_URI: `/auth/userInfo`,
    AUTH_PINGAN_4A_URI: `/auth/pingan_4aticket`,

    // API 接口地址
    API_LOGIN_URI: '/api/login',
    API_USER_LOGIN: '/api/auth/login',
    API_PINGAN_CASCHECK: '/api/auth/casCheck'
}

/**
 * 遍历 RestAPI 对象，为非 http 和 /api/ 开头的 URL 添加 PREFIX
 */
Object.keys(RestAPI).forEach((index) => {
    if (RestAPI[index].match(/^(http|\/api\/)/) === null) {
        RestAPI[index] = `${PREFIX}${RestAPI[index]}`
    }
})

module.exports = RestAPI
