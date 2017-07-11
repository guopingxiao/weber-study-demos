const bluebird = require('bluebird');
const connectionModel = require('../models/connection');
const crypt = require('../tools/crypt');
const session = require('../tools/session');


var escapeHtml = function(str) {
	if(!str) return '';
	str = str.replace(/&/g, '&amp;');
	str = str.replace(/</g, '&lt;');
	str = str.replace(/>/g, '&gt;');
	str = str.replace(/"/g, '&quto;');
	str = str.replace(/'/g, '&#39;');
	// str = str.replace(/ /g, '&#32;');
	return str;
};

var escapeForJs = function(str) {
	if(!str) return '';
	str = str.replace(/\\/g, '\\\\');
	str = str.replace(/"/g, '\\"');
	return str;
};

exports.index = async function(ctx, next){
	const connection = connectionModel.getConnection();
	const query = bluebird.promisify(connection.query.bind(connection));
	const posts = await query(
			'select post.*,count(comment.id) as commentCount from post left join comment on post.id = comment.postId group by post.id limit 10'
		);
	const comments = await query(
			'select comment.*,post.id as postId,post.title as postTitle,user.username as username from comment left join post on comment.postId = post.id left join user on comment.userId = user.id order by comment.id desc limit 10'
		);
	ctx.render('index', {
		posts,
		comments,
		from: escapeHtml(ctx.query.from) || '',
		//fromForJs: ctx.query.from, // 简单粗暴
		//fromForJs: escapeForJs(ctx.query.from),// 过滤掉 " 和  \
		fromForJs: JSON.stringify(ctx.query.from),
		avatarId: escapeHtml(ctx.query.avatarId) || ''
	});
	connection.end();
};

// 对富文本进行过滤
var xssFilter = function(html){
	if(!html) return '';

	var xss = require('xss');
	// 白名单过滤
	var ret = xss(html, {
		whiteList:{
			img: ['src'],
			a: ['href'],
			font: ['size', 'color']
		},
		onIgnoreTag: function(){
			return '';
		}
	});


	console.log(html, ret);

	return ret;
};

exports.post = async function(ctx, next){
	try{

		var Post = require('../models/post');
		var Comment = require('../models/comment');
		let post = await Post.findById(ctx.params.id);
		let comments = await Comment.findAll({
			where:{
				postId:post.id
			}
		});

		/*const comments = await query(
			`select comment.*,user.username from comment left join user on comment.userId = user.id where postId = "${post.id}" order by comment.createdAt desc`
		);
		comments.forEach(function(comment) {
			comment.content = xssFilter(comment.content);
		});*/
		if(post){
			ctx.render('post', {post, comments});
		}else{
			ctx.status = 404;
		}
	}catch(e){
		console.log('[/site/post] error:', e.message, e.stack);
		ctx.body = {
			status: e.code || -1,
			body: e.message
		};
	}
};

exports.addComment = async function(ctx, next){
	try{
		var data;
		if(ctx.request.method.toLowerCase() === 'post'){
			data = ctx.request.body;
		}else{
			data = ctx.request.query;
		}

		var referer = ctx.request.headers.referer;
		// console.log(ctx.request.headers, referer);
		// if(!/^https?:\/\/localhost/.test(referer)){
		// if(referer.indexOf('localhost') === -1){
			// throw new Error('非法请求');
		// }

		var sessionId = ctx.cookies.get('sessionId');
		var sessionObj = session.get(sessionId);
		if(!sessionObj || !sessionObj.userId){
			throw new Error('session不存在');
		}
		var userId = sessionObj.userId;

		/*var userId = ctx.cookies.get('userId');
		var sign = ctx.cookies.get('sign');
		var correctSign = crypt.cryptUserId(userId);
		if(correctSign !== sign){
			throw new Error('报告，有人入侵');
		}*/

		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
		const result = await query(
			`insert into comment(userId,postId,content,createdAt) values("${userId}", "${data.postId}", "${data.content}","${new Date().toISOString()}")`
		);
		if(result){
			ctx.redirect(`/post/${data.postId}`);
		}else{
			ctx.body = 'DB操作失败';
		}
	}catch(e){
		console.log('[/site/addComment] error:', e.message, e.stack);
		ctx.body = {
			status: e.code || -1,
			body: e.message
		};
	}
};
