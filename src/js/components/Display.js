var React = require('react');

var Display = React.createClass({
  render: function() {
    console.log(this.props);
    
    return (
      <div>
        <h4>{this.props.show.title}</h4>
        <div>{this.props.show.description}</div>
      </div>
        );
  }
});

module.exports = Display;