var Appdispatcher = require('../dispatcher/Appdispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var tweet = null;

function setTweet(receivedTweet){
	tweet = receivedTweet;
}

function emitChange(){
	TweetStore.emit('change');
}

var TweetStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback){
		this.on('change', callback);
	},

	removeChangeListener: function(){
		this.removeListener('change', callback);
	},

	getTweet: function(){
		return tweet;
	},
});

function handleAction(action){
	if (action.type == 'receiveTweet') {
		setTweet(action.tweet);
		emitChange();
	}
},

TweetStore.dispatcherToken = Appdispatcher.register('handleAction');

module.exports = TweetStore;

