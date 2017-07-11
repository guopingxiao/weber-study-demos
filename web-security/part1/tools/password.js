var password = {};

var md5 = function(str){
	var crypto = require('crypto');
	var md5Hash = crypto.createHash('md5');
	md5Hash.update(str);
	return md5Hash.digest('hex');
};

password.getPasswordFromText = function(username, password){
	var SUGAR = '!@FDSA^U^FSAFDAH^*#@';
	return md5(username + SUGAR + password);
};

password.getSalt = function(){
	return md5(Math.random()*999999+''+new Date().getTime());
};

password.encryptPassword = function(salt, password){
	return md5(salt + 'af@!93$20128#@#@' + password);
};

module.exports = password;
