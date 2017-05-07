var AppDispatcher = require('../dispatcher/AppDispatcher');

//这个函数就是action的核心函数，包括该action要更新的数据，作为函数的参数传递进去
var ButtonActions = {
  addNewItem(text){
    var action = {
      actionType:'ADD_NEW_ITEM',
      text: text
    };
    AppDispatcher.dispatch(action);
  }
};

module.exports = ButtonActions;
