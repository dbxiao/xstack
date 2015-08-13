/**
 * @class   [credit-失信名单抓取路由]
 * @author  [dbxiao]
 * @data    [2015-07]
 */
var credit = [
    /**
     * VIEW
     */
	{   //收集信息方法
        'path'  : /^\/credit\/getCredit$/gi,
        'server'  : '/product/credit/credit'
    },
    {   //首页
        'path'  : /^\/credit\/home$/gi,
        'server': 'product/credit/index',
        'view'  : 'pc/credit/page/home/home'
    },
    {   //注册信息
        'path'  : /^\/credit\/registerInfo$/gi,
        'server': 'product/credit/registerInfo',
        'view'  : 'pc/credit/page/registerInfo/registerInfo'
    }

];
module.exports = credit;