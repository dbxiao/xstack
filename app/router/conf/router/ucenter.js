/**
 * @class   [ucenter-用户中心路由]
 * @author  [dbxiao]
 * @data    [2015-06]
 */
var ucenter = [
    {   //功能首页
        'path'  : /^\/ucenter$/gi,
        'server': 'product/ucenter/ucenter',
        'view'  : 'pc/ucenter/page/home/home'
    },
    {
    	'path' : /^\/ucenter\/userInfo$/gi,
    	'server': 'product/ucenter/userInfo',
    	'view'  : 'pc/ucenter/page/userInfo/userInfo'
    },
    {
        'path' : /^\/ucenter\/companyInfo$/gi,
        'server': 'product/ucenter/companyInfo',
        'view'  : 'pc/ucenter/page/companyInfo/companyInfo'
    }

];

module.exports = ucenter;