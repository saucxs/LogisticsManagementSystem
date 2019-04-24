const {query} = require('../utils/db');

/*获取订单列表 - 分页 */
let getOrderListPagination= function (role, content, pageIndex, pageNum) {
    let sql;
    console.log(content, '000000000000000000000000000')
    if(content){
        console.log(content, '111111111111111111111111')
        sql = `SELECT * FROM order_list WHERE operator_role = ${role} and is_show = 1 AND CONCAT(order_id, order_name, order_receiver_name, order_receiver_phone) like "%${content}%" ORDER BY order_time DESC LIMIT ${pageIndex},${pageNum}`
        return query(sql, [role, content, pageIndex, pageNum ])
    }else{
        sql = "SELECT * FROM order_list WHERE operator_role = ? and is_show = ? ORDER BY order_time DESC LIMIT ?,?"
        return query(sql, [role, 1, pageIndex, pageNum ])
    }
}


/*获取订单列表 - 总数 */
let getOrderListTotal= function (role, content) {
    if(content) {
        let sql = `SELECT * from order_list where operator_role = ${role} and is_show = 1 and CONCAT(order_id, order_name, order_receiver_name, order_receiver_phone) like "%${content}%"`
        return query(sql, [role, content])
    }else{
        let sql = "SELECT * from order_list where operator_role = ? and is_show = ?"
        return query(sql, [role, 1])
    }
}

/*添加订单*/
let addNewOrder= function (value) {
    console.log(value, '+++++++++++++++++++++++++++++++++++++')

    let sql = "insert into order_list(order_id, order_name, order_goods, order_time, order_receiver_name, order_receiver_phone, order_receiver_address, operator_name, operator_role, remark,is_show) values(?,?,?,?,?,?,?,?,?,?,?)"
    return query(sql, value)
}

/*修改订单*/
let editNewOrder= function (order_name, order_goods, order_time, order_receiver_name, order_receiver_phone, order_receiver_address, operator_name, operator_role, remark, order_id, id) {
    console.log(order_name, order_goods, order_time, order_receiver_name, order_receiver_phone, order_receiver_address, operator_name, operator_role, remark, order_id, '==============================')
    let sql = "update order_list set order_name = ?, order_goods = ?, order_time = ?, order_receiver_name = ?, order_receiver_phone = ?, order_receiver_address = ?, operator_name = ?, operator_role = ?, remark = ? where order_id = ? AND  id = ?"
    return query(sql, [order_name, order_goods, order_time, order_receiver_name, order_receiver_phone, order_receiver_address, operator_name, operator_role, remark, order_id, id])
}

/*删除订单*/
let deleteOrder= function (value) {
    console.log(value, '-------------------------------')
    let sql = "update order_list set is_show = ? where order_id = ?"
    return query(sql, value)
}





/*注册用户-激活*/
let activateUser= function (activate, activateDate, email) {
    console.log(activate, email, 'activateCode--------------------')
    let sql = "update user_info SET activate = ?, activateDate = ? WHERE email = ? "
    return query(sql, [activate, activateDate, email])
}

/*通过activateCode查找用户信息 user_info*/
let findDataByActivateCode = function(activateCode) {
    let _sql = 'SELECT * FROM user_info WHERE activateCode= ? '
    return query(_sql, activateCode)
}
/*通过用户名查找用户信息 user_info*/
let findDataByName = function(name) {
    let _sql = 'SELECT * FROM user_info WHERE name= ? '
    return query(_sql, name)
}

// 通过用户名查找用户信息 user_info 不包括密码
let findUIByName = function(name) {
    let _sql = 'SELECT id ,name ,sex,avator,place,github FROM user_info WHERE name = ? '
    return query(_sql, name)
}

// 通过用户id查找用户信息 user_info 包括用户名，性别，头像，最后登录时间，状态等，不包括密码
let getUserInfo = (user_id) => {
    const _sql =
        'SELECT id AS user_id, name ,sex ,avator,place ,website,github,intro,status FROM user_info   WHERE  user_info.id =? '
    return query(_sql, [user_id]);
}

module.exports = {
    getOrderListPagination,
    getOrderListTotal,
    addNewOrder,
    editNewOrder,
    deleteOrder
}
