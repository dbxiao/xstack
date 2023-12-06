/*
 * @author : dbxiao
 * @data   : 2015-02-27
 * @descript : 提供用户账号状态信息
 */
const $sql_selectUserLogin = require(global.nodeConf.DATA_DIR + 'product/user/selectUserLogin');
let $request = {};

const account = {

    /**
     * [isLogin 账户登录态查询]
     * @param  {Object}   _req     [request请求]
     * @param  {Object}   _res     [response请求]
     * @param  {Function} callback [回调函数]
     * @return {Boolean}           [true：已登录，false：未登录]
     * @return {String}   request  [用户token 和 token_id]
     * @demo
     * var $account = require(GLOBAL.nodeConf.SERV_DIR + "common/account");
     * $account.isLogin(_req, function(islogin, token, token_id){
     * 		//code is here
     * });
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
	logout : function(_req, _res, _next, view){
		_res.cookie('XPLUSE_TOKEN', false, { expires: new Date(Date.now() + 0), httpOnly: true });
	}
};

module.exports = account;
