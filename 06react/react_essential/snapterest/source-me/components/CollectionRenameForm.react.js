var React = require('react');
var Header = require('./Header.react');
var Button = require('./Button.react');

var inputStyle = {
	marginRight: '5px'
}

var CollectionRenameForm = React.createClass({
	getInitialState() {
		return{
			inputValue: this.props.name
		}
	},

	setInputValue(inputValue){
		this.setState({
			inputValue: inputValue
		});
	},

	handleInputValueChange(event){
		var inputValue = event.target.value;
		this.setInputValue(inputValue);
	},

	handleFormSubmit(event){
		event.preventDefault();
		var collectionName = this.state.inputValue;
		this.props.onChangeCollectionName(collectionName);
	},

	handleFormCancel(event){
		event.preventDefault();
		var collectionName = this.props.name;
		this.setInputValue(collectionName);
		this.props.onCancelCollectionNameChange();
	},

	componentDidMount() {
		this.refs.collectionName.focus();
	},

	render(){
		return(
			<form className = 'form-inline' onSubmit = {this.handleSubmit} >
				<Header text ="Collection name: " />
				<div className = 'form-group'>
					<input className ='form-control' style = {inputStyle}  ref="collectionName"
						onChange ={this.handleInputValue} value = {this.state.inputValue} />
				</div>
				<Button label ="Change" handleClick = {this.handleFormSubmit} />
				<Button label ="Cancel" handleClick = {this.handleFormCancel} />
			</form>
			)
	}
})


module.exports = CollectionRenameForm;
