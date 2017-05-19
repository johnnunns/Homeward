var React = require('react');

var ChatWindow = require('./components/chat');
var CalendarWindow = require('./components/calendar');

var APP = React.createClass({
  render: function() {
    return (
      <div className="row">
        <ChatWindow pollInterval={3000} url="/messages" />
        <CalendarWindow url="http://slack-server.elasticbeanstalk.com/calendar/junior" />
      </div>
    );
  }
});

React.render(
  <APP />,
  document.getElementById('content')
);
