const baseApi = 'api/logistics'
const db = {
    host: '127.0.01', // 数据库IP
    port: 3306, // 数据库端口
    database: 'logistics_management_system', // 数据库名称
    user: '123456', // 数据库用户名
    password: '123456', // 数据库密码,
    salt: 'happy-chat'
}

const mailer = {
    host:"smtp.qq.com",
    port: 465,
    domains:'["qq.com"]',
    account:'184866445@qq.com',
    pass: "11111111111111111111111",
    from: "物流管理系统<184866445@qq.com>",
    route_on: true,
    encoding: "utf-8"
}

const secret = 'happy-chat-sec'

module.exports = {
    db,
    mailer,
	baseApi,
	secret
}
