const teamModel = require("../models/team");
const {randomString,toNomalTime} = require('../utils/common');

/**
 *  获取仓库列表
 * @param
 * @return
 */

let getTeamList = async (ctx, next) => {
    let page =  Number(ctx.query.currentPage || 1),
        pageNum = Number(ctx.query.pageSize || 10),
		role = ctx.query.operator_role,
		content = ctx.query.searchContent;
    let pageIndex = (page - 1) * pageNum;
	const RowDataPacket = await teamModel.getTeamListPagination(role,content,pageIndex,pageNum),
        teamList = JSON.parse(JSON.stringify(RowDataPacket));
	const RowDataPacketTotal = await teamModel.getTeamListTotal(role,content),
        total = JSON.parse(JSON.stringify(RowDataPacketTotal)).length;
	ctx.body = {
		success: true,
		data: {
            teamList: teamList,
            total: total
		}
	};
};



/**
 *  新增人员和修改人员
 * @param
 * @return
 */
let addTeam = async (ctx, next) => {
    let params = ctx.request.body;
	if(params.type === 'add'){
        await storeModel.addNewStore([
            params.store_code,
            params.store_name,
            params.store_address,
            toNomalTime(params.store_time),
            params.shelves_num,
            params.goods_num,
            params.operator_name,
            params.operator_role,
            params.remark,
            1
        ]).then(res => {
            if(res){
                ctx.body = {
                    success: true,
                    message: "仓库编码Code为"+ params.store_code +"添加成功"
                }
            }
        })
	}else if(params.type === 'edit' && params.store_code){
        await storeModel.editNewStore(
            params.store_code,
            params.store_name,
            params.store_address,
            toNomalTime(params.store_time),
            params.shelves_num,
            params.goods_num,
            params.operator_name,
            params.operator_role,
            params.remark,
            params.id,
        ).then(res => {
            if (res) {
                ctx.body = {
                    success: true,
                    message: "仓库编码Code为："+ params.order_id +"修改成功"
                }
            }
        })
	}
};

/*删除订单*/
let deleteStore = async (ctx, next) => {
    let params = ctx.request.body;
    console.log(params.id, '2222222222222222222222222')
    let id = params.id;
    await storeModel.deleteStore([0, id]).then(res => {
        if(res){
            ctx.body = {
                success: true,
                message: '删除仓库成功'
            };
            console.log("删除仓库成功");
        }
    })
}


module.exports = {
    getTeamList,
    addTeam,
    deleteStore
};
