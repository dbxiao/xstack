/**
 * @author [dbxiao]
 * @data   [2015-08]
 * @desc   [hi，friends！
 *          xstack使用xbear作为编译和发布工具，
 *          想了解更过xbear，请访问：https://github.com/dbxiao/xbear]
 */

var product = "pc",
    namespace = "home";

fis.config.merge({
    product: product,
    namespace: namespace,

    /** pack:打包策略 */
    pack : {
        'pkg/home_widget.js': [
            /widget\/(.*?).js$/
        ],
        'pkg/home_widget.css': [
            /widget\/(.*?).css$/
        ]
    },

    /** 发布策略 */
    deploy : {
        local: [{
            from: "/view",
            include: '**.html',
            to: "../../../x-output/"
        }, {
            from: "/static",
            include: /.*\.(?:js|css|png|jpg|gif|tpl).*/,
            to: "../../../x-output/"
        }]
    }
});
