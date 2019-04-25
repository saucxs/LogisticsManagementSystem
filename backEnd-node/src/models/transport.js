const {query} = require('../utils/db');

/*获取运输单列表 - 分页 */
let getTransportListPagination= function (role, content, pageIndex, pageNum) {
    let sql;
    if(content){
        console.log('0000000000000000000000000000000000000000000000000000000000000999999999999999999999999999999999')
        sql = `SELECT * FROM transport_list WHERE operator_role = ${role} and is_show = 1 AND CONCAT(transport_id, order_id, car_code) like "%${content}%" ORDER BY transport_time DESC LIMIT ${pageIndex},${pageNum}`
        return query(sql, [role, content, pageIndex, pageNum ])
    }else{
        sql = "SELECT * FROM transport_list WHERE operator_role = ? and is_show = ? ORDER BY transport_time DESC LIMIT ?,?"
        return query(sql, [role, 1, pageIndex, pageNum ])
    }
}

/*获取运输单列表 - 总数 */
let getTransportListTotal= function (role, content) {
    if(content) {
        console.log('1111111111111111111111111111122222222222222222222222222222222222222222222222222222222')
        let sql = `SELECT * from transport_list where operator_role = ${role} and is_show = 1 and CONCAT(transport_id, order_id, car_code) like "%${content}%"`
        return query(sql, [role, content])
    }else{
        let sql = "SELECT * from transport_list where operator_role = ? and is_show = ?"
        return query(sql, [role, 1])
    }
}

/*添加运输单*/
let addNewTransport= function (value) {
    // console.log(value, '+++++++++++++++++++++++++++++++++++++')
    let sql = "insert into transport_list(transport_id, transport_state, transport_time, order_id, transport_path, car_code, car_driver, car_escort, operator_role, operator_name, remark, is_show) values(?,?,?,?,?,?,?,?,?,?,?,?)"
    return query(sql, value)
}


/*修改运输单*/
let editNewTransport= function (transport_state, transport_time, transport_path, car_code, car_driver, car_escort, operator_role, operator_name, remark, transport_id, id) {
    // console.log(transport_state, transport_time, transport_path, car_code, car_driver, car_escort, operator_role, operator_name, remark, transport_id, id, '==============================')
    let sql = "update transport_list set transport_state = ?, transport_time = ?, transport_path = ?, car_code = ?, car_driver = ?, car_escort = ?, operator_role = ?, operator_name = ?, remark = ? where transport_id = ? AND  id = ?"
    return query(sql, [transport_state, transport_time, transport_path, car_code, car_driver, car_escort, operator_role, operator_name, remark, transport_id, id])
}

/*删除运输单*/
let deleteTransport= function (value) {
    // console.log(value, '-------------------------------')
    let sql = "update transport_list set is_show = ? where transport_id = ?"
    return query(sql, value)
}

module.exports = {
    getTransportListPagination,
    getTransportListTotal,
    addNewTransport,
    editNewTransport,
    deleteTransport
}

