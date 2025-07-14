/**
 * @author dbxiao@foxmail.com
 * @description 创建用户
 * @copyright 2025 dbxiao. All rights reserved.
 */
import { Request, Response } from "express"
import { Code } from '@plugin/constant/code'
import { insert } from '@database/comm/sqlQuery'
import { Console } from "@plugin/libs";

export const createUser = async (req: Request, res?: Response<any>) => {
    const result = await insert('users', req.body);
    const { errno, sqlMessage } = result
    if (!errno) {
        res?.send({
            code: Code[0].code,
            msg: Code[0].msg,
            data: result
        })
    } else {
        Console.error(result)
        res?.send({
            code: errno,
            msg: sqlMessage,
            data: result
        })
    }
};