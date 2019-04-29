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
    const RowDataPacketAllOrder = await homeModel.getAllOrderNumber(role),
        personAllOrderRow = JSON.parse(JSON.stringify(RowDataPacketAllOrder));
    const RowDataPacketOrder = await homeModel.getOrderNumber(role),
        personOrderRow = JSON.parse(JSON.stringify(RowDataPacketOrder));
    /*折线图*/
    /*所有订单*/
    let allParams = [];
    for(let i=-6;i<=0;i++){
        let tempData = await homeModel.getOrderDate(role,getDay(i));
        let tempDataRow = JSON.parse(JSON.stringify(tempData));
        allParams.push(tempDataRow[0].orderNumber);
    };

    /*待发货*/
    let ingParams = [];
    for(let i=-6;i<=0;i++){
        let tempData = await homeModel.getOrderDateStatus(role,getDay(i),1);
        let tempDataRow = JSON.parse(JSON.stringify(tempData));
        ingParams.push(tempDataRow[0].orderNumber);
    };

    /*结束*/
    let endParams = [];
    for(let i=-6;i<=0;i++){
        let tempData = await homeModel.getOrderDateStatus(role,getDay(i),2);
        let tempDataRow = JSON.parse(JSON.stringify(tempData));
        endParams.push(tempDataRow[0].orderNumber);
    };

    /*生成运输单*/
    let transportParams = [];
    for(let i=-6;i<=0;i++){
        let tempData = await homeModel.getOrderDateStatus(role,getDay(i),6);
        let tempDataRow = JSON.parse(JSON.stringify(tempData));
        transportParams.push(tempDataRow[0].orderNumber);
    };
    /*已发货*/
    let alreadyParams = [];
    for(let i=-6;i<=0;i++){
        let tempData = await homeModel.getOrderDateStatus(role,getDay(i),5);
        let tempDataRow = JSON.parse(JSON.stringify(tempData));
        alreadyParams.push(tempDataRow[0].orderNumber);
    };
    ctx.body = {
        success: true,
        data: {
            allOrderNumber: personAllOrderRow[0].allOrderNumber,
            orderNumber: personOrderRow,
            categoryAllOrderNumber: allParams,
            categoryIngOrderNumber: ingParams,
            categoryAlreadyOrderNumber: alreadyParams,
            categoryTransportOrderNumber: transportParams,
            categoryEndOrderNumber: endParams
        }
    };
};

/*运输单*/
let getCategoryTransport = async (ctx, next) => {
    let role = ctx.query.role;
    let name = ctx.query.name;
    const RowDataPacketAllTransport = await homeModel.getAllTransportNumber(role, name),
        personAllTransportRow = JSON.parse(JSON.stringify(RowDataPacketAllTransport));
    const RowDataPacketTransport = await homeModel.getTransportNumber(role, name),
        personTransportRow = JSON.parse(JSON.stringify(RowDataPacketTransport));
    /*折线图*/
    /*所有运输单*/
    let allParams = [];
    for(let i=-6;i<=0;i++){
        let tempData = await homeModel.getTransportDate(role,name,getDay(i));
        let tempDataRow = JSON.parse(JSON.stringify(tempData));
        allParams.push(tempDataRow[0].transportNumber);
    };

    /*拣货中运输单*/
    let params0 = [];
    for(let i=-6;i<=0;i++){
        let tempData = await homeModel.getTransportDateStatus(role,name,getDay(i),0);
        let tempDataRow = JSON.parse(JSON.stringify(tempData));
        params0.push(tempDataRow[0].transportNumber);
    };
    /*装车中运输单*/
    let params1 = [];
    for(let i=-6;i<=0;i++){
        let tempData = await homeModel.getTransportDateStatus(role,name,getDay(i),1);
        let tempDataRow = JSON.parse(JSON.stringify(tempData));
        params1.push(tempDataRow[0].transportNumber);
    };

    /*发车运输单*/
    let params2 = [];
    for(let i=-6;i<=0;i++){
        let tempData = await homeModel.getTransportDateStatus(role,name,getDay(i),2);
        let tempDataRow = JSON.parse(JSON.stringify(tempData));
        params2.push(tempDataRow[0].transportNumber);
    };

    /*运输中运输单*/
    let params3 = [];
    for(let i=-6;i<=0;i++){
        let tempData = await homeModel.getTransportDateStatus(role,name,getDay(i),3);
        let tempDataRow = JSON.parse(JSON.stringify(tempData));
        params3.push(tempDataRow[0].transportNumber);
    };

    /*收获运输单*/
    let params4 = [];
    for(let i=-6;i<=0;i++){
        let tempData = await homeModel.getTransportDateStatus(role,name,getDay(i),4);
        let tempDataRow = JSON.parse(JSON.stringify(tempData));
        params4.push(tempDataRow[0].transportNumber);
    };

    /*返回运输单*/
    let params5 = [];
    for(let i=-6;i<=0;i++){
        let tempData = await homeModel.getTransportDateStatus(role,name,getDay(i),5);
        let tempDataRow = JSON.parse(JSON.stringify(tempData));
        params5.push(tempDataRow[0].transportNumber);
    };
    ctx.body = {
        success: true,
        data: {
            allTransportNumber: personAllTransportRow[0].allTransportNumber,
            transportNumber: personTransportRow,
            categoryAllTransportNumber: allParams,
            categoryTransport0Number: params0,
            categoryTransport1Number: params1,
            categoryTransport2Number: params2,
            categoryTransport3Number: params3,
            categoryTransport4Number: params4,
            categoryTransport5Number: params5

        }
    };
};



module.exports = {
    getCategoryData,
    getCategoryOrder,
    getCategoryTransport
};
