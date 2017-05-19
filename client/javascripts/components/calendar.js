var React = require('react');
var DayStrip = require('./day-strip');

var CalendarWindow = React.createClass({

  getInitialState: function() {
    return { weeks: [[]], show: 0 };
  },

  animate: function() {
    $(document).on('mouseenter', 'li.animated', function(e) {
      $(this).removeClass('flipInX');
      $(this).addClass('rubberBand');
    });
    $(document).on('mouseleave', 'li.animated', function(e) {
      $(this).removeClass('rubberBand');
    });
  },

  downWeek: function() {
    this.setState(function(prevState) {
      var newShow = prevState.show - 1;
      if (newShow >= 0) {
        return { show: newShow };        
      } else {
        return prevState;
      }
    });
  },

  upWeek: function() {
    this.setState(function(prevState) {
      var newShow = prevState.show + 1;
      if (newShow < prevState.weeks.length) {
        return { show: newShow };        
      } else {
        return prevState;
      }
    });
  },

  firstDay: function(groupsByDay) {
    var days = Object.keys(groupsByDay);
    var firstDay = days.reduce(function(min, day) {
      return moment(day).isBefore(moment(min)) ? day : min;
    });
    return moment(firstDay).startOf('week');
  },

  componentDidMount: function() {
    var that = this;
    this.animate();
    $.get(this.props.url).done(function(data) {
      var activeDay = that.firstDay(data);
      var weeks = [];
      var indexForThisWeek;

      while (!_.isEmpty(data)) {
        var week = [];
        var day;
        delete data[activeDay.format('MMM DD YYYY')];
        
        for (var i = 1; i < 7; i++) {
          day = activeDay.add(1, 'days').format('MMM DD YYYY');
          week.push(data[day]);
          delete data[day];
          if (day === moment().format('MMM DD YYYY'))
            indexForThisWeek = weeks.length;               //need to know which week is THIS week. That will be shown first
        }
        
        activeDay.add(1, 'days');
        day = activeDay.format('MMM DD YYYY');
        delete data[day];
        weeks.push(week);
      }

      that.setState({
        weeks: weeks,
        show: indexForThisWeek
      });
    });
  },

  render: function() {
    var dayNodes = this.state.weeks[this.state.show].map(function(day, i) {
      console.log(day);
      if (day)
        return <DayStrip data={day} key={i} />;
      else
        return <div className="col-sm-2" key={i} />
    });
    return (
      <div className="col-sm-10 col-sm-offset-2">
        <div>
          <span className="glyphicon glyphicon-arrow-left" onClick={this.downWeek} />
          <span>...</span>
          <span className="glyphicon glyphicon-arrow-right" onClick={this.upWeek} />
        </div>
        {dayNodes}
      </div>
    );
  }
});

module.exports = CalendarWindow;
