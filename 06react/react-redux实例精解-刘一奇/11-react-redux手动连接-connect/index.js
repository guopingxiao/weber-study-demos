import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import counter from './reducers';
import Connect1 from './containers/Connect1';
import Connect2 from './containers/Connect2';
import Connect3 from './containers/Connect3';
import Connect4 from './containers/Connect4';
import Connect5 from './containers/Connect5';

const store = createStore(counter, applyMiddleware(thunk));
const rootEl = document.getElementById('root');

// 1.在所有组件的顶层使用Provider为整个应用提供store.
// 2. 在container中使用connect()将state和action创建函数绑定到组件上。见containers
/*
*  Provider工作原理：
*   Provider只是一个react组件，它的职能是通过context将store传递给子组件，因为Provider是通过
*   context传递store的，所以里面的组件不管跨多少级，都能通过connect()方法来获取store来链接，
*   可以查看/react-redux/components/Provider查看源码，结合第6章的context传数据；
*
*   connect()()函数工作原理：
*   connect是一个嵌套函数，运行后，生成一个高阶组件HoC,该高阶组件接受一个组件作为参数，运行后生成一个新组件，
*   新组件叫connect()组件
*   connect组件从context中获得Provider的store，然后从store中获取state和dispatch，在将state和经过dispatch加工的action
*   创建函数链接到组件上，并在state变化时重新渲染。
*
*   好处 ：页面有多个connect（）链接生成的组件，这些组件只会在自身state发生变化时，重新渲染，互不干扰，因为react-redux
*   在渲染前会检查传入组件的state是否发生变化，没变化，则不渲染，这样用connect（）将将组件间的数据隔离开，
*   就不会“拖累”其他组件的渲染。
*   原则： 应该将redux连接在组件顶层，让里面的组件感受不到redux的存在。
* */
ReactDOM.render(
  <Provider store={store}>
    <div>
      <h2>使用react-redux连接</h2>
      <ul>
        <li>
          connect()的前两个参数分别为函数和对象：
          <Connect1 />
        </li>
        <li>
          connect()的前两个参数均为函数：
          <Connect2 />
        </li>
        <li>
          connect()的前两个参数均为函数，但使用了bindActionCreators：
          <Connect3 />
        </li>
        <li>
          connect()的第二个参数为空：
          <Connect4 />
        </li>
        <li>
          connect()的装饰器写法：
          <Connect5 />
        </li>
      </ul>
    </div>
  </Provider>, rootEl);
