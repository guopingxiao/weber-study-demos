import { createStore } from 'redux';

// 这里其实是个reducer,在reducer中唯一要注意的就是不要改变state的值，而要
//返回新的state（Object.assign）,在纯函数中只不执行有副作用的操作，调用API,路由等操作。
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
/**
 * 使用这个reducer纯函数代替上面的函数，会发现：
 * 当state为对象时，如果在reducer中修改state，
 * 将会导致新旧state指向一个地址
 */
// function counter(state = { val: 0 }, action) {
//   switch (action.type) {
//     case 'INCREMENT':
//     state.val++;
//       return state;
//     case 'DECREMENT':
//     state.val--;
//       return state;
//     default:
//       return state;
//   }
// }

/*
* store的作用：负责更新，查询，订阅state多个状态，维持应用的state,由createStore(reducer创建)
* 1.store.getState()获得state;
* 2.store.subscribe()注册监听器
* 3.store.dispatch(action)方法更新state
* */
const store = createStore(counter);

let currentValue = store.getState();

const listener = () => {
  const previousValue = currentValue;
  currentValue = store.getState();
  console.log('pre state:', previousValue, 'next state:', currentValue);
};

store.subscribe(listener);

/* action是数据的唯一来源，发起action后，action传2进store，
store通过reducer更新state，改变state的唯一途径是dispatch一个action*/
store.dispatch({ type: 'INCREMENT' });

store.dispatch({ type: 'INCREMENT' });

store.dispatch({ type: 'DECREMENT' });
