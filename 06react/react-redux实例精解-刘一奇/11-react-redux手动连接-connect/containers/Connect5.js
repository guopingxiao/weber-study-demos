import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';

// 装饰器应该写在类声明上面
/*
 * 装饰器写法只是和上面写法语法上的区别，这样的话就不能使用无状态函数来编写组件，因为装饰器需要
 * 添加在类声明上，同时也要用static propTypes这种静态属性来声明props.
 * */
@connect(
  state => ({ counter: state.counter }),
  ActionCreators
)
class Counter extends Component { // eslint-disable-line

  static propTypes = {
    counter: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    incrementIfOdd: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired
  };

  render() {
    const { counter, increment, decrement, incrementIfOdd, incrementAsync } = this.props;
    return (
      <p>
        Clicked: {counter} times
        {' '}
        <button onClick={increment}>+</button>
        {' '}
        <button onClick={decrement}>-</button>
        {' '}
        <button onClick={incrementIfOdd}>Increment if odd</button>
        {' '}
        {/* 这里必须写成箭头函数，因为有setTimeout()函数的存在，否则incrementAsync中的delay参数将会是SyntheticEvent的实例*/}
        <button onClick={() => incrementAsync()}>Increment async</button>
      </p>
    );
  }
}

export default Counter;
