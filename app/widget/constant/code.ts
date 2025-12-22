/**
 * @name code.ts
 * @author AI
 * @date 2024-07-25
 * @description 全局错误码集合，方便统一管理和使用 Web 服务的错误码。可根据项目背景修改和定义。
 * @warning 新增或修改错误码时，需确保错误码的唯一性。
 * @example 
 * import { Code } from '@widget/constant';
 * console.log(Code[403].msg)
 * @copyright dbxiao@msn.cn. All rights reserved.
 */

// 全局错误码对象
export const Code = {
    // 成功代码
    0 : {code: 0, msg: 'success'},

    // 业务错误码（100-999)
    100: {code: 100, msg: ''},
    101: {code: 101, msg: '代理请求异常，请检查远程服务'},
    102: {code: 102, msg: '代理请求执行「setHeader trace-id」发生异常'},
    
    403: {code: 403, msg: 'Forbidden! You do not have access.'},
    404: {code: 404, msg: 'Sorry. Your page is not Found.'},
    405: {code: 405, msg: 'Sorry. Method not allowed.'},
    408: {code: 408, msg: 'Sorry. Request Timeout.'},
    500: {code: 500, msg: 'Sorry. 内部错误，请稍后再试'},

    700: {code: 700, msg: '网关内部未知错误'},
    701: {code: 701, msg: '网关内部超时'},

    // 第三方业务处理错误（800 - 899）

    // 数据库业务处理错误(1000 - 1999)
    1000: {code: 1000, msg: '表名（Table）或数据（Data）不能为空'},
    1001: {code: 1001, msg: '插入数据数组不能为空'},
    1002: {code: 1002, msg: '表名（Table）、更新数据（Data）和条件（WHERE）不能为空'},
    1003: {code: 1003, msg: '表名和条件不能为空'},
    1004: {code: 1004, msg: 'SQL语句不能为空'},
};
