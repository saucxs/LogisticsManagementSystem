const {query} = require('../utils/db');

/*获取人员数量 */
let getPersonNumber = function (role) {
    let sql;
    sql = `SELECT count(id) as personNumber FROM user_info WHERE is_show = 1 and id != 1`
    return query(sql, [])
}

/*获取所有订单数量 */
let getAllOrderNumber = function (role) {
    let sql;
    sql = `SELECT count(id) as allOrderNumber  FROM order_list WHERE is_show = 1`
    // sql = `SELECT count(id) as allOrderNumber  FROM order_list WHERE is_show = 1`
    return query(sql, [])
}

/*获取所有运输单数量 */
let getAllTransportNumber = function (role,name) {
    if(role == 1 || role == 2){
        let sql = `SELECT count(id) as allTransportNumber  FROM transport_list WHERE is_show = 1`
        // sql = `SELECT count(id) as allTransportNumber  FROM transport_list WHERE is_show = 1`
        return query(sql, [])
    }else if(role == 3 || role == 4){
        let sql = "SELECT count(id) as allTransportNumber  FROM transport_list WHERE (car_driver = ? or car_escort =?) and is_show = 1"
        // sql = `SELECT count(id) as allTransportNumber  FROM transport_list WHERE is_show = 1`
        return query(sql, [name,name])
    }

}

/*获取不同分类订单数量 */
let getOrderNumber = function (role) {
    let sql = `SELECT order_status, count(id) as orderNumber  FROM order_list WHERE is_show = 1 group by order_status`
    // sql = `SELECT order_status, count(id) as orderNumber  FROM order_list WHERE is_show = 1 group by order_status`
    return query(sql, [])
}

/*获取不同分类运输单数量 */
let getTransportNumber = function (role,name) {
    if(role == 1 || role == 2){
        let sql = `SELECT transport_state, count(id) as transportNumber  FROM transport_list WHERE is_show = 1 group by transport_state`
        // sql = `SELECT order_status, count(id) as transportNumber  FROM transport_list WHERE is_show = 1 group by transport_state`
        return query(sql, [])
    }else if(role == 3 || role == 4){
        let sql = "SELECT transport_state, count(id) as transportNumber  FROM transport_list WHERE (car_driver = ? or car_escort =?) and is_show = 1 group by transport_state"
        // sql = `SELECT order_status, count(id) as transportNumber  FROM transport_list WHERE is_show = 1 group by transport_state`
        return query(sql, [name, name])
    }

}

/*获取最近七天的每天的订单数 */
let getOrderDate = function (role, order_date) {
    let sql;
    sql = "SELECT order_date, count(id) as orderNumber FROM order_list WHERE is_show = 1 and order_date = ?"
    // sql = "SELECT order_date, count(id) as orderNumber FROM order_list WHERE is_show = 1 and order_date = ?"
    return query(sql, [order_date])
}

/*获取最近七天的每天的运输单数 */
let getTransportDate = function (role,name,transport_date) {
    if(role == 1 || role == 2){
        let sql = "SELECT transport_date, count(id) as transportNumber FROM transport_list WHERE is_show = 1 and transport_date = ?"
        // sql = "SELECT transport_date, count(id) as transportNumber FROM transport_list WHERE is_show = 1 and transport_date = ?"
        return query(sql, [transport_date])
    }else if(role == 3 || role == 4){
        let sql = "SELECT transport_date, count(id) as transportNumber FROM transport_list WHERE (car_driver = ? or car_escort =?) and is_show = 1 and transport_date = ?"
        // sql = "SELECT transport_date, count(id) as transportNumber FROM transport_list WHERE is_show = 1 and transport_date = ?"
        return query(sql, [name,name, transport_date])
    }

}

/*获取最近七天的每天的订单数 - 订单状态 */
let getOrderDateStatus = function (role, order_date, order_status) {
    let sql;
    sql = "SELECT count(id) as orderNumber FROM order_list WHERE is_show = 1 and order_date = ? and order_status = ?"
    // sql = "SELECT count(id) as orderNumber FROM order_list WHERE is_show = 1 and order_date = ? and order_status = ?"
    return query(sql, [order_date, order_status])
}

/*获取最近七天的每天的运输单数 - 运输单状态 */
let getTransportDateStatus = function (role, name, transport_date, transport_state) {
    if(role == 1 || role == 2){
        let sql = "SELECT count(id) as transportNumber FROM transport_list WHERE is_show = 1 and transport_date = ? and transport_state = ?"
        // sql = "SELECT count(id) as transportNumber FROM transport_list WHERE is_show = 1 and order_date = ? and transport_state = ?"
        return query(sql, [transport_date, transport_state])
    }else if(role == 3 || role == 4){
        let sql = "SELECT count(id) as transportNumber FROM transport_list WHERE (car_driver = ? or car_escort =?) and is_show = 1 and transport_date = ? and transport_state = ?"
        // sql = "SELECT count(id) as transportNumber FROM transport_list WHERE is_show = 1 and order_date = ? and transport_state = ?"
        return query(sql, [name,name, transport_date, transport_state])
    }

}

let getOrder7Day = function (role) {
    let sql;
    sql = "SELECT order_date, count(id) as orderNumber FROM order_list WHERE is_show = 1 group by order_date"
    // sql = "SELECT order_date, count(id) as orderNumber FROM order_list WHERE is_show = 1 group by order_date"
    return query(sql, [role])
}


/*获取所有仓库数量 */
let getAllStoreNumber = function (role) {
    let sql;
    sql = `SELECT count(id) as allStoreNumber FROM store_list WHERE is_show = 1`
    // sql = `SELECT count(id) as allStoreNumber FROM store_list WHERE is_show = 1`
    return query(sql, [role])
}

/*获取所有仓库数量 */
let getAllCarNumber = function (role) {
    let sql;
    sql = `SELECT count(id) as allCarNumber  FROM car_list WHERE is_show = 1`
    // sql = `SELECT count(id) as allCarNumber  FROM car_list WHERE is_show = 1`
    return query(sql, [role])
}

/*获取人员分类 */
let getCategoryPerson = function (role) {
    let sql;
    sql = `SELECT role, count(role) as roleValue FROM user_info WHERE is_show = 1 group by role`
    // sql = `SELECT role, count(role) as roleValue FROM user_info WHERE is_show = 1 group by role`
    return query(sql, [role])
}
/*获取车辆分类 */
let getCategoryCar = function (role) {
    let sql;
    sql = `SELECT car_state, count(car_state) as stateValue FROM car_list WHERE is_show = 1 group by car_state`
    // sql = `SELECT car_state, count(car_state) as stateValue FROM car_list WHERE is_show = 1 group by car_state`
    return query(sql, [role])
}


module.exports = {
    getPersonNumber,
    getAllOrderNumber,
    getOrderNumber,
    getOrderDate,
    getOrderDateStatus,
    getOrder7Day,
    getAllStoreNumber,
    getAllCarNumber,
    getCategoryPerson,
    getCategoryCar,
    getAllTransportNumber,
    getTransportNumber,
    getTransportDate,
    getTransportDateStatus,
}
