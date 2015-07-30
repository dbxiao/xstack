(function(){
    var restAPI = {     
        SET_PASS_SIGNUP   : "/api/passport/signup",		 //注册接口
        SET_PASS_LOGIN    : "/api/passport/login",		 //登录接口
        GET_PASS_SIGNMAIL : "/api/passport/forget",      //注册邮箱查询
        GET_PASS_RESET    : "/api/passport/forget_reset" //密码重置接口
    };
    
    webos.common.restAPI = restAPI;   
})();

