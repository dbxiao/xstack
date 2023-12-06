/**
 * @author dbxiao
 * @descript 错误码集合
 */

export const Code = {
	// 成功代码
	0 : {code: 0, msg: 'success'},

	// 业务错误码（100-699)
	100: {code: 100, msg: ''},
	101: {code: 101, msg: '代理请求异常，请检查远程服务'},
	102: {code: 102, msg: '代理请求执行「setHeader trace-id」发生异常'},
	
	403: {code: 403, msg: 'Forbidden! You do not have access.'},
	404: {code: 404, msg: 'Sorry. Your page is not Found.'},
	405: {code: 405, msg: 'Sorry. Method not allowed.'},
	408: {code: 408, msg: 'Sorry. Request Timeout.'},
	500: {code: 500, msg: 'Sorry. 内部错误，请稍后再试'},

	// 网关服务器错误（700-799，遵循数据透传）
	700: {code: 700, msg: '网关内部未知错误'},
	701: {code: 701, msg: '网关内部超时'},

	// 第三方业务处理错误（800 - 899）

	// 数据库业务处理错误(1000 - 1999)
};
