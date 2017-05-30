import React,{PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import  Header from '../components/Header';
import * as TodoActions from '../actions';

const App = ({todos, actions}) => (
    <div>
        <Header addTodo = {actions.addTodo} />
    </div>
);
// App.propTypes.array = {
//     todos:PropTypes.array.isRequired,
//     actions: PropTypes.object.isRequired
// };

//mapStateToProps 函数的第一个参数是Redux的store,这里返回了todos对象
//所以在TodoInput等组件中，会有todos这个属性字段；
const mapStateToProps = state =>({
    todos: state.todos
});
// mapDispatchToProps的功能是将 actions作为 props绑定到组件上，Redux本身 提供
//bindActionCreators函数来将action包装成直接可以被调用的函数
const mapDispatchToProps = dispatch =>({
    actions:bindActionCreators(TodoActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
