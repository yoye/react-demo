var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var SHOW_SELECTED = 'show.selected';
var FORM_SUBMITTED = 'form.submitted';
var RENAME_STARTED = 'rename.started';
var RENAME_ENDED = 'rename.ended';

var EventDispatcher = assign({}, EventEmitter.prototype, {
  addShowSelectedListener: function(callback) {
    this.on(SHOW_SELECTED, callback);
  },
  removeShowSelectedListener: function(callback) {
    this.removeListener(SHOW_SELECTED);
  },
  emitShowSelected: function(show) {
    this.emit(SHOW_SELECTED, show);
  }
});

module.exports = EventDispatcher;