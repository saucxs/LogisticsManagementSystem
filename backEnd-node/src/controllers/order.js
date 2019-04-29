const orderModel = require("../models/order");
const transportModel = require("../models/transport");
const {randomString,toNomalTime} = require('../utils/common');

/**
 *  获取订单列表
 * @param
 * @return
 */
let getOrderList = async (ctx, next) => {
    let page =  Number(ctx.query.currentPage || 1),
        pageNum = Number(ctx.query.pageSize || 10),
		role = ctx.query.operator_role,
		content = ctx.query.searchContent;
    let pageIndex = (page - 1) * pageNum;
	const RowDataPacket = await orderModel.getOrderListPagination(role,content,pageIndex,pageNum),
		orderList = JSON.parse(JSON.stringify(RowDataPacket));
	const RowDataPacketTotal = await orderModel.getOrderListTotal(role,content),
        total = JSON.parse(JSON.stringify(RowDataPacketTotal)).length;
	ctx.body = {
		success: true,
		data: {
            orderList: orderList,
            total: total
		}
	};
};


/**
 *  获取订单的select项
 * @param
 * @return
 */
let getOrderListMap = async (ctx, next) => {
    let role = ctx.query.operator_role;
    const RowDataPacket = await orderModel.getOrderListMap(role),
        orderListMap = JSON.parse(JSON.stringify(RowDataPacket));
    ctx.body = {
        success: true,
        data: {
            orderListMap: orderListMap
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
	if(params.type === 'add'){
        /*生成含有时间戳的订单ID*/
        params.order_id = randomString(6) + "_" + params.order_time;
        await orderModel.addNewOrder([
            params.order_id,
            params.order_name,
            params.order_goods,
            toNomalTime(params.order_time),
            toNomalTime(params.order_time).substring(0,10),
            params.order_receiver_name,
            params.order_receiver_phone,
            params.order_receiver_address,
            params.operator_name,
            params.operator_role,
            params.remark,
            1,
            1
        ]).then(res => {
            if(res){
                ctx.body = {
                    success: true,
                    message: "订单ID为"+ params.order_id +"添加成功"
                }
            }
        })
        setTimeout(function() {
            transportModel.queryTransport(params.order_id).then(res => {
                if(res.length == 0){
                    params.transport_id = randomString(2) + "_" + params.order_time;
                    params.transport_path = '';
                    params.car_code = '';
                    params.car_driver = '';
                    params.car_escort = '';
                    params.remark = '';
                    transportModel.addNewTransport([
                        params.transport_id,
                        params.transport_state || 0,
                        toNomalTime(params.order_time + 3000),
                        toNomalTime(params.order_time + 3000).substring(0,10),
                        params.order_id,
                        params.transport_path,
                        params.car_code,
                        params.car_driver,
                        params.car_escort,
                        params.operator_role,
                        params.operator_name,
                        params.remark,
                        1
                    ])
                    /*修改订单状态到已发货*/
                    // orderModel.updateOrderState([5, params.order_id])
                }
            })
        }, 60*1000, params);
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
            params.id,
        ).then(res => {
            if (res) {
                ctx.body = {
                    success: true,
                    message: "订单ID为："+ params.order_id +"修改成功"
                }
            }
        })
	}
};

/*删除订单*/
let deleteOrder = async (ctx, next) => {
    let params = ctx.request.body;
    let order_id = params.order_id;
    await orderModel.deleteOrder([0, order_id]).then(res => {
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
	getOrderList,
    getOrderListMap,
    addOrder,
    deleteOrder
};
