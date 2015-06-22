var Searcher = require('./components/Searcher');
var Loader = require('./components/Loader');
var Display = require('./components/Display');
var React = require('react');
var Betaseries = require('./betaseries');
var Dispatcher = require('./dispatcher/EventDispatcher');

React.render(React.createElement(Searcher, null), document.getElementById('searcher'));
React.render(React.createElement(Loader, null), document.getElementById('loader'));

Dispatcher.addShowSelectedListener(function(show) {
	Betaseries.getShow(show.id).then(function(show) {
		React.render(React.createElement(Display, {show: show}), document.getElementById('show'));	
	});
});
