const router = require('koa-router')();
const baseApi = require('../config').baseApi;
const verify = require('../middlewares/verify');
const register = require('../controllers/register');
const login = require('../controllers/login');
const userInfo = require('../controllers/userInfo.js');


router.prefix(`/${baseApi}`)

router.post('/login', login) //登陆
router.post('/register', register.unActivate) //注册-未激活
router.get('/activate', register.activate) //注册-激活
router.post('/register', register.unActivate) //注册-未激活
router.get('/activate', register.activate) //注册-激活

console.log("router");

module.exports = router
