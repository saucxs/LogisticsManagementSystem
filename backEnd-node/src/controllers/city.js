const cityModel = require("../models/city");
const {randomString,toNomalTime} = require('../utils/common');

/**
 *  获取仓库的select项
 * @param
 * @return
 */
let getCityListMap = async (ctx, next) => {
    let role = ctx.query.operator_role;
    const RowDataPacket = await cityModel.getCityListMap(role),
        cityListMap = JSON.parse(JSON.stringify(RowDataPacket));
    ctx.body = {
        success: true,
        data: {
            cityListMap: cityListMap
        }
    };
};


module.exports = {
    getCityListMap
};
