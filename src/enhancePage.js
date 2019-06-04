const lifetimeNames = ["onPageScroll", "onShow", "onHide"];

const eventNames = ["onResize"];

export default function(options) {
  const { globalEvent } = getApp();
  lifetimeNames.forEach(name => {
    const realLifetime = options[name];
    options[name] = function(...args) {
      if (globalEvent) {
        globalEvent.emit(`$$${name}`, args);
      }
      if (typeof realLifetime === "function") {
        realLifetime.call(this, ...args);
      }
    };
  });
  const events = options.events || {};
  eventNames.forEach(name => {
    const realEvent = events[name];
    events[name] = function(...args) {
      if (globalEvent) {
        globalEvent.emit(`$$${name}`, args);
      }
      if (typeof realEvent === "function") {
        realEvent.call(this, ...args);
      }
    };
  });
  options.events = events;
  return options;
}
