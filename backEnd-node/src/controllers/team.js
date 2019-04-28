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
                    message: "人员ID为"+ params.id +"添加成功"
                }
            }
        })
	}else if(params.type === 'edit' && params.id){
        await teamModel.editNewTeam(
            Number(params.role),
            toNomalTime(params.operator_time),
            params.operator_name,
            params.operator_role,
            params.id,
        ).then(res => {
            if (res) {
                ctx.body = {
                    success: true,
                    message: "人员ID为："+ params.id +"修改成功"
                }
            }
        })
	}
};

/*删除订单*/
let deleteTeam = async (ctx, next) => {
    let params = ctx.request.body;
    console.log(params.id, '2222222222222222222222222')
    let id = params.id;
    await teamModel.deleteTeam([0, id]).then(res => {
        if(res){
            ctx.body = {
                success: true,
                message: '删除人员成功'
            };
            console.log("删除人员成功");
        }
    })
};

/**
 *  获取人员的select项
 * @param
 * @return
 */
let getTeamListMap = async (ctx, next) => {
    let role = ctx.query.operator_role;
    const RowDataPacket = await teamModel.getTeamListMap(role),
        teamListMap = JSON.parse(JSON.stringify(RowDataPacket));
    ctx.body = {
        success: true,
        data: {
            teamListMap: teamListMap
        }
    };
};


/**
 *  用户查询订单状态
 * @param
 * @return
 */

let getPersonalTransportList = async (ctx, next) => {
    let page =  Number(ctx.query.currentPage || 1),
        pageNum = Number(ctx.query.pageSize || 10),
        role = ctx.query.operator_role,
        name = ctx.query.operator_name,
        content = ctx.query.searchContent;
    let pageIndex = (page - 1) * pageNum;
    const RowDataPacket = await teamModel.getPersonalListPagination(role,name,content,pageIndex,pageNum),
        teamList = JSON.parse(JSON.stringify(RowDataPacket));
    const RowDataPacketTotal = await teamModel.getPersonalListTotal(role,name,content),
        total = JSON.parse(JSON.stringify(RowDataPacketTotal)).length;
    ctx.body = {
        success: true,
        data: {
            teamList: teamList,
            total: total
        }
    };
};


module.exports = {
    getTeamList,
    addTeam,
    deleteTeam,
    getTeamListMap,
    getPersonalTransportList
};
