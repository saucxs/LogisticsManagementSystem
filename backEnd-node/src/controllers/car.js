const carModel = require("../models/car");
const {randomString,toNomalTime} = require('../utils/common');

/**
 *  获取车辆列表
 * @param
 * @return
 */

let getCarList = async (ctx, next) => {
    let page =  Number(ctx.query.currentPage || 1),
        pageNum = Number(ctx.query.pageSize || 10),
		role = ctx.query.operator_role,
		content = ctx.query.searchContent;
    let pageIndex = (page - 1) * pageNum;
	const RowDataPacket = await carModel.getCarListPagination(role,content,pageIndex,pageNum),
        carList = JSON.parse(JSON.stringify(RowDataPacket));
	const RowDataPacketTotal = await carModel.getCarListTotal(role,content),
        total = JSON.parse(JSON.stringify(RowDataPacketTotal)).length;
	ctx.body = {
		success: true,
		data: {
            carList: carList,
            total: total
		}
	};
};



/**
 *  新增汽车和修改汽车
 * @param
 * @return
 */
let addCar = async (ctx, next) => {
    let params = ctx.request.body;
	if(params.type === 'add'){
        /*生成含有时间戳的订单ID*/
        await carModel.addNewCar([
            params.car_code,
            params.car_name,
            Number(params.car_state),
            toNomalTime(params.car_time),
            params.car_person,
            params.car_phone,
            params.operator_role,
            params.operator_name,
            params.remark,
            1
        ]).then(res => {
            if (res) {
                ctx.body = {
                    success: true,
                    message: "汽车编码Code为"+ params.car_code +"添加成功"
                }
            }
        })
	}else if(params.type === 'edit' && params.car_code){
        await carModel.editNewCar(
            params.car_code,
            params.car_name,
            Number(params.car_state),
            toNomalTime(params.car_time),
            params.car_person,
            params.car_phone,
            params.operator_role,
            params.operator_name,
            params.remark,
            params.id
        ).then(res => {
            if (res) {
                ctx.body = {
                    success: true,
                    message: "汽车编码Code为："+ params.car_code +"修改成功"
                }
            }
        })
	}
};

/*删除汽车*/
let deleteCar = async (ctx, next) => {
    let params = ctx.request.body;
    let id = params.id;
    await carModel.deleteCar([0, id]).then(res => {
        if(res){
            ctx.body = {
                success: true,
                message: '删除汽车成功'
            };
            console.log("删除汽车成功");
        }
    })
}

/**
 *  获取汽车的select项
 * @param
 * @return
 */
let getCarListMap = async (ctx, next) => {
    let role = ctx.query.operator_role;
    const RowDataPacket = await carModel.getCarListMap(role),
        carListMap = JSON.parse(JSON.stringify(RowDataPacket));
    ctx.body = {
        success: true,
        data: {
            carListMap: carListMap
        }
    };
};


module.exports = {
    getCarList,
    addCar,
    deleteCar,
    getCarListMap
};
