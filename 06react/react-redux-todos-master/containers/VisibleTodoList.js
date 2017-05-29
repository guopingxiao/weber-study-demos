import React from 'react';
import { connect } from 'react-redux';
import { toggleItem } from '../actions/index';
import TodoList from '../components/TodoList';

const getVisibleTodos = (todos, filter) => {
    switch(filter){
        case "SHOW_ALL":
            return todos;
        case "SHOW_COMPLETED":
            return todos.filter(t => t.completed)
        case "SHOW_ACTIVE":
            return todos.filter(t => !t.completed);
    }
}

// State to Props
const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }
}

// Dispatch to Props
const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(toggleItem(id));
        }
    }
};




//React 组件一共有两类属性，一类是当我们进行一个操作之后，引起state的变化，state的变化，如何影响组件的props；
//另一类是由dispatch（分发行为）引起的属性变化。如果我们能明确这两类属性的变化，就知道了react的数据传递。
// const VisibleTodoList = connect({
//     mapStateToProps,
//     mapDispatchToProps
// })(TodoList);
const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

export default VisibleTodoList;