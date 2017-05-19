var React = require('react');
var EventPane = React.createClass({
  colorCode: function() {
    var summary = this.props.data.summary;
    var node = $(this.getDOMNode());
    if (summary.match(/lecture/i)) {
      node.addClass('lecture');
    } else if (this.props.data.summary.match(/assessment/i)) {
      node.addClass('assessment');
    } else {
      node.removeClass('lecture assessment');
    }
  },

  componentDidMount: function() {
    this.colorCode();
  },

  componentDidUpdate: function() {
    this.colorCode();
  },

  render: function() {
    var data = this.props.data;
    return (
      <li className="flipInX animated">
        <a href={data.htmlLink}>
          <span className="mail-sender">{data.summary}</span>
          <span className="mail-subject"></span>
          <span className="mail-message-preview">
            {moment(data.start.dateTime).format('hh:mm a')}
          </span>
          <span className="mail-message-preview">
            {moment(data.end.dateTime).format('hh:mm a')}
          </span>
        </a>
      </li>
    );
  }
});

module.exports = EventPane;