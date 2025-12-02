/**
 * @author dbxiao
 * @date 2015-02-27
 * @description 提供用户账号状态信息，包括登录状态查询和登出功能
 */
const $sql_selectUserLogin = require(global.nodeConf.DATA_DIR + 'product/user/selectUserLogin');
let $request = {};

const account = {
    /**
     * 查询用户账户登录状态
     * @param {Object} _req - 请求对象
     * @param {Object} _res - 响应对象
     * @param {Function} callback - 回调函数，参数为登录状态和用户信息
     */
    isLogin: function(_req, _res, callback) {
        const xpToken = _req.cookies.XPLUSE_TOKEN;
        let user_token = null;
        let user_token_id = null;
        const to_url = encodeURIComponent(_req.url) || '/home';

        if (xpToken) {
            user_token = xpToken.split('::XID::')[0];
            user_token_id = xpToken.split('::XID::')[1];

			$request = {
				'user_token' : user_token,
				'user_token_id' : user_token_id
			};

			$sql_selectUserLogin( $request, function(err, results){
				if(!err && results[0].user_regType == 1){
					callback(true, results[0]);
				}else if(!err && results[0].user_regType == 0){
					_res.redirect('/passport/signup_regnotify?signup_mail='+results[0].user_mail);
				}else{
					_res.redirect('/passport/login?to_url='+to_url);
					//callback(false);

				}
			});
		}else{
			_res.redirect('/passport/login?to_url='+to_url);
			//callback(false);
		}
	},

	/*
	 * @function: logout
	 */
	/**
     * 用户登出操作，清除 XPLUSE_TOKEN cookie
     * @param {Object} _req - 请求对象
     * @param {Object} _res - 响应对象
     * @param {Function} _next - 中间件 next 函数
     * @param {String} view - 视图路径
     */
    logout : function(_req, _res, _next, view) {
        _res.cookie('XPLUSE_TOKEN', false, { expires: new Date(Date.now() + 0), httpOnly: true });
    }
};

module.exports = account;
