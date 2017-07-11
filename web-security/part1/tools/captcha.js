var captcha = {};

var cache = {};

captcha.captcha = async function(ctx, next){

	var ccap = require('ccap');
	var capt = ccap();
	var data = capt.get();

	captcha.setCache(ctx.cookies.get('userId'), data[0]);
	ctx.body = data[1];

};

captcha.setCache = function(uid, data){
	console.log(uid, data);
	cache[uid] = data;
};

captcha.validCache = function(uid, data){
	return cache[uid] === data;
};

module.exports = captcha;
