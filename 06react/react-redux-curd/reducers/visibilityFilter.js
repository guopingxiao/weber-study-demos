
const visibilityFilter = (state="SHOW_ALL", action) =>{
	switch(action.type){
		case 'SET_VISIBILITY':
			return action.filterType;
		default:
			return state;
	}
};

export default visibilityFilter;