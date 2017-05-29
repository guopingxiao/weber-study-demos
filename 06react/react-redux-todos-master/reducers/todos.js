'use strict';

//单个item的action,state这里是一个obj
const todo = (state, action) => {
	switch (action.type){
		case 'ADD_TODO':
			return{
				text: action.text,
				id: action.id,
				completed:false
			};
		case 'TOGGLE_ITEM':
			if (state.id !== action.id){
				return state; //不是当前项
			}
			return Object.assign({ }, state, {
				completed:!state.completed
			});
		default:
			return state;
	}
};

//列表的actions,state 这里是一个对象数组
const todos = (state=[], action) => {
	switch (action.type){
		case 'ADD_TODO':
			return [
				...state,
				todo(undefined,action)
			];
		case 'TOGGLE_ITEM':
			return state.map(st => todo(st, action));
		default:
			return state;
	}
};

export default todos;