/**
 * @author dbxiao
 */
const fs = require('fs')
const Page = require('../base/page')
const RestAPI = require('../../common/restAPI')

class Operation extends Page {
    constructor(props) {
        super(props)
        this.init()
    }

    init() {
        const { loginStatus } = this.checkLoginStatus()
        const readdir = fs.readdirSync(global.nodeConf.VIEW_DIR)

        if (loginStatus === true) {
            this.setData('product', readdir)
            this.render()
        } else {
            this.go2Login({
                redirect: encodeURIComponent(RestAPI.WEB_OPERATION_URI)
            })
        }
        return false
    }

}

module.exports = Operation