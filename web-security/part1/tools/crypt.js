var crypt = {};
const KEY = '#da9%@!#(lfsa#$%';


crypt.cryptUserId = function(userId){
	var crypto = require('crypto');
	var sign = crypto.createHmac('sha256', KEY);
	sign.update(userId + '');
	return sign.digest('hex');
};

module.exports = crypt;
