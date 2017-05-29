'use strict';

let  itemId = 0;
export const addTodo=(text)=>{
	return{
		type:'ADD_TODO',
		id:itemId ++,
		text
	}
};

export  const setVisibility = (filterType) =>{
	return{
		type:'SET_VISIBILITY',
		filterType
	}
};

export const toggleItem = (id) =>{
	return{
		type:'TOGGLE_ITEM',
		id
	}
};