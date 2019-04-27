const homeModel = require("../models/home");
const {getDay} = require('../utils/common');


/**
 *  获取大盘数据
 * @param
 * @return
 */
let getCategoryData = async (ctx, next) => {
	let role = ctx.query.role;
    if(role == 1 || role == 2){
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
    }

};

/*订单*/
let getCategoryOrder = async (ctx, next) => {
    let role = ctx.query.role;
    if(role ==1 || role ==2){
        const RowDataPacketAllOrder = await homeModel.getAllOrderNumber(role),
            personAllOrderRow = JSON.parse(JSON.stringify(RowDataPacketAllOrder));
        const RowDataPacketOrder = await homeModel.getOrderNumber(role),
            personOrderRow = JSON.parse(JSON.stringify(RowDataPacketOrder));
        /*所有订单*/
        let allParams = [];
        for(let i=-6;i<=0;i++){
            let tempData = await homeModel.getOrderDate(role,getDay(i));
            let tempDataRow = JSON.parse(JSON.stringify(tempData));
            allParams.push(tempDataRow[0].orderNumber);
        };

        /*进行订单*/
        let ingParams = [];
        for(let i=-6;i<=0;i++){
            let tempData = await homeModel.getOrderDateStatus(role,getDay(i),1);
            let tempDataRow = JSON.parse(JSON.stringify(tempData));
            ingParams.push(tempDataRow[0].orderNumber);
        };

        /*结束订单*/
        let endParams = [];
        for(let i=-6;i<=0;i++){
            let tempData = await homeModel.getOrderDateStatus(role,getDay(i),2);
            let tempDataRow = JSON.parse(JSON.stringify(tempData));
            endParams.push(tempDataRow[0].orderNumber);
        };
        console.log(allParams, '-=-=-=-=--=-=-=-=090909090909090');
        ctx.body = {
            success: true,
            data: {
                allOrderNumber: personAllOrderRow[0].allOrderNumber,
                orderNumber: personOrderRow,
                categoryAllOrderNumber: allParams,
                categoryIngOrderNumber: ingParams,
                categoryEndOrderNumber: endParams
            }
        };
    }
};



module.exports = {
    getCategoryData,
    getCategoryOrder
};
