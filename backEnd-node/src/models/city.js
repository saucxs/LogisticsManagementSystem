const {query} = require('../utils/db');

/*获取仓库select*/
let getCityListMap= function (role) {
    let sql = `SELECT city_code, city_name FROM city_list WHERE is_show = 1 ORDER BY id DESC`
    return query(sql, [role])
}

module.exports = {
    getCityListMap
}
