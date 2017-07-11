var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
module.exports = sequelize.define('user', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	username: Sequelize.STRING(32),
	password: Sequelize.STRING(64),
	salt: Sequelize.STRING(64)
}, {
	tableName: 'user'
});
