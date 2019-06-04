const {query} = require('../utils/db');

/*获取车辆列表 - 分页 */
let getCarListPagination = function (role, content, pageIndex, pageNum) {
    let sql;
    if(content){
        sql = `SELECT * FROM car_list WHERE is_show = 1 AND CONCAT(car_code, car_name, car_person) like "%${content}%" ORDER BY car_time DESC LIMIT ${pageIndex},${pageNum}`
        return query(sql, [content, pageIndex, pageNum ])
    }else{
        sql = "SELECT * FROM car_list WHERE is_show = ? ORDER BY car_time DESC LIMIT ?,?"
        return query(sql, [1, pageIndex, pageNum ])
    }
}

/*获取汽车列表select */
let getCarListMap = function (role) {
    let sql;
    // sql = `SELECT car_code, car_name FROM car_list WHERE operator_role = ${role} and is_show = 1 and car_state = 1 ORDER BY car_time DESC`
    sql = `SELECT car_code, car_name FROM car_list WHERE is_show = 1 and car_state = 1 ORDER BY car_time DESC`
    return query(sql, [role])
}

/*获取车辆列表 - 总数 */
let getCarListTotal = function (role, content) {
    if(content) {
        let sql = `SELECT * from car_list where is_show = 1 and CONCAT(car_code, car_name, car_person) like "%${content}%"`
        return query(sql, [content])
    }else{
        let sql = "SELECT * from car_list where is_show = ?"
        return query(sql, [1])
    }
}

/*添加车辆*/
let addNewCar = function (value) {
    let sql = "insert into car_list(car_code, car_name, car_state, car_time, car_person, car_phone, operator_role, operator_name, remark, is_show) values(?,?,?,?,?,?,?,?,?,?)"
    return query(sql, value)
}

/*修改车辆*/
let editNewCar = function (car_code, car_name, car_state, car_time, car_person, car_phone, operator_role, operator_name, remark, id) {
    let sql = "update car_list set car_code = ?, car_name = ?, car_state = ?, car_time = ?, car_person = ?, car_phone = ?, operator_role = ?, operator_name = ?, remark = ? where id = ?"
    return query(sql, [car_code, car_name, car_state, car_time, car_person, car_phone, operator_role, operator_name, remark, id])
}

/*删除车辆*/
let deleteCar = function (value) {
    let sql = "update car_list set is_show = ? where id = ?"
    return query(sql, value)
}

module.exports = {
    getCarListPagination,
    getCarListTotal,
    getCarListMap,
    addNewCar,
    editNewCar,
    deleteCar
}
