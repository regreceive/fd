const Router = require('koa-router');
const api = require('../controller/user');

const router = new Router();
router.post('/login', api.login);
router.get('/get-available-roles', api.availableRoles);
router.post('/update-role', api.updateRole);

module.exports = router;
