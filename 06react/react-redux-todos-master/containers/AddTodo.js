import  React from  'react';
import {connect} from 'react-redux';
import {addTodo} from '../actions/index';

//这个container组件 显示和逻辑在一起的，没有分离开，对于简单的组件可以这么搞，复杂的就不行了
let AddTodo = ({dispatch}) => {
    let input;
    return (
        <div>
            <form onSubmit={ e => {
                e.preventDefault();
                if (!input.value.trim()) {
                    return;
                }
                dispatch(addTodo(input.value));
                input.value = '';
            }}>
                <input type="text" ref={node => {input = node}}/>
                <button type="submit">Add TO DO</button>
            </form>

        </div>
    );
};

AddTodo = connect()(AddTodo);

export default AddTodo;
