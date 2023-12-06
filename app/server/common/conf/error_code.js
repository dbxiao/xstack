/**
 * @author dbxiao
 * @descript 错误码集合
 */

let Code = {
	0 : {code: 0, msg: 'success'},

	// Server业务错误码（100-699)
	100: {code: 100, msg: ''},
	101: {code: 101, msg: '代理请求异常，请检查远程服务'},
	102: {code: 102, msg: '代理请求执行「setHeader trace-id」发生异常'},

	200: {code: 200, msg: '请求成功'},
	
	403: {code: 403, msg: 'Forbidden! You do not have access.'},
	404: {code: 404, msg: 'Sorry. Not Found.'},
	405: {code: 405, msg: 'Sorry. Method Not Allowed.'},
	408: {code: 408, msg: 'Sorry. Request Timeout.'},

	500: {code: 500, msg: 'Sorry. 内部错误，请稍后再试'},

	// 网关服务器错误（700-799，遵循数据透传）
	700: {code: 700, msg: '网关内部未知错误'},
	701: {code: 701, msg: '网关内部超时'},

	// 第三方业务处理错误（800 - 899）
	800: {code: 800, msg: '飞书ACCESS TOKEN请求异常'},
	801: {code: 801, msg: '飞书ACCESS TICKET请求异常'},
	802: {code: 802, msg: '飞书用户信息获取异常，请稍后重试'},
	803: {code: 803, msg: '你登录的飞书所在公司不是数巅科技'},
	804: {code: 804, msg: 'Signin服务异常，请稍后重试'},
	805: {code: 805, msg: '平安银行登录服务异常，请稍后重试'},
	806: {code: 806, msg: '平安银行Ticket异常，请稍后重试'},

	// 数据库业务处理错误
	1000: {code: 1000, msg: ''}
};

module.exports = Code;