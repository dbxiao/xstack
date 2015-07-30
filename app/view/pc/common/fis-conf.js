var now = new Date();
var time = [now.getFullYear(), now.getMonth()+1, now.getDate(), now.getHours() , now.getMinutes(), now.getSeconds()].join("");

var product = "pc",
    namespace = "common";

fis.config.merge({
    product : product,
    namespace : namespace,
    project : { md5Length : 8 },
    roadmap : {
        path : [
            /**
             * 模板编译规则
             */
            {
                reg : /^\/(page|layout|widget)\/(.+\.html)$/i,
                isMod : false,
                release : '/view/${product}/${namespace}/$1/$2',
                id : '$1/$2'
            },
            /**
             * 静态文件编译规则
             */
            {
                reg : /^\/(page|layout|widget|static)\/(.*\.(js|css|jpg|png|gif|tpl))$/i,
                isMod : false,
                release : '/static/${product}/${namespace}/$1/$2',
                id : '$1/$2',
                query : "?t="+time
            }
        ]
    },
    settings : {
        optimizer : {
            "uglify-js" : {
                mangle: {
                    except: "exports, module, require, define"
                }
            }
        },
        postprocessor : {
            jswrapper : {
                type:'amd'
            }
        }
    },
    modules : {
        parser : {
            css : ["less"]
        },
        postpackager : "simple"
    },
    pack : {
        //base-all.js
        "static/js/import/base-all.js": [
            /static\/js\/lib\/(.*?).js$/,
            /static\/js\/extend\/(.*?).js$/,
            /static\/js\/util\/(.*?).js$/
        ],
        //base-all.css
        "static/css/import/base-all.css": [
            /static\/css\/(.*?).css$/
        ]
    },
    deploy : {
        //fis relase -wopd local //o: 压缩，p：合并，d：发布
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

        ]
    }
});