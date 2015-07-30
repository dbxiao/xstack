/**
 * @module   [home]
 * @author  [dbxiao]
 * @data    [2015-06]
 * @desc    [路由定义]
 */


var home = [
	{   //首页demo
        'path'  : /^\/$/gi,                     //访问url配置 ：域名path，不包括参数
        'view'  : 'pc/home/page/index/index'    //模板文件路径：view目录开始定位
    },
    {   //主页demo
        'path'  : /^\/home$/gi,                 //访问URL配置 ：域名path，不包括参数
        'server': 'product/home/home',          //server文件  ：server目录开始定位
        'view'  : 'pc/home/page/home/home'      //模板文件路径：view目录开始定位
    }

];
module.exports = home;