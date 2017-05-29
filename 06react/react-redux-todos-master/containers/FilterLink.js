import React from 'react';
import {connect} from 'react-redux';
import {setVisibility} from '../actions/index';
import Link from '../components/Link';


// ownProps 是FilterLink的自定义属性
const mapStateToProps = (state, ownProps) => {
	return{
		active: state.visibilityFilter === ownProps.filter
	}
}

const mapDispatchToProps  = (dispatch, ownProps) => {
	return{
		onLinkClick: () => {
			dispatch(setVisibility(ownProps.filter));
		}
	}
}

const FilterLink = connect(
	mapStateToProps,
	mapDispatchToProps
)(Link);

export default FilterLink;