/**
 * @author [dbxiao]
 * @data   [2015-08]
 * @desc   [hi，friends！
 *          xstack使用xbear作为编译和发布工具，
 *          想了解更过xbear，请访问：https://github.com/dbxiao/xbear]
 */

fis.set('product', 'pc');
fis.set('namespace', 'home');

fis.deploy.getLocalFisConf(fis.get("product"), fis.get("namespace"));

// CSS合并规则
fis.match('*.css', {
    packTo: '/pkg/pak-'+fis.get("namespace")+'.css'
});

// JS合并规则
fis.match('*.js', {
    packTo: '/pkg/pak-'+fis.get("namespace")+'.js'
});

// 本地开发规则
fis.match('*', {
    deploy: fis.plugin('local-deliver', {
        to: '../../../x-output/'
    })
});
