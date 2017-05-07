var React = require('react');
var SnapkiteStreamClient = require('snapkite-stream-client');
var StreamTweet = require('./StreamTweet.react');
var Header = require('./Header.react');

var Stream = React.createClass({
	getInitialState() {
		return{
			tweet: null
		}
	},

	handleNewTweet(tweet){
		this.setState({
			tweet:tweet
		});
	},

	render(){
		var tweet = this.state.tweet;
		// 如果有数据渲染StreamTweet
		if(tweet){
			return(
        		<StreamTweet tweet = {tweet} onAddTweetToCollection = {this.props.onAddTweetToCollection} />
				)
		}
		// 没有数据，渲染Header
		return(
			<Header text = 'Waiting for public photoes from Twitter....' />
		)
	},

	componentDidMount: function () {
	    SnapkiteStreamClient.initializeStream(this.handleNewTweet);
	  },

	  componentWillUnmount: function () {
	    SnapkiteStreamClient.destroyStream();
	  }
});

module.exports = Stream;
