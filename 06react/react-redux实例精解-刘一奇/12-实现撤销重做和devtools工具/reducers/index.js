import { combineReducers } from 'redux';
import undoable, { includeAction } from 'redux-undo';
import counter from './counter';
import { INCREMENT_COUNTER, DECREMENT_COUNTER, UNDO_COUNTER, REDO_COUNTER } from '../actions';

/*
   本应该用counter这个纯函数作为reducer,但是这里使用高阶函数undoable()将counter作为参数传递，配置了一个更高级的reducer
*/
const rootReducer = combineReducers({
  counter: undoable(counter, {
    filter: includeAction([INCREMENT_COUNTER, DECREMENT_COUNTER]), //需要过滤出来的actions
    limit: 10,   // 次数限制
    debug: true,
    undoType: UNDO_COUNTER, // 撤销和重做的actions
    redoType: REDO_COUNTER
  })
});

/*
  你可能会感觉到redux这样非常低效，改变action，需要经历action 到reducer才能完成， 但是这样使得数据流每次变化都会记录在案，
  使得撤销和重做实现容易，
  优点： 单一的数据流
        actions集中管理
        中间件拓展强
*/

export default rootReducer;
