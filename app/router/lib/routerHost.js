var $hostConf = require('../conf/host/host.js');
var $path = null;

var routerHost = function(host, path){

	for(x in $hostConf){
		if($hostConf[x].host == host){
			$path = ($hostConf[x].path + path).replace(/\/\//gi,"/");
			break;
		}else{
			continue;
		}
	};
	return $path;
};

module.exports = routerHost;