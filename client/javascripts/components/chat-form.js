var React = require('react');
var ChatForm = React.createClass({
  post: function(data) {
    console.log("WE ARE IN THE POSTTT");
    return $.ajax({
      type: 'POST',
      url: this.props.url,
      crossDomain: true,
      data: JSON.stringify(data),
      contentType: 'application/json',
      headers: { "authentication" : "token" }
    })
  },

  handle: function(e) {
    e.preventDefault();
    var data = {
      message: React.findDOMNode(this.refs.message).value.trim(),
      created_by: 'Andy',
    };
    React.findDOMNode(this.refs.message).value = '';
    var that = this;
    this.post(data).done(function(res) {
      that.props.update(res);
    });
  },

  render: function() {
    return (
      <form id="chat-form" onSubmit={this.handle}>
        <input type="text" ref="message" />
        <input type="submit" className="hidden" />
      </form>
    );
  }
});

module.exports = ChatForm;
