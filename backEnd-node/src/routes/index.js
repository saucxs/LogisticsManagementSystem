const router = require('koa-router')();
const baseApi = require('../config').baseApi;
const verify = require('../middlewares/verify');
const register = require('../controllers/register');
const login = require('../controllers/login');
const userInfo = require('../controllers/userInfo.js');
const order = require('../controllers/order');
const transport = require('../controllers/transport');
const store = require('../controllers/store');
const car = require('../controllers/car');
const team = require('../controllers/team');

router.prefix(`/${baseApi}`)

router.post('/login', login) //登陆
router.post('/register', register.unActivate) //注册-未激活
router.get('/activate', register.activate) //注册-激活

router.get('/orderList', verify, order.getOrderList)// 获取订单列表
router.post('/addOrder', verify, order.addOrder) //添加订单
router.post('/deleteOrder', verify, order.deleteOrder) //删除订单
router.get('/orderListMap', verify, order.getOrderListMap)// 获取订单的select项

router.get('/transportList', verify, transport.getTransportList)// 获取运输单列表
router.post('/addTransport', verify, transport.addTransport) //添加运输单
router.post('/deleteTransport', verify, transport.deleteTransport) //删除运输单

router.get('/storeList', verify, store.getStoreList)// 获取仓库列表
router.post('/addStore', verify, store.addStore) //添加仓库
router.post('/deleteStore', verify, store.deleteStore) //删除仓库

router.get('/carList', verify, car.getCarList)// 获取车辆列表
router.post('/addCar', verify, car.addCar) //添加车辆
router.post('/deleteCar', verify, car.deleteCar) //删除车辆
router.get('/carListMap', verify, car.getCarListMap)// 获取汽车的select项

router.get('/teamList', verify, team.getTeamList)// 获取人员列表
router.post('/addTeam', verify, team.addStore) //添加人员
router.post('/deleteTeam', verify, team.deleteStore) //删除人员

console.log("router");

module.exports = router
