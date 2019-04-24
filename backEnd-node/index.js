const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
// const history = require("connect-history-api-fallback");
const router = require("./src/routes/index");
const { query } = require("./src/utils/db");
const app = new Koa();

// app.use(history());

const server = require("http").createServer(app.callback());

server.listen(3001);

app.use(cors());

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

global.query = query;

console.log("服务器已启动,端口3001");
