var React = require('react');
var ShowStore = require('../stores/ShowStore');
var Dispatcher = require('../dispatcher/EventDispatcher');

var Typeahead = React.createClass({
  getInitialState: function() {
    return {elements: []};
  },
  componentDidMount: function() {
    ShowStore.addSearchedListener(this._onSearch);
  },
  componentWillUnmount: function() {
    ShowStore.removeSearchedListener(this._onSearch);
  },
  render: function() {
    if (this.state.elements.length === 0) {
      return null;
    }
    
    var items = this.state.elements.map(function(show) {
      return (
          <li 
            key={show.id} 
            onClick={this._onSelectElement.bind(this, show)}
            data-identifier={show.id}>{show.title}</li>
        );
    }.bind(this));

    return (
        <ul className="typeahead">{items}</ul>
        );
  },
  
  _onSearch: function(result) {
    this.setState({elements: result.slice(0, 5)});
  },
  _onSelectElement: function(show) {
    Dispatcher.emitShowSelected(show);

    this.setState({elements: []});
  }
});

module.exports = Typeahead;