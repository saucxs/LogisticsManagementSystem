const {query} = require('../utils/db');

/*获取运输单列表 - 分页 */
let getTransportListPagination= function (role, content, name, state, pageIndex, pageNum) {
    let sql;
    if(content){
        if(role == 1 || role == 2){
            sql = `SELECT * FROM transport_list WHERE operator_role >= ${role} and is_show = 1 AND CONCAT(transport_id, order_id, car_code) like "%${content}%" ORDER BY transport_time DESC LIMIT ${pageIndex},${pageNum}`
            return query(sql, [role, content, pageIndex, pageNum ])
        }else if(role == 3 || role == 4){
            console.log('676767676767676767')
            sql = `SELECT * FROM transport_list WHERE (car_driver = "${name}" or car_escort = "${name}" or transport_state = 0) and is_show = 1 AND CONCAT(transport_id, order_id, car_code) like "%${content}%" ORDER BY transport_time DESC LIMIT ${pageIndex},${pageNum}`
            return query(sql, [content, name, state, pageIndex, pageNum ])
        }
    }else{
        if(role == 1 || role == 2){
            sql = `SELECT * FROM transport_list WHERE operator_role >= ${role} and is_show = 1 ORDER BY transport_time DESC LIMIT ${pageIndex},${pageNum}`
            return query(sql, [role, 1, pageIndex, pageNum ])
        }else if(role == 3 || role == 4){
            sql = "SELECT * FROM transport_list WHERE (car_driver = ? or car_escort = ? or transport_state = ?) and is_show = 1 ORDER BY transport_time DESC LIMIT ?,?"
            return query(sql, [ name, name, 0, pageIndex, pageNum ])
        }
    }
}

/*获取运输单列表 - 总数 */
let getTransportListTotal= function (role, content, name, state) {
    if(content) {
        if(role == 1 || role == 2){
            let sql = `SELECT * from transport_list where operator_role >= ${role} and is_show = 1 and CONCAT(transport_id, order_id, car_code) like "%${content}%"`
            return query(sql, [role, content])
        }else if(role == 3 || role == 4){
            let sql = `SELECT * from transport_list where (car_driver = "${name}" or car_escort = "${name}" or transport_state = 0) and is_show = 1 and CONCAT(transport_id, order_id, car_code) like "%${content}%"`
            return query(sql, [role, name, state, content])
        }
    }else{
        if(role == 1 || role == 2){
            let sql = `SELECT * from transport_list where operator_role >= ${role} and is_show = 1`
            return query(sql, [role, 1])
        }else if(role == 3 || role == 4){
            let sql = "SELECT * from transport_list where (car_driver = ? or car_escort = ? or transport_state = ?) and is_show = ?"
            return query(sql, [name, name,0, 1])
        }
    }
}

/*添加运输单*/
let addNewTransport= function (value) {
    let sql = "insert into transport_list(transport_id, transport_state, transport_time, transport_date, order_id, transport_path, car_code, car_driver, car_escort, operator_role, operator_name, remark, is_show) values(?,?,?,?,?,?,?,?,?,?,?,?,?)"
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
    let sql = "update transport_list set is_show = ? where transport_id = ?"
    return query(sql, value)
}

/*查询运输单*/
let queryTransport= function (value) {
    let sql = "select * from transport_list where order_id = ?"
    return query(sql, [value])
}

module.exports = {
    getTransportListPagination,
    getTransportListTotal,
    addNewTransport,
    editNewTransport,
    deleteTransport,
    queryTransport,
}

