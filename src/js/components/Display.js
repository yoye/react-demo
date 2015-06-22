var React = require('react');

var Display = React.createClass({
  render: function() {
    return (
      <div>
        <div>{this.props.show.title}</div>
        <div>{this.props.show.description}</div>
      </div>
        );
  }
});

module.exports = Display;