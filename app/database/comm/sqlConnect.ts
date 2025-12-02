/**
 * @name sqlConnect
 * @description 创建SQL链接池子，并执行sql语句
 * @author dbxiao@foxmail.com
 * @copyright dbxiao@foxmail.com All rights reserved.
 */

import mariadb from 'mariadb'
import { mysqlConf } from "@database/comm/conf/mysql.conf"
import { info, log } from "@widget/libs"

const { host, user, password, database, connectionLimit } = mysqlConf.LOCAL
let pool: mariadb.Pool | any


/**
 * @name createPool
 * @description 创建连接池
 */
const createPool = () => {
    pool = mariadb.createPool({ host, user, password, database, connectionLimit })
}


/**
 * @name sqlConnect
 * @description 执行sql语句
 * @param sql sql语句
 * @param values sql语句参数
 * @returns 
 */
export async function sqlConnect(sql: string, values?: any[]) {
    let conn: any
    try {
        // 创建连接池
        if (pool) {
            conn = await pool.getConnection()
        } else {
            createPool()
            conn = await pool.getConnection()
        }

        info(sql, values)

        const result = await conn.query(sql, values)
        const { errno } = result
        if (errno) {
            return {
                affectedRows: result.affectedRows,
                insertId: result.insertId,
                warningStatus: result.warningStatus
            }
        } else {
            return result
        }
    } catch (err) {
        throw err
    } finally {
        if (conn) {
            conn.release()
        }
    }
}