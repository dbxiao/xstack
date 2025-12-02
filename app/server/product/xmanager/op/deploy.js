/**
 * Deploy
 */

const ChildProcess = require("child_process")
const Page = require('../../base/page')
const Code = require('@widgets/conf/error_code')
class DeployManager extends Page {
	constructor(props) {
		super(props)
		this.fetchFile()
	}

	fetchFile() {
		const { loginStatus } = this.checkLoginStatus()
		const { path } = this.props.req
		const { branch, repository } = this.props.req.query
		const remote = `https://oauth2:${process.env.GITLAB_TOKEN}@gitlab.dipeak.com/${repository}`
		const tempFolder = global.nodeConf.TEMP_DIR
		const folder = 'di-deploy'

		if ( loginStatus !== true ) {
            this.send({
				code: Code[403].code,
				msg: Code[403].msg,
				data: path
			})
        }

		const shell = `
			rm -fr ${tempFolder}
			mkdir -p ${tempFolder}
			cd ${tempFolder}
			git clone -b ${branch} ${remote}
			cp -frp ${folder}/res/* ${global.nodeConf.STATIC_DIR}/
			cp -frp ${folder}/view/* ${global.nodeConf.VIEW_DIR}/
		`
		ChildProcess.exec(shell, (error, stdout, stderr) => {
			console.log(error)
			this.send({code: 0, error, stdout, stderr})
		})
	}
}

module.exports = DeployManager
