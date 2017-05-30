import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from './reducers';
import App from './containers';

//配置入口文件
//我们这里 从react-redux 中获得一个Provider 组件，把它渲染到应用的最外层
//它需要一个store属性，他把这个store放在context中，给APP（connect）用。
const store = createStore(reducer);

console.log(store.getState());

render(
	<Provider store={store}>
		<App />
	</Provider >,
	document.getElementById('root')
);