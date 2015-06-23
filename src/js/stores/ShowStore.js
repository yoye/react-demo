var Betaseries = require('../betaseries');
var Dispatcher = require('../dispatcher/EventDispatcher');
var constants = require('../constants');
var STORAGE_NAMESPACE = '__/betaseries/shows/__';

var _shows = JSON.parse(localStorage.getItem(STORAGE_NAMESPACE)) || [];

var ShowStore = {
  getAll: function () {
    if (_shows.length === 0) {
      Betaseries.getShows().then(function (shows) {
        _shows = shows;
        localStorage.setItem(STORAGE_NAMESPACE, JSON.stringify(_shows));
        Dispatcher.emit(constants.LOADED_EVENT);
      });
    }

    return _shows;
  },
  search: function (needle) {
    if (needle === null || needle === '') {
      Dispatcher.emit(constants.SEARCHED_EVENT, []);

      return;
    }

    var results = _shows.filter(function (show) {
      return show.title.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    });

    Dispatcher.emit(constants.SEARCHED_EVENT, results);
  }
};

module.exports = ShowStore;