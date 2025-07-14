import { Response } from "express"
import { select } from "@database/comm/sqlQuery"

const Test =  (req: any, res?: Response<any>) => {
    select('users', ['username', 'status'])
        .then((result) => {
            res?.send({
                code: 'test!',
                msg: result
            })
        }).catch(error => {
            res?.send({
                code: 'error!',
                msg: error
            })
        })
}

export default Test