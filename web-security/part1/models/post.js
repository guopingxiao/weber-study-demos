var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
module.exports = sequelize.define('post', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	title: Sequelize.STRING(256),
	imgUrl: Sequelize.STRING(256),
	content: Sequelize.TEXT
}, {
	tableName: 'post'
});
