const Router = require('koa-router');
const api = require('../controller/user');

const router = new Router();
router.post('/login', api.login);
router.get('/logout', api.logout);
router.get('/get-available-roles', api.availableRoles);
router.post('/update-role', api.updateRole);
router.get('/get-current-state', api.currentState);
router.get('/get-earns', api.earns);
router.get('/get-offer', api.offer);
router.post('/post-offer', api.postOffer);

module.exports = router;
