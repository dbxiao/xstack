!function(){var c={setPassSignup:function(c,S){try{$.get(webos.common.restAPI.SET_PASS_SIGNUP,c,function(c){"function"==typeof S&&S(c)})}catch(e){console.log(e)}},setPassLogin:function(c,S){try{$.get(webos.common.restAPI.SET_PASS_LOGIN,c,function(c){"function"==typeof S&&S(c)})}catch(e){console.log(e)}}};webos.common.postman=c}();