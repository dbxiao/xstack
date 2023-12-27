import { Request, Response} from "express"

const home =  (_: Request, res?: Response<any>) => {
    res?.redirect('/res/libsx')
}

export default home