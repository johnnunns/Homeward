if (window.mochaPhantomJS) {
  Function.prototype.bind = Function.prototype.bind || function (thisp) {
      var fn = this;
      return function () {
          return fn.apply(thisp, arguments);
      };
  };
}

function doStuff(done, data, events, days) {
    $.ajax({
        method: 'GET',
        url: 'https://www.googleapis.com/calendar/v3/calendars/pe13s26rvf4fud47l08ti750i0@group.calendar.google.com/events?key=AIzaSyAyucc-d1nuZQnRsbMeZ1RtP04ZIdKr0qU'}).then(function(payLoad) {
      data = payLoad.items;
      events = data.filter(function(event) {return event.status === "confirmed";});
      events.forEach(function(event) {days[event.start.dateTime.slice(0, 10)] = 0;});  
      done();
    });
}
