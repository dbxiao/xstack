 /**
  * @class storage Javascript Library
  * @author doublexiao#tencent.com
  * @date 2019-04-22
  * @copyright tencent.com
  * @description This library is designed to solve the local storage configuration file of node service and prevent collision of multi-person collaborative naming.
  */

const storage = {

    /**
     * Redis全局配置：redis服务全局配置，不允许放置业务配置
     */
    GLOBAL: {
        ATTR: {
            
        }
    },

    /**
     * Redis业务配置：
     */
    SITE: {
        ATTR: {
            
        }
    }
};

module.exports = storage;