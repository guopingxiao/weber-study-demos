import todos from './todos';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	todos
});

export default rootReducer;