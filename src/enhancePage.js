import createEvent from "./createEvent";
const lifetimeNames = ["onPageScroll", "onShow", "onHide"];

const eventNames = ["onResize"];

export default function(options) {
  const $pageEvent = createEvent()
  lifetimeNames.forEach(name => {
    const realLifetime = options[name];
    options[name] = function(...args) {
      $pageEvent.emit(`$$${name}`, args);
      if (typeof realLifetime === "function") {
        realLifetime.call(this, ...args);
      }
    };
  });
  const events = options.events || {};
  eventNames.forEach(name => {
    const realEvent = events[name];
    events[name] = function(...args) {
      $pageEvent.emit(`$$${name}`, args);
      if (typeof realEvent === "function") {
        realEvent.call(this, ...args);
      }
    };
  });
  options.events = events;
  options.$pageEvent = $pageEvent
  return options;
}
