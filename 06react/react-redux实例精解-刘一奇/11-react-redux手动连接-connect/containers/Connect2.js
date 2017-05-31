import Counter from '../components/Counter';
import { connect } from 'react-redux';
import { increment, decrement, incrementIfOdd, incrementAsync } from '../actions';

/*
 * connect函数的第二种写法：第一个参数为state的函数，该函数的返回的对象将被合并到组件的props中，
 * 第二个参数是dispatch的函数，注意该函数返回的对象虽然会被合并到组件的props上，
 * 但是这种写法不会自动为action创建函数绑定dispatch方法；
 * */
export default connect(
  state => ({ counter: state.counter }),
  dispatch => ({
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
    incrementIfOdd: () => dispatch(incrementIfOdd()),
    incrementAsync: () => dispatch(incrementAsync()),
  })
)(Counter);
