const homeModel = require("../models/home");
const {randomString,toNomalTime} = require('../utils/common');


/**
 *  获取大盘数据
 * @param
 * @return
 */
let getCategoryData = async (ctx, next) => {
	let role = ctx.query.role;
    const RowDataPacketPerson = await homeModel.getPersonNumber(role),
        personNumberRow = JSON.parse(JSON.stringify(RowDataPacketPerson));
    const RowDataPacketAllOrder = await homeModel.getAllOrderNumber(role),
        personAllOrderRow = JSON.parse(JSON.stringify(RowDataPacketAllOrder));
    const RowDataPacketAllStore = await homeModel.getAllStoreNumber(role),
        personAllStoreRow = JSON.parse(JSON.stringify(RowDataPacketAllStore));
    const RowDataPacketAllCar = await homeModel.getAllCarNumber(role),
        personAllCarRow = JSON.parse(JSON.stringify(RowDataPacketAllCar));
    const RowDataPacketCategoryPerson = await homeModel.getCategoryPerson(role),
        categoryPersonRow = JSON.parse(JSON.stringify(RowDataPacketCategoryPerson));
    const RowDataPacketCategoryCar = await homeModel.getCategoryCar(role),
        categoryCarRow = JSON.parse(JSON.stringify(RowDataPacketCategoryCar));

    const RowDataPacketOrder = await homeModel.getOrderNumber(role),
        personOrderRow = JSON.parse(JSON.stringify(RowDataPacketOrder));

	ctx.body = {
		success: true,
		data: {
            personNumber: personNumberRow[0].personNumber,
            allOrderNumber: personAllOrderRow[0].allOrderNumber,
            allStoreNumber: personAllStoreRow[0].allStoreNumber,
            allCarNumber: personAllCarRow[0].allCarNumber,
            categoryPerson: categoryPersonRow,
            categoryCar: categoryCarRow,
			orderNumber: personOrderRow
		}
	};
};

module.exports = {
    getCategoryData
};
