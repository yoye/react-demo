var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var constants = require('../constants');

var EventDispatcher = assign({}, EventEmitter.prototype, {
  addLoadedListener: function (callback) {
    this.on(constants.LOADED_EVENT, callback);
  },
  removeLoadedListener: function (callback) {
    this.removeListener(constants.LOADED_EVENT, callback);
  },
  addSearchedListener: function (callback) {
    this.on(constants.SEARCHED_EVENT, callback);
  },
  removeSearchedListener: function (callback) {
    this.removeListener(constants.SEARCHED_EVENT, callback);
  },
  addShowSelectedListener: function (callback) {
    this.on(constants.SHOW_SELECTED, callback);
  },
  removeShowSelectedListener: function (callback) {
    this.removeListener(constants.SHOW_SELECTED);
  },
  emitShowSelected: function (show) {
    this.emit(constants.SHOW_SELECTED, show);
  }
});

module.exports = EventDispatcher;