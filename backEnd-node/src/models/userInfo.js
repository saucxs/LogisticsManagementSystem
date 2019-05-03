const {query} = require('../utils/db');

/*注册用户-未激活*/
let insertUser= function (value) {
    let sql = "insert into user_info(name, password, email, role, activate, activateCode) values(?,?,?,?,?,?)"
    return query(sql, value)
}

/*注册用户-激活*/
let activateUser= function (activate, activateDate, code) {
    let sql = "update user_info SET activate = ?, activateDate = ?, is_show = ? WHERE activateCode = ? "
    return query(sql, [activate, activateDate,1, code])
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
    insertUser,
    activateUser,
    findDataByName,
    findDataByActivateCode,
    findUIByName,
    getUserInfo
}
