const Router = require('koa-router');
const api = require('../controller/user');

const router = new Router();
router.post('/login', api.login);

module.exports = router;
