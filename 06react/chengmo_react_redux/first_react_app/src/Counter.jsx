import React, { Component } from 'react'

class Counter extends Component {
    constructor(props){
        super(props)
        console.log('Counter constructor' + this.props.caption)
        this.state ={
            value: props.initialValue || 0
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('enter componentWillReceiveProps ' + this.props.caption)
    }


    componentWillMount() {
        console.log('enter componentWillMount ' + this.props.caption);
    }

    shouldComponentUpdate(nextProps, nextState){
        return (this.props.caption !== nextProps.caption || this.state.value !== nextState.value)
    }

    componentDidMount() {
        console.log('enter componentDidMount ' + this.props.caption);
    }
    render(){
        console.log('Counter render'+ this.props.caption);
        return(
            <div>
                <button onClick={this.handleClick.bind(this)}>{this.props.caption}</button>
                <span>{this.state.value}</span>
            </div>
        )
    }
    handleClick(){
        let preValue = this.state.value,
            newValue = this.state.value + 1;
        this.props.onUpateValue(preValue, newValue);
        this.setState({
            value:newValue
        })
    }
}

export default Counter