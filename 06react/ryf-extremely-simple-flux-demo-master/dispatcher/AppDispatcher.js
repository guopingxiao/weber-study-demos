// var Dispatcher = require('flux').Dispatcher;
// var AppDispatcher = new Dispatcher();
// var ListStore = require('../stores/ListStore');

// function _handleActions(action){
// 	switch(action.actionType) {
//     case 'ADD_NEW_ITEM':  //对应的action操作Store中对应的数据
//       ListStore.addNewItemHandler(action.text);
//       ListStore.emitChange();
//       break;
//     default:
//       // no op
//   }
// }
// //登记各种Action的回调函数，Dispatcher 只用来派发 Action，不应该有其他逻辑。
// ListStore.dispatchToken = AppDispatcher.register(_handleActions);

// module.exports = AppDispatcher;

var Dispatcher = require('flux').Dispatcher;

var AppDispatcher = new Dispatcher();
var ListStore = require('../stores/ListStore');

function _handleActions(action){
  switch(action.actionType){
    case 'ADD_NEW_ITEM':
      ListStore.addNewItemHandler(action.text);
      ListStore.emitChange();
      break;
    default:
    //no op;
  }
};

ListStore.dispatchToken = AppDispatcher.register(_handleActions);
module.exports = AppDispatcher;

