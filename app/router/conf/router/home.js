/**
 * @class   [passport-注册路由]
 * @author  [dbxiao]
 * @data    [2015-06]
 */
var passport = [
    /**
     * VIEW
     */
	{   //首页
        'path'  : /^\/$/gi,
        'view'  : 'pc/home/page/index/index'
    },
    {   //功能首页
        'path'  : /^\/home$/gi,
        'server': 'product/home/home',
        'view'  : 'pc/home/page/home/home'
    },

];
module.exports = passport;