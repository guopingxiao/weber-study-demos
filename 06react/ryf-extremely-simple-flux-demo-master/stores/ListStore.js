var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ListStore = assign({}, EventEmitter.prototype, {
  items: [],

  getAll() {
    return this.items;
  },

  addNewItemHandler(text) {
    this.items.push(text);
  },

  emitChange() {
    this.emit('change');
  },

  addChangeListener(callback) {
    this.on('change', callback)
  },

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }
});

module.exports = ListStore;