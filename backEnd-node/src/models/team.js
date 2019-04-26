const {query} = require('../utils/db');

/*获取人员列表 - 分页 */
let getTeamListPagination = function (role, content, pageIndex, pageNum) {
    let sql;
    if(content){
        sql = `SELECT * FROM user_info WHERE role >= ${role} and is_show = 1 and id != 1 AND name like "%${content}%" ORDER BY activateDate DESC LIMIT ${pageIndex},${pageNum}`
        return query(sql, [role, content, pageIndex, pageNum ])
    }else{
        sql = "SELECT * FROM user_info WHERE role >= ? and is_show = ? and id != 1 ORDER BY activateDate DESC LIMIT ?,?"
        return query(sql, [role, 1, pageIndex, pageNum ])
    }
}


/*获取人员列表 - 总数 */
let getTeamListTotal = function (role, content) {
    if(content) {
        let sql = `SELECT * from user_info where role >= ${role} and is_show = 1 and id != 1 and name like "%${content}%"`
        return query(sql, [role, content])
    }else{
        let sql = "SELECT * from user_info where role >= ? and is_show = ? and id != 1"
        return query(sql, [role, 1])
    }
}

/*添加仓库*/
let addNewStore = function (value) {
    let sql = "insert into store_list(store_code, store_name, store_address, store_time, shelves_num, goods_num, operator_name, operator_role, remark, is_show) values(?,?,?,?,?,?,?,?,?,?)"
    return query(sql, value)
}

/*修改人员*/
let editNewTeam = function (role, operator_time, operator_name, operator_role, id) {
    console.log(role, operator_time, operator_name, operator_role, id, '==============================')
    let sql = "update user_info set role = ?, operator_time = ?, operator_name = ?, operator_role = ? where id = ?"
    return query(sql, [role, operator_time, operator_name, operator_role, id])
}

/*删除人员*/
let deleteTeam = function (value) {
    console.log(value, '-------------------------------')
    let sql = "update user_info set is_show = ? where id = ?"
    return query(sql, value)
}

module.exports = {
    getTeamListPagination,
    getTeamListTotal,
    addNewStore,
    editNewTeam,
    deleteTeam
}
