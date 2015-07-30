/**
 * @author:dbxiao
 * @class:postman
 */
(function(){
    
    var postman = {
        /**
         * @method setSpace
         * @function 设置空间数据
         * @parm data : {
         *     Int    spa_id       [查询id]
         *     Int    discuss      [评论参数（0：无评论，1：有评论）]
         *     String content      [空间信息（必填）]
         *     Array  image_arr    [图片地址数组（选填）]
         *     String insert_time  [更新时间（选填）]
         * }
         * @param {callback} [回掉函数]
         */
        setSpace : function(data,callback){
            try{
                $.get(webos.common.restAPI.SET_SPACE,data,function(res){
                    if(typeof callback == 'function'){
                        callback(res);
                    }
                });
            }catch(e){
                console.log(e);
            }
        },
        /**
         * @method setSpaceDiscuss
         * @function 设置空间数据
         * @parm data : {
         *     Int    spa_id       [查询id]
         *     Int    dis_user_id  [发送人ID]
         *     String dis_content  [空间信息（必填）]
         *     Array  dis_image    [图片地址数组（选填）]
         *     String insert_time  [更新时间（选填）]
         * }
         * @param {callback} [回掉函数]
         */
        setSpaceDiscuss : function(data,callback){
            try{
                $.get(webos.common.restAPI.SET_SPACE_DISCUSS,data,function(res){
                    if(typeof callback == 'function'){
                        callback(res);
                    }
                });
            }catch(e){
                console.log(e);
            }
        },
        /**
         * @method getSpace
         * @function 获取空间信息
         * @parm data : {
         *     Int  spa_id [查询id]
         * }      
         * @param {callback} [回掉函数]
         */
        getSpace : function(data,callback){
            try{
                $.post(webos.common.restAPI.GET_SPACE,data,function(res){
                    if(typeof callback == 'function'){
                        callback(res);
                    }
                });
            }catch(e){
                console.log(e);
            }
        },
        /**
         * @method getSpaceDiscuss
         * @function 获取空间评论信息
         * @parm data : {
         *     Int  spa_id [查询id]
         * }      
         * @param {callback} [回掉函数]
         */
        getSpaceDiscuss : function(data,callback){
            try{
                $.post(webos.common.restAPI.GET_SPACE_DISCUSS,data,function(res){
                    if(typeof callback == 'function'){
                        callback(res);
                    }
                });
            }catch(e){
                console.log(e);
            }
        },
        /**
         * @method getMessageList
         * @function 获取聊天列表
         * @parm data : {
         *     Int  imsi [imsi]
         *     Int  imei [imei] 
         * }      
         * @param {callback} [回掉函数]
         */
        getMessageList : function(data,callback){
            try{
                $.post(webos.common.restAPI.GET_MESSAGE_LIST,data,function(res){
                    if(typeof callback == 'function'){
                        callback(res);
                    }
                });
            }catch(e){
                console.log(e);
            }
        },
        /**
         * @method getUserStatus
         * @function 获取聊天列表
         * @parm data : {
         * 	   String user_name [用户名]
         * 	   String user_password [用户密码]
         *     String user_qq_openId [qq openId]
         *     String user_qq_accessToken [qq accessToken] 
         * }      
         * @param {callback} [回掉函数]
         */
        getUserStatus : function(data,callback){
            try{
                $.post(webos.common.restAPI.GET_USER_STATUS,data,function(res){
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
