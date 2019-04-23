const orderModel = require("../models/order");
const {randomString,toNomalTime} = require('../utils/common');

/**
 *  获取订单列表
 * @param
 * @return
 */

let getOrderList = async (ctx, next) => {
    console.log(ctx.query.currentPage, ctx.query.pageSize, '2222222222222222222222222')
    let page = ctx.query.currentPage || 1,
        pageNum = ctx.query.pageSize || 10,
		role = ctx.query.operator_role,
		content = ctx.query.searchContent;
    let pageIndex = (page - 1) * pageNum < 0 ? 0 : (page - 1) * pageNum;
    console.log(pageIndex,pageNum, '333333333333333333333333')
	const RowDataPacket = await orderModel.getOrderListPagination(role,content,pageIndex,pageNum),
		orderList = JSON.parse(JSON.stringify(RowDataPacket));
	// console.log(orderList, '444444444444444444444444444')
	const RowDataPacketTotal = await orderModel.getOrderListTotal(role,content),
        total = JSON.parse(JSON.stringify(RowDataPacketTotal)).length;
    console.log(total, '555555555555555555555')
	ctx.body = {
		success: true,
		data: {
            orderList: orderList,
            total: total
		}
	};
};


/**
 *  新增订单
 * @param
 * @return
 */

let addOrder = async (ctx, next) => {
    let params = ctx.request.body;
    console.log(params, '888888888888888888888888888888888888')
    console.log(params.type, params.order_id, '99999999999999999999999999999999999999999999999999')
	if(params.type === 'add'){
        /*生成含有时间戳的订单ID*/
        params.order_id = randomString(6) + "_" + ctx.request.body.order_time;
        orderModel.addNewOrder([
            params.order_id,
            params.order_name,
            params.order_goods,
            toNomalTime(params.order_time),
            params.order_receiver_name,
            params.order_receiver_phone,
            params.order_receiver_address,
            params.operator_name,
            params.operator_role,
            params.remark
        ]);
        ctx.body = {
            success: true,
            message: "订单ID为"+ params.order_id +"添加成功"
        }
	}else if(params.type === 'edit' && params.order_id){
        await orderModel.editNewOrder(
            params.order_name,
            params.order_goods,
            toNomalTime(params.order_time),
            params.order_receiver_name,
            params.order_receiver_phone,
            params.order_receiver_address,
            params.operator_name,
            params.operator_role,
            params.remark,
            params.order_id,
            params.id
        ).then(res => {
            console.log(res, '09090909090909090')
            if (res) {
                console.log('1111111111111111111111111111')
                ctx.body = {
                    success: true,
                    message: "订单ID为："+ params.order_id +"修改成功"
                }
            }
        })
	}
};



module.exports = {
	getOrderList,
    addOrder
};
