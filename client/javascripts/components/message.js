var React = require('react');
var Message = React.createClass({
  render: function() {
    var msg = this.props.data;
    var date = moment(msg.created_at).format('ddd hh:mma');
    return (
      <li className="list-group-item">
        <strong>{msg.created_by}</strong>
        <p className="text-muted">{date}</p>
        <p>{msg.message}</p>
      </li>
    );
  }
});

module.exports = Message;