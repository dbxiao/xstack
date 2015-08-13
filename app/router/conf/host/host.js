/**
 * @author [dbxiao]
 * @date   [2015-08]
 * @desc   [三级域名设置]
 * @demo   [1、你可以通过三级域名设置，达到项目区分和提升用户体验，
 *          2、加入你的域名为：baidu.com，你需要做用户管理，启用http://user.baidu.com 指向 http://baidu.com/user
 *          3、配置如下：
 *              {
 *                  host: "user.baidu.com",
 *                  path: "/user"
 *              }
 *          4、用户访问http://user.baidu.com 和 http://baidu.com/user的效果是一样的。
 *          
 *]
 */

var host = [
	{
		host : "127.0.0.1",
		path : "/"
	},
    {
        host : "xpluse.com", //请设置你的域名
        path : "/"
    },
    {
        host : "www.xpluse.com",
        path : "/"
    }
];
module.exports = host;