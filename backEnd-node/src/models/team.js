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
    let sql = "update user_info set role = ?, operator_time = ?, operator_name = ?, operator_role = ? where id = ?"
    return query(sql, [role, operator_time, operator_name, operator_role, id])
}

/*删除人员*/
let deleteTeam = function (value) {
    let sql = "update user_info set is_show = ? where id = ?"
    return query(sql, value)
}

/*获取人员列表select */
let getTeamListMap = function (role) {
    let sql;
    // sql = `SELECT car_code, car_name FROM car_list WHERE operator_role = ${role} and is_show = 1 and car_state = 1 ORDER BY car_time DESC`
    sql = `SELECT id, name FROM user_info WHERE is_show = 1 and role>=3 and role<=4  ORDER BY activateDate DESC`
    return query(sql, [role])
}

/*用户获取个人订单信息 */
let getPersonalListPagination = function (role, name, content, pageIndex, pageNum) {
    let sql;
    if(content){
        sql = `SELECT ol.order_id, ol.order_name, ol.order_time, ol.order_status, ol.order_receiver_name, ol.order_receiver_phone, tl.transport_id, tl.transport_state, tl.transport_time  FROM order_list as ol, transport_list as tl WHERE ol.order_id = tl.order_id and ol.order_receiver_name = "${name}" and ol.is_show = 1 AND ol.order_id like "%${content}%" ORDER BY ol.order_time DESC LIMIT ${pageIndex},${pageNum}`
        return query(sql, [content, name, pageIndex, pageNum ])
    }else{
        sql = "SELECT ol.order_id, ol.order_name, ol.order_time, ol.order_status, ol.order_receiver_name, ol.order_receiver_phone, tl.transport_id, tl.transport_state, tl.transport_time FROM order_list as ol, transport_list as tl WHERE ol.order_id = tl.order_id and ol.order_receiver_name = ? and ol.is_show = 1 ORDER BY ol.order_time DESC LIMIT ?,?"
        return query(sql, [name, pageIndex, pageNum ])
    }
}


/*用户获取个人订单信息 - 总数 */
let getPersonalListTotal = function (role, name, content) {
    if(content) {
        let sql = `SELECT ol.order_id, ol.order_name, ol.order_time, ol.order_status, ol.order_receiver_name, ol.order_receiver_phone, tl.transport_state, tl.transport_time  FROM order_list as ol, transport_list as tl where ol.order_id = tl.order_id and ol.order_receiver_name = "${name}" and ol.is_show = 1 and ol.order_id like "%${content}%"`
        return query(sql, [role, name, content])
    }else{
        let sql = "SELECT ol.order_id, ol.order_name, ol.order_time, ol.order_status, ol.order_receiver_name, ol.order_receiver_phone, tl.transport_state, tl.transport_time  FROM order_list as ol, transport_list as tl where ol.order_id = tl.order_id and ol.order_receiver_name = ? and ol.is_show = 1"
        return query(sql, [name])
    }
}

module.exports = {
    getTeamListPagination,
    getTeamListTotal,
    addNewStore,
    editNewTeam,
    deleteTeam,
    getTeamListMap,
    getPersonalListPagination,
    getPersonalListTotal,
}
