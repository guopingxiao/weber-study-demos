const bluebird = require('bluebird');
const connectionModel = require('../models/connection');
const User = require('../models/user');
const crypt = require('../tools/crypt');
const session = require('../tools/session');
const password = require('../tools/password');

exports.login = async function(ctx, next){
	ctx.render('login');
};

exports.doLogin = async function(ctx, next){
	try{

		// 提交的数据
		const data = ctx.request.body;
		// 用户已存在的数据
		const user = await User.findOne({
			where:{
				username: data.username
			}
		});

		// 如果用户存在
		if(user){
			// 并且有盐，说明已经处理过了
			var salt = user.salt;
			// 如果没有盐，需要加盐升级
			if(!salt){

				console.log('没有salt，准备更新密码');
				salt = password.getSalt();
				var newPassword = password.getPasswordFromText(user.username, user.password);
				console.log(salt);
				let encryptedPassword = password.encryptPassword(salt, newPassword);
				await User.update({
					salt: salt,
					password: encryptedPassword
				},{
					where: {
						id: user.id
					}
				});
				user.salt = salt;
				user.password = encryptedPassword;
				console.log('没有salt，更新密码成功');
			}
			let encryptedPassword = password.encryptPassword(salt, data.password);
			if(user.password !== encryptedPassword){
				throw new Error('登录出错');
			}

			var sessionId = session.set(user.id, {
				userId: user.id
			});

			ctx.cookies.set('sessionId', sessionId, {
				httpOnly: true,
				// sameSite: 'strict'
			});

			// 登录成功，设置cookie
			/*ctx.cookies.set('sign', crypt.cryptUserId(user.id), {
				httpOnly:false,
				sameSite:'strict'
			});
			ctx.cookies.set('userId', user.id, {
				httpOnly:false,
				sameSite:'strict'
			});*/


			ctx.body = {
				status: 0,
				data:{
					id: user.id,
					name: user.name
				}
			};
		}else{
			throw new Error('登录失败');
		}

	}catch(e){
		console.log('[/user/login] error:', e.message, e.stack);
		ctx.body = {
			status: e.code || -1,
			body: e.message
		};
	}
};
