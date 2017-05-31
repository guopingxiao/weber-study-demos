import Counter from '../components/Counter';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
/*
* connect函数的第一种写法：第一个参数为state的函数，该函数的返回的对象将被合并到组件的props中，
* 第二个参数是多个action创建函数的组成的对象，该对象也被合并到组件的props中，而且可以直接运行，无需使用dispatch
* */
export default connect(
  state => ({ counter: state.counter }),
  ActionCreators
)(Counter);
