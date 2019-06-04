'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var createEvent = function createEvent() {
  var events = {};

  var on = function on(event, cb) {
    (events[event] || (events[event] = [])).push(cb);
    return function () {
      events[event] = events[event].filter(function (i) {
        return i !== cb;
      });
    };
  };

  var emit = function emit(event, data) {
    if (events[event]) {
      events[event].forEach(function (i) {
        i(data);
      });
    }
  };

  var event = {
    emit: emit,
    on: on
  };
  return event;
};

function enhanceApp (options) {
  return _objectSpread({}, options, {
    globalEvent: createEvent()
  });
}

var pageLifetimeNames = ["onPageScroll", "onShow", "onHide", "onResize"];

var enhance = function enhance(_ref) {
  var _didMount = _ref.didMount,
      _didUnmount = _ref.didUnmount,
      pageLifetimes = _ref.pageLifetimes,
      otherOptions = _objectWithoutProperties(_ref, ["didMount", "didUnmount", "pageLifetimes"]);

  var _getApp = getApp(),
      globalEvent = _getApp.globalEvent;

  return _objectSpread({}, otherOptions, {
    didMount: function didMount() {
      var _this = this;

      var _this$$page = this.$page;
      _this$$page = _this$$page === void 0 ? {} : _this$$page;
      var $viewId = _this$$page.$viewId;
      this.unbind = [];

      if (pageLifetimes && $viewId && globalEvent) {
        Object.keys(pageLifetimes).forEach(function (name) {
          if (pageLifetimeNames.indexOf(name) > -1) {
            _this.unbind.push(globalEvent.on("$$".concat(name), function (args) {
              var pages = getCurrentPages();
              var current = pages[pages.length - 1];

              if (current.$viewId === $viewId) {
                var _pageLifetimes$name;

                (_pageLifetimes$name = pageLifetimes[name]).call.apply(_pageLifetimes$name, [_this].concat(_toConsumableArray(args)));
              }
            }));
          } else {
            console.log('not support', name);
          }
        });
      }

      if (typeof _didMount === "function") {
        _didMount.call(this);
      }
    },
    didUnmount: function didUnmount() {
      if (this.unbind.length) {
        this.unbind.forEach(function (unbind) {
          return unbind();
        });
      }

      if (typeof _didUnmount === "function") {
        _didUnmount.call(this);
      }
    }
  });
};

var lifetimeNames = ["onPageScroll", "onShow", "onHide"];
var eventNames = ["onResize"];
function enhancePage (options) {
  var _getApp = getApp(),
      globalEvent = _getApp.globalEvent;

  lifetimeNames.forEach(function (name) {
    var realLifetime = options[name];

    options[name] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (globalEvent) {
        globalEvent.emit("$$".concat(name), args);
      }

      if (typeof realLifetime === "function") {
        realLifetime.call.apply(realLifetime, [this].concat(args));
      }
    };
  });
  var events = options.events || {};
  eventNames.forEach(function (name) {
    var realEvent = events[name];

    events[name] = function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (globalEvent) {
        globalEvent.emit("$$".concat(name), args);
      }

      if (typeof oldEvent === "function") {
        realEvent.call.apply(realEvent, [this].concat(args));
      }
    };
  });
  options.events = events;
  return options;
}

exports.enhanceApp = enhanceApp;
exports.enhanceComponent = enhance;
exports.enhancePage = enhancePage;
