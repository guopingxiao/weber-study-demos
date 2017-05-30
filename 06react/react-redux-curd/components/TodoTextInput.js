/**
 * Created by gpx on 2017/5/30.
 */
import React, {Component, PropTypes}  from 'react';

export default class TodoTextInput extends Component{
    // static propTypes ={
    //     text:PropTypes.string,
    //     placeholder:PropTypes.string
    // };
    constructor(props) {
        super(props);
        // 设置 initial state
        this.state = {
            text:this.props.text || ''
        };
    }


    handleSubmit(e)  {
        const text = e.target.value.trim();
        if (e.which === 13){
            this.props.onSave(text);
            if (this.props.newTodo){
                this.setState({text:''})
            }
        }
    };

    handleChange(e){
        this.setState({text:e.target.value});
    };

    handleBlur(e ){
        if (!this.props.newTodo){
            this.props.onSave(e.target.value);
        }
    };

    render(){
        return(
            <input
                type="text"
                className="new-todo"
                placeholder={this.props.placeholder}
                value={this.state.text}
                onKeyDown = {(e) => this.handleSubmit(e)}
                onChange={(e) => this.handleChange(e)}
                onBlur = {(e) => this.handleBlur(e)}
            />
        );
    }
}