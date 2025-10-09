/**
 * @class Page
 * @date 2019-04-18
 * @author dbxiao
 * @description 落地页Page基类
 */

import fs  from 'fs'
import Hash  from '@common/hash'
import Util  from '@common/util'
import RestAPI  from '@common/restAPI'
import { log } from '@plugin/libs'

const { 
    PREFIX,
    BACKEND_PROXY_URI, 
    DEVOPS_PROXY_URI, 
    DITEST_PROXY_URI, 
    XENGINE_PROXY_URI, 
    ASKMETA_PROXY_URI
} = process.env

class Page {
    constructor(props) {
        this.props = props

        /**
         * 页面基础数据
         */
        this.state = {
            ret: 0, // 返回码
            data: {
                user: this.getUserInfo(),
                env: {
                    PREFIX,
                    BACKEND_PROXY_URI,
                    DEVOPS_PROXY_URI,
                    DITEST_PROXY_URI,
                    XENGINE_PROXY_URI,
                    ASKMETA_PROXY_URI
                },
                product: {} // 由于fs.readdirSync(global.nodeConf.VIEW_DIR)是一个IO操作，请在各项目开发
            }, // 返回数据
            msg: '' // 返回信息
        }
    }



    /**
     * 设置通用state
     * @param {String} key
     * @param {Any} value
     */
    setState(key, value) {
        if (Util.hasProperty(this.state, key)) {
            this.state[key] = value;
            return true;
        }
        return false;
    }

    /**
     * 设置通用data
     * @param {String} key
     * @param {Any} value
     */
    setData(key, value) {
        if (Util.hasProperty(this.state.data, key)) {
            this.state.data[key] = value;
            return true;
        }
        return false;
    }

    /**
     * 检查登录状态和state
     */
    checkLoginStatus() {
        const { cookies, query } = this.props.req
        const { u_token = '' } = cookies
        const { state = '' } = query
        let data = {
            loginStatus: false,
            state
        }

        if (u_token) {
            let tokenArr = u_token.split('|')
            let token = tokenArr[0]
            let open_id = tokenArr[1]
            let expiresTime = tokenArr[2]

            if (this.verifyToken(token, open_id, expiresTime) === true) {
                data = {
                    loginStatus: true,
                    state
                }
            }
        }

        Console.log('@page::checkLoginStatus', data)
        return data
    }

    /**
     * GetUserInfo
     * @description This function include login status and user detail information
     */
    getUserInfo() {
        const { loginStatus } = this.checkLoginStatus()
        const { cookies } = this.props.req
        const { u_info = '' } = cookies

        if (loginStatus === true) {
            let infoArr = u_info.split("|")
            let name = infoArr[0]
            let avatar = infoArr[1]

            return {
                name,
                avatar,
                loginStatus: true
            }
        }

        return {
            loginStatus: false
        }
    }

    /**
     * 跳转到登录页
     */
    go2Login() {
        const { protocol, host, originalUrl } = this.props.req;
        const hostHeader = this.props.req.get('host')
        const port = new URL(`http://${hostHeader}`).port || '80'
        const redirectUrl = protocol + '://' + host + ':' + port + originalUrl;
        const loginURI = `${RestAPI.WEB_LOGIN_URI}?redirectUrl=${encodeURIComponent(redirectUrl)}`
        Console.log('@page::go2Login', loginURI)
        this.props.res.redirect(302, loginURI)
    }

    /**
     * 创建用户Token
     * @param {Sting} open_id 用户id
     * @param {String} expiresTime 过期时间
     * @returns String
     */
    createToken(open_id, expiresTime) {
        const secret = global.nodeConf.FEISHU_APP_SECRET
        const uToken = Hash.md5(`${open_id}${expiresTime}${secret}`)
        return uToken
    }

    /**
     * 验证Token正确性
     * @param {String} token u-token
     * @param {String} open_id 用户id
     * @param {String} expiresTime 过期时间
     * @returns Boolean
     */
    verifyToken(token, open_id, expiresTime) {
        const uToken = this.createToken(open_id, expiresTime)
        return token === uToken ? true : false
    }

    getPPEView(filePath) {
        try {
            fs.accessSync(`${global.nodeConf.VIEW_DIR}${filePath}.html`, fs.constants.R_OK);
            Console.log('@page::getPPEView', `file can read:  ${global.nodeConf.VIEW_DIR}@@${filePath}`)
            return true;
        } catch (err) {
            Console.log('@page::getPPEView error: ', err)
            return false;
        }
    }

    /**
     * 页面输出
     */
    render() {
        if (this.state.ret === 0 && this.props._view) {

            const usePPE = parseInt(this.props.req.get('X-DI-PPE'))
            const dirName = this.props.req.get('X-DI-FE');
            const filePath = `${dirName}/${this.props._view}`

            if (usePPE === 1 && dirName && this.getPPEView(filePath)) {
                Console.log('@page::render PPE render: ', usePPE, dirName, filePath)
                this.props.res.render(filePath, this.state)
            } else {
                this.props.res.render(this.props._view, this.state)
            }

        } else if (this.state.ret === 0 && !this.props._view) {
            this.props.res.send(this.state)
        } else {
            this.props.res.send(this.state) // 此处应该返回404页面，TODO @double
        }
    }

    /**
     * 数据输出
     * @param {Object} obj 数据对象
     */
    send(obj) {
        const { req, res } = this.props
        res.set({
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': req.headers.origin || '*',
            'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
            'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
            'Content-Type': 'application/json; charset=utf-8'
        })
        req.method === 'OPTIONS' ? res.status(204).end() : res.send(obj)
    }
}

export default Page
