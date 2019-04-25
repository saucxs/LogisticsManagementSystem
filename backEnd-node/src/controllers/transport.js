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
		content = ctx.query.searchContent;
    let pageIndex = (page - 1) * pageNum;
	const RowDataPacket = await transportModel.getTransportListPagination(role,content,pageIndex,pageNum),
        transportList = JSON.parse(JSON.stringify(RowDataPacket));
	const RowDataPacketTotal = await transportModel.getTransportListTotal(role,content),
        total = JSON.parse(JSON.stringify(RowDataPacketTotal)).length;
	console.log(transportList , total, '==-=-=------7777777777777777777777777777777777777777777')

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
            params.order_id,
            params.transport_path,
            params.car_code,
            params.car_driver,
            params.car_escort,
            params.operator_role,
            params.operator_name,
            params.remark,
            1
        ]).then(res => {
            if(res){
                ctx.body = {
                    success: true,
                    message: "运输单ID为"+ params.transport_id +"添加成功"
                }
            }
        })
	}else if(params.type === 'edit' && params.transport_id){
	    if(params.transport_state == 4){
            await orderModel.updateOrderState([2, params.order_id])
        }
        await transportModel.editNewTransport(
            params.transport_state,
            toNomalTime(params.transport_time),
            params.transport_path,
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
    console.log(params.transport_id, '2222222222222222222222222')
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
