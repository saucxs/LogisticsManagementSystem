const {query} = require('../utils/db');

/*获取仓库列表 - 分页 */
let getStoreListPagination= function (role, content, pageIndex, pageNum) {
    let sql;
    console.log(content, '000000000000000000000000000')
    if(content){
        console.log(content, '111111111111111111111111')
        sql = `SELECT * FROM store_list WHERE operator_role = ${role} and is_show = 1 AND CONCAT(store_code, store_name) like "%${content}%" ORDER BY store_time DESC LIMIT ${pageIndex},${pageNum}`
        return query(sql, [role, content, pageIndex, pageNum ])
    }else{
        sql = "SELECT * FROM store_list WHERE operator_role = ? and is_show = ? ORDER BY store_time DESC LIMIT ?,?"
        return query(sql, [role, 1, pageIndex, pageNum ])
    }
}


/*获取仓库列表 - 总数 */
let getStoreListTotal= function (role, content) {
    if(content) {
        let sql = `SELECT * from store_list where operator_role = ${role} and is_show = 1 and CONCAT(store_code, store_name) like "%${content}%"`
        return query(sql, [role, content])
    }else{
        let sql = "SELECT * from store_list where operator_role = ? and is_show = ?"
        return query(sql, [role, 1])
    }
}

/*添加仓库*/
let addNewStore= function (value) {
    console.log(value, '+++++++++++++++++++++++++++++++++++++')

    let sql = "insert into order_list(order_id, order_name, order_goods, order_time, order_receiver_name, order_receiver_phone, order_receiver_address, operator_name, operator_role, remark,is_show) values(?,?,?,?,?,?,?,?,?,?,?)"
    return query(sql, value)
}

/*修改仓库*/
let editNewStore= function (order_name, order_goods, order_time, order_receiver_name, order_receiver_phone, order_receiver_address, operator_name, operator_role, remark, order_id, id) {
    console.log(order_name, order_goods, order_time, order_receiver_name, order_receiver_phone, order_receiver_address, operator_name, operator_role, remark, order_id, '==============================')
    let sql = "update order_list set order_name = ?, order_goods = ?, order_time = ?, order_receiver_name = ?, order_receiver_phone = ?, order_receiver_address = ?, operator_name = ?, operator_role = ?, remark = ? where order_id = ? AND  id = ?"
    return query(sql, [order_name, order_goods, order_time, order_receiver_name, order_receiver_phone, order_receiver_address, operator_name, operator_role, remark, order_id, id])
}

/*删除仓库*/
let deleteStore= function (value) {
    console.log(value, '-------------------------------')
    let sql = "update order_list set is_show = ? where order_id = ?"
    return query(sql, value)
}

module.exports = {
    getStoreListPagination,
    getStoreListTotal,
    addNewStore,
    editNewStore,
    deleteStore
}
