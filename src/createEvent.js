const createEvent = function() {
    const events = {};
  
    const on = function(event, cb) {
      (events[event] || (events[event] = [])).push(cb);
  
      return function() {
        events[event] = events[event].filter(function(i) {
          return i !== cb;
        });
      };
    };
  
    const emit = function(event, data) {
      if (events[event]) {
        events[event].forEach(function(i) {
          i(data);
        });
      }
    };
  
    const event = { emit, on };
  
    return event;
  };
  
  export default createEvent;
  