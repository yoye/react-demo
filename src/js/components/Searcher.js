var React = require('react');
var ShowStore = require('../stores/ShowStore');
var Typeahead = require('./Typeahead');
var Loader = require('./Loader');
var Dispatcher = require('../dispatcher/EventDispatcher');

var Searcher = React.createClass({
  getInitialState: function() {
    return this._getStateShows();
  },
  componentDidMount: function() {
    ShowStore.addLoadedListener(this._onLoaded);
  },
  componentWillUnmount: function() {
    ShowStore.removeLoadedListener(this._onLoaded);
  },
  render: function() {
    if (this.state.shows.length === 0) {
      return this._renderLoader();
    }

    return (
        <form id="form" className="form">
          <div className="form-group">
            <SearchInput />
            <Typeahead />
            <input type="hidden" ref="show" />
          </div>
        </form>
        );
  },

  _onLoaded: function() {
    this.setState(this._getStateShows());
  },
  _getStateShows: function() {
    return {
      shows: ShowStore.getAll()
    };
  },
  _renderLoader: function() {
    return (<Loader />);
  }
});

var SearchInput = React.createClass({
  componentDidMount: function() {
    Dispatcher.addShowSelectedListener(this._onShowSelected);
  },
  componentWillUnmount: function() {
    Dispatcher.removeShowSelectedListener(this._onShowSelected);
  },
  render: function() {
    return <input 
      type="text" 
      placeholder="Le nom de votre série" 
      className="form-control"
      required 
      autoComplete="off"
      onChange={this._onTextChange} />
  },
  
  _onTextChange: function() {
    var needle = this.getDOMNode().value;
    ShowStore.search(needle);
  },
  _onShowSelected: function(show) {
    this.getDOMNode().value = show.title;
  }
});

module.exports = Searcher;