var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./Header.react');
var Tweet = require('./Tweet.react');

var StreamTweet = React.createClass({
	getInitialState() { // StreamTweet初四状态
		console.log('StreamTweet:--- getInitialState()');
		return{
			numberOfCharactersIsIncreasing : null,//推文字符是否递增，bool型
			headerText:null //Header 文本
		}
	},

	componentWillMount() { // StreamTweet组件将要构建
		console.log('StreamTweet:--- componentWillMount()');
		this.setState({
			numberOfCharactersIsIncreasing: true, //第一条推文是递增的
			headerText: 'Latest public photo from Twtter.'
		});

		window.snapterest ={
			numberOfReceivedTweets:1, //接收推文条数
			numberOfDisplayedTweets:1 //显示推文条数
		} 
	},

	render(){
		console.log('StreamTweet:--- render()');
		
		return(
			<section>
				<Header text= {this.state.headerText} />
				<Tweet tweet = {this.props.tweet} onImageClick = {this.props.onAddTweetToCollection} />
			</section>
		);
	},

	componentDidMount() {
		console.log('StreamTweet:--- componentDidMount()');
		var componentDOM = ReactDOM.findDOMNode(this);
		window.snapterest.headerHtml = componentDOM.children[0].outerHTML; //Header 组件的HTML字符串
		window.snapterest.tweetHtml = componentDOM.children[1].outerHTML; //Tweet 组件的HTML字符串
	},



	componentWillReceiveProps(nextProps) {
		console.log('StreamTweet:--- componentWillReceiveProps()');

		var currentTweetLength = this.props.tweet.text.length; //当前推文字符长度
		var nextTweetLength = nextProps.tweet.text.length;     //下一推文字符长度
		var isNumberOfCharactersIncreasing = (nextTweetLength > currentTweetLength);

		var headerText;

		this.setState({
			numberOfCharactersIsIncreasing: isNumberOfCharactersIncreasing
		});
		if (isNumberOfCharactersIncreasing) {
			headerText = 'Number of Twitter text is increasing';
		}else{
			headerText = 'Latest public photo from Twitter';
		}

		this.setState({
			headerText: headerText
		})

		window.snapterest.numberOfReceivedTweets++; //接收推文数目加1;
	},

	shouldComponentUpdate(nextProps, nextState) {
		console.log('StreamTweet:--- shouldComponentUpdate()');
		return (nextProps.tweet.text.length > 1) //还有推文就渲染，没有就不渲染；
	},

	componentWillUpdate(nextProps, nextState) {
		console.log('StreamTweet:--- componentWillUpdate()');
	},

	componentDidUpdate(prevProps, prevState) {
		console.log('StreamTweet:--- componentDidUpdate()');
		window.snapterest.numberOfDisplayedTweets++; //显示推文数目加1；
	},

	componentWillUnmount() {
		console.log('StreamTweet:--- componentWillUnmount()');
		delete window.snapterest;
	}

});

module.exports = StreamTweet;
