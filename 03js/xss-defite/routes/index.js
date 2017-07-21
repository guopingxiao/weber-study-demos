var express = require('express');
var router = express.Router();

// 假设用户的评论数据就在缓存中喽
var comments = {};

// 采用html编码
function html_encode(str){
  var s = '';
  if(str.lenth == 0) return '';
  s = str.replace(/&/g,"&gt;");
  s = s.replace(/</g, '&lt;');
  s = s.replace(/>/,'&gt;');
  s = s.replace(/\s/,'&nbsp;');
  s = s.replace(/\'/,'&#39;');
  s = s.replace(/\"/,'&quot;');
  s = s.replace(/\n/,'<br>;');
  return s;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//设置评论
router.get('/comment', function(req, res, next) {
  comments.data = html_encode(req.query.comment);
});

//获取评论
router.get('/getComment', function(req,res,next){
  res.json({
      comment:comments.data
  })
})

module.exports = router;
