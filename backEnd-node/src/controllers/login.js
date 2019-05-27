const jwt = require("jsonwebtoken");
const secret = require("../config").secret;
const userModel = require("../models/userInfo");
const  md5 = require("md5");
const dbConfig = require('../config').db;
const {toNomalTime, getClientIP} = require('../utils/common');

module.exports = async (ctx, next) => {
    let name = ctx.request.body.name || "";
    let password = ctx.request.body.password || "";
    let time = toNomalTime(new Date().getTime());
    let ip = getClientIP(ctx.request);
    /*将登陆信息存入到log表中*/
    // userModel.insertLoginLog([
    //     user.name,
    //     md5(salt + user.password + salt),
    //     user.email,
    //     5,
    //     false,
    //     code
    // ]);

    if (name === "" || password === "") {
        ctx.body = {
            success: false,
            message: "用户名或密码不能为空"
        };
        return ;
    }
    const alreadyRow = await userModel.findDataByName(name);
    const res = JSON.parse(JSON.stringify(alreadyRow));
    if (res.length > 0) {
        if (res[0]['activate'] === 1) {
            /*验证成功，服务端会签发一个token，token返回给客户端*/
            let salt = dbConfig.salt
            if (md5(salt + password + salt) === res[0]["password"]) {
                /*用户token*/
                const userToken = {
                    name: name,
                    id: res[0]["id"]
                };
                const token = jwt.sign(userToken, secret, {expiresIn: '7d'});
                userModel.insertLoginLog([
                    1,
                    1,
                    name,
                    password,
                    time,
                    ip
                ]);
                ctx.body = {
                    success: true,
                    message: "登陆成功",
                    token: token,
                    userInfo: {
                        name: res[0]["name"],
                        user_id: res[0]["id"],
                        role: res[0]["role"]
                    }
                }
            } else {
                userModel.insertLoginLog([
                    0,
                    1,
                    name,
                    password,
                    time,
                    ip
                ]);
                ctx.body = {
                    success: false,
                    message: "密码错误"
                }
            }
        }else {
            userModel.insertLoginLog([
                0,
                0,
                name,
                password,
                time,
                ip
            ]);
            ctx.body = {
                success: false,
                message: "请先激活注册邮箱"
            }
        }
    } else {
        userModel.insertLoginLog([
            0,
            0,
            name,
            password,
            time,
            ip
        ]);
        ctx.body = {
            success: false,
            message: "用户名错误"
        };
    }
}
