const DEV_ENV = 'http://dev.dipeak.com'
const { PREFIX } = process.env

const RestAPI = {
	// Feishu
	FS_ACCESS_TOKEN_URI: 'https://passport.feishu.cn/suite/passport/oauth/token',
	FS_USERINFO_URI: 'https://passport.feishu.cn/suite/passport/oauth/userinfo',
	FS_AUTHORIZE_URI: 'https://passport.feishu.cn/suite/passport/oauth/authorize',
	
	// Web urls
	WEB_OPERATION_URI: `/operation/index`, // Operation Page
	WEB_XENGINE_URI: `/demo`, // X-Engine Page
	WEB_LOGIN_URI: `/login`, // Login Page
	WEB_REDIRECT_URI: `/redirect`, // Login Redirect Page

	// Auth urls
	AUTH_FEISHU_LOGIN_URI: `${DEV_ENV}${PREFIX}/auth/login`,
	AUTH_SIGNIN_URI: `/auth/signin`,
	AUTH_LOGIN_URI: `/auth/login`,
	AUTH_LOGOUT_URI: `/auth/logout`,
	AUTH_USER_INFO_URI: `/auth/userInfo`,
	AUTH_PINGAN_4A_URI: `/auth/pingan_4aticket`,

	// API urls
	API_LOGIN_URI: '/api/login',
	API_USER_LOGIN: '/api/auth/login',
	API_PINGAN_CASCHECK: '/api/auth/casCheck'
}

Object.keys(RestAPI).forEach((index) => {
	if (RestAPI[index].match(/^(http|\/api\/)/) === null) {
		RestAPI[index] = `${PREFIX}${RestAPI[index]}`
	}
})

module.exports = RestAPI
