var React = require('react');
var Message = require('./message');
var ChatForm = require('./chat-form');

var ChatWindow = React.createClass({
  getInitialState: function() {
    return { messages: [] }
  },

  parseData: function(data) {
    var msg = data.slice(-50);
    if (_.isEqual(msg, this.state.messages)) return;
    this.setState({ messages: msg });
  },

  append: function(data) {
    var msg = this.state.messages;
    this.setState({ messages: msg.concat(data) });
  },

  getData: function() {
    var that = this;
    $.get(this.props.url).done(function(data) {
      that.parseData(data);
    });
    setTimeout(that.getData, that.props.pollInterval);
  },

  componentWillMount: function() {
    this.getData();
  },

  componentDidUpdate: function() {
    this.updateScroll();
  },

  updateScroll: function() {
    var element = $('#chat-window')[0];
    element.scrollTop = element.scrollHeight;
  },

  render: function() {
    var msgNodes = this.state.messages.map(function(msg, i) {
      return <Message data={msg} key={i} />;
    });
    return (
      <ul className="list-group col-sm-2" id="chat-window">
        {msgNodes}<br />
        <ChatForm url={this.props.url} update={this.append} />
      </ul>
    );
  }
});

module.exports = ChatWindow;