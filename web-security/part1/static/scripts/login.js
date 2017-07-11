var formSerialize = require('form-serialize');
var axios = require('axios');
var md5 = require('js-md5');
var modal = require('./ui/modal');

var $form = document.querySelector('[name=loginForm]');

$form.addEventListener('submit', (e) => {
	e.preventDefault();
	let data = formSerialize($form, {
		hash: true
	});

	var SUGAR = '!@FDSA^U^FSAFDAH^*#@';

	data.password = md5(data.username + SUGAR + data.password);

	axios.post('/user/login', data).then((data) => {
		if(data.status === 200 && data.data.status === 0){
			location.href = '/';
			console.log('登录成功');
		}else{
			modal.show({
				content: '登录失败'
			});
			console.log('登录失败');
		}
	});

	console.log('form submit', data);

});
