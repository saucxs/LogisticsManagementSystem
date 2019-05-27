const transportModel = require("../models/transport");
const orderModel = require("../models/order");
const {randomString,toNomalTime} = require('../utils/common');

/**
 *  获取运输单列表
 * @param
 * @return
 */
let getTransportList = async (ctx, next) => {
    let page =  Number(ctx.query.currentPage || 1),
        pageNum = Number(ctx.query.pageSize || 10),
		role = ctx.query.operator_role,
        name = String(ctx.query.operator_name),
		content = ctx.query.searchContent;
    let pageIndex = (page - 1) * pageNum;
	const RowDataPacket = await transportModel.getTransportListPagination(role,content, name, 0, pageIndex,pageNum),
        transportList = JSON.parse(JSON.stringify(RowDataPacket));
	const RowDataPacketTotal = await transportModel.getTransportListTotal(role,content, name, 0),
        total = JSON.parse(JSON.stringify(RowDataPacketTotal)).length;

    ctx.body = {
        success: true,
        data: {
            transportList: transportList,
            total: total
        }
    };
};


/**
 *  新增运输单
 * @param
 * @return
 */
let addTransport = async (ctx, next) => {
    let params = ctx.request.body;
	if(params.type === 'add'){
        /*生成含有时间戳的运输单ID*/
        params.transport_id = randomString(2) + "_" + ctx.request.body.transport_time;
        await transportModel.addNewTransport([
            params.transport_id,
            params.transport_state || 1,
            toNomalTime(params.transport_time),
            toNomalTime(params.transport_time).substring(0,10),
            params.order_id,
            params.transport_path,
            params.store_code,
            params.car_code,
            params.car_driver,
            params.car_escort,
            params.operator_role,
            params.operator_name,
            params.remark,
            1
        ]).then(res => {
            if(res){
                /*写入关系表*/
                transportModel.insertTransPortRelation([
                    params.transport_id,
                    params.order_id,
                    params.store_code,
                    params.car_code,
                    params.car_driver,
                    params.car_escort,
                    toNomalTime(params.transport_time)
                ]);
                ctx.body = {
                    success: true,
                    message: "运输单ID为"+ params.transport_id +"添加成功"
                }
            }
        })
        /*修改订单状态到 生成运输单 */
        await orderModel.updateOrderState([5, params.order_id])

	}else if(params.type === 'edit' && params.transport_id){
        if(params.transport_state >= 1 && params.transport_state < 4){
            await orderModel.updateOrderState([5, params.order_id])
        }else if(params.transport_state>=4 && params.transport_state<=5){
            await orderModel.updateOrderState([2, params.order_id])
        }
        await transportModel.editNewTransport(
            params.transport_state,
            toNomalTime(params.transport_time),
            params.transport_path,
            params.store_code,
            params.car_code,
            params.car_driver,
            params.car_escort,
            params.operator_role,
            params.operator_name,
            params.remark,
            params.transport_id,
            params.id,
        ).then(res => {
            if (res) {
                /*修改关系表*/
                transportModel.updateTransPortRelation([
                    params.store_code,
                    params.car_code,
                    params.car_driver,
                    params.car_escort,
                    params.transport_id,
                ]);
                ctx.body = {
                    success: true,
                    message: "运输单ID为："+ params.order_id +"修改成功"
                }
            }
        })
	}
};

/*删除订单*/
let deleteTransport = async (ctx, next) => {
    let params = ctx.request.body;
    let transport_id = params.transport_id;
    await transportModel.deleteTransport([0, transport_id]).then(res => {
        if(res){
            ctx.body = {
                success: true,
                message: '删除订单成功'
            };
            console.log("删除订单成功");
        }
    })
}


module.exports = {
    getTransportList,
    addTransport,
    deleteTransport
};
