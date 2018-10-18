const Router = require('koa-router');
const api = require('../controller/user');

const router = new Router();

router.post('login', api.login);
router.get('api/logout', api.logout);
router.get('config/role', api.availableRoles);
router.post('api/update-role', api.updateRole);
router.get('get-current-state', api.currentState);
router.get('get-earns', api.earns);
router.get('get-offer', api.offer);
router.post('post-offer', api.postOffer);
router.get('quotePrice', api.quotePrice);
router.get('balance', api.balance);
router.get('get-current-coast',api.exchange)

module.exports = router;
