/**
 * @name sqlQuery
 * @description 数据库操作工具类
 * @author AI
 * @date 2023-11-15
 */

import { sqlConnect } from '@database/comm/sqlConnect'
import { Code } from "@widget/constant/code"
import { objIsEmpty } from '@widget/libs';

/**
 * @name select
 * @description 查询数据
 * @param table 表名
 * @param columns 查询列，默认查询所有列
 * @param where 条件对象，格式: { column: value }
 * @param order 排序对象，格式: { column: 'ASC' | 'DESC' }
 * @param limit 分页参数，格式: { offset: number, count: number }
 * @returns 查询结果
 */
export async function select(
    table: string,
    columns: string[] = ['*'],
    where?: { [key: string]: any },
    order?: { [key: string]: 'ASC' | 'DESC' },
    limit?: { offset: number, count: number }
) {
    if (!table) {
        return Code[1000]
    }

    const columnStr = columns.join(', ');
    let sql = `SELECT ${columnStr} FROM ${table}`;
    let values: any[] = [];

    // 处理 WHERE 条件
    if (where && !objIsEmpty(where)) {
        const whereClauses = Object.keys(where).map(key => `${key} = '${where[key]}'`);
        sql += ` WHERE ${whereClauses.join(' AND ')}`;
        values = Object.values(where);
    }

    // 处理 ORDER BY
    if (order) {
        const orderClauses = Object.entries(order).map(([key, direction]) =>
            `${key} ${direction.toUpperCase()}`
        );
        sql += ` ORDER BY ${orderClauses.join(', ')}`;
    }

    // 处理 LIMIT
    if (limit) {
        sql += ` LIMIT ${limit.offset}, ${limit.count}`;
    }

    sql += ';';

    return sqlConnect(sql, values);
}

/**
 * @name insert
 * @description 插入数据
 * @param table 表名
 * @param data 插入数据对象，格式: { column: value }
 * @param options 可选参数，支持批量插入和ON DUPLICATE KEY UPDATE
 * @returns 插入结果
 */
export async function insert(
    table: string,
    data: { [key: string]: any } | { [key: string]: any }[],
    options?: {
        onDuplicateKeyUpdate?: { [key: string]: any }
    }
) {
    if (!table || !data) {
        return Code[1000]
    }

    let sql = '';
    let values: any[] = [];

    // 处理批量插入
    if (Array.isArray(data)) {
        if (data.length === 0) {
            return Code[1001]
        }

        const columns = Object.keys(data[0]);
        const columnStr = columns.join(', ');
        const placeholders = data.map(item =>
            '(' + columns.map(() => '?').join(', ') + ')'
        ).join(', ');

        sql = `INSERT INTO ${table} (${columnStr}) VALUES ${placeholders}`;
        values = data.flatMap(item => Object.values(item));
    } else {
        // 单条插入
        const columns = Object.keys(data);
        const columnStr = columns.join(', ');
        const placeholders = columns.map(() => '?').join(', ');

        sql = `INSERT INTO ${table} (${columnStr}) VALUES (${placeholders})`;
        values = Object.values(data);
    }

    // 处理 ON DUPLICATE KEY UPDATE
    if (options?.onDuplicateKeyUpdate) {
        const updateClauses = Object.keys(options.onDuplicateKeyUpdate)
            .map(key => `${key} = VALUES(${key})`);
        sql += ` ON DUPLICATE KEY UPDATE ${updateClauses.join(', ')}`;
    }

    return sqlConnect(sql, values);
}

/**
 * @name update
 * @description 更新数据
 * @param table 表名
 * @param data 更新数据对象，格式: { column: value }
 * @param where 条件对象，格式: { column: value }
 * @returns 更新结果
 */
export async function update(
    table: string,
    data: { [key: string]: any },
    where: { [key: string]: any }
) {
    if (!table || !data || !where) {
        return Code[1002]
    }

    const setClauses = Object.keys(data).map(key => `${key} = ?`);
    const whereClauses = Object.keys(where).map(key => `${key} = ?`);
    const values = [...Object.values(data), ...Object.values(where)];

    const sql = `UPDATE ${table} SET ${setClauses.join(', ')} WHERE ${whereClauses.join(' AND ')}`;

    return sqlConnect(sql, values);
}

/**
 * @name delete
 * @description 删除数据
 * @param table 表名
 * @param where 条件对象，格式: { column: value }
 * @returns 删除结果
 */
export async function deleteData(
    table: string,
    where: { [key: string]: any }
) {
    if (!table || !where) {
        return Code[1003]
    }

    const whereClauses = Object.keys(where).map(key => `${key} = ?`);
    const values = Object.values(where);

    const sql = `DELETE FROM ${table} WHERE ${whereClauses.join(' AND ')}`;

    return sqlConnect(sql, values);
}

/**
 * @name sqlQuery
 * @description 执行自定义SQL查询
 * @param sql sql查询语句
 * @param values sql查询参数
 * @returns 查询结果
 */
export async function sqlQuery(sql: string, values: any[] = []) {
    if (!sql) {
        return Code[1004]
    }

    return sqlConnect(sql, values);
}

/**
 * @name beginTransaction
 * @description 开始事务
 * @returns 事务连接对象
 */
export async function beginTransaction() {
    const conn = await sqlConnect('BEGIN');
    return conn;
}

/**
 * @name commit
 * @description 提交事务
 * @param conn 事务连接对象
 * @returns 提交结果
 */
export async function commit() {
    return sqlConnect('COMMIT', []);
}

/**
 * @name rollback
 * @description 回滚事务
 * @param conn 事务连接对象
 * @returns 回滚结果
 */
export async function rollback() {
    return sqlConnect('ROLLBACK', []);
}