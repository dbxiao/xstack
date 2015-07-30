/**
 * @author [dbxiao]
 * @data   [2015-02-14]
 * @module [home]
 */


/** @page home server */
var home = function(_req, _res, _next, view){
    var rendData = {};
    var id = _req.query.shixin_id;
    
    //页面title
    _res.locals.title = "X Stack!!!";

    //模板变量
    rendData = {
        errno : 0,
        msg   : "success",
        body : {
           hello : "-----------Hello Wrold---------", 
           desc  : "Node full stack development framework", 
           title : "NodeJs全栈开发框架", 
           by    : "[dbxiao]"
        }
    };

    //页面渲染
    _res.render(view, rendData);

};
module.exports = home;