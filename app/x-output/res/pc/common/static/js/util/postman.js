/**
 * @author:dbxiao
 * @class:postman
 */
(function(){
    var postman = {

        /**
         * @method [setPassSignup]
         * @desc   [注册接口]
         * @parm data : {
         *     Int    signup_mail    [注册邮箱]
         *     Int    signup_password[注册密码]
         * }
         **/
        setPassSignup : function(data, callback){
            try{
                $.get(webos.common.restAPI.SET_PASS_SIGNUP, data, function(res){
                    if(typeof callback == 'function'){
                        callback(res);
                    }
                });
            }catch(e){
                console.log(e);
            }
        },

        /**
         * @method [setPassLogin]
         * @desc   [登录接口]
         * @parm data : {
         *     Int    login_mail    [登录邮箱]
         *     Int    login_password[登录密码]
         * }
         **/
        setPassLogin : function(data, callback){
            try{
                $.get(webos.common.restAPI.SET_PASS_LOGIN, data, function(res){
                    if(typeof callback == 'function'){
                        callback(res);
                    }
                });
            }catch(e){
                console.log(e);
            }
        }
    };
    
    webos.common.postman = postman;
})();
