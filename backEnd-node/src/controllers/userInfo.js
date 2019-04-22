const userModel = require("../models/userInfo");
const {toNomalTime} = require('../utils/common');

/**
 *  通过user_id获取用户信息 （不包括密码）
 * @param
 * @return 用户名，性别，头像，最后登录时间，状态等
 */

let getUserInfo = async (ctx, next) => {
	const RowDataPacket = await userModel.getUserInfo(ctx.query.user_id),
		userInfo = JSON.parse(JSON.stringify(RowDataPacket));
	ctx.body = {
		success: true,
		data: {
			userInfo: userInfo
		}
	};
};

/**
 *  通过用户名获取用户信息 （不包括密码）
 * @param
 * @return id，用户名，性别，头像，地方，github
 */

let findUIByName = async (ctx, next) => {
	const RowDataPacket = await userModel.findUIByName(ctx.query.name),
		userInfo = JSON.parse(JSON.stringify(RowDataPacket));
	ctx.body = {
		success: true,
		data: {
			userInfo: userInfo
		}
	};
};



module.exports = {
	getUserInfo,
	findUIByName,
};
