'use strict';
import {ADD_TODO} from '../constants/ActionTypes'

const initialState = [{
	text:'start',
	completed:false,
	id:0
}];

const todos = (state = initialState, action) =>{
	switch (action.type){
		case ADD_TODO:
			return [
				{
				text:action.text,
				completed:false,
				id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1
				},
				...state
				//展开state的每一项到当前数组
			];
		default:
			return state;
	}
}
export default todos;