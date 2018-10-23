const Router = require('koa-router');
const api = require('../controller/user');

const router = new Router();

// 登录
router.post('login', api.login);
// 登出
router.get('api/logout', api.logout);
// 可用角色列表
router.get('config/role', api.availableRoles);
// 绑定角色
router.post('api/update-role', api.updateRole);
// 卖家收益
router.get('api/user/sell/profit', api.earns);
// 报价信息
router.get('get-offer', api.offer);
// 报价
router.post('api/quotePrice', api.postOffer);
// 用电调整
router.post('api/eletric/adjust', api.postTime);
// 报价历史
router.get('quotePrice', api.quotePrice);
// 余额
router.get('api/balance', api.balance);
// 电力组成
router.get('api/price/detail', api.priceConstitute);
// 收益明细
router.get('api/eletric/earn', api.gainsDetail);
// 买家电力交易
router.get('api/eletric/chart', api.getChartData);
// 卖家电力交易
router.get('api/eletric/ex/chart', api.exChart);
// 电力交易报表
router.get('producer/exchangeFrom', api.exchangeForm);

module.exports = router;
