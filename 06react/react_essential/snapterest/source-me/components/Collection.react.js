var React = require('react');
var ReactDOMServer = require('react-dom/server');
var CollectionControls = require('./CollectionControls.react');
var TweetList = require('./TweetList.react');
var Header = require('./Header.react');

var Collection = React.createClass({
	//生成组件TweetList的HTML字符串
	createHtmlMarkupStringOfTweetList(){
		var htmlString = ReactDOMServer.renderToStaticMarkup(
			<TweetList tweets = {this.props.tweets} />);
		var htmlMarkup = {
			html: htmlString
		};

		return JSON.stringify(htmlMarkup);
	},

	getListOfTweetIds(){
		return Object.keys(this.props.tweets);
	},
	//获取集合中的推文总数
	getNumberOfTweetsInCollection(){
		return this.getListOfTweetIds().length;
	},

	render(){
		var numberOfTweetsInCollection = this.getNumberOfTweetsInCollection();
		if (numberOfTweetsInCollection > 0) {//如果集合中推文不为空
			var tweets = this.props.tweets;
			var htmlMarkup = this.createHtmlMarkupStringOfTweetList();
			var removeAllTweetsFromCollection = this.props.onRemoveAllTweetsFromCollection;
			var handleRemoveTweetFromCollection = this.props.onRemoveTweetFromCollection;

			return(
                   <div>
                   		<CollectionControls numberOfTweetsInCollection = {numberOfTweetsInCollecton}
                   			htmlMarkup = {htmlMarkup}
                   			onRemoveAllTweetsFromCollection = {removeAllTweetsFromCollection} />
                   		<TweetList tweets = {tweets}
                   			onRemoveTweetFromCollection = {handleRemoveTweetFromCollection} />
                   </div>
				)
		}
		return <Header text ='Your collection is empty' />
	}
});

module.exports = Collection;
