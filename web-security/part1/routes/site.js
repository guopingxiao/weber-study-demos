const Router = require('koa-router');
const router = new Router({
	prefix: '' //没有任何前缀则会走到site下面
});

const site = require('../controllers/site');
const captcha = require('../tools/captcha');

router.all('/*', async function(ctx, next){
	console.log('enter site.js');
	ctx.set('X-XSS-Protection', 0);
	ctx.set('X-Frame-Options', 'DENY');
	// ctx.set(`Content-Security-Policy`, `script-src 'self' 'sha256-nIk3U+a69DO8a0GCyK2V/qcQHQ1Y/hkEZjg9CpNxEgQ='`)
	await next();
});

router.get('/', site.index); // 首页，site controller 的index方法
router.get('/post/:id', site.post); //文章
router.post('/post/addComment', site.addComment); // 添加评论
router.get('/ajax/addComment', site.addComment);
router.get('/captcha', captcha.captcha);

module.exports = router;
