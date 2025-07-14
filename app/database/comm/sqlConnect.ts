/**
 * @name sqlConnect
 * @description 创建SQL链接池子，并执行sql语句
 * @author dbxiao@foxmail.com
 * @copyright dbxiao@foxmail.com
 */

import mariadb from 'mariadb'
import { mysqlConf } from "@database/comm/conf/mysql.conf"

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
    let conn
    try {
        // 创建连接池
        if (pool) {
            conn = await pool.getConnection()
        } else {
            createPool()
            conn = await pool.getConnection()
        }
        const result = await conn.query(sql, values)
        const { errno } = result
        if (errno) {
            return result
        } else {
            return {
                affectedRows: result.affectedRows,
                insertId: result.insertId.toString(),
                warningStatus: result.warningStatus
            }
        }
    } catch (err) {
        throw err
    } finally {
        if (conn) conn.release()
    }
}