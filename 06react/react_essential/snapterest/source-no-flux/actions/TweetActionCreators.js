var AppDispatcher = require('../dispatcher/AppDispatcher');

function receiveTweet(tweet){
	var action ={
		type:'receiveTweet',
		tweet: tweet
	}

	AppDispatcher.dispatch(action);
}

module.exports = {
	receiveTweet: receiveTweet
}