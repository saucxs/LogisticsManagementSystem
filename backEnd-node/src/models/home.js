const {query} = require('../utils/db');

/*获取人员数量 */
let getPersonNumber = function (role) {
    let sql;
    sql = `SELECT count(id) as personNumber FROM user_info WHERE role >= ${role} and is_show = 1 and id != 1`
    return query(sql, [role])
}

/*获取所有订单数量 */
let getAllOrderNumber = function (role) {
    let sql;
    sql = `SELECT count(id) as allOrderNumber  FROM order_list WHERE operator_role >= ${role} and is_show = 1`
    return query(sql, [role])
}

/*获取不同分类订单数量 */
let getOrderNumber = function (role) {
    let sql;
    sql = `SELECT order_status, count(id) as orderNumber  FROM order_list WHERE operator_role >= ${role} and is_show = 1 group by order_status`
    return query(sql, [role])
}


/*获取所有仓库数量 */
let getAllStoreNumber = function (role) {
    let sql;
    sql = `SELECT count(id) as allStoreNumber  FROM store_list WHERE operator_role >= ${role} and is_show = 1`
    return query(sql, [role])
}

/*获取所有仓库数量 */
let getAllCarNumber = function (role) {
    let sql;
    sql = `SELECT count(id) as allCarNumber  FROM car_list WHERE operator_role >= ${role} and is_show = 1`
    return query(sql, [role])
}

/*获取人员分类 */
let getCategoryPerson = function (role) {
    let sql;
    sql = `SELECT role, count(role) as roleValue FROM user_info WHERE role >= ${role} and is_show = 1 group by role`
    return query(sql, [role])
}
/*获取车辆分类 */
let getCategoryCar = function (role) {
    let sql;
    sql = `SELECT car_state, count(car_state) as stateValue FROM car_list WHERE operator_role >= ${role} and is_show = 1 group by car_state`
    return query(sql, [role])
}


module.exports = {
    getPersonNumber,
    getAllOrderNumber,
    getOrderNumber,
    getAllStoreNumber,
    getAllCarNumber,
    getCategoryPerson,
    getCategoryCar
}
