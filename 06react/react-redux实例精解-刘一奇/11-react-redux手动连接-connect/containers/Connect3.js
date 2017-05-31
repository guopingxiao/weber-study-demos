import Counter from '../components/Counter';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';

/*
 * connect函数的第三种写法：第一个参数为state的函数，该函数的返回的对象将被合并到组件的props中，
 * 第二个参数是dispatch的函数，但是函数的返回值值使用了redux的bindActionCreators()来减少代码样板；
 * */
export default connect(
  state => ({ counter: state.counter }),
  dispatch => bindActionCreators(ActionCreators, dispatch)
)(Counter);
