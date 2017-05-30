import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import Counter from './components/Counter';
import counter from './reducers';

const store = createStore(counter);
const rootEl = document.getElementById('root');

/* 手动连接到React组件，需要两步：
   （1）：将state和 发起action的方法连接到组件中，getState()和 dispatch()
   (2) ： 渲染并监听组件变化，
   缺点：
   （1）：无法直接给里面的组件传递state和方法；
   (2): 任意state的变化都会导致整个组件的重新渲染，没有优化性能；
   可以使用第三方库 react-redux专门设计了组件间的连接；
* */
function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
      onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
    />,
    rootEl
  );
}

render();
store.subscribe(render);
