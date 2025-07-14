/**
 * @name sqlQuery
 * @description 自定义sql查询
 * @author dbxiao@foxmail.com
 * @copyright dbxiao@foxmail.com
 */
import { sqlConnect } from '@database/comm/sqlConnect'

/**
 * SELECT 查询
 * @param table 表名
 * @param columns 查询列
 * @param where 条件
 * @returns 查询结果
 */
export async function select(table: string, columns: string[] = ['*'], where?: { [key: string]: any }) {
    const columnStr = columns.join(', ')
    let sql = `SELECT ${columnStr} FROM ${table}`
    let values: any[] = []

    if (where) {
        const whereClauses = Object.keys(where).map(key => `${key} = ?`)
        sql += ` WHERE ${whereClauses.join(' AND ')}`
        values = Object.values(where)
    }

    return sqlConnect(sql, values)
}

/**
 * INSERT 插入
 * @param table 表名
 * @param data 插入数据
 * @returns 插入结果
 */
export async function insert(table: string, data: { [key: string]: any }) {
    const columns = Object.keys(data)
    const values = Object.values(data)
    const placeholders = columns.map(() => '?').join(', ')
    const columnStr = columns.join(', ')
    const sql = `INSERT INTO ${table} (${columnStr}) VALUES (${placeholders})`;
    return sqlConnect(sql, values)
}

/**
 * UPDATE 更新
 * @param table 表名
 * @param data 更新数据
 * @param where 条件
 * @returns 更新结果
 */
export async function update(table: string, data: { [key: string]: any }, where: { [key: string]: any }) {
    const setClauses = Object.keys(data).map(key => `${key} = ?`)
    const whereClauses = Object.keys(where).map(key => `${key} = ?`)
    const values = [...Object.values(data), ...Object.values(where)]
    const sql = `UPDATE ${table} SET ${setClauses.join(', ')} WHERE ${whereClauses.join(' AND ')}`

    return sqlConnect(sql, values)
}

/**
 * DELETE 删除
 * @param table 表名
 * @param where 条件
 * @returns 删除结果
 */
export async function deleteData(table: string, where: { [key: string]: any }) {
    const whereClauses = Object.keys(where).map(key => `${key} = ?`)
    const values = Object.values(where)
    const sql = `DELETE FROM ${table} WHERE ${whereClauses.join(' AND ')}`

    return sqlConnect(sql, values)
}

/**
 * @name sqlQuery
 * @description 自定义sql查询
 * @author dbxiao@foxmail.com
 * @copyright dbxiao@foxmail.com
 */
export async function sqlQuery(sqlQuery: string, values: any[] = []) {
    return sqlConnect(sqlQuery, values)
}