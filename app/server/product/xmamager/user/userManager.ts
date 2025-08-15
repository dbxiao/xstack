/**
 * @name userManager
 * @description user manager platform. include user list, user detail, user permission etc.
 * @date 2025-08-10
 * @copyright dbxiao#foxmail.com
 */

import Page from '@server/product/base/page'

export const createUser = async (req: any, res: any) => {
    const { body } = req
    const { username, password } = body
    if (!username || !password) {
        return res.send({
            ret: 1,
            msg: 'username or password is empty'
        })
    }
} 