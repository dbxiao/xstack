(function(){
    var restAPI = {
        //获取空间数据
        GET_SPACE : "/spaceApi/getSpace",
        //获取空间列表
        GET_MESSAGE_LIST : "/spaceApi/getMessageList",
        //获取空间数据
        SET_SPACE : "/spaceApi/setSpace",
        //获取空间评论
        GET_SPACE_DISCUSS : "/spaceApi/getSpaceDiscuss",
        //设置空间评论
        SET_SPACE_DISCUSS : "/spaceApi/setSpaceDiscuss",
        //用户登录安全
        GET_USER_STATUS : "/userApi/loginStatus",
        /**
         * passport API
         */
        //注册接口
        SET_REGISTER : "/passportApi/register"
    };
    
    webos.common.restAPI = restAPI;   
})();

