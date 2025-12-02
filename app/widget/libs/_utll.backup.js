/**
 * @author dbxiao
 * @date 2014-11-11
 * @description 提供 server 工具库方法，包含各种常用的辅助函数
 */
const util = {
    /**
     * 生成唯一 ID
     * @returns {String} 唯一 ID 字符串
     */
    getUnitId: () => {
		return parseInt(Math.random() * new Date().getTime()).toString(36)
	},
    
    /**
     * 转义 HTML 特殊字符
     * @param {String} text - 待转义的文本
     * @returns {String} 转义后的文本
     */
    escapeHtml:  (text) => {
        var map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }

        if (text === undefined || text === null) {
            return text
        }

        return text.replace(/[&<>"']/gi, function (m) {
            return map[m];
        });
    },

    /**
     * 获取请求参数
     * @param {Object} req - 请求对象
     * @param {String} param - 参数名
     * @returns {String} 参数值
     */
    getQueryParam: function (req, param) {
        let params = req.query[param]
        return params
    },

    /**
     * @method str2Obj [将对象返回值字符串格式化]
     * @param {Object results}[对象参数]
     * @return {String}[字符串]
     */
    str2Obj: function (results) {
        return JSON.stringify(results);
    },

    /**
     * @method checkPostParam [遍历post参数是否为空]
     * @param  {Object results}[对象参数]
     * @return {String}[字符串]
     */
    checkPostParam: function (postData) {
        for (let x in postData) {
            if (postData[x] == "") {
                return false;
            }
        }
        return true;
    },

    /**
     * 对象转参数格式化
     * @param {Object} obj 需要转义的目标对象
     * @param {String} type 转化连字符：&
     */
    objFormatParam: function (obj, type) {
        let param = '';
        let i = 0;
        let _type = type || '&';

        if (typeof obj === 'object') {
            for (let x in obj) {
                param += i === 0 ? x + '=' + obj[x] : _type + x + '=' + obj[x];
                i++;
            }
        }

        return param;
    },

    /**
     * @method formatSqlParam [将查询对象抓换位sql 查询字符串]
     * @param {Object results}[对象]
     * @return {String}[字符串]
     */
    formatSqlParam: function (param) {
        var sqlParam = [];
        for (var i in param) {
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
    formatStaticPath: function (path) {
        return path.replace(/^app\\/, '\\');
    },
    
    /**
     * [formatToStamp 将日期转为时间戳]
     * @param  {String} data [2015年5月5日]
     * @return {Bigint} int  [1430438400000]
     */
    formatToStamp: function (data) {
        var time = data.replace(/(年|月)/gi, "-").split("日")[0];
        var stamp = new Date(time).getTime();
        return stamp;
    },

    /**
     * [formatArray 对象如果有undefined，转为null]
     * @param  {Object} obj [对象]
     */
    formatArray: function (obj) {
        for (let x in obj) {
            if (obj[x] == undefined) {
                obj[x] = null;
            }
        }
        return obj;
    },

    /**
     * 
     * @param {Object} obj - 待转换的对象
     * @returns {String} 转换后的字符串
     */
	obj2Str:  (obj) => {
		var str = "";
		for (var x in obj) {
			str += str === "" ? x + "=" + obj[x] : "&" + x + "=" + obj[x];
		}
		return str;
	},

    

    // 安全的hasOwnProperty
    hasProperty: (obj, child) => {
        return Object.prototype.hasOwnProperty.call(obj, child)
    },

    /**
     * 获取二级域名或者IP地址
     * @param {String} host IP|HostName
     * @returns secondHost| IP
     */
    getSecondDomainOrIP: (host) => {
        const isIP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host)
        if (isIP) {
            return host
        } 
        const domainArr = host.split('.')
        if (domainArr.length > 2) {
            return domainArr.slice(1).join('.')
        } 
        return host
    },

    getCookie: (name, cookieStr) => {
        let c_start = '',
        c_end = null

        if (cookieStr && cookieStr.length > 0) {
            c_start = cookieStr.indexOf(name + '=')
            if (c_start !== -1) {
                c_start = c_start + name.length + 1
                c_end = cookieStr.indexOf(';', c_start)
                if (c_end === -1) {
                    c_end = cookieStr.length
                }
                return decodeURIComponent(cookieStr.substring(c_start, c_end))
            }
        }
        return ''
    }
}

module.exports = util;