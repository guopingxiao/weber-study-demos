var React = require('react');
var Stream = require('./Stream.react');
var Collection = require('./Collection.react');

var Application =  React.createClass({
	getInitialState() {
		return{
			collectionTweets: {}
		}
	},
	addTweetToCollection(tweet){
		var collectionTweets = this.state.collectionTweets;
		collectionTweets[tweet.id] = tweet;

		this.setState({
			collectionTweets: collectionTweets
		})
	},
	removeTweetFromCollection(tweet){
		var collectionTweets = this.state.collectionTweets;
		delete collectionTweets[tweet.id];

		this.setState({
			collectionTweets: collectionTweets
		})
	},
	removeAllTweetsFromCollection(){
		this.setState({
			collectionTweets: {}
		})
	},
	render(){
		return(
             <div className = 'container-fluid'>
             	<div className = 'row'>
             		<div className = 'col-md-4 text-center'>
             		   	<Stream onAddTweetToCollection = {this.addTweetToCollection} />
             		</div>
             		<div className = 'col-md-8'>
             		   	<Collection tweets = {this.state.collectionTweets} 
             		   	onRemoveTweetFromCollection = {this.removeTweetFromCollection} 
             		   	onRemoveAllTweetsFromCollection = {this.removeAllTweetsFromCollection} />
             		</div>
             	</div>
             </div>
			);
	}
});

module.exports = Application;

