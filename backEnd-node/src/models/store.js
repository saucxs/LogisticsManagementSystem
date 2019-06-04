const {query} = require('../utils/db');

/*获取仓库列表 - 分页 */
let getStoreListPagination= function (role, content, pageIndex, pageNum) {
    let sql;
    if(content){
        sql = `SELECT * FROM store_list WHERE is_show = 1 AND CONCAT(store_code, store_name) like "%${content}%" ORDER BY store_time DESC LIMIT ${pageIndex},${pageNum}`
        return query(sql, [content, pageIndex, pageNum ])
    }else{
        sql = "SELECT * FROM store_list WHERE is_show = ? ORDER BY store_time DESC LIMIT ?,?"
        return query(sql, [ 1, pageIndex, pageNum ])
    }
}


/*获取仓库列表 - 总数 */
let getStoreListTotal= function (role, content) {
    if(content) {
        let sql = `SELECT * from store_list where is_show = 1 and CONCAT(store_code, store_name) like "%${content}%"`
        return query(sql, [content])
    }else{
        let sql = "SELECT * from store_list where is_show = ?"
        return query(sql, [1])
    }
}

/*添加仓库*/
let addNewStore= function (value) {
    let sql = "insert into store_list(store_code, store_name, store_address, store_time, shelves_num, goods_num, operator_name, operator_role, remark, is_show) values(?,?,?,?,?,?,?,?,?,?)"
    return query(sql, value)
}

/*修改仓库*/
let editNewStore= function (store_code, store_name, store_address, store_time, shelves_num, goods_num, operator_name, operator_role, remark, id) {
    console.log(store_code, store_name, store_address, store_time, shelves_num, goods_num, operator_name, operator_role, remark, '==============================')
    let sql = "update store_list set store_code = ?, store_name = ?, store_address = ?, store_time = ?, shelves_num = ?, goods_num = ?, operator_name = ?, operator_role = ?, remark = ? where id = ?"
    return query(sql, [store_code, store_name, store_address, store_time, shelves_num, goods_num, operator_name, operator_role, remark, id])
}

/*删除仓库*/
let deleteStore= function (value) {
    let sql = "update store_list set is_show = ? where id = ?"
    return query(sql, value)
}

/*获取仓库select*/
let getStoreListMap= function (role) {
    let sql = `SELECT store_code, store_name FROM store_list WHERE is_show = 1 ORDER BY store_time DESC`
    return query(sql, [role])
}

module.exports = {
    getStoreListPagination,
    getStoreListTotal,
    addNewStore,
    editNewStore,
    deleteStore,
    getStoreListMap
}
