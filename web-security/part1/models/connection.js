//数据库连接
const mysql = require('mysql2');
exports.getConnection = function(){
	let connection = mysql.createConnection({
		host: 'localhost',
		database: 'safety',
		user: 'root',
		password:'111111'
	});
	connection.connect();
	return connection;
};
