/**
 * @author [dbxiao]
 * @data   [2015-08]
 * @desc   [hi，friends！
 *          xstack使用xbear作为编译和发布工具，
 *          想了解更过xbear，请访问：https://github.com/dbxiao/xbear]
 */

var product = "pc",
    namespace = "common";

fis.config.merge({
    product : product,
    namespace : namespace,

    roadmap:{
        path:[
            /*** 模板编译规则（将所有html文件发布到view目录）*/
            {
                reg : /^\/(page|layout|widget)\/(.+\.html)$/i,
                isMod : false,
                release : '/view/${product}/${namespace}/$1/$2',
                id : '$1/$2'
            },
            /*** 静态文件编译规则（将所有静态文件发布到static目录）*/
            {
                reg : /^\/(page|layout|widget|static)\/(.*\.(js|css|jpg|png|gif|tpl))$/i,
                isMod : false,
                release : '/static/${product}/${namespace}/$1/$2',
                id : '$1/$2'
            }
        ]
    },

    /** pack:打包策略 */
    pack : {
        "static/js/import/base-all.js": [
            /static\/js\/lib\/(.*?).js$/,
            /static\/js\/extend\/(.*?).js$/,
            /static\/js\/util\/(.*?).js$/
        ],
        "static/css/import/base-all.css": [
            /static\/css\/(.*?).css$/
        ]
    },

    /** 发布策略 */
    deploy : {
        local : [
            {
                from : "/view",
                include : '**.html',
                to : "../../../x-output/"
            },
            {
                from : "/static",
                include : /.*\.(?:js|css|png|jpg|gif|tpl).*/,
                to : "../../../x-output/"
            }
        ],
        online : [
            //发布到线上地址策略
        ]
    }
});