/**
 * @author dbxiao
 * @description Create globalConfig
 */
const RES = 'res'
const VIEW = 'view'

const serverConf = {
     // template engine
     VIEWS_ENGINE: 'html',
     // static folder
     RES: RES,
     // template folder
     VIEW: VIEW,
     // app 
     APP_DIR: './app',
     // webroot folder
     WEBROOT_DIR: './webroot/',
     // static files folder
     STATIC_DIR: './webroot/' + RES + '/',
     // template files folder
     VIEW_DIR: './webroot/' + VIEW + '/',
     // config folder
     CONF_DIR: './config/',
     // database folder
     DATA_DIR: './app/database/',
     // Server folder
     SERV_DIR: './app/server/',
     // Router folder
     ROUTER_DIR: './app/router/',
     // Temp folder
     TEMP_DIR: './temp/',
     // Log folder
     LOGS_DIR: './logs/',
     // Favicons
     FAVICONS_DIR: './config/favicon.ico',
     // DEV IP & PORT
     DEV_IP: '127.0.0.1',
     DEV_PORT: 18080,
}

export default serverConf
