import React, { Component } from 'react'
import Counter from './Counter'

class CounterPanel extends Component {
    constructor(props){
        super(props)
        this.initialValue = [0, 10, 20]
        const sumValue = this.initialValue.reduce((a,b)=>a+b ,0)
        this.state ={
            sumValue:sumValue
        }
    }
    render(){
        console.log('CounterPanl render');
        return(
            <div>
                <Counter onUpateValue = {this.onUpdateValue.bind(this)} caption = 'first' initialValue={0} />
                <Counter onUpateValue = {this.onUpdateValue.bind(this)} caption = 'second' initialValue={10} />
                <Counter onUpateValue = {this.onUpdateValue.bind(this)} caption = 'third' initialValue={20} />
                <span>{this.state.sumValue}</span>
            </div>
        )
    }
    onUpdateValue(prev, next){
        let changeValue = next- prev
        this.setState({
            sumValue:this.state.sumValue + changeValue
        })
    }
}

export default CounterPanel