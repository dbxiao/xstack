/**
 * @author dbxiao@dipeak.com
 * @class AuthControll
 * @readme
 * 飞书帐号授权登录第三方应用的能力：https://open.feishu.cn/document/common-capabilities/sso/web-application-sso/web-app-overview
 * 调试链接：https://passport.feishu.cn/accounts/auth_login/oauth2/authorize?client_id=cli_a38f4d68def91013&redirect_uri=http%3A%2F%2Fdev.dipeak.com%2Fauth%2Flogin&response_type=code&state=oauth-controller
 */
const Axios = require('axios')
const RawBody = require('raw-body')
const Page = require('../base/page')
const Util = require('../../common/util')
const Code = require('../../common/conf/error_code')
const RestAPI = require('../../common/restAPI')
const { Console } = require('../../../plugin/libs')

class AuthController extends Page {
	constructor(props) {
		super(props)
		this.state = {
			redirect: RestAPI.WEB_LOGIN_URI
		}
		this.controller()
	}

	/**
	 * The auth controller
	 */
	controller() {
		const { path } = this.props.req
		const {
			AUTH_SIGNIN_URI,
			AUTH_LOGIN_URI,
			AUTH_LOGOUT_URI,
			AUTH_PINGAN_4A_URI
		} = RestAPI

		switch (path) {
			case AUTH_SIGNIN_URI:
				this.signin()
				break;
			case AUTH_LOGIN_URI:
				this.checkFeishuLogin()
				break;
			case AUTH_LOGOUT_URI:
				this.logout()
				break;
			case AUTH_PINGAN_4A_URI:
				this.getPingan4aTicket()
				break;
			default:
				this.send({
					code: 403,
					msg: 'Forbiden!'
				})
		}
	}

	/**
	 * Signin
	 * The user logs in with a username and password. The server gets the userName and token.
	 * Then use token, expiresTime and private key to get a new token written on the cookie.
	 * Tokens, new tokens, and expiresTime are used for each access to verify the correctness of the tokens.
	 */
	signin() {
		const { req } = this.props
		const { headers } = req

		// 解析post body值
		RawBody(req).then((buf) => {
			const body = JSON.parse(buf.toString())
			const { proxy } = body

			Axios({
				method: 'post',
				url: `${proxy}${RestAPI.API_USER_LOGIN}`,
				headers: headers,
				data: body
			}).then((res) => {
				const { code, data } = res.data
				if (code === 0) {
					const expiresTime = new Date().getTime() + 12 * 60 * 60 * 1000 // Cookie will expires 12 hours
					const { user, token } = data
					const { userName, admin } = user
					const newToken = this.createToken(token, expiresTime)
					this.setUserLoginToken({
						newToken,
						token,
						expiresTime,
						name: userName,
                        admin
					})
			} else {
					this.send({
						code: Code[804].code,
						msg: Code[804].msg,
						data: res
					})
					Console.log('@authController::signin::error', code, data)
				}
				Console.log('@authController::signin::success', code, data)
			}).catch((err) => {
				this.send({
					code: Code[804].code,
					msg: Code[804].msg,
					err
				})
				Console.error('@authController::signin::catch', err)
			})
			Console.log('@authController::signin::body/proxy:', body)
		})
	}

	/**
	 * Get Pingan User information
	 */
	getPingan4aTicket() {
		const { BACKEND_PROXY_URI } = process.env
		const { cookies } = this.props.req
		const { op_proxy = BACKEND_PROXY_URI } = cookies
		const { ticket } = this.props.req.query
		const authURL = `${op_proxy}${RestAPI.API_PINGAN_CASCHECK}?ticket=${ticket}`

		Axios({
			url: authURL,
			method: 'GET'
		}).then((res) => {
			const { code, data } = res.data
			if (code === 0) {
				const expiresTime = new Date().getTime() + 12 * 60 * 60 * 1000 // Cookie will expires 12 hours
				const { user, token } = data
				const { userName } = user
				const newToken = this.createToken(token, expiresTime)

				this.setUserLoginToken({
					newToken,
					token,
					expiresTime,
					name: userName
				})
			} else {
				this.send({
					code: Code[806].code,
					msg: Code[806].msg,
					data: res
				})
			}
			Console.log('@authController::getPingan4aTicket::success', authURL)
		}).catch((err) => {
			this.send({
				code: Code[805].code,
				msg: Code[805].msg,
				data: {
					ticket,
					url: `${RestAPI.API_PINGAN_CASCHECK}?ticket=${ticket}`,
					err
				}
			})
			Console.log('@authController::getPingan4aTicket::err', err, authURL)
		})
	}


