/*
 * @author:dbxiao
 * @data:2014-11-11
 * @module:serverUtil
 * @function:提供server工具库方法
 */
var $hash = require( GLOBAL.nodeConf.SERV_DIR + 'util/hash');

var serverUtil = {
    escapeHtml : function(text){
        var map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
            };
        return text.replace(/[&<>"']/g, function(m) { 
            return map[m]; 
        });
    },
    
    /**
     * @param {Object _req, String param} [请求对象,请求参数]
     * @return {String} [返回值：参数字符产]
     */
    ReqParam : function(_req,param){
        return _req.body[param] || _req.query[param];
    },
    
    /**
     * @method strResults [将对象返回值字符串格式化]
     * @param {Object results}[对象参数]
     * @return {String}[字符串]
     */
    strResults : function(results){
        return JSON.stringify(results && results.length && results[0] || "");
    },
    
    /**
     * @method strResultsObj [将对象返回值字符串格式化]
     * @param {Object results}[对象参数]
     * @return {String}[字符串]
     */
    strResultsObj : function(results){
        return JSON.stringify(results);
    },
    
    /**
     * @method checkPostParam [遍历post参数是否为空]
     * @param  {Object results}[对象参数]
     * @return {String}[字符串]
     */
    checkPostParam : function(postData){
        for(x in postData){
            if(postData[x] == ""){
                return false;
                break;
            }
        };
        return true;
    },
    
    /**
     * @method formatSqlParam [将查询对象抓换位sql 查询字符串]
     * @param {Object results}[对象]
     * @return {String}[字符串]
     */
    formatSqlParam : function(param){
        var sqlParam=[];
        for(var i in param){
            sqlParam.push(param[i] ? param[i] : "NULL"); 
        }
        return sqlParam.join(",");
    },
    
    /**
     * @method formatStaticPath [格式化静态路径]
     * @param {Object results}[对象]
     * @formatStaticPath('app/app/static')
     *  -->app/static
     */
    formatStaticPath : function(path){
        console.log(path);
        return path.replace(/^app\\/,'\\');
    },
    
    /**
	 * @method: passMd5
	 * @desc: 登录(注册)加密，采用md5(md5(username+password)+password);
     * @attention: 严禁修改此处代码。
	 */
	passMd5 : function(password){
		var passMd5 = $hash.md5($hash.md5(password+'XPLUES-SINCE-2015'));
		return passMd5;
	},
    
    /**
     * [passToken 密码token，用于用户验证使用]
     * @param  {String} password [用户密码]
     */
	passToken : function(password){
		var passToken = $hash.md5($hash.md5('XPLUES-'+password+'-TOKEN-2015'));
		return passToken;
	},

    /**
     * [passToken 密码token，用于用户验证使用]
     * @param  {String} password [用户密码]
     */
    accessToken : function(){
        var passToken = $hash.md5($hash.md5('XPLUSE-'+new Date().getTime()+'-TOKEN-2015'));
        return passToken;
    },

    /**
     * [formatToStamp 将日期转为时间戳]
     * @param  {String} data [2015年5月5日]
     * @return {Bigint} int  [1430438400000] 
     */
    formatToStamp : function(data){
        var time = data.replace(/(年|月)/gi,"-").split("日")[0];
        var stamp = new Date(time).getTime();
        return stamp;
    },

    /**
     * [formatArray 对象如果有undefined，转为null]
     * @param  {Object} obj [对象]
     */
    formatArray : function(obj){
        for(x in obj){
            if(obj[x] == undefined){
                obj[x] = null;
            }
        }
        return obj;
    },

    /**
     * [sexyToNum 将文字性别转为01标示]
     * @param  {String} sexy [男：1，女：0]
     */
    sexyToNum : function(sexy){
        var sex = sexy === "男" ? "1" : "0";
        return sex;
    },
    /**
     * [safeData description]
     * @param  {Object} data [对象数据]
     */
    safeData : function(data){
        delete data.user_id;
        delete data.user_token;
        delete data.user_access;
        delete data.user_regType;
        delete data.user_password;
        delete data.user_token_id;
        return data;
    }
};

module.exports = serverUtil;

