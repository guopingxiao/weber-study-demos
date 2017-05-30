import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

/* action创建函数就是创建action对象，但是通过与其他中间件的结合，可以返回更多的数据类型，
*  redux-thunk 就是返回一个函数，接受store的dispatch和getState作为参数；
* */
function increment() {
  return { type: 'INCREMENT' };
}
function decrement() {
  return { type: 'DECREMENT' };
}

// 增强的action创建函数，配合中间件，是的React只负责渲染界面和发送action,
// 其他的逻辑都可以交给redux.这react与redux的最佳实践。

function incrementIfOdd() {
  return (dispatch, getState) => {
    const value = getState();
    if (value % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}
function incrementAsync(delay = 1000) {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// 安装，引入并使用。
const store = createStore(counter, applyMiddleware(thunk));

let currentValue = store.getState();
store.subscribe(() => {
  const previousValue = currentValue;
  currentValue = store.getState();
  console.log('pre state:', previousValue, 'next state:', currentValue);
}
);

store.dispatch(increment());

store.dispatch(incrementIfOdd());

store.dispatch(incrementAsync());

store.dispatch(decrement());
