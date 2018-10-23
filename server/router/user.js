const Router = require('koa-router');
const api = require('../controller/user');

const router = new Router();

router.post('login', api.login);
router.get('api/logout', api.logout);
router.get('config/role', api.availableRoles);
router.post('api/update-role', api.updateRole);
router.get('api/user/sell/profit', api.earns);
router.get('get-offer', api.offer);
router.post('api/quotePrice', api.postOffer);
router.post('api/eletric/adjust', api.postTime);
router.get('quotePrice', api.quotePrice);
router.get('api/balance', api.balance);
router.get('api/price/detail', api.priceConstitute);

router.get('api/eletric/earn', api.gainsDetail);
router.get('api/eletric/chart', api.getChartData);
router.get('api/eletric/ex/chart', api.exChart);

router.get('producer/exchangeFrom', api.exchangeForm);

module.exports = router;
