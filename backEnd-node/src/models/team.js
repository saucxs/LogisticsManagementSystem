const {query} = require('../utils/db');

/*获取人员列表 - 分页 */
let getTeamListPagination = function (role, content, pageIndex, pageNum) {
    let sql;
    if(content){
        sql = `SELECT * FROM user_info WHERE role >= ${role} and is_show = 1 AND name like "%${content}%" ORDER BY activateDate DESC LIMIT ${pageIndex},${pageNum}`
        return query(sql, [role, content, pageIndex, pageNum ])
    }else{
        sql = "SELECT * FROM user_info WHERE role >= ? and is_show = ? ORDER BY activateDate DESC LIMIT ?,?"
        return query(sql, [role, 1, pageIndex, pageNum ])
    }
}


/*获取人员列表 - 总数 */
let getTeamListTotal = function (role, content) {
    if(content) {
        let sql = `SELECT * from user_info where role >= ${role} and is_show = 1 and name like "%${content}%"`
        return query(sql, [role, content])
    }else{
        let sql = "SELECT * from user_info where role >= ? and is_show = ?"
        return query(sql, [role, 1])
    }
}

/*添加仓库*/
let addNewStore = function (value) {
    let sql = "insert into store_list(store_code, store_name, store_address, store_time, shelves_num, goods_num, operator_name, operator_role, remark, is_show) values(?,?,?,?,?,?,?,?,?,?)"
    return query(sql, value)
}

/*修改仓库*/
let editNewStore = function (store_code, store_name, store_address, store_time, shelves_num, goods_num, operator_name, operator_role, remark, id) {
    console.log(store_code, store_name, store_address, store_time, shelves_num, goods_num, operator_name, operator_role, remark, '==============================')
    let sql = "update store_list set store_code = ?, store_name = ?, store_address = ?, store_time = ?, shelves_num = ?, goods_num = ?, operator_name = ?, operator_role = ?, remark = ? where id = ?"
    return query(sql, [store_code, store_name, store_address, store_time, shelves_num, goods_num, operator_name, operator_role, remark, id])
}

/*删除仓库*/
let deleteStore = function (value) {
    console.log(value, '-------------------------------')
    let sql = "update store_list set is_show = ? where id = ?"
    return query(sql, value)
}

module.exports = {
    getTeamListPagination,
    getTeamListTotal,
    addNewStore,
    editNewStore,
    deleteStore
}
