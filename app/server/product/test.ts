import { Request, Response, NextFunction} from "express"
import { Console, isClass, matchPath } from '@plugin/libs'
import { getQueryParam } from '@server/common/util'

const Test =  (req: any, res?: Response<any>) => {
    const { url, method, hostname, headers  } = req
    const userAgent = headers["user-agent"].toLowerCase()
    const targetURL = getQueryParam(req, 'targetURL')

    Console.log('000000000', userAgent.includes('micromessenger'))

    if (userAgent.includes('micromessenger') === true && userAgent.includes('android') === true) {
        Console.log(111111111)
        res?.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        res?.setHeader('Content-Disposition', 'attachment; filename=jingdong.xlsx')
        res?.send({})
    } else {
        Console.log(2222222222)
        res?.redirect(301, targetURL)
    }
}

export default Test