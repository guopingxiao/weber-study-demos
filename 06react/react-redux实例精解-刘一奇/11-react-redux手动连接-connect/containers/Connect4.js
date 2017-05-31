import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { increment, decrement, incrementIfOdd, incrementAsync } from '../actions';

function Counter({ counter, dispatch }) {
  return (
    <p>
      Clicked: {counter} times
      {' '}
      <button onClick={() => dispatch(increment())}>+</button>
      {' '}
      <button onClick={() => dispatch(decrement())}>-</button>
      {' '}
      <button onClick={() => dispatch(incrementIfOdd())}>Increment if odd</button>
      {' '}
      <button onClick={() => dispatch(incrementAsync())}>Increment async</button>
    </p>
  );
}

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};
/*
 * connect函数的第四种写法：第一个参数为state的函数，该函数的返回的对象将被合并到组件的props中，
 * 第二个参数为空，这样connect()函数会自动传递dispatch给组件，让组件自己能分发action创建函数。
 * */
export default connect(
  state => ({ counter: state.counter })
)(Counter);
