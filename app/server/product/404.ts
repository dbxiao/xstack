import { Request, Response, NextFunction} from "express"

const PG404 =  (_: any, res?: Response<any>, next?: NextFunction) => {
    res?.send({
        code: 404,
        msg: 'Not Found. Please try again later. or check your visit site is right. or have right permissions.'
    })
}

export default PG404