	/**
	 * Check user login status. If not, visit the Feishu for an access token
	 */
	checkFeishuLogin() {
		const { loginStatus, state } = this.checkLoginStatus()
		this.state.redirect = state

		Console.log('@authController::checkFeishuLogin', loginStatus, this.state.redirect)

		// check login status
		if (loginStatus === true) {
			this.props.res.redirect(302, RestAPI.WEB_REDIRECT_URI + '?direct=' + encodeURIComponent(this.state.redirect))
		} else {
			this.signin()
		}
	}

	/**
	 * Get Feishu user info
	 * @param {String} accessToken
	 */
	getUserInfo(accessToken) {
		Axios({
			url: RestAPI.FS_USERINFO_URI,
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${accessToken}`
			}
		}).then((res) => {
			const { open_id, name, avatar_url, tenant_key } = res.data;
			this.setUserLoginInfo({
				open_id,
				name,
				avatar_url,
				tenant_key
			})
		}).catch((err) => {
			this.send({
				code: Code[802].code,
				msg: Code[802].msg,
				data: err
			})
		})
	}

	/**
	 * If user login in. get user info detail
	 * @param {Object} data
	 */
	setUserLoginInfo(data) {
		const expiresTime = new Date().getTime() + 12 * 60 * 60 * 1000 // 12小时后过期，每日登录一次
		const { open_id, name, avatar_url } = data
		const newToken = this.createToken(open_id, expiresTime)

		this.setUserLoginToken({
			newToken,
			token: open_id,
			expiresTime,
			name,
			avatar_url
		})

		Console.log('@authController::setUserLoginInfo')
	}

	/**
	 * setUserLoginToken
	 * @param {Object} options
	 * 	- newToken {String} Create by createToken function
	 *  - token {String} form feishu openid or user token
	 *	- expiresTime {String} expires time
	 * 	- name {String} user name
	 * 	- avatar_url {String} user logo
	 */
	setUserLoginToken(options) {
		const { newToken, token, expiresTime, name = '', admin= false, avatar_url = 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg' } = options
		const { hostname, ip } = this.props.req
		const domain = Util.getSecondDomainOrIP(hostname)

		const cookieOptions = {
			domain: domain,
			expires: new Date(expiresTime),
			path: '/'
		}

		this.props.res
			.status(201)
			.cookie(
				'u_token',
				`${newToken}|${token}|${expiresTime}`,
				Object.assign({ httpOnly: true }, cookieOptions)
			)
			.cookie('u_info', name + '|' + avatar_url + '|' + admin, cookieOptions)
			.redirect(302, RestAPI.WEB_REDIRECT_URI + '?direct=' + encodeURIComponent(this.state.redirect))

		Console.log('@authController::setUserLoginToken::host', hostname, ip)
	}

	/**
	 * logout
	 */
	logout() {
		const { hostname } = this.props.req
		const domain = Util.getSecondDomainOrIP(hostname)
		const cookieOptions = {
			domain: domain,
			maxAge: 1,
			path: '/'
		}

		this.props.res
			.status(201)
			.cookie('u_token', '', cookieOptions)
			.cookie('u_info', '', cookieOptions)
			.redirect(302, RestAPI.WEB_LOGIN_URI)
	}
}

module.exports = AuthController
