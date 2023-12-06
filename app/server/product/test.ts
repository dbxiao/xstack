import { Request, Response, NextFunction} from "express"

// class Test {
// 	props: any
// 	constructor(props: any) {
// 		this.props = props

// 		// this.props.res.send({
// 		// 	code: 200,
// 		// 	msg:'success',
// 		// 	data: {
// 		// 		name: 'test',
// 		// 		age: 18
// 		// 	}
// 		// })

// 		this.props.res.render(this.props.view)
// 	}
// }

const Test =  (req: any, res?: Response<any>) => {
    res?.send({
        code: 'test!',
        msg: 'test page'
    })
}

export default Test