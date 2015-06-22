var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var Betaseries = require('../betaseries');

var LOADED_EVENT = 'loaded';
var SEARCHED_EVENT = 'searched';
var STORAGE_NAMESPACE = '__/betaseries/shows/__';

var _shows = JSON.parse(localStorage.getItem(STORAGE_NAMESPACE)) || [];

var ShowStore = assign({}, EventEmitter.prototype, {
  addLoadedListener: function(callback) {
    this.on(LOADED_EVENT, callback);
  },
  removeLoadedListener: function(callback) {
    this.removeListener(LOADED_EVENT, callback);
  },
  addSearchedListener: function(callback) {
    this.on(SEARCHED_EVENT, callback);
  },
  removeSearchedListener: function(callback) {
    this.removeListener(SEARCHED_EVENT, callback);
  },
  getAll: function() {
    if (_shows.length === 0) {
      Betaseries.getShows().then(function(shows) {
        _shows = shows;
        localStorage.setItem(STORAGE_NAMESPACE, JSON.stringify(_shows));
        ShowStore.emit(LOADED_EVENT);
      });
    }

    return _shows;
  },
  search: function(needle) {
    if (needle === null || needle === '') {
      ShowStore.emit(SEARCHED_EVENT, []);
      
      return;
    }
    
    var results = _shows.filter(function(show) {
      return show.title.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    });
    
    ShowStore.emit(SEARCHED_EVENT, results);
  }
});

module.exports = ShowStore;