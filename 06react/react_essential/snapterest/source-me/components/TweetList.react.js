var React = require('react');
var Tweet = require('./Tweet.react');

var listStyle = {
	padding: '0'
};

var listItemStyle = {
	display:'inline-block',
	listStyle: 'none'
};

var TweetList = React.createClass({
	getListOfTweetIds(){
		return Object.keys(this.props.tweets);
	},

	getTweetElement(tweetId){
		var tweet = this.props.tweets[tweetId];
		var handleRemoveTweetFromCollection = this.props.onRemoveTweetFromCollection;
		var tweetElement;

		if (handleRemoveTweetFromCollection) {
			tweetElement = <Tweet tweet = {tweet} onImageClick = {handleRemoveTweetFromCollection} />;
		}else{
			tweetElement = <Tweet tweet = {tweet} />
		}

		return <li style={listItemStyle} key = {tweet.id}>{tweetElement}</li>;
	},

	render(){
		var tweetElements = this.getListOfTweetIds().map(this.getTweetElement);
		return (
			<ul style={listStyle}>
				{tweetElements}
			</ul>
		);
	}
});


module.exports = TweetList;
