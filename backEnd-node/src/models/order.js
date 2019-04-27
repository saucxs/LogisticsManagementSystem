const {query} = require('../utils/db');

/*获取订单列表 - 分页 */
let getOrderListPagination = function (role, content, pageIndex, pageNum) {
    let sql;
    if(content){
        sql = `SELECT * FROM order_list WHERE operator_role = ${role} and is_show = 1 AND CONCAT(order_id, order_name, order_receiver_name, order_receiver_phone) like "%${content}%" ORDER BY order_time DESC LIMIT ${pageIndex},${pageNum}`
        return query(sql, [role, content, pageIndex, pageNum ])
    }else{
        sql = "SELECT * FROM order_list WHERE operator_role = ? and is_show = ? ORDER BY order_time DESC LIMIT ?,?"
        return query(sql, [role, 1, pageIndex, pageNum ])
    }
}

/*获取订单列表select */
let getOrderListMap = function (role) {
    console.log(role, '-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
    let sql;
    sql = `SELECT order_id, order_name FROM order_list WHERE operator_role = ${role} and is_show = 1 and order_status = 1  ORDER BY order_time DESC`
    return query(sql, [role])
}


/*获取订单列表 - 总数 */
let getOrderListTotal = function (role, content) {
    if(content) {
        let sql = `SELECT * from order_list where operator_role = ${role} and is_show = 1 and CONCAT(order_id, order_name, order_receiver_name, order_receiver_phone) like "%${content}%"`
        return query(sql, [role, content])
    }else{
        let sql = "SELECT * from order_list where operator_role = ? and is_show = ?"
        return query(sql, [role, 1])
    }
}

/*添加订单*/
let addNewOrder = function (value) {
    let sql = "insert into order_list(order_id, order_name, order_goods, order_time,order_date, order_receiver_name, order_receiver_phone, order_receiver_address, operator_name, operator_role, remark, is_show, order_status) values(?,?,?,?,?,?,?,?,?,?,?,?,?)"
    return query(sql, value)
}

/*修改订单*/
let editNewOrder = function (order_name, order_goods, order_time, order_receiver_name, order_receiver_phone, order_receiver_address, operator_name, operator_role, remark, order_id, id) {
    console.log(order_name, order_goods, order_time, order_receiver_name, order_receiver_phone, order_receiver_address, operator_name, operator_role, remark, order_id, '==============================')
    let sql = "update order_list set order_name = ?, order_goods = ?, order_time = ?, order_receiver_name = ?, order_receiver_phone = ?, order_receiver_address = ?, operator_name = ?, operator_role = ?, remark = ? where order_id = ? AND  id = ?"
    return query(sql, [order_name, order_goods, order_time, order_receiver_name, order_receiver_phone, order_receiver_address, operator_name, operator_role, remark, order_id, id])
}

/*删除订单*/
let deleteOrder = function (value) {
    console.log(value, '-------------------------------')
    let sql = "update order_list set is_show = ? where order_id = ?"
    return query(sql, value)
}

/*更新订单订单状态*/
let updateOrderState = function (value) {
    console.log(value, '-------------------------------')
    let sql = "update order_list set order_status = ? where order_id = ?"
    return query(sql, value)
}

module.exports = {
    getOrderListPagination,
    getOrderListTotal,
    getOrderListMap,
    addNewOrder,
    editNewOrder,
    deleteOrder,
    updateOrderState
}
