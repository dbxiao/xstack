var now = new Date();
var time = [now.getFullYear(), now.getMonth()+1, now.getDate(), now.getHours() , now.getMinutes(), now.getSeconds()].join("");

var product = "pc",
    namespace = "home";

fis.config.merge({
    product : product,
    namespace : namespace,
    project : { 
        md5Length : 8, 
        charset : 'utf8' 
    },
    roadmap : {
        path : [
            /**
             * 模板编译规则（将所有html文件发布到view目录）
             */
            {
                reg : /^\/(page|layout|widget)\/(.+\.html)$/i,
                isMod : true,
                release : '/view/${product}/${namespace}/$1/$2',
                id : '$1/$2'
            },
            /**
             * 静态文件编译规则（将所有静态文件发布到static目录）
             */
            {
                reg : /^\/(page|layout|widget|static)\/(.*\.(js|css|jpg|png|gif|tpl))$/i,
                isMod : true,
                release : '/static/${product}/${namespace}/$1/$2',
                id : '$1/$2',
                query : "?t="+time
            },
            /**
             * 其它所有静态文件规则（将合并代码打包到static目录）
             */
            {
                reg: /^.+$/,
                release: '/static/${product}/${namespace}$&',
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
    pack:{
        'pkg/home_widget.js': [
            /widget\/(.*?).js$/
        ],
        'pkg/home_widget.css': [
            /widget\/(.*?).css$/
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
        ]
    }
});