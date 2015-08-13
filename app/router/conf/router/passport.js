/**
 * @class   [passport-注册路由]
 * @author  [dbxiao]
 * @data    [2015-06]
 */
var passport = [
	/**
     * 登录相关
     */
    {   //登录页
        'path'  : /^\/passport\/login$/gi,
        'view'  : 'pc/passport/page/login/login'
    },
    {   //登录接口
        'path'  : /^\/api\/passport\/login$/gi,
        'server': 'product/passport/login'
    },

    /**
     * 注册相关
     */
    {   //注册页
        'path'  : /^\/passport\/signup$/gi,
        'view'  : 'pc/passport/page/signup/signup'
    },
    {   //注册提示页
        'path'  : /^\/passport\/signup_regnotify$/gi,
        'view'  : 'pc/passport/page/signupRegnotify/signupRegnotify'
    },
    {   //注册验证页
        'path'  : /^\/passport\/signup_verify$/gi,
        'server': 'product/passport/signupVerify',
        'view'  : 'pc/passport/page/signupVerify/signupVerify'
    },
    {   //注册接口
        'path'  : /^\/api\/passport\/signup$/gi,
        'server': 'product/passport/signup'
    },
    
    /**
     * 账号退出相关
     */
    {   //账户退出
        'path'  : /^\/passport\/logout$/gi,
        'server': 'product/passport/logout'
    },
    

    /**
     * 密码找回相关
     */
    {   //密码找回页
        'path'  : /^\/passport\/forget$/gi,
        'view'  : 'pc/passport/page/forget/forget',
        'server': 'product/passport/forget'
    },
    {   //邮箱注册检查接口
        'path'  : /^\/api\/passport\/forget$/gi,
        'server': 'product/passport/forget'
    },
    {   //密码重置页
        'path'  : /^\/passport\/forget_reset$/gi,
        'view'  : 'pc/passport/page/forget_reset/forget_reset',
        'server': 'product/passport/forget_reset'
    },
    {   //密码重置接口
        'path'  : /^\/api\/passport\/forget_reset$/gi,
        'server': 'product/passport/forget_reset'
    },



];
module.exports = passport;