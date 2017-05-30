/**
 * Created by gpx on 2017/5/30.
 */


import React, {Component, PropTypes}  from 'react';
import TodoInput from './TodoTextInput';

export default class Header extends Component{
    // static propTypes ={
    //     addTodo: PropTypes.func.isRequired
    // };

    handleSave(text){
        if (text.length > 0){
            this.props.addTodo(text);
        }
    };

    render(){
        return(
            <header className="header">
                <h1>Todos</h1>
                <TodoInput
                    placehoder = "hello"
                    onSave = {(text) => this.handleSave(text)}
                    newTodo
                />
            </header>
        );
    }
}