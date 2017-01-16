/*!
 * VuikitDocs v0.7.0
 * (c) 2016-present Miljan Aleksic
 * Released under the MIT License.
 */
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 205);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var isDate = __webpack_require__(58)

var MILLISECONDS_IN_HOUR = 3600000
var MILLISECONDS_IN_MINUTE = 60000
var DEFAULT_ADDITIONAL_DIGITS = 2

var parseTokenDateTimeDelimeter = /[T ]/
var parseTokenPlainTime = /:/

// year tokens
var parseTokenYY = /^(\d{2})$/
var parseTokensYYY = [
  /^([+-]\d{2})$/, // 0 additional digits
  /^([+-]\d{3})$/, // 1 additional digit
  /^([+-]\d{4})$/ // 2 additional digits
]

var parseTokenYYYY = /^(\d{4})/
var parseTokensYYYYY = [
  /^([+-]\d{4})/, // 0 additional digits
  /^([+-]\d{5})/, // 1 additional digit
  /^([+-]\d{6})/ // 2 additional digits
]

// date tokens
var parseTokenMM = /^-(\d{2})$/
var parseTokenDDD = /^-?(\d{3})$/
var parseTokenMMDD = /^-?(\d{2})-?(\d{2})$/
var parseTokenWww = /^-?W(\d{2})$/
var parseTokenWwwD = /^-?W(\d{2})-?(\d{1})$/

// time tokens
var parseTokenHH = /^(\d{2}([.,]\d*)?)$/
var parseTokenHHMM = /^(\d{2}):?(\d{2}([.,]\d*)?)$/
var parseTokenHHMMSS = /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/

// timezone tokens
var parseTokenTimezone = /([Z+-].*)$/
var parseTokenTimezoneZ = /^(Z)$/
var parseTokenTimezoneHH = /^([+-])(\d{2})$/
var parseTokenTimezoneHHMM = /^([+-])(\d{2}):?(\d{2})$/

/**
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If an argument is a string, the function tries to parse it.
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If all above fails, the function passes the given argument to Date constructor.
 *
 * @param {Date|String|Number} argument - the value to convert
 * @param {Object} [options] - the object with options
 * @param {0 | 1 | 2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @returns {Date} the parsed date in the local time zone
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * var result = parse('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Parse string '+02014101',
 * // if the additional number of digits in the extended year format is 1:
 * var result = parse('+02014101', {additionalDigits: 1})
 * //=> Fri Apr 11 2014 00:00:00
 */
function parse (argument, options) {
  if (isDate(argument)) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime())
  } else if (typeof argument !== 'string') {
    return new Date(argument)
  }

  options = options || {}
  var additionalDigits = options.additionalDigits
  if (additionalDigits == null) {
    additionalDigits = DEFAULT_ADDITIONAL_DIGITS
  }

  var dateStrings = splitDateString(argument)

  var parseYearResult = parseYear(dateStrings.date, additionalDigits)
  var year = parseYearResult.year
  var restDateString = parseYearResult.restDateString

  var date = parseDate(restDateString, year)

  if (date) {
    var timestamp = date.getTime()
    var time = 0
    var offset

    if (dateStrings.time) {
      time = parseTime(dateStrings.time)
    }

    if (dateStrings.timezone) {
      offset = parseTimezone(dateStrings.timezone)
    } else {
      // get offset accurate to hour in timezones that change offset
      offset = new Date(timestamp + time).getTimezoneOffset()
      offset = new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE).getTimezoneOffset()
    }

    return new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE)
  } else {
    return new Date(argument)
  }
}

function splitDateString (dateString) {
  var dateStrings = {}
  var array = dateString.split(parseTokenDateTimeDelimeter)
  var timeString

  if (parseTokenPlainTime.test(array[0])) {
    dateStrings.date = null
    timeString = array[0]
  } else {
    dateStrings.date = array[0]
    timeString = array[1]
  }

  if (timeString) {
    var token = parseTokenTimezone.exec(timeString)
    if (token) {
      dateStrings.time = timeString.replace(token[1], '')
      dateStrings.timezone = token[1]
    } else {
      dateStrings.time = timeString
    }
  }

  return dateStrings
}

function parseYear (dateString, additionalDigits) {
  var parseTokenYYY = parseTokensYYY[additionalDigits]
  var parseTokenYYYYY = parseTokensYYYYY[additionalDigits]

  var token

  // YYYY or ±YYYYY
  token = parseTokenYYYY.exec(dateString) || parseTokenYYYYY.exec(dateString)
  if (token) {
    var yearString = token[1]
    return {
      year: parseInt(yearString, 10),
      restDateString: dateString.slice(yearString.length)
    }
  }

  // YY or ±YYY
  token = parseTokenYY.exec(dateString) || parseTokenYYY.exec(dateString)
  if (token) {
    var centuryString = token[1]
    return {
      year: parseInt(centuryString, 10) * 100,
      restDateString: dateString.slice(centuryString.length)
    }
  }

  // Invalid ISO-formatted year
  return {
    year: null
  }
}

function parseDate (dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) {
    return null
  }

  var token
  var date
  var month
  var week

  // YYYY
  if (dateString.length === 0) {
    date = new Date(0)
    date.setUTCFullYear(year)
    return date
  }

  // YYYY-MM
  token = parseTokenMM.exec(dateString)
  if (token) {
    date = new Date(0)
    month = parseInt(token[1], 10) - 1
    date.setUTCFullYear(year, month)
    return date
  }

  // YYYY-DDD or YYYYDDD
  token = parseTokenDDD.exec(dateString)
  if (token) {
    date = new Date(0)
    var dayOfYear = parseInt(token[1], 10)
    date.setUTCFullYear(year, 0, dayOfYear)
    return date
  }

  // YYYY-MM-DD or YYYYMMDD
  token = parseTokenMMDD.exec(dateString)
  if (token) {
    date = new Date(0)
    month = parseInt(token[1], 10) - 1
    var day = parseInt(token[2], 10)
    date.setUTCFullYear(year, month, day)
    return date
  }

  // YYYY-Www or YYYYWww
  token = parseTokenWww.exec(dateString)
  if (token) {
    week = parseInt(token[1], 10) - 1
    return dayOfISOYear(year, week)
  }

  // YYYY-Www-D or YYYYWwwD
  token = parseTokenWwwD.exec(dateString)
  if (token) {
    week = parseInt(token[1], 10) - 1
    var dayOfWeek = parseInt(token[2], 10) - 1
    return dayOfISOYear(year, week, dayOfWeek)
  }

  // Invalid ISO-formatted date
  return null
}

function parseTime (timeString) {
  var token
  var hours
  var minutes

  // hh
  token = parseTokenHH.exec(timeString)
  if (token) {
    hours = parseFloat(token[1].replace(',', '.'))
    return (hours % 24) * MILLISECONDS_IN_HOUR
  }

  // hh:mm or hhmm
  token = parseTokenHHMM.exec(timeString)
  if (token) {
    hours = parseInt(token[1], 10)
    minutes = parseFloat(token[2].replace(',', '.'))
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE
  }

  // hh:mm:ss or hhmmss
  token = parseTokenHHMMSS.exec(timeString)
  if (token) {
    hours = parseInt(token[1], 10)
    minutes = parseInt(token[2], 10)
    var seconds = parseFloat(token[3].replace(',', '.'))
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE +
      seconds * 1000
  }

  // Invalid ISO-formatted time
  return null
}

function parseTimezone (timezoneString) {
  var token
  var absoluteOffset

  // Z
  token = parseTokenTimezoneZ.exec(timezoneString)
  if (token) {
    return 0
  }

  // ±hh
  token = parseTokenTimezoneHH.exec(timezoneString)
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset
  }

  // ±hh:mm or ±hhmm
  token = parseTokenTimezoneHHMM.exec(timezoneString)
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10)
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset
  }

  return 0
}

function dayOfISOYear (isoYear, week, day) {
  week = week || 0
  day = day || 0
  var date = new Date(0)
  date.setUTCFullYear(isoYear, 0, 4)
  var fourthOfJanuaryDay = date.getUTCDay() || 7
  var diff = week * 7 + day + 1 - fourthOfJanuaryDay
  date.setUTCDate(date.getUTCDate() + diff)
  return date
}

module.exports = parse


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warn = exports.isArray = undefined;

var _from = __webpack_require__(43);

var _from2 = _interopRequireDefault(_from);

var _isInteger = __webpack_require__(110);

var _isInteger2 = _interopRequireDefault(_isInteger);

var _typeof2 = __webpack_require__(115);

var _typeof3 = _interopRequireDefault(_typeof2);

exports.isObject = isObject;
exports.isPlainObject = isPlainObject;
exports.isString = isString;
exports.isInteger = isInteger;
exports.isFunction = isFunction;
exports.inArray = inArray;
exports.toArray = toArray;
exports.range = range;
exports.each = each;
exports.merge = merge;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === 'object';
}

var toString = Object.prototype.toString;
var OBJECT_STRING = '[object Object]';
function isPlainObject(obj) {
  return toString.call(obj) === OBJECT_STRING;
}

function isString(val) {
  return typeof val === 'string';
}

function isInteger(val) {
  return (0, _isInteger2.default)(val);
}

function isFunction(val) {
  return typeof val === 'function';
}

var isArray = exports.isArray = Array.isArray;

function inArray(array, value) {
  return (array || []).indexOf(value) !== -1;
}

function toArray(value) {
  if (isArray(value)) {
    return value;
  }
  return isObject(value) ? _toArray(value) : [value];
}

function _toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}

function range(start, stop) {
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  if (typeof stop === 'undefined') {
    stop = start;
    start = 0;
  }
  return (0, _from2.default)(new Array(Math.floor((stop - start) / step)), function (x, i) {
    return start + i * step;
  });
}

function each(obj, iterator) {
  var i, key;
  if (typeof obj.length === 'number') {
    for (i = 0; i < obj.length; i++) {
      iterator.call(obj[i], obj[i], i);
    }
  } else if (isObject(obj)) {
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        iterator.call(obj[key], obj[key], key);
      }
    }
  }
  return obj;
}

function merge(target) {
  var args = Array.prototype.slice.call(arguments, 1);
  args.forEach(function (source) {
    _merge(target, source, true);
  });
  return target;
}

function _merge(target, source, deep) {
  for (var key in source) {
    if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
      if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
        target[key] = {};
      }
      if (isArray(source[key]) && !isArray(target[key])) {
        target[key] = [];
      }
      _merge(target[key], source[key], deep);
    } else if (source[key] !== undefined) {
      target[key] = source[key];
    }
  }
}

var warn = void 0;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var hasConsole = typeof console !== 'undefined';
    exports.warn = warn = function warn(msg, vm) {
      if (hasConsole) {
        console.error('[Vuikit warn]: ' + msg);
      }
    };
  })();
}

exports.warn = warn;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(184)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(31)('wks')
  , uid        = __webpack_require__(20)
  , Symbol     = __webpack_require__(4).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 5 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(13)
  , IE8_DOM_DEFINE = __webpack_require__(46)
  , toPrimitive    = __webpack_require__(33)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(8) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(47)
  , defined = __webpack_require__(25);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(10)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(4)
  , core      = __webpack_require__(3)
  , ctx       = __webpack_require__(44)
  , hide      = __webpack_require__(11)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(6)
  , createDesc = __webpack_require__(16);
module.exports = __webpack_require__(8) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(51)
  , enumBugKeys = __webpack_require__(26);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.on = on;
exports.offAll = offAll;
exports.addClass = addClass;
exports.hasClass = hasClass;
exports.removeClass = removeClass;
exports.css = css;
var boundEvents = [];

function on(el, event, handler) {
  var namespace = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'def';

  boundEvents[namespace] = boundEvents[namespace] || [];
  boundEvents[namespace].push({ el: el, event: event, handler: handler });
  el.addEventListener(event, handler);
}

function offAll() {
  var namespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'def';

  if (boundEvents[namespace] !== undefined) {
    for (var i = 0; i < boundEvents[namespace].length; ++i) {
      var _boundEvents$namespac = boundEvents[namespace][i],
          el = _boundEvents$namespac.el,
          event = _boundEvents$namespac.event,
          handler = _boundEvents$namespac.handler;

      el.removeEventListener(event, handler);
    }
  }
}

function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += ' ' + className;
  }
}

function hasClass(el, className) {
  return el.classList.contains(className);
}

function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp('^' + className + '$'), '');
  }
}

function css(el, style) {
  return window.getComputedStyle(el)[style];
}

var UA = window.navigator.userAgent.toLowerCase();
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;

var transitionProp = exports.transitionProp = 'transition';
var transitionEndEvent = exports.transitionEndEvent = 'transitionend';
var animationProp = exports.animationProp = 'animation';
var animationEndEvent = exports.animationEndEvent = 'animationend';

if (!isIE9) {
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    exports.transitionProp = transitionProp = 'WebkitTransition';
    exports.transitionEndEvent = transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
    exports.animationProp = animationProp = 'WebkitAnimation';
    exports.animationEndEvent = animationEndEvent = 'webkitAnimationEnd';
  }
}

/***/ }),
/* 18 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(25);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)
var getDaysInMonth = __webpack_require__(56)

/**
 * @category Month Helpers
 * @summary Add the specified number of months to the given date.
 *
 * @description
 * Add the specified number of months to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of months to be added
 * @returns {Date} the new date with the months added
 *
 * @example
 * // Add 5 months to 1 September 2014:
 * var result = addMonths(new Date(2014, 8, 1), 5)
 * //=> Sun Feb 01 2015 00:00:00
 */
function addMonths (dirtyDate, amount) {
  var date = parse(dirtyDate)
  var desiredMonth = date.getMonth() + amount
  var dateWithDesiredMonth = new Date(0)
  dateWithDesiredMonth.setFullYear(date.getFullYear(), desiredMonth, 1)
  dateWithDesiredMonth.setHours(0, 0, 0, 0)
  var daysInMonth = getDaysInMonth(dateWithDesiredMonth)
  // Set the last day of the new month
  // if the original date was the last day of the longer month
  date.setMonth(desiredMonth, Math.min(daysInMonth, date.getDate()))
  return date
}

module.exports = addMonths


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  render: function render(h) {
    return h(
      "col",
      null,
      []
    );
  },
  created: function created() {
    this._headerRender = this.$options._parentVnode.componentOptions.Ctor.options.headerRender;
    this._cellRender = this.$options._parentVnode.componentOptions.Ctor.options.cellRender;
  },
  headerRender: function headerRender(h) {
    var scopedSlot = this.$scopedSlots && this.$scopedSlots.header;
    return h(
      "th",
      { staticClass: this.headerClass },
      [scopedSlot ? scopedSlot() : this.header]
    );
  },
  cellRender: function cellRender(h, _ref) {
    var row = _ref.row,
        rowIndex = _ref.rowIndex;

    var cell = this.cell;
    var scopedSlot = this.$scopedSlots && this.$scopedSlots.cell;
    return h(
      "td",
      { staticClass: this.cellClass },
      [scopedSlot ? scopedSlot({ row: row, rowIndex: rowIndex }) : row[cell]]
    );
  }
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(111);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 25 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(6).f
  , has = __webpack_require__(5)
  , TAG = __webpack_require__(2)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(31)('keys')
  , uid    = __webpack_require__(20);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(14);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(4)
  , core           = __webpack_require__(3)
  , LIBRARY        = __webpack_require__(27)
  , wksExt         = __webpack_require__(35)
  , defineProperty = __webpack_require__(6).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(2);

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be added
 * @returns {Date} the new date with the days added
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * var result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
function addDays (dirtyDate, amount) {
  var date = parse(dirtyDate)
  date.setDate(date.getDate() + amount)
  return date
}

module.exports = addDays


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Month Helpers
 * @summary Get the month of the given date.
 *
 * @description
 * Get the month of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the month
 *
 * @example
 * // Which month is 29 February 2012?
 * var result = getMonth(new Date(2012, 1, 29))
 * //=> 1
 */
function getMonth (dirtyDate) {
  var date = parse(dirtyDate)
  var month = date.getMonth()
  return month
}

module.exports = getMonth


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Year Helpers
 * @summary Get the year of the given date.
 *
 * @description
 * Get the year of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the year
 *
 * @example
 * // Which year is 2 July 2014?
 * var result = getYear(new Date(2014, 6, 2))
 * //=> 2014
 */
function getYear (dirtyDate) {
  var date = parse(dirtyDate)
  var year = date.getFullYear()
  return year
}

module.exports = getYear


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var startOfWeek = __webpack_require__(40)

/**
 * @category ISO Week Helpers
 * @summary Return the start of an ISO week for the given date.
 *
 * @description
 * Return the start of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of an ISO week
 *
 * @example
 * // The start of an ISO week for 2 September 2014 11:55:00:
 * var result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfISOWeek (dirtyDate) {
  return startOfWeek(dirtyDate, {weekStartsOn: 1})
}

module.exports = startOfISOWeek


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @param {Object} [options] - the object with options
 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), {weekStartsOn: 1})
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek (dirtyDate, options) {
  var weekStartsOn = options ? (options.weekStartsOn || 0) : 0

  var date = parse(dirtyDate)
  var day = date.getDay()
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn

  date.setDate(date.getDate() - diff)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = startOfWeek


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(23);

var _extends3 = _interopRequireDefault(_extends2);

exports.filterByTag = filterByTag;
exports.getProps = getProps;
exports.getFinalProps = getFinalProps;

var _util = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filterByTag(nodes, tag) {
  var result = [];
  (0, _util.each)(nodes, function (node) {
    if (node.componentOptions && node.componentOptions.tag === tag) {
      result.push(node);
    }
  });
  return result;
}

function getProps(vm) {
  return vm.componentOptions.propsData;
}

function getFinalProps(component) {
  var props = {};
  while (component) {
    props = (0, _extends3.default)({}, props, component.props);
    component = component.extends;
  }
  return props;
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(1);

exports.default = {
  components: {
    TabContent: {
      functional: true,
      render: function render(h, _ref) {
        var vm = _ref.parent;

        var activeTabSlot = vm.tabs.find(function (tab) {
          return vm.getTabAlias(tab) === vm.activeTab;
        });
        var content = activeTabSlot && activeTabSlot.componentOptions.children;
        if (activeTabSlot && content) {
          return h(
            'div',
            null,
            [content]
          );
        } else if (_util.warn) {
          (0, _util.warn)('VkTabs: No tab found with with identifier \'' + vm.activeTab + '\'');
        }
      }
    }
  },
  props: {
    activeTab: [String, Number],

    flip: {
      type: Boolean,
      default: false
    },

    center: {
      type: Boolean,
      default: false
    },

    bottom: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
      default: 'vk-tabs-transition'
    }
  },
  computed: {
    tabs: {
      get: function get() {
        return this.$slots.default.filter(function (c) {
          return c.componentOptions && c.componentOptions.tag === 'vk-tab';
        });
      },

      cache: false
    }
  },
  beforeMount: function beforeMount() {
    this._updateTabs();
  },
  beforeUpdate: function beforeUpdate() {
    this._updateTabs();
  },

  methods: {
    getTabAlias: function getTabAlias(tab) {
      return tab.componentOptions.propsData.alias || this.tabs.indexOf(tab) + 1;
    },
    _updateTabs: function _updateTabs() {
      var _this = this;

      this.tabs.forEach(function (tab, index) {
        var alias = _this.getTabAlias(tab);
        var active = _this.activeTab === alias;
        var props = tab.componentOptions.propsData;
        props.active = active;
        props.alias = alias;
      });
    }
  }
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(116), __esModule: true };

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(122);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14)
  , document = __webpack_require__(4).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(8) && !__webpack_require__(10)(function(){
  return Object.defineProperty(__webpack_require__(45)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(24);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(27)
  , $export        = __webpack_require__(9)
  , redefine       = __webpack_require__(52)
  , hide           = __webpack_require__(11)
  , has            = __webpack_require__(5)
  , Iterators      = __webpack_require__(15)
  , $iterCreate    = __webpack_require__(133)
  , setToStringTag = __webpack_require__(29)
  , getPrototypeOf = __webpack_require__(142)
  , ITERATOR       = __webpack_require__(2)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(13)
  , dPs         = __webpack_require__(139)
  , enumBugKeys = __webpack_require__(26)
  , IE_PROTO    = __webpack_require__(30)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(45)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(128).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(51)
  , hiddenKeys = __webpack_require__(26).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(5)
  , toIObject    = __webpack_require__(7)
  , arrayIndexOf = __webpack_require__(124)(false)
  , IE_PROTO     = __webpack_require__(30)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(32)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(144)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(48)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Day Helpers
 * @summary Get the day of the month of the given date.
 *
 * @description
 * Get the day of the month of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the day of month
 *
 * @example
 * // Which day of the month is 29 February 2012?
 * var result = getDate(new Date(2012, 1, 29))
 * //=> 29
 */
function getDate (dirtyDate) {
  var date = parse(dirtyDate)
  var dayOfMonth = date.getDate()
  return dayOfMonth
}

module.exports = getDate


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Month Helpers
 * @summary Get the number of days in a month of the given date.
 *
 * @description
 * Get the number of days in a month of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the number of days in a month
 *
 * @example
 * // How many days are in February 2000?
 * var result = getDaysInMonth(new Date(2000, 1))
 * //=> 29
 */
function getDaysInMonth (dirtyDate) {
  var date = parse(dirtyDate)
  var year = date.getFullYear()
  var monthIndex = date.getMonth()
  var lastDayOfMonth = new Date(0)
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0)
  lastDayOfMonth.setHours(0, 0, 0, 0)
  return lastDayOfMonth.getDate()
}

module.exports = getDaysInMonth


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)
var startOfISOWeek = __webpack_require__(39)

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the ISO week-numbering year of the given date.
 *
 * @description
 * Get the ISO week-numbering year of the given date,
 * which always starts 3 days before the year's first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the ISO week-numbering year
 *
 * @example
 * // Which ISO-week numbering year is 2 January 2005?
 * var result = getISOYear(new Date(2005, 0, 2))
 * //=> 2004
 */
function getISOYear (dirtyDate) {
  var date = parse(dirtyDate)
  var year = date.getFullYear()

  var fourthOfJanuaryOfNextYear = new Date(0)
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4)
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0)
  var startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear)

  var fourthOfJanuaryOfThisYear = new Date(0)
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4)
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0)
  var startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear)

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year
  } else {
    return year - 1
  }
}

module.exports = getISOYear


/***/ }),
/* 58 */
/***/ (function(module, exports) {

/**
 * @category Common Helpers
 * @summary Is the given argument an instance of Date?
 *
 * @description
 * Is the given argument an instance of Date?
 *
 * @param {*} argument - the argument to check
 * @returns {Boolean} the given argument is an instance of Date
 *
 * @example
 * // Is 'mayonnaise' a Date?
 * var result = isDate('mayonnaise')
 * //=> false
 */
function isDate (argument) {
  return argument instanceof Date
}

module.exports = isDate


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Month Helpers
 * @summary Are the given dates in the same month?
 *
 * @description
 * Are the given dates in the same month?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same month
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same month?
 * var result = isSameMonth(
 *   new Date(2014, 8, 2),
 *   new Date(2014, 8, 25)
 * )
 * //=> true
 */
function isSameMonth (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft)
  var dateRight = parse(dirtyDateRight)
  return dateLeft.getFullYear() === dateRight.getFullYear() &&
    dateLeft.getMonth() === dateRight.getMonth()
}

module.exports = isSameMonth


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var isDate = __webpack_require__(58)

/**
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @param {Date} date - the date to check
 * @returns {Boolean} the date is valid
 * @throws {TypeError} argument must be an instance of Date
 *
 * @example
 * // For the valid date:
 * var result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the invalid date:
 * var result = isValid(new Date(''))
 * //=> false
 */
function isValid (date) {
  if (isDate(date)) {
    return !isNaN(date)
  } else {
    throw new TypeError(toString.call(date) + ' is not an instance of Date')
  }
}

module.exports = isValid


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Range Helpers
 * @summary Is the given date within the range?
 *
 * @description
 * Is the given date within the range?
 *
 * @param {Date|String|Number} date - the date to check
 * @param {Date|String|Number} startDate - the start of range
 * @param {Date|String|Number} endDate - the end of range
 * @returns {Boolean} the date is within the range
 * @throws {Error} startDate cannot be after endDate
 *
 * @example
 * // For the date within the range:
 * isWithinRange(
 *   new Date(2014, 0, 3), new Date(2014, 0, 1), new Date(2014, 0, 7)
 * )
 * //=> true
 *
 * @example
 * // For the date outside of the range:
 * isWithinRange(
 *   new Date(2014, 0, 10), new Date(2014, 0, 1), new Date(2014, 0, 7)
 * )
 * //=> false
 */
function isWithinRange (dirtyDate, dirtyStartDate, dirtyEndDate) {
  var time = parse(dirtyDate).getTime()
  var startTime = parse(dirtyStartDate).getTime()
  var endTime = parse(dirtyEndDate).getTime()

  if (startTime > endTime) {
    throw new Error('The start of the range cannot be after the end of the range')
  }

  return time >= startTime && time <= endTime
}

module.exports = isWithinRange


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * var result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay (dirtyDate) {
  var date = parse(dirtyDate)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = startOfDay


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.0.4
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */    
(function (global, factory) {
   true ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Popper = factory());
}(this, (function () { 'use strict';

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
    // NOTE: 1 DOM access here
    var offsetParent = element.offsetParent;
    var nodeName = offsetParent && offsetParent.nodeName;

    if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
        return window.document.documentElement;
    }

    return offsetParent;
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
    if (element.nodeType !== 1) {
        return [];
    }
    // NOTE: 1 DOM access here
    var css = window.getComputedStyle(element, null);
    return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
    if (element.nodeName === 'HTML') {
        return element;
    }
    return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getScrollParent(element) {
    // Return body, `getScroll` will take care to get the correct `scrollTop` from it
    if (!element || ['HTML', 'BODY', '#document'].indexOf(element.nodeName) !== -1) {
        return window.document.body;
    }

    // Firefox want us to check `-x` and `-y` variations as well

    var _getStyleComputedProp = getStyleComputedProperty(element),
        overflow = _getStyleComputedProp.overflow,
        overflowX = _getStyleComputedProp.overflowX,
        overflowY = _getStyleComputedProp.overflowY;

    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
        return element;
    }

    return getScrollParent(getParentNode(element));
}

function getWindowSizes() {
    var body = window.document.body;
    var html = window.document.documentElement;
    return {
        height: Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight),
        width: Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth)
    };
}

/**
 * Get the position of the given element, relative to its offset parent
 * @method
 * @memberof Popper.Utils
 * @param {Element} element
 * @return {Object} position - Coordinates of the element and its `scrollTop`
 */
function getOffsetRect(element) {
    var elementRect = void 0;
    if (element.nodeName === 'HTML') {
        var _getWindowSizes = getWindowSizes(),
            width = _getWindowSizes.width,
            height = _getWindowSizes.height;

        elementRect = {
            width: width,
            height: height,
            left: 0,
            top: 0
        };
    } else {
        elementRect = {
            width: element.offsetWidth,
            height: element.offsetHeight,
            left: element.offsetLeft,
            top: element.offsetTop
        };
    }

    elementRect.right = elementRect.left + elementRect.width;
    elementRect.bottom = elementRect.top + elementRect.height;

    // position
    return elementRect;
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
    var nodeName = element.nodeName;
    if (nodeName === 'BODY' || nodeName === 'HTML') {
        return false;
    }
    if (getStyleComputedProperty(element, 'position') === 'fixed') {
        return true;
    }
    return isFixed(getParentNode(element));
}

/**
 * Helper used to get the position which will be applied to the popper
 * @method
 * @memberof Popper.Utils
 * @param config {HTMLElement} popper element
 * @returns {HTMLElement} reference element
 */
function getPosition(element) {
  var container = getOffsetParent(element);

  // Decide if the popper will be fixed
  // If the reference element is inside a fixed context, the popper will be fixed as well to allow them to scroll together
  var isParentFixed = isFixed(container);
  return isParentFixed ? 'fixed' : 'absolute';
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
    var isIE10 = navigator.appVersion.indexOf('MSIE 10') !== -1;
    var rect = void 0;

    // IE10 10 FIX: Please, don't ask, the element isn't
    // considered in DOM in some circumstances...
    // This isn't reproducible in IE10 compatibility mode of IE11
    if (isIE10) {
        try {
            rect = element.getBoundingClientRect();
        } catch (err) {
            rect = {};
        }
    } else {
        rect = element.getBoundingClientRect();
    }

    var result = {
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.right - rect.left,
        height: rect.bottom - rect.top
    };

    // IE10 FIX: `getBoundingClientRect`, when executed on `documentElement`
    // will not take in account the `scrollTop` and `scrollLeft`
    if (element.nodeName === 'HTML' && isIE10) {
        var _window$document$docu = window.document.documentElement,
            scrollTop = _window$document$docu.scrollTop,
            scrollLeft = _window$document$docu.scrollLeft;

        result.top -= scrollTop;
        result.bottom -= scrollTop;
        result.left -= scrollLeft;
        result.right -= scrollLeft;
    }

    // subtract scrollbar size from sizes
    var horizScrollbar = rect.width - (element.clientWidth || rect.right - rect.left);
    var vertScrollbar = rect.height - (element.clientHeight || rect.bottom - rect.top);

    // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
    // we make this check conditional for performance reasons
    if (horizScrollbar || vertScrollbar) {
        var styles = getStyleComputedProperty(element);
        horizScrollbar -= Number(styles.borderLeftWidth.split('px')[0]) + Number(styles.borderRightWidth.split('px')[0]);
        vertScrollbar -= Number(styles.borderTopWidth.split('px')[0]) + Number(styles.borderBottomWidth.split('px')[0]);
    }

    result.right -= horizScrollbar;
    result.width -= horizScrollbar;
    result.bottom -= vertScrollbar;
    result.height -= vertScrollbar;

    return result;
}

function getScroll(element) {
    var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

    var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
    var nodeName = element.nodeName;

    if (nodeName === 'BODY' || nodeName === 'HTML') {
        var html = window.document.documentElement;
        var scrollingElement = window.document.scrollingElement || html;
        return scrollingElement[upperSide];
    }

    return element[upperSide];
}

/**
 * Given an element and one of its parents, return the offset
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @param {HTMLElement} parent
 * @return {Object} rect
 */
function getOffsetRectRelativeToCustomParent(element, parent) {
    var fixed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var transformed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    var scrollParent = getScrollParent(parent);
    var elementRect = getBoundingClientRect(element);
    var parentRect = getBoundingClientRect(parent);

    var rect = {
        top: elementRect.top - parentRect.top,
        left: elementRect.left - parentRect.left,
        bottom: elementRect.top - parentRect.top + elementRect.height,
        right: elementRect.left - parentRect.left + elementRect.width,
        width: elementRect.width,
        height: elementRect.height
    };

    if (fixed && !transformed) {
        var scrollTop = getScroll(scrollParent, 'top');
        var scrollLeft = getScroll(scrollParent, 'left');
        rect.top -= scrollTop;
        rect.bottom -= scrollTop;
        rect.left -= scrollLeft;
        rect.right -= scrollLeft;
    }
    // When a popper doesn't have any positioned or scrollable parents, `offsetParent.contains(scrollParent)`
    // will return a "false positive". This is happening because `getOffsetParent` returns `html` node,
    // and `scrollParent` is the `body` node. Hence the additional check.
    else if (getOffsetParent(element).contains(scrollParent) && scrollParent.nodeName !== 'BODY') {
            var _scrollTop = getScroll(parent, 'top');
            var _scrollLeft = getScroll(parent, 'left');
            rect.top += _scrollTop;
            rect.bottom += _scrollTop;
            rect.left += _scrollLeft;
            rect.right += _scrollLeft;
        }

    // subtract borderTopWidth and borderTopWidth from final result
    var styles = getStyleComputedProperty(parent);
    var borderTopWidth = Number(styles.borderTopWidth.split('px')[0]);
    var borderLeftWidth = Number(styles.borderLeftWidth.split('px')[0]);

    rect.top -= borderTopWidth;
    rect.bottom -= borderTopWidth;
    rect.left -= borderLeftWidth;
    rect.right -= borderLeftWidth;

    return rect;
}

function getTotalScroll(element) {
    var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

    var scrollParent = getScrollParent(element);
    var scroll = getScroll(scrollParent, side);

    if (['BODY', 'HTML'].indexOf(scrollParent.nodeName) === -1) {
        return scroll + getTotalScroll(getParentNode(scrollParent), side);
    }
    return scroll;
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {Object} data - Object containing the property "offsets" generated by `_getOffsets`
 * @param {Number} padding - Boundaries padding
 * @param {Element} boundariesElement - Element used to define the boundaries
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, padding, boundariesElement) {
    // NOTE: 1 DOM access here
    var boundaries = { top: 0, left: 0 };
    var offsetParent = getOffsetParent(popper);

    // Handle viewport case
    if (boundariesElement === 'viewport') {
        var _getOffsetRect = getOffsetRect(offsetParent),
            left = _getOffsetRect.left,
            top = _getOffsetRect.top;

        var _window$document$docu = window.document.documentElement,
            width = _window$document$docu.clientWidth,
            height = _window$document$docu.clientHeight;


        if (getPosition(popper) === 'fixed') {
            boundaries.right = width;
            boundaries.bottom = height;
        } else {
            var scrollLeft = getTotalScroll(popper, 'left');
            var scrollTop = getTotalScroll(popper, 'top');

            boundaries = {
                top: 0 - top,
                right: width - left + scrollLeft,
                bottom: height - top + scrollTop,
                left: 0 - left
            };
        }
    }
    // Handle other cases based on DOM element used as boundaries
    else {
            var boundariesNode = void 0;
            if (boundariesElement === 'scrollParent') {
                boundariesNode = getScrollParent(getParentNode(popper));
            } else if (boundariesElement === 'window') {
                boundariesNode = window.document.body;
            } else {
                boundariesNode = boundariesElement;
            }

            // In case of BODY, we need a different computation
            if (boundariesNode.nodeName === 'BODY') {
                var _getWindowSizes = getWindowSizes(),
                    _height = _getWindowSizes.height,
                    _width = _getWindowSizes.width;

                boundaries.right = _width;
                boundaries.bottom = _height;
            }
            // for all the other DOM elements, this one is good
            else {
                    boundaries = getOffsetRectRelativeToCustomParent(boundariesNode, offsetParent, isFixed(popper));
                }
        }

    // Add paddings
    boundaries.left += padding;
    boundaries.top += padding;
    boundaries.right -= padding;
    boundaries.bottom -= padding;

    return boundaries;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper) {
    if (placement.indexOf('auto') === -1) {
        return placement;
    }

    var boundaries = getBoundaries(popper, 0, 'scrollParent');

    var sides = {
        top: refRect.top - boundaries.top,
        right: boundaries.right - refRect.right,
        bottom: boundaries.bottom - refRect.bottom,
        left: refRect.left - boundaries.left
    };

    var computedPlacement = Object.keys(sides).sort(function (a, b) {
        return sides[b] - sides[a];
    })[0];
    var variation = placement.split('-')[1];

    return computedPlacement + (variation ? '-' + variation : '');
}

var nativeHints = ['native code', '[object MutationObserverConstructor]' // for mobile safari iOS 9.0
];

/**
 * Determine if a function is implemented natively (as opposed to a polyfill).
 * @argument {Function | undefined} fn the function to check
 * @returns {boolean}
 */
var isNative = (function (fn) {
  return nativeHints.some(function (hint) {
    return (fn || '').toString().indexOf(hint) > -1;
  });
});

var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
var timeoutDuration = 0;
for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
        timeoutDuration = 1;
        break;
    }
}

function microtaskDebounce(fn) {
    var scheduled = false;
    var i = 0;
    var elem = document.createElement('span');

    // MutationObserver provides a mechanism for scheduling microtasks, which
    // are scheduled *before* the next task. This gives us a way to debounce
    // a function but ensure it's called *before* the next paint.
    var observer = new MutationObserver(function () {
        fn();
        scheduled = false;
    });

    observer.observe(elem, { attributes: true });

    return function () {
        if (!scheduled) {
            scheduled = true;
            elem.setAttribute('x-index', i);
            i = i + 1; // don't use compund (+=) because it doesn't get optimized in V8
        }
    };
}

function taskDebounce(fn) {
    var scheduled = false;
    return function () {
        if (!scheduled) {
            scheduled = true;
            setTimeout(function () {
                scheduled = false;
                fn();
            }, timeoutDuration);
        }
    };
}

// It's common for MutationObserver polyfills to be seen in the wild, however
// these rely on Mutation Events which only occur when an element is connected
// to the DOM. The algorithm used in this module does not use a connected element,
// and so we must ensure that a *native* MutationObserver is available.
var supportsNativeMutationObserver = isNative(window.MutationObserver);

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsNativeMutationObserver ? microtaskDebounce : taskDebounce;

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex$1(arr, check) {
    // use native find if supported
    if (Array.prototype.find) {
        return arr.find(check);
    }

    // use `filter` to obtain the same behavior of `find`
    return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
    // use native findIndex if supported
    if (Array.prototype.findIndex) {
        return arr.findIndex(function (cur) {
            return cur[prop] === value;
        });
    }

    // use `find` + `indexOf` if `findIndex` isn't supported
    var match = findIndex$1(arr, function (obj) {
        return obj[prop] === value;
    });
    return arr.indexOf(match);
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Given the popper offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} popperOffsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(popperOffsets) {
    return _extends({}, popperOffsets, {
        right: popperOffsets.left + popperOffsets.width,
        bottom: popperOffsets.top + popperOffsets.height
    });
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
    var styles = window.getComputedStyle(element);
    var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
    var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
    var result = {
        width: element.offsetWidth + y,
        height: element.offsetHeight + x
    };
    return result;
}

/**
 * Get the opposite placement of the given one/
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(state, popper, referenceOffsets, placement) {
    placement = placement.split('-')[0];

    // Get popper node sizes
    var popperRect = getOuterSizes(popper);

    // Add position, width and height to our offsets object
    var popperOffsets = {
        position: state.position,
        width: popperRect.width,
        height: popperRect.height
    };

    // depending by the popper placement we have to compute its offsets slightly differently
    var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
    var mainSide = isHoriz ? 'top' : 'left';
    var secondarySide = isHoriz ? 'left' : 'top';
    var measurement = isHoriz ? 'height' : 'width';
    var secondaryMeasurement = !isHoriz ? 'height' : 'width';

    popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
    if (placement === secondarySide) {
        popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
    } else {
        popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
    }

    return popperOffsets;
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var isParentFixed = state.position === 'fixed';
  var isParentTransformed = state.isParentTransformed;
  var offsetParent = getOffsetParent(isParentFixed && isParentTransformed ? reference : popper);

  return getOffsetRectRelativeToCustomParent(reference, offsetParent, isParentFixed, isParentTransformed);
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase)
 */
function getSupportedPropertyName(property) {
    var prefixes = [false, 'ms', 'webkit', 'moz', 'o'];
    var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

    for (var i = 0; i < prefixes.length - 1; i++) {
        var prefix = prefixes[i];
        var toCheck = prefix ? '' + prefix + upperProp : property;
        if (typeof window.document.body.style[toCheck] !== 'undefined') {
            return toCheck;
        }
    }
    return null;
}

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Helper used to know if the given modifier depends from another one.
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = findIndex$1(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  return !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Check if the given element has transforms applied to itself or a parent
 * @method
 * @memberof Popper.Utils
 * @param  {Element} element
 * @return {Boolean} answer to "isTransformed?"
 */
function isTransformed(element) {
    if (element.nodeName === 'BODY') {
        return false;
    }
    if (getStyleComputedProperty(element, 'transform') !== 'none') {
        return true;
    }
    return getParentNode(element) ? isTransformed(getParentNode(element)) : element;
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
    // NOTE: 1 DOM access here
    window.removeEventListener('resize', state.updateBound);
    if (state.scrollElement) {
        state.scrollElement.removeEventListener('scroll', state.updateBound);
    }
    state.updateBound = null;
    state.scrollElement = null;
    state.eventsEnabled = false;
    return state;
}

/**
 * Loop trough the list of modifiers and run them in order, each of them will then edit the data object
 * @method
 * @memberof Popper.Utils
 * @param {Object} data
 * @param {Array} modifiers
 * @param {Function} ends
 */
function runModifiers(modifiers, data, ends) {
    var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

    modifiersToRun.forEach(function (modifier) {
        if (modifier.enabled && isFunction(modifier.function)) {
            data = modifier.function(data, modifier);
        }
    });

    return data;
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles - Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(function (prop) {
        var value = attributes[prop];
        if (value !== false) {
            element.setAttribute(prop, attributes[prop]);
        } else {
            element.removeAttribute(prop);
        }
    });
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles - Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
    Object.keys(styles).forEach(function (prop) {
        var unit = '';
        // add unit if the value is numeric and is one of the following
        if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
            unit = 'px';
        }
        element.style[prop] = styles[prop] + unit;
    });
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
    // NOTE: 1 DOM access here
    state.updateBound = updateBound;
    window.addEventListener('resize', state.updateBound, { passive: true });
    var target = getScrollParent(reference);
    if (target.nodeName === 'BODY') {
        target = window;
    }
    target.addEventListener('scroll', state.updateBound, { passive: true });
    state.scrollElement = target;
    state.eventsEnabled = true;

    return state;
}

/** @namespace Popper.Utils */
var Utils = {
    computeAutoPlacement: computeAutoPlacement,
    debounce: debounce,
    findIndex: findIndex,
    getBoundaries: getBoundaries,
    getBoundingClientRect: getBoundingClientRect,
    getClientRect: getClientRect,
    getOffsetParent: getOffsetParent,
    getOffsetRect: getOffsetRect,
    getOffsetRectRelativeToCustomParent: getOffsetRectRelativeToCustomParent,
    getOuterSizes: getOuterSizes,
    getParentNode: getParentNode,
    getPopperOffsets: getPopperOffsets,
    getPosition: getPosition,
    getReferenceOffsets: getReferenceOffsets,
    getScroll: getScroll,
    getScrollParent: getScrollParent,
    getStyleComputedProperty: getStyleComputedProperty,
    getSupportedPropertyName: getSupportedPropertyName,
    getTotalScroll: getTotalScroll,
    getWindowSizes: getWindowSizes,
    isFixed: isFixed,
    isFunction: isFunction,
    isModifierEnabled: isModifierEnabled,
    isModifierRequired: isModifierRequired,
    isNative: isNative,
    isNumeric: isNumeric,
    isTransformed: isTransformed,
    removeEventListeners: removeEventListeners,
    runModifiers: runModifiers,
    setAttributes: setAttributes,
    setStyles: setStyles,
    setupEventListeners: setupEventListeners
};

/**
 * Apply the computed styles to the popper element
 * @method
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data, options) {
    // apply the final offsets to the popper
    // NOTE: 1 DOM access here
    var styles = {
        position: data.offsets.popper.position
    };

    var attributes = {
        'x-placement': data.placement
    };

    // round top and left to avoid blurry text
    var left = Math.round(data.offsets.popper.left);
    var top = Math.round(data.offsets.popper.top);

    // if gpuAcceleration is set to true and transform is supported,
    //  we use `translate3d` to apply the position to the popper we
    // automatically use the supported prefixed version if needed
    var prefixedProperty = getSupportedPropertyName('transform');
    if (options.gpuAcceleration && prefixedProperty) {
        styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
        styles.top = 0;
        styles.left = 0;
        styles.willChange = 'transform';
    }
    // othwerise, we use the standard `left` and `top` properties
    else {
            styles.left = left;
            styles.top = top;
            styles.willChange = 'top, left';
        }

    // any property present in `data.styles` will be applied to the popper,
    // in this way we can make the 3rd party modifiers add custom styles to it
    // Be aware, modifiers could override the properties defined in the previous
    // lines of this modifier!
    setStyles(data.instance.popper, _extends({}, styles, data.styles));

    // any property present in `data.attributes` will be applied to the popper,
    // they will be set as HTML attributes of the element
    setAttributes(data.instance.popper, _extends({}, attributes, data.attributes));

    // if the arrow style has been computed, apply the arrow style
    if (data.offsets.arrow) {
        setStyles(data.arrowElement, data.offsets.arrow);
    }

    return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used to add margins to the popper
 * margins needs to be calculated to get the correct popper offsets
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper.
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
    // compute reference element offsets
    var referenceOffsets = getReferenceOffsets(state, popper, reference);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    options.placement = computeAutoPlacement(options.placement, referenceOffsets, popper);

    popper.setAttribute('x-placement', options.placement);
    return options;
}

/**
 * Modifier used to move the arrowElements on the edge of the popper to make sure them are always between the popper and the reference element
 * It will use the CSS outer size of the arrowElement element to know how many pixels of conjuction are needed
 * @method
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
    // arrow depends on keepTogether in order to work
    if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
        console.warn('WARNING: `keepTogether` modifier is required by arrow modifier in order to work, be sure to include it before `arrow`!');
        return data;
    }

    var arrowElement = options.element;

    // if arrowElement is a string, suppose it's a CSS selector
    if (typeof arrowElement === 'string') {
        arrowElement = data.instance.popper.querySelector(arrowElement);

        // if arrowElement is not found, don't run the modifier
        if (!arrowElement) {
            return data;
        }
    } else {
        // if the arrowElement isn't a query selector we must check that the
        // provided DOM node is child of its popper node
        if (!data.instance.popper.contains(arrowElement)) {
            console.warn('WARNING: `arrow.element` must be child of its popper element!');
            return data;
        }
    }

    var placement = data.placement.split('-')[0];
    var popper = getClientRect(data.offsets.popper);
    var reference = data.offsets.reference;
    var isVertical = ['left', 'right'].indexOf(placement) !== -1;

    var len = isVertical ? 'height' : 'width';
    var side = isVertical ? 'top' : 'left';
    var altSide = isVertical ? 'left' : 'top';
    var opSide = isVertical ? 'bottom' : 'right';
    var arrowElementSize = getOuterSizes(arrowElement)[len];

    //
    // extends keepTogether behavior making sure the popper and its reference have enough pixels in conjuction
    //

    // top/left side
    if (reference[opSide] - arrowElementSize < popper[side]) {
        data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
    }
    // bottom/right side
    if (reference[side] + arrowElementSize > popper[opSide]) {
        data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
    }

    // compute center of the popper
    var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

    // Compute the sideValue using the updated popper offsets
    var sideValue = center - getClientRect(data.offsets.popper)[side];

    // prevent arrowElement from being placed not contiguously to its popper
    sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

    data.arrowElement = arrowElement;
    data.offsets.arrow = {};
    data.offsets.arrow[side] = sideValue;
    data.offsets.arrow[altSide] = ''; // make sure to unset any eventual altSide value from the DOM node

    return data;
}

/**
 * Get the opposite placement variation of the given one/
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
    if (variation === 'end') {
        return 'start';
    } else if (variation === 'start') {
        return 'end';
    }
    return variation;
}

/**
 * Modifier used to flip the placement of the popper when the latter is starting overlapping its reference element.
 * Requires the `preventOverflow` modifier before it in order to work.
 * **NOTE:** data.instance modifier will run all its previous modifiers everytime it tries to flip the popper!
 * @method
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
    // if `inner` modifier is enabled, we can't use the `flip` modifier
    if (isModifierEnabled(data.instance.modifiers, 'inner')) {
        return data;
    }

    if (data.flipped && data.placement === data.originalPlacement) {
        // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
        return data;
    }

    var boundaries = getBoundaries(data.instance.popper, options.padding, options.boundariesElement);

    var placement = data.placement.split('-')[0];
    var placementOpposite = getOppositePlacement(placement);
    var variation = data.placement.split('-')[1] || '';

    var flipOrder = [];

    if (options.behavior === 'flip') {
        flipOrder = [placement, placementOpposite];
    } else {
        flipOrder = options.behavior;
    }

    flipOrder.forEach(function (step, index) {
        if (placement !== step || flipOrder.length === index + 1) {
            return data;
        }

        placement = data.placement.split('-')[0];
        placementOpposite = getOppositePlacement(placement);

        var popperOffsets = getClientRect(data.offsets.popper);
        var refOffsets = data.offsets.reference;

        // using Math.floor because the reference offsets may contain decimals we are not going to consider here
        var overlapsRef = placement === 'left' && Math.floor(popperOffsets.right) > Math.floor(refOffsets.left) || placement === 'right' && Math.floor(popperOffsets.left) < Math.floor(refOffsets.right) || placement === 'top' && Math.floor(popperOffsets.bottom) > Math.floor(refOffsets.top) || placement === 'bottom' && Math.floor(popperOffsets.top) < Math.floor(refOffsets.bottom);

        var overflowsBoundaries = placement === 'left' && Math.floor(popperOffsets.left) < Math.floor(boundaries.left) || placement === 'right' && Math.floor(popperOffsets.right) > Math.floor(boundaries.right) || placement === 'top' && Math.floor(popperOffsets.top) < Math.floor(boundaries.top) || placement === 'bottom' && Math.floor(popperOffsets.bottom) > Math.floor(boundaries.bottom);

        // flip the variation if required
        var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
        var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && Math.floor(popperOffsets.left) < Math.floor(boundaries.left) || isVertical && variation === 'end' && Math.floor(popperOffsets.right) > Math.floor(boundaries.right) || !isVertical && variation === 'start' && Math.floor(popperOffsets.top) < Math.floor(boundaries.top) || !isVertical && variation === 'end' && Math.floor(popperOffsets.bottom) > Math.floor(boundaries.bottom));

        if (overlapsRef || overflowsBoundaries || flippedVariation) {
            // this boolean to detect any flip loop
            data.flipped = true;

            if (overlapsRef || overflowsBoundaries) {
                placement = flipOrder[index + 1];
            }

            if (flippedVariation) {
                variation = getOppositeVariation(variation);
            }

            data.placement = placement + (variation ? '-' + variation : '');
            data.offsets.popper = getPopperOffsets(data.instance.state, data.instance.popper, data.offsets.reference, data.placement);

            data = runModifiers(data.instance.modifiers, data, 'flip');
        }
    });
    return data;
}

/**
 * Modifier used to make sure the popper is always near its reference element
 * It cares only about the first axis, you can still have poppers with margin
 * between the popper and its reference element.
 * @method
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
    var popper = getClientRect(data.offsets.popper);
    var reference = data.offsets.reference;
    var placement = data.placement.split('-')[0];
    var floor = Math.floor;

    if (['top', 'bottom'].indexOf(placement) !== -1) {
        if (popper.right < floor(reference.left)) {
            data.offsets.popper.left = floor(reference.left) - popper.width;
        }
        if (popper.left > floor(reference.right)) {
            data.offsets.popper.left = floor(reference.right);
        }
    } else {
        if (popper.bottom < floor(reference.top)) {
            data.offsets.popper.top = floor(reference.top) - popper.height;
        }
        if (popper.top > floor(reference.bottom)) {
            data.offsets.popper.top = floor(reference.bottom);
        }
    }

    return data;
}

/**
 * Modifier used to add an offset to the popper, useful if you more granularity positioning your popper.
 * The offsets will shift the popper on the side of its reference element.
 * @method
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 *      Basic usage allows a number used to nudge the popper by the given amount of pixels.
 *      You can pass a percentage value as string (eg. `20%`) to nudge by the given percentage (relative to reference element size)
 *      Other supported units are `vh` and `vw` (relative to viewport)
 *      Additionally, you can pass a pair of values (eg. `10 20` or `2vh 20%`) to nudge the popper
 *      on both axis.
 *      A note about percentage values, if you want to refer a percentage to the popper size instead of the reference element size,
 *      use `%p` instead of `%` (eg: `20%p`). To make it clearer, you can replace `%` with `%r` and use eg.`10%p 25%r`.
 *      > **Heads up!** The order of the axis is relative to the popper placement: `bottom` or `top` are `X,Y`, the other are `Y,X`
 * @returns {Object} The data object, properly modified
 */
function offset(data, options) {
    var placement = data.placement;
    var popper = data.offsets.popper;

    var offsets = void 0;
    if (isNumeric(options.offset)) {
        offsets = [options.offset, 0];
    } else {
        // split the offset in case we are providing a pair of offsets separated
        // by a blank space
        offsets = options.offset.split(' ');

        // itherate through each offset to compute them in case they are percentages
        offsets = offsets.map(function (offset, index) {
            // separate value from unit
            var split = offset.match(/(\d*\.?\d*)(.*)/);
            var value = +split[1];
            var unit = split[2];

            // use height if placement is left or right and index is 0 otherwise use width
            // in this way the first offset will use an axis and the second one
            // will use the other one
            var useHeight = placement.indexOf('right') !== -1 || placement.indexOf('left') !== -1;

            if (index === 1) {
                useHeight = !useHeight;
            }

            var measurement = useHeight ? 'height' : 'width';

            // if is a percentage, we calculate the value of it using as base the
            // sizes of the reference element
            if (unit === '%' || unit === '%r') {
                var referenceRect = getClientRect(data.offsets.reference);
                var len = referenceRect[measurement];
                return len / 100 * value;
            }
            // if is a percentage relative to the popper, we calculate the value of it using
            // as base the sizes of the popper
            else if (unit === '%p') {
                    var popperRect = getClientRect(data.offsets.popper);
                    var _len = popperRect[measurement];
                    return _len / 100 * value;
                }
                // if is a vh or vw, we calculate the size based on the viewport
                else if (unit === 'vh' || unit === 'vw') {
                        var size = void 0;
                        if (unit === 'vh') {
                            size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                        } else {
                            size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                        }
                        return size / 100 * value;
                    }
                    // if is an explicit pixel unit, we get rid of the unit and keep the value
                    else if (unit === 'px') {
                            return +value;
                        }
                        // if is an implicit unit, it's px, and we return just the value
                        else {
                                return +offset;
                            }
        });
    }

    if (data.placement.indexOf('left') !== -1) {
        popper.top += offsets[0];
        popper.left -= offsets[1] || 0;
    } else if (data.placement.indexOf('right') !== -1) {
        popper.top += offsets[0];
        popper.left += offsets[1] || 0;
    } else if (data.placement.indexOf('top') !== -1) {
        popper.left += offsets[0];
        popper.top -= offsets[1] || 0;
    } else if (data.placement.indexOf('bottom') !== -1) {
        popper.left += offsets[0];
        popper.top += offsets[1] || 0;
    }
    return data;
}

/**
 * Modifier used to prevent the popper from being positioned outside the boundary.
 *
 * An scenario exists where the reference itself is not within the boundaries. We can
 * say it has "escaped the boundaries" — or just "escaped". In this case we need to
 * decide whether the popper should either:
 *
 * - detach from the reference and remain "trapped" in the boundaries, or
 * - if it should be ignore the boundary and "escape with the reference"
 *
 * When `escapeWithReference` is `true`, and reference is completely outside the
 * boundaries, the popper will overflow (or completely leave) the boundaries in order
 * to remain attached to the edge of the reference.
 *
 * @method
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
    var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);
    var boundaries = getBoundaries(data.instance.popper, options.padding, boundariesElement);
    options.boundaries = boundaries;

    var order = options.priority;
    var popper = getClientRect(data.offsets.popper);

    var check = {
        left: function left() {
            var left = popper.left;
            if (popper.left < boundaries.left && !shouldOverflowBoundary(data, options, 'left')) {
                left = Math.max(popper.left, boundaries.left);
            }
            return { left: left };
        },
        right: function right() {
            var left = popper.left;
            if (popper.right > boundaries.right && !shouldOverflowBoundary(data, options, 'right')) {
                left = Math.min(popper.left, boundaries.right - popper.width);
            }
            return { left: left };
        },
        top: function top() {
            var top = popper.top;
            if (popper.top < boundaries.top && !shouldOverflowBoundary(data, options, 'top')) {
                top = Math.max(popper.top, boundaries.top);
            }
            return { top: top };
        },
        bottom: function bottom() {
            var top = popper.top;
            if (popper.bottom > boundaries.bottom && !shouldOverflowBoundary(data, options, 'bottom')) {
                top = Math.min(popper.top, boundaries.bottom - popper.height);
            }
            return { top: top };
        }
    };

    order.forEach(function (direction) {
        popper = _extends({}, popper, check[direction]());
    });

    data.offsets.popper = popper;

    return data;
}

/**
 * Determine if the popper should overflow a boundary edge to stay together with the reference.
 */
function shouldOverflowBoundary(data, options, overflowDirection) {
    if (!options.escapeWithReference) {
        return false;
    }

    if (data.flipped && isSameAxis(data.originalPlacement, overflowDirection)) {
        return true;
    }

    if (!isSameAxis(data.originalPlacement, overflowDirection)) {
        return true;
    }

    return true;
}

/**
 * Determine if two placement values are on the same axis.
 */
function isSameAxis(a, b) {
    // placement syntax:
    //
    //     ( "top" | "right" | "bottom" | "left" ) ( "-start" | "" | "-end" )
    //     |------------- Direction -------------|
    //
    var aDirection = a.split('-')[0];
    var bDirection = b.split('-')[0];

    return aDirection === bDirection || aDirection === getOppositePlacement(b);
}

/**
 * Modifier used to shift the popper on the start or end of its reference element side
 * @method
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var shiftvariation = placement.split('-')[1];

    // if shift shiftvariation is specified, run the modifier
    if (shiftvariation) {
        var reference = data.offsets.reference;
        var popper = getClientRect(data.offsets.popper);

        var shiftOffsets = {
            y: {
                start: { top: reference.top },
                end: { top: reference.top + reference.height - popper.height }
            },
            x: {
                start: { left: reference.left },
                end: { left: reference.left + reference.width - popper.width }
            }
        };

        var axis = ['bottom', 'top'].indexOf(basePlacement) !== -1 ? 'x' : 'y';

        data.offsets.popper = _extends({}, popper, shiftOffsets[axis][shiftvariation]);
    }

    return data;
}

/**
 * Modifier used to hide the popper when its reference element is outside of the
 * popper boundaries. It will set an x-hidden attribute which can be used to hide
 * the popper when its reference is out of boundaries.
 * @method
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
    if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
        console.warn('WARNING: preventOverflow modifier is required by hide modifier in order to work, be sure to include it before hide!');
        return data;
    }

    var refRect = data.offsets.reference;
    var bound = findIndex$1(data.instance.modifiers, function (modifier) {
        return modifier.name === 'preventOverflow';
    }).boundaries;

    if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
        // Avoid unnecessary DOM access if visibility hasn't changed
        if (data.hide === true) {
            return data;
        }

        data.hide = true;
        data.attributes['x-out-of-boundaries'] = '';
    } else {
        // Avoid unnecessary DOM access if visibility hasn't changed
        if (data.hide === false) {
            return data;
        }

        data.hide = false;
        data.attributes['x-out-of-boundaries'] = false;
    }

    return data;
}

/**
 * Modifier used to make the popper flow toward the inner of the reference element.
 * By default, when this modifier is disabled, the popper will be placed outside
 * the reference element.
 * @method
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var popper = getClientRect(data.offsets.popper);
    var reference = getClientRect(data.offsets.reference);
    var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

    var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

    popper[isHoriz ? 'left' : 'top'] = reference[placement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

    data.placement = getOppositePlacement(placement);
    data.offsets.popper = getClientRect(popper);

    return data;
}

/**
 * Modifiers are plugins used to alter the behavior of your poppers.
 * Popper.js uses a set of 7 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Each modifier is an object containing several properties listed below.
 * @namespace Modifiers
 * @param {Object} modifier - Modifier descriptor
 * @param {Integer} modifier.order
 *      The `order` property defines the execution order of the modifiers.
 *      The built-in modifiers have orders with a gap of 100 units in between,
 *      this allows you to inject additional modifiers between the existing ones
 *      without having to redefine the order of all of them.
 *      The modifiers are executed starting from the one with the lowest order.
 * @param {Boolean} modifier.enabled - When `true`, the modifier will be used.
 * @param {Modifiers~modifier} modifier.function - Modifier function.
 * @param {Modifiers~onLoad} modifier.onLoad - Function executed on popper initalization
 * @return {Object} data - Each modifier must return the modified `data` object.
 */
var modifiers = {
    shift: {
        order: 100,
        enabled: true,
        function: shift
    },
    offset: {
        order: 200,
        enabled: true,
        function: offset,
        // nudges popper from its origin by the given amount of pixels (can be negative)
        offset: 0
    },
    preventOverflow: {
        order: 300,
        enabled: true,
        function: preventOverflow,
        // popper will try to prevent overflow following these priorities
        //  by default, then, it could overflow on the left and on top of the boundariesElement
        priority: ['left', 'right', 'top', 'bottom'],
        // amount of pixel used to define a minimum distance between the boundaries and the popper
        // this makes sure the popper has always a little padding between the edges of its container
        padding: 5,
        boundariesElement: 'scrollParent'
    },
    keepTogether: {
        order: 400,
        enabled: true,
        function: keepTogether
    },
    arrow: {
        order: 500,
        enabled: true,
        function: arrow,
        // selector or node used as arrow
        element: '[x-arrow]'
    },
    flip: {
        order: 600,
        enabled: true,
        function: flip,
        // the behavior used to change the popper's placement
        behavior: 'flip',
        // the popper will flip if it hits the edges of the boundariesElement - padding
        padding: 5,
        boundariesElement: 'viewport'
    },
    inner: {
        order: 700,
        enabled: false,
        function: inner
    },
    hide: {
        order: 800,
        enabled: true,
        function: hide
    },
    applyStyle: {
        order: 900,
        enabled: true,
        // if true, it uses the CSS 3d transformation to position the popper
        gpuAcceleration: true,
        function: applyStyle,
        onLoad: applyStyleOnLoad
    }
};

/**
 * Modifiers can edit the `data` object to change the beheavior of the popper.
 * This object contains all the informations used by Popper.js to compute the
 * popper position.
 * The modifier can edit the data as needed, and then `return` it as result.
 *
 * @callback Modifiers~modifier
 * @param {dataObject} data
 * @return {dataObject} modified data
 */

/**
 * The `dataObject` is an object containing all the informations used by Popper.js
 * this object get passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper.
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper, it expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements.
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arro] `top` and `left` offsets, only one of them will be different from 0
 */

// Utils
// Modifiers
// default options
var DEFAULTS = {
    // placement of the popper
    placement: 'bottom',

    // whether events (resize, scroll) are initially enabled
    eventsEnabled: true,

    /**
     * Callback called when the popper is created.
     * By default, is set to no-op.
     * Access Popper.js instance with `data.instance`.
     * @callback createCallback
     * @static
     * @param {dataObject} data
     */
    onCreate: function onCreate() {},

    /**
     * Callback called when the popper is updated, this callback is not called
     * on the initialization/creation of the popper, but only on subsequent
     * updates.
     * By default, is set to no-op.
     * Access Popper.js instance with `data.instance`.
     * @callback updateCallback
     * @static
     * @param {dataObject} data
     */
    onUpdate: function onUpdate() {},

    // list of functions used to modify the offsets before they are applied to the popper
    modifiers: modifiers
};

/**
 * Create a new Popper.js instance
 * @class Popper
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper.
 * @param {Object} options
 * @param {String} options.placement=bottom
 *      Placement of the popper accepted values: `top(-start, -end), right(-start, -end), bottom(-start, -end),
 *      left(-start, -end)`
 *
 * @param {Boolean} options.eventsEnabled=true
 *      Whether events (resize, scroll) are initially enabled
 * @param {Boolean} options.gpuAcceleration=true
 *      When this property is set to true, the popper position will be applied using CSS3 translate3d, allowing the
 *      browser to use the GPU to accelerate the rendering.
 *      If set to false, the popper will be placed using `top` and `left` properties, not using the GPU.
 *
 * @param {Boolean} options.removeOnDestroy=false
 *      Set to true if you want to automatically remove the popper when you call the `destroy` method.
 *
 * @param {Object} options.modifiers
 *      List of functions used to modify the data before they are applied to the popper (see source code for default values)
 *
 * @param {Object} options.modifiers.arrow - Arrow modifier configuration
 * @param {String|HTMLElement} options.modifiers.arrow.element='[x-arrow]'
 *      The DOM Node used as arrow for the popper, or a CSS selector used to get the DOM node. It must be child of
 *      its parent Popper. Popper.js will apply to the given element the style required to align the arrow with its
 *      reference element.
 *      By default, it will look for a child node of the popper with the `x-arrow` attribute.
 *
 * @param {Object} options.modifiers.offset - Offset modifier configuration
 * @param {Number} options.modifiers.offset.offset=0
 *      Amount of pixels the popper will be shifted (can be negative).
 *
 * @param {Object} options.modifiers.preventOverflow - PreventOverflow modifier configuration
 * @param {Array} [options.modifiers.preventOverflow.priority=['left', 'right', 'top', 'bottom']]
 *      Priority used when Popper.js tries to avoid overflows from the boundaries, they will be checked in order,
 *      this means that the last one will never overflow
 * @param {String|HTMLElement} options.modifiers.preventOverflow.boundariesElement='scrollParent'
 *      Boundaries used by the modifier, can be `scrollParent`, `window`, `viewport` or any DOM element.
 * @param {Number} options.modifiers.preventOverflow.padding=5
 *      Amount of pixel used to define a minimum distance between the boundaries and the popper
 *      this makes sure the popper has always a little padding between the edges of its container.
 *
 * @param {Object} options.modifiers.flip - Flip modifier configuration
 * @param {String|Array} options.modifiers.flip.behavior='flip'
 *      The behavior used by the `flip` modifier to change the placement of the popper when the latter is trying to
 *      overlap its reference element. Defining `flip` as value, the placement will be flipped on
 *      its axis (`right - left`, `top - bottom`).
 *      You can even pass an array of placements (eg: `['right', 'left', 'top']` ) to manually specify
 *      how alter the placement when a flip is needed. (eg. in the above example, it would first flip from right to left,
 *      then, if even in its new placement, the popper is overlapping its reference element, it will be moved to top)
 * @param {String|HTMLElement} options.modifiers.flip.boundariesElement='viewport'
 *      The element which will define the boundaries of the popper position, the popper will never be placed outside
 *      of the defined boundaries (except if `keepTogether` is enabled)
 *
 * @param {Object} options.modifiers.inner - Inner modifier configuration
 * @param {Number} options.modifiers.innner.enabled=false
 *      Set to `true` to make the popper flow toward the inner of the reference element.
 *
 * @param {Number} options.modifiers.flip.padding=5
 *      Amount of pixel used to define a minimum distance between the boundaries and the popper
 *      this makes sure the popper has always a little padding between the edges of its container.
 *
 * @param {createCallback} options.onCreate - onCreate callback
 *      Function called after the Popper has been instantiated.
 *
 * @param {updateCallback} options.onUpdate - onUpdate callback
 *      Function called on subsequent updates of Popper.
 *
 * @return {Object} instance - The generated Popper.js instance
 */

var Popper = function () {
    function Popper(reference, popper) {
        var _this = this;

        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        classCallCheck(this, Popper);

        this.scheduleUpdate = function () {
            return requestAnimationFrame(_this.update);
        };

        // make update() debounced, so that it only runs at most once-per-tick
        this.update = debounce(this.update.bind(this));

        // with {} we create a new object with the options inside it
        this.options = _extends({}, Popper.Defaults, options);

        // init state
        this.state = {
            isDestroyed: false,
            isCreated: false
        };

        // get reference and popper elements (allow jQuery wrappers)
        this.reference = reference.jquery ? reference[0] : reference;
        this.popper = popper.jquery ? popper[0] : popper;

        // refactoring modifiers' list (Object => Array)
        this.modifiers = Object.keys(Popper.Defaults.modifiers).map(function (name) {
            return _extends({ name: name }, Popper.Defaults.modifiers[name]);
        });

        // assign default values to modifiers, making sure to override them with
        // the ones defined by user
        this.modifiers = this.modifiers.map(function (defaultConfig) {
            var userConfig = options.modifiers && options.modifiers[defaultConfig.name] || {};
            return _extends({}, defaultConfig, userConfig);
        });

        // add custom modifiers to the modifiers list
        if (options.modifiers) {
            this.options.modifiers = _extends({}, Popper.Defaults.modifiers, options.modifiers);
            Object.keys(options.modifiers).forEach(function (name) {
                // take in account only custom modifiers
                if (Popper.Defaults.modifiers[name] === undefined) {
                    var modifier = options.modifiers[name];
                    modifier.name = name;
                    _this.modifiers.push(modifier);
                }
            });
        }

        // get the popper position type
        this.state.position = getPosition(this.reference);

        // sort the modifiers by order
        this.modifiers = this.modifiers.sort(function (a, b) {
            return a.order - b.order;
        });

        // modifiers have the ability to execute arbitrary code when Popper.js get inited
        // such code is executed in the same order of its modifier
        // they could add new properties to their options configuration
        // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
        this.modifiers.forEach(function (modifierOptions) {
            if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
                modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
            }
        });

        // determine how we should set the origin of offsets
        this.state.isParentTransformed = isTransformed(this.popper.parentNode);

        // fire the first update to position the popper in the right place
        this.update();

        var eventsEnabled = this.options.eventsEnabled;
        if (eventsEnabled) {
            // setup event listeners, they will take care of update the position in specific situations
            this.enableEventListeners();
        }

        this.state.eventsEnabled = eventsEnabled;
    }

    //
    // Methods
    //

    /**
     * Updates the position of the popper, computing the new offsets and applying the new style
     * Prefer `scheduleUpdate` over `update` because of performance reasons
     * @method
     * @memberof Popper
     */


    createClass(Popper, [{
        key: 'update',
        value: function update() {
            // if popper is destroyed, don't perform any further update
            if (this.state.isDestroyed) {
                return;
            }

            var data = {
                instance: this,
                styles: {},
                attributes: {},
                flipped: false,
                offsets: {}
            };

            // make sure to apply the popper position before any computation
            this.state.position = getPosition(this.reference);
            setStyles(this.popper, { position: this.state.position });

            // compute reference element offsets
            data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference);

            // compute auto placement, store placement inside the data object,
            // modifiers will be able to edit `placement` if needed
            // and refer to originalPlacement to know the original value
            data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper);

            // store the computed placement inside `originalPlacement`
            data.originalPlacement = this.options.placement;

            // compute the popper offsets
            data.offsets.popper = getPopperOffsets(this.state, this.popper, data.offsets.reference, data.placement);

            // run the modifiers
            data = runModifiers(this.modifiers, data);

            // the first `update` will call `onCreate` callback
            // the other ones will call `onUpdate` callback
            if (!this.state.isCreated) {
                this.state.isCreated = true;
                this.options.onCreate(data);
            } else {
                this.options.onUpdate(data);
            }
        }

        /**
         * Schedule an update, it will run on the next UI update available
         * @method
         * @memberof Popper
         */

    }, {
        key: 'destroy',


        /**
         * Destroy the popper
         * @method
         * @memberof Popper
         */
        value: function destroy() {
            this.state.isDestroyed = true;

            // touch DOM only if `applyStyle` modifier is enabled
            if (isModifierEnabled(this.modifiers, 'applyStyle')) {
                this.popper.removeAttribute('x-placement');
                this.popper.style.left = '';
                this.popper.style.position = '';
                this.popper.style.top = '';
                this.popper.style[getSupportedPropertyName('transform')] = '';
            }

            this.disableEventListeners();

            // remove the popper if user explicity asked for the deletion on destroy
            // do not use `remove` because IE11 doesn't support it
            if (this.options.removeOnDestroy) {
                this.popper.parentNode.removeChild(this.popper);
            }
            return this;
        }

        /**
         * it will add resize/scroll events and start recalculating
         * position of the popper element when they are triggered
         * @method
         * @memberof Popper
         */

    }, {
        key: 'enableEventListeners',
        value: function enableEventListeners() {
            if (!this.state.eventsEnabled) {
                this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
            }
        }

        /**
         * it will remove resize/scroll events and won't recalculate
         * popper position when they are triggered. It also won't trigger onUpdate callback anymore,
         * unless you call 'update' method manually.
         * @method
         * @memberof Popper
         */

    }, {
        key: 'disableEventListeners',
        value: function disableEventListeners() {
            if (this.state.eventsEnabled) {
                window.cancelAnimationFrame(this.scheduleUpdate);
                this.state = removeEventListeners(this.reference, this.state);
            }
        }

        /**
         * Collection of utilities useful when writing custom modifiers
         * @memberof Popper
         */


        /**
         * List of accepted placements to use as values of the `placement` option
         * @memberof Popper
         */


        /**
         * Default Popper.js options
         * @memberof Popper
         */

    }]);
    return Popper;
}();

Popper.Utils = Utils;
Popper.placements = ['auto', 'auto-start', 'auto-end', 'top', 'top-start', 'top-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end'];
Popper.Defaults = DEFAULTS;

return Popper;

})));
//# sourceMappingURL=popper.es5.js.map


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = __webpack_require__(22);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'VkTableColumn',
  extends: _core2.default,
  props: {
    header: {
      type: String
    },
    headerClass: {
      type: String
    },

    cell: {
      type: String
    },
    cellClass: {
      type: String
    }
  }
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(1);

var _core = __webpack_require__(22);

var _core2 = _interopRequireDefault(_core);

var _checkbox = __webpack_require__(90);

var _checkbox2 = _interopRequireDefault(_checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'VkTableColumnSelect',
  extends: _core2.default,
  props: {
    trackBy: {
      type: String
    },
    selection: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    headerClass: {
      type: String
    },
    cellClass: {
      type: String
    }
  },
  created: function created() {
    var _this = this;

    this.$parent.$on('clickRow', function (row) {
      _this.$emit('selectRow', _this.getRowId(row), row);
    });
  },

  methods: {
    getRowId: function getRowId(row) {
      if (_util.warn && this.trackBy && row[this.trackBy] === undefined) {
        (0, _util.warn)('VkTable - The selection of the rows could fail as some\n          data rows are missing the trackBy field.');
      }
      return this.trackBy ? row[this.trackBy] : this.$parent.data.indexOf(row);
    },
    isAllSelected: function isAllSelected() {
      var _this2 = this;

      return this.$parent.data.length && this.$parent.data.every(function (row) {
        return _this2.isSelected(row);
      });
    },
    isSelected: function isSelected(row) {
      return this.selection[this.getRowId(row)];
    }
  },
  headerRender: function headerRender(h) {
    var _this3 = this;

    var _parent = this.$parent;
    var scopedSlot = this.$scopedSlots && this.$scopedSlots.header;
    return h(
      'th',
      { staticClass: this.headerClass, 'class': 'uk-form uk-text-center vk-table-width-minimum' },
      [scopedSlot ? scopedSlot() : h(_checkbox2.default, {
        props: {
          checked: this.isAllSelected()
        },
        on: {
          click: function click(e) {
            _this3.$emit('selectAll', _parent.data.map(function (row) {
              return _this3.getRowId(row);
            }), _parent.data);
          }
        }
      })]
    );
  },
  cellRender: function cellRender(h, _ref) {
    var _this4 = this;

    var row = _ref.row;

    var scopedSlot = this.$scopedSlots && this.$scopedSlots.cell;
    return h(
      'td',
      { staticClass: this.cellClass, 'class': 'uk-form uk-text-center vk-table-width-minimum' },
      [scopedSlot ? scopedSlot({ rowId: this.getRowId(row), row: row }) : h(_checkbox2.default, {
        props: {
          checked: this.isSelected(row)
        },
        on: {
          click: function click(e) {
            _this4.$emit('select', _this4.getRowId(row), row);
          }
        }
      })]
    );
  }
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = __webpack_require__(22);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function processSortOrder(sortBy, sortedBy) {
  var newOrder = {};

  if (sortedBy[sortBy]) {
    newOrder[sortBy] = sortedBy[sortBy] === 'asc' ? 'desc' : 'asc';
  } else {
    newOrder[sortBy] = 'asc';
  }
  return newOrder;
}

exports.default = {
  name: 'VkTableColumnSort',
  extends: _core2.default,
  props: {
    sortBy: {
      type: String
    },

    header: {
      type: String
    },
    headerClass: {
      type: String
    },

    cell: {
      type: String
    },
    cellClass: {
      type: String
    }
  },
  headerRender: function headerRender(h) {
    var scopedSlot = this.$scopedSlots && this.$scopedSlots.header;
    var Table = this.$parent;
    var orderedBy = Table.sortedBy[this.cell];
    var sortBy = this.sortBy || this.cell;
    return h(
      'th',
      { staticClass: this.headerClass, 'class': ['uk-visible-hover-inline vk-table-order', { 'uk-active': orderedBy }], on: {
          'click': function click(e) {
            Table.$emit('sort', processSortOrder(sortBy, Table.sortedBy));
          }
        }
      },
      [scopedSlot ? scopedSlot() : h(
        'span',
        { 'class': 'uk-position-relative' },
        [this.header, h(
          'i',
          { staticClass: 'uk-icon-justify uk-margin-small-left', 'class': {
              'uk-invisible': !orderedBy,
              'vk-icon-arrow-down': orderedBy === 'asc' || orderedBy === undefined,
              'vk-icon-arrow-up': orderedBy === 'desc'
            } },
          []
        )]
      )]
    );
  }
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'VkTable',
  render: function render(h) {
    var _this = this;

    return h(
      'table',
      { staticClass: 'uk-table', 'class': {
          'uk-table-striped': this.striped,
          'uk-table-condensed': this.condensed,
          'uk-table-hover': this.hover
        } },
      [this.$slots.default, h(
        'thead',
        null,
        [h(
          'tr',
          null,
          [this._l(this.columns, function (col) {
            return col._headerRender && col._headerRender.call(col._renderProxy, h);
          })]
        )]
      ), h(
        'tbody',
        null,
        [this._l(this.data, function (row, rowIndex) {
          return h(
            'tr',
            { 'class': _this.getRowClass(row, rowIndex), on: {
                'click': function click(e) {
                  if (e.target.tagName === 'TR' || e.target.tagName === 'TD') {
                    _this.$emit('clickRow', row);
                  }
                }
              }
            },
            [_this._l(_this.columns, function (col) {
              return col._cellRender && col._cellRender.call(col._renderProxy, h, { row: row, rowIndex: rowIndex });
            })]
          );
        })]
      )]
    );
  },

  props: {
    data: {
      type: Array,
      required: true
    },
    condensed: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    },
    sortedBy: {
      type: Object,
      default: function _default() {
        return {};
      } },
    rowClass: [String, Function]
  },
  data: function data() {
    return {
      columns: []
    };
  },
  created: function created() {
    this.columns = this.$children;
  },

  methods: {
    getRowClass: function getRowClass(row, index) {
      return typeof this.rowClass === 'function' ? this.rowClass(row, index) : this.rowClass;
    }
  }
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(119), __esModule: true };

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(91)

/* template */
var __vue_template__ = __webpack_require__(201)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/repos/vuikit/vuikit/src/Breadcrumb/Breadcrumb.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e78be416", __vue_options__)
  } else {
    hotAPI.reload("data-v-e78be416", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] Breadcrumb.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(92)

/* template */
var __vue_template__ = __webpack_require__(198)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/repos/vuikit/vuikit/src/Breadcrumb/Item.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7e537c85", __vue_options__)
  } else {
    hotAPI.reload("data-v-7e537c85", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] Item.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(93)

/* template */
var __vue_template__ = __webpack_require__(200)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/repos/vuikit/vuikit/src/Button.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ac4e6548", __vue_options__)
  } else {
    hotAPI.reload("data-v-ac4e6548", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] Button.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(94)

/* template */
var __vue_template__ = __webpack_require__(191)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/repos/vuikit/vuikit/src/ButtonCheckbox.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-32bec082", __vue_options__)
  } else {
    hotAPI.reload("data-v-32bec082", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] ButtonCheckbox.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(95)

/* template */
var __vue_template__ = __webpack_require__(186)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/repos/vuikit/vuikit/src/ButtonRadio.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-098070af", __vue_options__)
  } else {
    hotAPI.reload("data-v-098070af", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] ButtonRadio.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(96)

/* template */
var __vue_template__ = __webpack_require__(192)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/repos/vuikit/vuikit/src/Datepicker/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-468ab7e9", __vue_options__)
  } else {
    hotAPI.reload("data-v-468ab7e9", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] index.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(97)

/* template */
var __vue_template__ = __webpack_require__(187)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/repos/vuikit/vuikit/src/Dropdown.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0b49863b", __vue_options__)
  } else {
    hotAPI.reload("data-v-0b49863b", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] Dropdown.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(98)

/* template */
var __vue_template__ = __webpack_require__(194)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/repos/vuikit/vuikit/src/Modal.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5481d7f3", __vue_options__)
  } else {
    hotAPI.reload("data-v-5481d7f3", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] Modal.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(99)

/* template */
var __vue_template__ = __webpack_require__(193)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/repos/vuikit/vuikit/src/Notify.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4f0a59f3", __vue_options__)
  } else {
    hotAPI.reload("data-v-4f0a59f3", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] Notify.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(100)

/* template */
var __vue_template__ = __webpack_require__(202)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/repos/vuikit/vuikit/src/NotifyMessage.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-eb692978", __vue_options__)
  } else {
    hotAPI.reload("data-v-eb692978", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] NotifyMessage.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(101)

/* template */
var __vue_template__ = __webpack_require__(190)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/repos/vuikit/vuikit/src/Offcanvas.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3157accd", __vue_options__)
  } else {
    hotAPI.reload("data-v-3157accd", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] Offcanvas.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(102)

/* template */
var __vue_template__ = __webpack_require__(197)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/repos/vuikit/vuikit/src/Pagination.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6c3cd0c4", __vue_options__)
  } else {
    hotAPI.reload("data-v-6c3cd0c4", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] Pagination.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(103)

/* template */
var __vue_template__ = __webpack_require__(195)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/repos/vuikit/vuikit/src/Subnav/Item.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5f0ea6b6", __vue_options__)
  } else {
    hotAPI.reload("data-v-5f0ea6b6", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] Item.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(104)

/* template */
var __vue_template__ = __webpack_require__(185)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/repos/vuikit/vuikit/src/Subnav/Subnav.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-084cd5f5", __vue_options__)
  } else {
    hotAPI.reload("data-v-084cd5f5", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] Subnav.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(105)

/* template */
var __vue_template__ = __webpack_require__(199)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/repos/vuikit/vuikit/src/Tabs/Tab.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-87a76be4", __vue_options__)
  } else {
    hotAPI.reload("data-v-87a76be4", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] Tab.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(106)

/* template */
var __vue_template__ = __webpack_require__(196)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/repos/vuikit/vuikit/src/Tabs/Tabs.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-65eece56", __vue_options__)
  } else {
    hotAPI.reload("data-v-65eece56", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] Tabs.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(107)

/* template */
var __vue_template__ = __webpack_require__(188)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/repos/vuikit/vuikit/src/Tabs/TabsVertical.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-238c1c6b", __vue_options__)
  } else {
    hotAPI.reload("data-v-238c1c6b", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] TabsVertical.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(108)

/* template */
var __vue_template__ = __webpack_require__(189)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/repos/vuikit/vuikit/src/Tooltip.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2eb57ec9", __vue_options__)
  } else {
    hotAPI.reload("data-v-2eb57ec9", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] Tooltip.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(109)

/* template */
var __vue_template__ = __webpack_require__(203)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/repos/vuikit/vuikit/src/Upload.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f40696aa", __vue_options__)
  } else {
    hotAPI.reload("data-v-f40696aa", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] Upload.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    year: (0, _get_year2.default)(Date.now()),
    month: (0, _get_month2.default)(Date.now()),
    weekStartsOn: 0
  },
      year = _ref.year,
      month = _ref.month,
      weekStartsOn = _ref.weekStartsOn;

  var plain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var matrix = [];
  var date = arguments[0] instanceof Date ? arguments[0] : new Date(year, month);
  var curDate = (0, _start_of_week2.default)(date, { weekStartsOn: weekStartsOn });

  rows.forEach(function (row) {
    var week = [];
    cols.forEach(function (col) {
      if (plain) {
        week.push((0, _is_same_month2.default)(curDate, date) ? (0, _get_date2.default)(curDate) : -(0, _get_date2.default)(curDate));
      } else {
        week.push(curDate);
      }
      curDate = (0, _add_days2.default)(curDate, 1);
    });

    matrix.push(week);
  });

  return matrix;
};

var _is_same_month = __webpack_require__(59);

var _is_same_month2 = _interopRequireDefault(_is_same_month);

var _get_year = __webpack_require__(38);

var _get_year2 = _interopRequireDefault(_get_year);

var _get_month = __webpack_require__(37);

var _get_month2 = _interopRequireDefault(_get_month);

var _get_date = __webpack_require__(55);

var _get_date2 = _interopRequireDefault(_get_date);

var _add_days = __webpack_require__(36);

var _add_days2 = _interopRequireDefault(_add_days);

var _start_of_week = __webpack_require__(40);

var _start_of_week2 = _interopRequireDefault(_start_of_week);

var _util = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rows = (0, _util.range)(6);
var cols = (0, _util.range)(7);

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _difference_in_calendar_months = __webpack_require__(160);

var _difference_in_calendar_months2 = _interopRequireDefault(_difference_in_calendar_months);

var _is_before = __webpack_require__(165);

var _is_before2 = _interopRequireDefault(_is_before);

var _is_within_range = __webpack_require__(61);

var _is_within_range2 = _interopRequireDefault(_is_within_range);

var _get_year = __webpack_require__(38);

var _get_year2 = _interopRequireDefault(_get_year);

var _get_month = __webpack_require__(37);

var _get_month2 = _interopRequireDefault(_get_month);

var _add_years = __webpack_require__(157);

var _add_years2 = _interopRequireDefault(_add_years);

var _add_months = __webpack_require__(21);

var _add_months2 = _interopRequireDefault(_add_months);

var _set_year = __webpack_require__(172);

var _set_year2 = _interopRequireDefault(_set_year);

var _set_month = __webpack_require__(171);

var _set_month2 = _interopRequireDefault(_set_month);

var _util = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  functional: true,
  render: function render(h, _ref) {
    var vm = _ref.parent;

    return h(
      'div',
      { 'class': 'uk-datepicker-heading' },
      [h(Select, {
        props: {
          value: (0, _get_month2.default)(vm.date),
          options: getMonthsRange(vm.minPickableDate, vm.maxPickableDate).filter(function (month) {
            return (0, _is_within_range2.default)((0, _set_month2.default)(vm.date, month), vm.minPickableDate, vm.maxPickableDate);
          }).map(function (month) {
            return {
              text: vm.format((0, _set_month2.default)(vm.date, month), 'MMMM'),
              value: month
            };
          }),
          onChange: function onChange(e) {
            var selectedMonth = e.target.selectedOptions[0].value;
            vm.$emit('change', (0, _set_month2.default)(vm.date, selectedMonth));
          }
        }
      }, [vm.format(vm.date, 'MMMM')]), '\xA0', h(Select, {
        props: {
          value: (0, _get_year2.default)(vm.date),
          options: getYearsRange(vm.minPickableDate, vm.maxPickableDate).filter(function (year) {
            return (0, _is_within_range2.default)((0, _set_year2.default)(vm.date, year), vm.minPickableDate, vm.maxPickableDate);
          }).map(function (year) {
            return { text: year, value: year };
          }),
          onChange: function onChange(e) {
            var selectedYear = e.target.selectedOptions[0].value;
            vm.$emit('change', (0, _set_year2.default)(vm.date, selectedYear));
          }
        }
      }, (0, _get_year2.default)(vm.date))]
    );
  }
};


var Select = {
  functional: true,
  props: ['value', 'options', 'onChange'],
  render: function render(h, _ref2) {
    var props = _ref2.props,
        children = _ref2.children;
    var options = props.options,
        value = props.value,
        onChange = props.onChange;

    if (options.length > 1) {
      return h(
        'span',
        { 'class': 'uk-form-select' },
        [h(
          'a',
          {
            on: {
              'click': function click(e) {
                return e.preventDefault();
              }
            }
          },
          [children, h('select', {
            domProps: {
              value: value
            },
            on: {
              change: onChange
            }
          }, options.map(function (option) {
            return h('option', { domProps: {
                value: option.value
              } }, [option.text]);
          }))]
        )]
      );
    } else {
      return children;
    }
  }
};

function getYearsRange(startDate, endDate) {
  var years = [];
  var curDate = startDate;
  while ((0, _is_before2.default)(curDate, endDate)) {
    years.push((0, _get_year2.default)(curDate));
    curDate = (0, _add_years2.default)(curDate, 1);
  }
  return years;
}

function getMonthsRange(startDate, endDate) {
  var months = [];

  if ((0, _difference_in_calendar_months2.default)(endDate, startDate) >= 12) {
    (0, _util.range)(12).forEach(function (month) {
      months.push(month);
    });
  } else {
    var curDate = startDate;
    while ((0, _is_before2.default)(curDate, endDate)) {
      months.push((0, _get_month2.default)(curDate));
      curDate = (0, _add_months2.default)(curDate, 1);
    }
  }
  return months;
}

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(23);

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  functional: true,
  props: ['checked'],
  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props;

    return h('input', (0, _extends3.default)({}, data, {
      attrs: {
        type: 'checkbox'
      },
      domProps: {
        checked: props.checked
      },
      on: (0, _extends3.default)({}, data.on, {
        change: function change(e) {
          e.target.checked = props.checked;
        }
      })
    }));
  }
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'VkBreadcrumb',
  props: {
    location: {
      type: String,
      default: '/'
    }
  },
  computed: {
    items: {
      get: function get() {
        return this.$slots.default.filter(function (c) {
          return c.componentOptions && c.componentOptions.tag === 'vk-breadcrumb-item';
        });
      },

      cache: false
    }
  },
  beforeMount: function beforeMount() {
    this.updateItems();
  },
  beforeUpdate: function beforeUpdate() {
    this.updateItems();
  },

  methods: {
    updateItems: function updateItems() {
      var _this = this;

      this.items.forEach(function (item) {
        var props = item.componentOptions.propsData;
        props.active = _this.location === props.path;
      });
    }
  }
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'VkBreadcrumbItem',
  props: {
    label: String,
    path: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'VkButton',
  props: {
    value: {},
    type: {
      type: String,
      default: 'button'
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    }
  }
};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(1);

var _component = __webpack_require__(41);

exports.default = {
  name: 'VkButtonCheckbox',
  props: {
    value: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    group: {
      type: Boolean,
      default: true
    }
  },
  beforeMount: function beforeMount() {
    this.updateButtonsState();
  },
  beforeUpdate: function beforeUpdate() {
    this.updateButtonsState();
  },
  mounted: function mounted() {
    var _this = this;

    (0, _util.each)(this.$children, function (button) {
      button.$on('click', function () {
        return _this.toggle(button);
      });
    });
  },

  methods: {
    updateButtonsState: function updateButtonsState() {
      var _this2 = this;

      (0, _util.each)((0, _component.filterByTag)(this.$slots.default, 'vk-button'), function (component) {
        var props = (0, _component.getProps)(component);
        props.active = (0, _util.inArray)(_this2.value, props.value);
      });
    },
    toggle: function toggle(selected) {
      var value = this.$children.filter(function (button) {
        return button === selected ? !button.active : button.active;
      }).map(function (button) {
        return button.value;
      });
      this.$emit('change', value);
    }
  }
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(1);

var _component = __webpack_require__(41);

exports.default = {
  name: 'VkButtonRadio',
  props: {
    value: {},
    group: {
      type: Boolean,
      default: true
    }
  },
  beforeMount: function beforeMount() {
    this.updateButtonsState();
  },
  beforeUpdate: function beforeUpdate() {
    this.updateButtonsState();
  },
  mounted: function mounted() {
    var _this = this;

    (0, _util.each)(this.$children, function (button) {
      button.$on('click', function () {
        return _this.$emit('change', button.value);
      });
    });
  },

  methods: {
    updateButtonsState: function updateButtonsState() {
      var _this2 = this;

      (0, _util.each)((0, _component.filterByTag)(this.$slots.default, 'vk-button'), function (component) {
        var props = (0, _component.getProps)(component);
        props.active = props.value === _this2.value;
      });
    }
  }
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(114);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _dateMatrix = __webpack_require__(88);

var _dateMatrix2 = _interopRequireDefault(_dateMatrix);

var _get_year = __webpack_require__(38);

var _get_year2 = _interopRequireDefault(_get_year);

var _get_month = __webpack_require__(37);

var _get_month2 = _interopRequireDefault(_get_month);

var _get_date = __webpack_require__(55);

var _get_date2 = _interopRequireDefault(_get_date);

var _is_same_month = __webpack_require__(59);

var _is_same_month2 = _interopRequireDefault(_is_same_month);

var _is_same_day = __webpack_require__(166);

var _is_same_day2 = _interopRequireDefault(_is_same_day);

var _is_within_range = __webpack_require__(61);

var _is_within_range2 = _interopRequireDefault(_is_within_range);

var _is_valid = __webpack_require__(60);

var _is_valid2 = _interopRequireDefault(_is_valid);

var _are_ranges_overlapping = __webpack_require__(158);

var _are_ranges_overlapping2 = _interopRequireDefault(_are_ranges_overlapping);

var _start_of_month = __webpack_require__(174);

var _start_of_month2 = _interopRequireDefault(_start_of_month);

var _start_of_week = __webpack_require__(40);

var _start_of_week2 = _interopRequireDefault(_start_of_week);

var _end_of_month = __webpack_require__(161);

var _end_of_month2 = _interopRequireDefault(_end_of_month);

var _add_months = __webpack_require__(21);

var _add_months2 = _interopRequireDefault(_add_months);

var _add_days = __webpack_require__(36);

var _add_days2 = _interopRequireDefault(_add_days);

var _sub_months = __webpack_require__(177);

var _sub_months2 = _interopRequireDefault(_sub_months);

var _sub_days = __webpack_require__(176);

var _sub_days2 = _interopRequireDefault(_sub_days);

var _format2 = __webpack_require__(162);

var _format3 = _interopRequireDefault(_format2);

var _parse = __webpack_require__(0);

var _parse2 = _interopRequireDefault(_parse);

var _Header = __webpack_require__(89);

var _Header2 = _interopRequireDefault(_Header);

var _util = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'VkDatepicker',
  components: {
    PickerHeader: _Header2.default
  },
  props: {
    date: {
      type: [Date, String, Number],
      default: function _default() {
        return Date.now();
      },
      validator: function validator(date) {
        return (0, _is_valid2.default)((0, _parse2.default)(date));
      }
    },

    weekStartsOn: {
      type: Number,
      default: 0
    },
    locale: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    pickedDates: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    disabledDates: {
      type: Array,
      default: function _default() {
        return [];
      }
    },

    minDate: {
      type: [Date, String, Number],
      default: '1980-01-01',
      validator: function validator(date) {
        return (0, _util.isInteger)(date) ? true : (0, _is_valid2.default)((0, _parse2.default)(date));
      }
    },
    maxDate: {
      type: [Date, String, Number],
      default: '2050-12-31',
      validator: function validator(date) {
        return (0, _util.isInteger)(date) ? true : (0, _is_valid2.default)((0, _parse2.default)(date));
      }
    }
  },
  computed: {
    matrix: function matrix() {
      return (0, _dateMatrix2.default)({
        year: (0, _get_year2.default)(this.date),
        month: (0, _get_month2.default)(this.date),
        weekStartsOn: this.weekStartsOn
      });
    },
    prevMonth: function prevMonth() {
      return this.format((0, _sub_months2.default)(this.date, 1), 'YYYY-MM');
    },
    nextMonth: function nextMonth() {
      return this.format((0, _add_months2.default)(this.date, 1), 'YYYY-MM');
    },
    minPickableDate: function minPickableDate() {
      return (0, _util.isInteger)(this.minDate) ? (0, _sub_days2.default)(Date.now(), this.minDate + 1) : this.minDate;
    },
    maxPickableDate: function maxPickableDate() {
      return (0, _util.isInteger)(this.maxDate) ? (0, _add_days2.default)(Date.now(), this.maxDate) : this.maxDate;
    },
    weekDays: function weekDays() {
      var startDay = (0, _start_of_week2.default)(this.date, { weekStartsOn: this.weekStartsOn });
      return (0, _util.range)(7).map(function (val, index) {
        return (0, _add_days2.default)(startDay, index);
      });
    }
  },
  methods: {
    triggerChangeEvent: function triggerChangeEvent(newDate) {
      this.$emit('change', {
        date: newDate,
        format: this.format
      });
    },
    triggerPickEvent: function triggerPickEvent(pickedDate) {
      var dirtyPickedDays = [].concat((0, _toConsumableArray3.default)(this.pickedDates), [pickedDate]);
      this.$emit('pick', {
        date: pickedDate,
        dates: dirtyPickedDays,
        format: this.format
      });
    },
    triggerUnpickEvent: function triggerUnpickEvent(unpickedDate) {
      var dirtyPickedDays = [].concat((0, _toConsumableArray3.default)(this.pickedDates));
      var index = dirtyPickedDays.findIndex(function (d) {
        return (0, _get_date2.default)(d) === (0, _get_date2.default)(unpickedDate);
      });
      dirtyPickedDays.splice(index, 1);
      this.$emit('unpick', {
        date: (0, _parse2.default)(unpickedDate),
        dates: dirtyPickedDays,
        format: this.format
      });
    },
    isCurrentMonth: function isCurrentMonth(date) {
      return (0, _is_same_month2.default)(this.date, date);
    },
    isPicked: function isPicked(date) {
      return this.pickedDates.some(function (d) {
        return (0, _is_same_day2.default)(d, date);
      });
    },
    isDisabled: function isDisabled(date) {
      return this.disabledDates.some(function (d) {
        return (0, _is_same_day2.default)(d, date);
      }) || !(0, _is_within_range2.default)(date, this.minPickableDate, this.maxPickableDate);
    },
    isMonthDisplayable: function isMonthDisplayable(date) {
      return (0, _are_ranges_overlapping2.default)((0, _start_of_month2.default)(date), (0, _end_of_month2.default)(date), this.minPickableDate, this.maxPickableDate);
    },
    format: function format(date, _format) {
      return (0, _format3.default)(date, _format, { locale: this.locale });
    }
  }
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _popper = __webpack_require__(63);

var _popper2 = _interopRequireDefault(_popper);

var _dom = __webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onClick = void 0;
var onTargetClick = void 0;
var onTargetMouseenter = void 0;
var onTargetMouseleave = void 0;

exports.default = {
  name: 'VkDropdown',
  props: {
    target: null,
    show: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'bottom-start' },
    modifiers: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    transition: {
      type: [String, Boolean],
      default: 'vk-dropdown-transition'
    },
    blank: {
      type: Boolean,
      default: false
    },
    expand: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      flipped: false
    };
  },
  computed: {
    targetElement: function targetElement() {
      return this.target || this.$options._parentElm;
    }
  },
  beforeUpdate: function beforeUpdate() {
    this.$popper.options.placement = this.placement;
    this.$popper.update();
  },
  mounted: function mounted() {
    var _this = this;

    document.body.appendChild(this.$el);

    this.$popper = new _popper2.default(this.targetElement, this.$el, {
      placement: this.placement,
      modifiers: this.modifiers,
      onCreate: function onCreate(data) {
        _this.flipped = data.flipped;
      },
      onUpdate: function onUpdate(data) {
        _this.flipped = data.flipped;
      }
    });

    onTargetClick = function onTargetClick(e) {
      _this.$emit('targetClick', e);
    };

    onTargetMouseenter = function onTargetMouseenter(e) {
      if (_this.targetElement.contains(e.fromElement)) {
        return;
      }
      _this.$emit('targetMouseenter', e);
    };

    onTargetMouseleave = function onTargetMouseleave(e) {
      if (e.relatedTarget === _this.targetElement || _this.targetElement.contains(e.relatedTarget)) {
        return;
      }
      _this.$emit('targetMouseleave', e);
    };

    onClick = function onClick(e) {
      if (_this.show) {
        if (e.target === _this.targetElement || _this.targetElement.contains(e.target)) {
          return;
        }

        if (e.target === _this.$el || _this.$el.contains(e.target)) {
          _this.$emit('clickIn', e);
        } else {
          _this.$emit('clickOut', e);
        }
      }
    };

    (0, _dom.on)(this.targetElement, 'mouseenter', onTargetMouseenter, this._uid);
    (0, _dom.on)(this.targetElement, 'mouseleave', onTargetMouseleave, this._uid);
    (0, _dom.on)(this.targetElement, 'click', onTargetClick, this._uid);
    (0, _dom.on)(document, 'click', onClick, this._uid);
    if ('ontouchstart' in document.documentElement) {
      (0, _dom.on)(document, 'touchstart', onClick, this._uid);
    }
  },

  methods: {
    remove: function remove() {
      if (this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    (0, _dom.offAll)(this._uid);
    this.remove();
  }
};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debounce2 = __webpack_require__(180);

var _debounce3 = _interopRequireDefault(_debounce2);

var _dom = __webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var html = document.documentElement;
var body = document.body;
var lngDir = html.getAttribute('dir') === 'rtl' ? 'right' : 'left';
var paddingDir = 'padding-' + (lngDir === 'left' ? 'right' : 'left');

var active = void 0;
var activeCount = void 0;

var events = ['resize', 'orientationchange'];
for (var i = 0; i < events.length; ++i) {
  (0, _dom.on)(window, events[i], (0, _debounce3.default)(function (e) {
    return active && active.resize();
  }, 150));
}

(0, _dom.on)(document, 'keyup', function (e) {
  if (active && e.keyCode === 27) {
    e.preventDefault();
    active.$emit('keyEsc');
  }
});

exports.default = {
  name: 'VkModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    lightbox: {
      type: Boolean,
      default: false
    },
    blank: {
      type: Boolean,
      default: false
    },
    transition: {
      type: [String, Boolean],
      default: 'vk-modal-transition'
    }
  },
  mounted: function mounted() {
    var _this = this;

    var clickHandler = function clickHandler(event) {
      var dialog = _this.$refs.dialog;

      if (event.target === dialog || dialog.contains(event.target)) {
        _this.$emit('clickIn', event);
      } else {
        _this.$emit('clickOut', event);
      }
    };

    (0, _dom.on)(this.$el, 'click', clickHandler, this._uid);
    if ('ontouchstart' in document.documentElement) {
      (0, _dom.on)(this.$el, 'touchstart', clickHandler, this._uid);
    }

    if (this.show) {
      this.beforeEnter();
      this.afterEnter();
    }

    document.body.appendChild(this.$el);
  },
  beforeDestroy: function beforeDestroy() {
    (0, _dom.offAll)(this._uid);
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },

  methods: {
    beforeEnter: function beforeEnter() {
      var _this2 = this;

      this.$nextTick(function () {
        (0, _dom.addClass)(html, 'uk-modal-page');
        _this2.resize();
      });
    },
    afterEnter: function afterEnter() {
      if (active) {
        active.$emit('inactive');
      }

      active = this;
      activeCount++;
    },
    afterLeave: function afterLeave() {
      activeCount--;

      if (!activeCount) {
        (0, _dom.removeClass)(html, 'uk-modal-page');
        body.style[paddingDir] = '';
      }
      if (active === this) {
        active = null;
      }
    },
    resize: function resize() {
      var bodyWidth = body.offsetWidth;
      var dialog = this.$refs.dialog;
      var scrollbarWidth = window.innerWidth - bodyWidth;
      body.style[paddingDir] = scrollbarWidth;
      this.$el.style['overflow-y'] = scrollbarWidth ? 'scroll' : 'auto';
      if (this.center) {
        var dh = dialog.offsetHeight;
        var marginTop = (0, _dom.css)(dialog, 'margin-top');
        var marginBottom = (0, _dom.css)(dialog, 'margin-bottom');
        var pad = parseInt(marginTop, 10) + parseInt(marginBottom, 10);
        if (dh + pad < window.innerHeight) {
          var top = window.innerHeight / 2 - dh / 2 - pad;
          dialog.style.top = top + 'px';
        } else {
          dialog.style.top = '';
        }
      } else {
        dialog.style.top = '';
      }
    }
  }
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'VkNotify',
  props: {
    placement: {
      type: String,
      default: 'top-center' }
  },
  mounted: function mounted() {
    document.body.appendChild(this.$el);
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$el.parentNode) {
      document.body.removeChild(this.$el);
    }
  }
};

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'VkNotifyMessage',
  props: {
    id: {
      type: [Number, String, Object],
      default: 0
    },
    status: {
      type: String,
      default: '' },
    timeout: {
      type: Number,
      default: 5000
    },
    transition: {
      type: String,
      default: ''
    }
  },
  computed: {
    statusClass: function statusClass() {
      return 'uk-notify-message-' + this.status.replace('info', 'primary');
    }
  },
  mounted: function mounted() {
    var _this = this;

    if (this.timeout > 0) {
      setTimeout(function () {
        _this.$parent.$emit('timeout', _this.id);
      }, this.timeout);
    }
  }
};

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = __webpack_require__(17);

var html = document.documentElement;
var body = document.body;
var scrollPos = {};

exports.default = {
  name: 'VkOffcanvas',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    flip: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
      default: 'vk-offcanvas-transition'
    }
  },
  methods: {
    beforeEnter: function beforeEnter() {
      var _this = this;

      scrollPos = { x: window.pageXOffset, y: window.pageYOffset };

      this.$nextTick(function () {
        var scrollbarWidth = window.innerWidth - body.offsetWidth;
        (0, _dom.addClass)(body, 'uk-offcanvas-page');
        (0, _dom.addClass)(body, 'uk-offcanvas-page-open');
        setBodyMargin(_this.flip, _this.$refs.bar.offsetWidth);
        body.style.width = window.innerWidth - scrollbarWidth + 'px';
        body.style.height = window.innerHeight + 'px';
        body.offsetHeight;
        html.style['margin-top'] = scrollPos.y * -1 + 'px';
      });
    },
    beforeLeave: function beforeLeave() {
      (0, _dom.removeClass)(body, 'uk-offcanvas-page-open');
      body.style['margin-left'] = '';
      body.style['margin-right'] = '';
    },
    afterLeave: function afterLeave() {
      (0, _dom.removeClass)(body, 'uk-offcanvas-page');
      body.style.width = '';
      body.style.height = '';
      html.style['margin-top'] = '';
      window.scrollTo(scrollPos.x, scrollPos.y);
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    (0, _dom.on)(document, 'keyup', function (e) {
      if (_this2.show && e.keyCode === 27) {
        e.preventDefault();
        _this2.$emit('keyEsc', e);
      }
    }, this._uid);
  },
  beforeDestroy: function beforeDestroy() {
    (0, _dom.offAll)(this._uid);
  }
};


function setBodyMargin(flip, barWidth) {
  var lngDir = html.getAttribute('dir') === 'rtl' ? 'right' : 'left';
  var rtl = lngDir === 'right';
  var dir = (flip ? -1 : 1) * (rtl ? -1 : 1);
  var margin = (rtl ? -1 : 1) * (barWidth * dir);
  body.style[rtl ? 'margin-right' : 'margin-left'] = margin + 'px';
}

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(23);

var _extends3 = _interopRequireDefault(_extends2);

var _util = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'VkPagination',
  props: {
    activePage: {
      type: Number,
      default: 1
    },

    total: {
      type: Number,
      required: true
    },

    limit: {
      type: Number,
      default: 10
    },

    pageRange: {
      type: Number,
      default: 2
    },

    align: {
      type: String,
      default: ''
    },

    compact: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    prevPage: function prevPage() {
      return this.activePage - 1 !== 0 ? this.activePage - 1 : null;
    },
    nextPage: function nextPage() {
      return this.activePage + 1 <= this.totalPages ? this.activePage + 1 : null;
    },
    totalPages: function totalPages() {
      return Math.ceil(this.total / this.limit);
    },
    mainPages: function mainPages() {
      var start = this.activePage - this.pageRange;
      var end = this.activePage + this.pageRange;
      if (end > this.totalPages) {
        end = this.totalPages;
        start = this.totalPages - this.pageRange * 2;
        start = start < 1 ? 1 : start;
      }
      if (start <= 1) {
        start = 1;
        end = Math.min(this.pageRange * 2 + 1, this.totalPages);
      }
      return (0, _util.range)(start, end + 1);
    },
    prePages: function prePages() {
      return (0, _util.range)(1, this.mainPages[0] <= 3 ? this.mainPages[0] : 2);
    },
    postPages: function postPages() {
      var mainLast = this.mainPages[this.mainPages.length - 1];
      return (0, _util.range)(mainLast >= this.totalPages - 2 ? mainLast + 1 : this.totalPages, this.totalPages + 1);
    }
  },
  methods: {
    emitChange: function emitChange(changes) {
      var state = (0, _extends3.default)({
        page: this.activePage,
        total: this.total,
        limit: this.limit
      }, changes);

      state.offset = (state.page - 1) * state.limit + 1;
      state.to = Math.min(state.total, state.page * state.limit);

      this.$emit('change', state);
    }
  }
};

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'VkSubnavItem',
  props: {
    label: String,
    alias: {
      type: [String, Number],
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'VkSubnav',
  props: {
    activeItem: [String, Number],
    line: {
      type: Boolean,
      default: false
    },
    pill: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    items: {
      get: function get() {
        return this.$slots.default.filter(function (c) {
          return c.componentOptions && c.componentOptions.tag === 'vk-subnav-item';
        });
      },

      cache: false
    }
  },
  beforeMount: function beforeMount() {
    this.updateItems();
  },
  beforeUpdate: function beforeUpdate() {
    this.updateItems();
  },

  methods: {
    updateItems: function updateItems() {
      var _this = this;

      this.items.forEach(function (item, index) {
        var alias = _this.getItemAlias(item);
        var active = _this.activeItem === alias;
        var props = item.componentOptions.propsData;
        props.active = active;
        props.alias = alias;
      });
    },
    getItemAlias: function getItemAlias(item) {
      return item.componentOptions.propsData.alias || this.items.indexOf(item) + 1;
    }
  }
};

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'VkTab',
  props: {
    label: String,
    alias: {
      type: [String, Number],
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = __webpack_require__(42);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'VkTabs',
  extends: _core2.default,
  props: {
    width: {
      type: String,
      default: ''
    }
  },
  beforeMount: function beforeMount() {
    this.updateTabs();
  },
  beforeUpdate: function beforeUpdate() {
    this.updateTabs();
  },

  methods: {
    updateTabs: function updateTabs() {
      var _this = this;

      this.$slots.default.filter(function (c) {
        return c.tag;
      }).forEach(function (tab, index) {
        if (_this.width) {
          tab.data.staticClass = 'uk-width-' + _this.width;
        }
      });
    }
  }
};

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = __webpack_require__(42);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'VkTabsVertical',
  extends: _core2.default,
  props: {
    width: {
      type: String,
      default: ''
    },
    contentWidth: {
      type: String,
      default: '2-3'
    }
  }
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _popper = __webpack_require__(63);

var _popper2 = _interopRequireDefault(_popper);

var _dom = __webpack_require__(17);

var _util = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onMouseenter = void 0;
var onMouseleave = void 0;

var PLACEMENT_MIRROR = {
  top: 'bottom',
  right: 'left',
  left: 'right',
  bottom: 'top'
};

exports.default = {
  name: 'VkTooltip',
  props: {
    target: true,
    content: {
      type: String,
      default: ''
    },
    placement: {
      type: String,
      default: 'top'
    },
    modifiers: {
      type: Object,
      default: function _default() {
        return {
          offset: {
            offset: '0 5'
          }
        };
      }
    },
    transition: {
      type: String,
      default: 'vk-tooltip-transition'
    }
  },
  data: function data() {
    return {
      active: false,
      flipped: false
    };
  },
  computed: {
    placementClass: function placementClass() {
      return 'uk-tooltip-' + this.convertPlacement(this.placement, this.fixed);
    },
    targetElement: function targetElement() {
      return this.target || this.$options._parentElm;
    }
  },
  beforeUpdate: function beforeUpdate() {
    this.$popper.options.placement = this.placement;
    this.$popper.update();
  },
  mounted: function mounted() {
    var _this = this;

    this.$popper = new _popper2.default(this.targetElement, this.$el, {
      placement: this.placement,
      modifiers: this.modifiers,
      onCreate: function onCreate(data) {
        _this.flipped = data.flipped;
      },
      onUpdate: function onUpdate(data) {
        _this.flipped = data.flipped;
      }
    });

    this.remove();

    onMouseenter = function onMouseenter() {
      document.body.appendChild(_this.$el);
      _this.active = true;
      _this.$emit('show');
    };

    onMouseleave = function onMouseleave() {
      _this.active = false;
      (0, _dom.offAll)(_this.$el, _this._uid);
      _this.$emit('hide');
    };

    (0, _dom.on)(this.targetElement, 'mouseenter', onMouseenter, this._uid);
    (0, _dom.on)(this.targetElement, 'focus', onMouseenter, this._uid);
    (0, _dom.on)(this.targetElement, 'mouseleave', onMouseleave, this._uid);
    (0, _dom.on)(this.targetElement, 'blur', onMouseleave, this._uid);
  },
  beforeDestroy: function beforeDestroy() {
    if (this.targetElement) {
      (0, _dom.offAll)(this.targetElement, this._uid);
    }
    this.active = false;
    this.remove();
  },

  methods: {
    remove: function remove() {
      if (this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    },
    convertPlacement: function convertPlacement(placement) {
      var flipped = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      placement = placement.split('-');
      if (flipped) {
        placement[0] = PLACEMENT_MIRROR[placement[0]];
      }
      if (placement[1]) {
        placement[1] = placement[1].replace('start', 'left').replace('end', 'right');
      }
      return placement[1] === undefined || (0, _util.inArray)(['left', 'right'], placement[0]) ? placement[0] : placement[0] + '-' + placement[1];
    }
  }
};

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'VkUpload',
  data: function data() {
    return {
      dragged: false
    };
  },
  methods: {
    dropped: function dropped(e) {
      if (e.dataTransfer && e.dataTransfer.files) {
        e.stopPropagation();
        e.preventDefault();
        undefined.dragged = false;
        undefined.$emit('dropped', e.dataTransfer.files);
      }
    }
  }
};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(117), __esModule: true };

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(118), __esModule: true };

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(120), __esModule: true };

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(121), __esModule: true };

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(43);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(113);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(112);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(54);
__webpack_require__(147);
module.exports = __webpack_require__(3).Array.from;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(149);
module.exports = __webpack_require__(3).Number.isInteger;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(150);
module.exports = __webpack_require__(3).Object.assign;

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(151);
module.exports = __webpack_require__(3).Object.keys;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(153);
__webpack_require__(152);
__webpack_require__(154);
__webpack_require__(155);
module.exports = __webpack_require__(3).Symbol;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(54);
__webpack_require__(156);
module.exports = __webpack_require__(35).f('iterator');

/***/ }),
/* 122 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 123 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(7)
  , toLength  = __webpack_require__(53)
  , toIndex   = __webpack_require__(145);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(24)
  , TAG = __webpack_require__(2)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(6)
  , createDesc      = __webpack_require__(16);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(12)
  , gOPS    = __webpack_require__(28)
  , pIE     = __webpack_require__(18);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4).document && document.documentElement;

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(15)
  , ITERATOR   = __webpack_require__(2)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(24);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(14)
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(13);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(49)
  , descriptor     = __webpack_require__(16)
  , setToStringTag = __webpack_require__(29)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(11)(IteratorPrototype, __webpack_require__(2)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(2)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 135 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(12)
  , toIObject = __webpack_require__(7);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(20)('meta')
  , isObject = __webpack_require__(14)
  , has      = __webpack_require__(5)
  , setDesc  = __webpack_require__(6).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(10)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(12)
  , gOPS     = __webpack_require__(28)
  , pIE      = __webpack_require__(18)
  , toObject = __webpack_require__(19)
  , IObject  = __webpack_require__(47)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(10)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(6)
  , anObject = __webpack_require__(13)
  , getKeys  = __webpack_require__(12);

module.exports = __webpack_require__(8) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(18)
  , createDesc     = __webpack_require__(16)
  , toIObject      = __webpack_require__(7)
  , toPrimitive    = __webpack_require__(33)
  , has            = __webpack_require__(5)
  , IE8_DOM_DEFINE = __webpack_require__(46)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(8) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(7)
  , gOPN      = __webpack_require__(50).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(5)
  , toObject    = __webpack_require__(19)
  , IE_PROTO    = __webpack_require__(30)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(9)
  , core    = __webpack_require__(3)
  , fails   = __webpack_require__(10);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(32)
  , defined   = __webpack_require__(25);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(32)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(125)
  , ITERATOR  = __webpack_require__(2)('iterator')
  , Iterators = __webpack_require__(15);
module.exports = __webpack_require__(3).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(44)
  , $export        = __webpack_require__(9)
  , toObject       = __webpack_require__(19)
  , call           = __webpack_require__(132)
  , isArrayIter    = __webpack_require__(129)
  , toLength       = __webpack_require__(53)
  , createProperty = __webpack_require__(126)
  , getIterFn      = __webpack_require__(146);

$export($export.S + $export.F * !__webpack_require__(134)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(123)
  , step             = __webpack_require__(135)
  , Iterators        = __webpack_require__(15)
  , toIObject        = __webpack_require__(7);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(48)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(9);

$export($export.S, 'Number', {isInteger: __webpack_require__(131)});

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(9);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(138)});

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(19)
  , $keys    = __webpack_require__(12);

__webpack_require__(143)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 152 */
/***/ (function(module, exports) {



/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(4)
  , has            = __webpack_require__(5)
  , DESCRIPTORS    = __webpack_require__(8)
  , $export        = __webpack_require__(9)
  , redefine       = __webpack_require__(52)
  , META           = __webpack_require__(137).KEY
  , $fails         = __webpack_require__(10)
  , shared         = __webpack_require__(31)
  , setToStringTag = __webpack_require__(29)
  , uid            = __webpack_require__(20)
  , wks            = __webpack_require__(2)
  , wksExt         = __webpack_require__(35)
  , wksDefine      = __webpack_require__(34)
  , keyOf          = __webpack_require__(136)
  , enumKeys       = __webpack_require__(127)
  , isArray        = __webpack_require__(130)
  , anObject       = __webpack_require__(13)
  , toIObject      = __webpack_require__(7)
  , toPrimitive    = __webpack_require__(33)
  , createDesc     = __webpack_require__(16)
  , _create        = __webpack_require__(49)
  , gOPNExt        = __webpack_require__(141)
  , $GOPD          = __webpack_require__(140)
  , $DP            = __webpack_require__(6)
  , $keys          = __webpack_require__(12)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(50).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(18).f  = $propertyIsEnumerable;
  __webpack_require__(28).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(27)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(11)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34)('asyncIterator');

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34)('observable');

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(148);
var global        = __webpack_require__(4)
  , hide          = __webpack_require__(11)
  , Iterators     = __webpack_require__(15)
  , TO_STRING_TAG = __webpack_require__(2)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

var addMonths = __webpack_require__(21)

/**
 * @category Year Helpers
 * @summary Add the specified number of years to the given date.
 *
 * @description
 * Add the specified number of years to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of years to be added
 * @returns {Date} the new date with the years added
 *
 * @example
 * // Add 5 years to 1 September 2014:
 * var result = addYears(new Date(2014, 8, 1), 5)
 * //=> Sun Sep 01 2019 00:00:00
 */
function addYears (dirtyDate, amount) {
  return addMonths(dirtyDate, amount * 12)
}

module.exports = addYears


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Range Helpers
 * @summary Is the given date range overlapping with another date range?
 *
 * @description
 * Is the given date range overlapping with another date range?
 *
 * @param {Date|String|Number} initialRangeStartDate - the start of the initial range
 * @param {Date|String|Number} initialRangeEndDate - the end of the initial range
 * @param {Date|String|Number} comparedRangeStartDate - the start of the range to compare it with
 * @param {Date|String|Number} comparedRangeEndDate - the end of the range to compare it with
 * @returns {Boolean} whether the date ranges are overlapping
 * @throws {Error} startDate of a date range cannot be after its endDate
 *
 * @example
 * // For overlapping date ranges:
 * areRangesOverlapping(
 *   new Date(2014, 0, 10), new Date(2014, 0, 20), new Date(2014, 0, 17), new Date(2014, 0, 21)
 * )
 * //=> true
 *
 * @example
 * // For non-overlapping date ranges:
 * areRangesOverlapping(
 *   new Date(2014, 0, 10), new Date(2014, 0, 20), new Date(2014, 0, 21), new Date(2014, 0, 22)
 * )
 * //=> false
 */
function areRangesOverlapping (dirtyInitialRangeStartDate, dirtyInitialRangeEndDate, dirtyComparedRangeStartDate, dirtyComparedRangeEndDate) {
  var initialStartTime = parse(dirtyInitialRangeStartDate).getTime()
  var initialEndTime = parse(dirtyInitialRangeEndDate).getTime()
  var comparedStartTime = parse(dirtyComparedRangeStartDate).getTime()
  var comparedEndTime = parse(dirtyComparedRangeEndDate).getTime()

  if (initialStartTime > initialEndTime || comparedStartTime > comparedEndTime) {
    throw new Error('The start of the range cannot be after the end of the range')
  }

  return initialStartTime < comparedEndTime && comparedStartTime < initialEndTime
}

module.exports = areRangesOverlapping


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

var startOfDay = __webpack_require__(62)

var MILLISECONDS_IN_MINUTE = 60000
var MILLISECONDS_IN_DAY = 86400000

/**
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar days
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * var result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 */
function differenceInCalendarDays (dirtyDateLeft, dirtyDateRight) {
  var startOfDayLeft = startOfDay(dirtyDateLeft)
  var startOfDayRight = startOfDay(dirtyDateRight)

  var timestampLeft = startOfDayLeft.getTime() -
    startOfDayLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE
  var timestampRight = startOfDayRight.getTime() -
    startOfDayRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a day is not constant
  // (e.g. it's different in the day of the daylight saving time clock shift)
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY)
}

module.exports = differenceInCalendarDays


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Month Helpers
 * @summary Get the number of calendar months between the given dates.
 *
 * @description
 * Get the number of calendar months between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar months
 *
 * @example
 * // How many calendar months are between 31 January 2014 and 1 September 2014?
 * var result = differenceInCalendarMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 8
 */
function differenceInCalendarMonths (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft)
  var dateRight = parse(dirtyDateRight)

  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear()
  var monthDiff = dateLeft.getMonth() - dateRight.getMonth()

  return yearDiff * 12 + monthDiff
}

module.exports = differenceInCalendarMonths


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Month Helpers
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the end of a month
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * var result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
function endOfMonth (dirtyDate) {
  var date = parse(dirtyDate)
  var month = date.getMonth()
  date.setFullYear(date.getFullYear(), month + 1, 0)
  date.setHours(23, 59, 59, 999)
  return date
}

module.exports = endOfMonth


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var getDayOfYear = __webpack_require__(163)
var getISOWeek = __webpack_require__(164)
var getISOYear = __webpack_require__(57)
var parse = __webpack_require__(0)
var isValid = __webpack_require__(60)
var enLocale = __webpack_require__(170)

/**
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format.
 *
 * Accepted tokens:
 * | Unit                    | Token | Result examples                  |
 * |-------------------------|-------|----------------------------------|
 * | Month                   | M     | 1, 2, ..., 12                    |
 * |                         | Mo    | 1st, 2nd, ..., 12th              |
 * |                         | MM    | 01, 02, ..., 12                  |
 * |                         | MMM   | Jan, Feb, ..., Dec               |
 * |                         | MMMM  | January, February, ..., December |
 * | Quarter                 | Q     | 1, 2, 3, 4                       |
 * |                         | Qo    | 1st, 2nd, 3rd, 4th               |
 * | Day of month            | D     | 1, 2, ..., 31                    |
 * |                         | Do    | 1st, 2nd, ..., 31st              |
 * |                         | DD    | 01, 02, ..., 31                  |
 * | Day of year             | DDD   | 1, 2, ..., 366                   |
 * |                         | DDDo  | 1st, 2nd, ..., 366th             |
 * |                         | DDDD  | 001, 002, ..., 366               |
 * | Day of week             | d     | 0, 1, ..., 6                     |
 * |                         | do    | 0th, 1st, ..., 6th               |
 * |                         | dd    | Su, Mo, ..., Sa                  |
 * |                         | ddd   | Sun, Mon, ..., Sat               |
 * |                         | dddd  | Sunday, Monday, ..., Saturday    |
 * | Day of ISO week         | E     | 1, 2, ..., 7                     |
 * | ISO week                | W     | 1, 2, ..., 53                    |
 * |                         | Wo    | 1st, 2nd, ..., 53rd              |
 * |                         | WW    | 01, 02, ..., 53                  |
 * | Year                    | YY    | 00, 01, ..., 99                  |
 * |                         | YYYY  | 1900, 1901, ..., 2099            |
 * | ISO week-numbering year | GG    | 00, 01, ..., 99                  |
 * |                         | GGGG  | 1900, 1901, ..., 2099            |
 * | AM/PM                   | A     | AM, PM                           |
 * |                         | a     | am, pm                           |
 * |                         | aa    | a.m., p.m.                       |
 * | Hour                    | H     | 0, 1, ... 23                     |
 * |                         | HH    | 00, 01, ... 23                   |
 * |                         | h     | 1, 2, ..., 12                    |
 * |                         | hh    | 01, 02, ..., 12                  |
 * | Minute                  | m     | 0, 1, ..., 59                    |
 * |                         | mm    | 00, 01, ..., 59                  |
 * | Second                  | s     | 0, 1, ..., 59                    |
 * |                         | ss    | 00, 01, ..., 59                  |
 * | 1/10 of second          | S     | 0, 1, ..., 9                     |
 * | 1/100 of second         | SS    | 00, 01, ..., 99                  |
 * | Millisecond             | SSS   | 000, 001, ..., 999               |
 * | Timezone                | Z     | -01:00, +00:00, ... +12:00       |
 * |                         | ZZ    | -0100, +0000, ..., +1200         |
 * | Seconds timestamp       | X     | 512969520                        |
 * | Milliseconds timestamp  | x     | 512969520900                     |
 *
 * The characters wrapped in square brackets are escaped.
 *
 * The result may vary by locale.
 *
 * @param {Date|String|Number} date - the original date
 * @param {String} [format='YYYY-MM-DDTHH:mm:ss.SSSZ'] - the string of tokens
 * @param {Object} [options] - the object with options
 * @param {Object} [options.locale=enLocale] - the locale object
 * @returns {String} the formatted date string
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * var result = format(
 *   new Date(2014, 1, 11),
 *   'MM/DD/YYYY'
 * )
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * var eoLocale = require('date-fns/locale/eo')
 * var result = format(
 *   new Date(2014, 6, 2),
 *   'Do [de] MMMM YYYY',
 *   {locale: eoLocale}
 * )
 * //=> '2-a de julio 2014'
 */
function format (dirtyDate, formatStr, options) {
  formatStr = formatStr || 'YYYY-MM-DDTHH:mm:ss.SSSZ'
  options = options || {}

  var locale = options.locale
  var localeFormatters = enLocale.format.formatters
  var formattingTokensRegExp = enLocale.format.formattingTokensRegExp
  if (locale && locale.format && locale.format.formatters) {
    localeFormatters = locale.format.formatters

    if (locale.format.formattingTokensRegExp) {
      formattingTokensRegExp = locale.format.formattingTokensRegExp
    }
  }

  var date = parse(dirtyDate)

  if (!isValid(date)) {
    return 'Invalid Date'
  }

  var formatFn = buildFormatFn(formatStr, localeFormatters, formattingTokensRegExp)

  return formatFn(date)
}

var formatters = {
  // Month: 1, 2, ..., 12
  'M': function (date) {
    return date.getMonth() + 1
  },

  // Month: 01, 02, ..., 12
  'MM': function (date) {
    return addLeadingZeros(date.getMonth() + 1, 2)
  },

  // Quarter: 1, 2, 3, 4
  'Q': function (date) {
    return Math.ceil((date.getMonth() + 1) / 3)
  },

  // Day of month: 1, 2, ..., 31
  'D': function (date) {
    return date.getDate()
  },

  // Day of month: 01, 02, ..., 31
  'DD': function (date) {
    return addLeadingZeros(date.getDate(), 2)
  },

  // Day of year: 1, 2, ..., 366
  'DDD': function (date) {
    return getDayOfYear(date)
  },

  // Day of year: 001, 002, ..., 366
  'DDDD': function (date) {
    return addLeadingZeros(getDayOfYear(date), 3)
  },

  // Day of week: 0, 1, ..., 6
  'd': function (date) {
    return date.getDay()
  },

  // Day of ISO week: 1, 2, ..., 7
  'E': function (date) {
    return date.getDay() || 7
  },

  // ISO week: 1, 2, ..., 53
  'W': function (date) {
    return getISOWeek(date)
  },

  // ISO week: 01, 02, ..., 53
  'WW': function (date) {
    return addLeadingZeros(getISOWeek(date), 2)
  },

  // Year: 00, 01, ..., 99
  'YY': function (date) {
    return addLeadingZeros(date.getFullYear(), 4).substr(2)
  },

  // Year: 1900, 1901, ..., 2099
  'YYYY': function (date) {
    return addLeadingZeros(date.getFullYear(), 4)
  },

  // ISO week-numbering year: 00, 01, ..., 99
  'GG': function (date) {
    return String(getISOYear(date)).substr(2)
  },

  // ISO week-numbering year: 1900, 1901, ..., 2099
  'GGGG': function (date) {
    return getISOYear(date)
  },

  // Hour: 0, 1, ... 23
  'H': function (date) {
    return date.getHours()
  },

  // Hour: 00, 01, ..., 23
  'HH': function (date) {
    return addLeadingZeros(date.getHours(), 2)
  },

  // Hour: 1, 2, ..., 12
  'h': function (date) {
    var hours = date.getHours()
    if (hours === 0) {
      return 12
    } else if (hours > 12) {
      return hours % 12
    } else {
      return hours
    }
  },

  // Hour: 01, 02, ..., 12
  'hh': function (date) {
    return addLeadingZeros(formatters['h'](date), 2)
  },

  // Minute: 0, 1, ..., 59
  'm': function (date) {
    return date.getMinutes()
  },

  // Minute: 00, 01, ..., 59
  'mm': function (date) {
    return addLeadingZeros(date.getMinutes(), 2)
  },

  // Second: 0, 1, ..., 59
  's': function (date) {
    return date.getSeconds()
  },

  // Second: 00, 01, ..., 59
  'ss': function (date) {
    return addLeadingZeros(date.getSeconds(), 2)
  },

  // 1/10 of second: 0, 1, ..., 9
  'S': function (date) {
    return Math.floor(date.getMilliseconds() / 100)
  },

  // 1/100 of second: 00, 01, ..., 99
  'SS': function (date) {
    return addLeadingZeros(Math.floor(date.getMilliseconds() / 10), 2)
  },

  // Millisecond: 000, 001, ..., 999
  'SSS': function (date) {
    return addLeadingZeros(date.getMilliseconds(), 3)
  },

  // Timezone: -01:00, +00:00, ... +12:00
  'Z': function (date) {
    return formatTimezone(date.getTimezoneOffset(), ':')
  },

  // Timezone: -0100, +0000, ... +1200
  'ZZ': function (date) {
    return formatTimezone(date.getTimezoneOffset())
  },

  // Seconds timestamp: 512969520
  'X': function (date) {
    return Math.floor(date.getTime() / 1000)
  },

  // Milliseconds timestamp: 512969520900
  'x': function (date) {
    return date.getTime()
  }
}

function buildFormatFn (formatStr, localeFormatters, formattingTokensRegExp) {
  var array = formatStr.match(formattingTokensRegExp)
  var length = array.length

  var i
  var formatter
  for (i = 0; i < length; i++) {
    formatter = localeFormatters[array[i]] || formatters[array[i]]
    if (formatter) {
      array[i] = formatter
    } else {
      array[i] = removeFormattingTokens(array[i])
    }
  }

  return function (date) {
    var output = ''
    for (var i = 0; i < length; i++) {
      if (array[i] instanceof Function) {
        output += array[i](date, formatters)
      } else {
        output += array[i]
      }
    }
    return output
  }
}

function removeFormattingTokens (input) {
  if (input.match(/\[[\s\S]/)) {
    return input.replace(/^\[|]$/g, '')
  }
  return input.replace(/\\/g, '')
}

function formatTimezone (offset, delimeter) {
  delimeter = delimeter || ''
  var sign = offset > 0 ? '-' : '+'
  var absOffset = Math.abs(offset)
  var hours = Math.floor(absOffset / 60)
  var minutes = absOffset % 60
  return sign + addLeadingZeros(hours, 2) + delimeter + addLeadingZeros(minutes, 2)
}

function addLeadingZeros (number, targetLength) {
  var output = Math.abs(number).toString()
  while (output.length < targetLength) {
    output = '0' + output
  }
  return output
}

module.exports = format


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)
var startOfYear = __webpack_require__(175)
var differenceInCalendarDays = __webpack_require__(159)

/**
 * @category Day Helpers
 * @summary Get the day of the year of the given date.
 *
 * @description
 * Get the day of the year of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the day of year
 *
 * @example
 * // Which day of the year is 2 July 2014?
 * var result = getDayOfYear(new Date(2014, 6, 2))
 * //=> 183
 */
function getDayOfYear (dirtyDate) {
  var date = parse(dirtyDate)
  var diff = differenceInCalendarDays(date, startOfYear(date))
  var dayOfYear = diff + 1
  return dayOfYear
}

module.exports = getDayOfYear


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)
var startOfISOWeek = __webpack_require__(39)
var startOfISOYear = __webpack_require__(173)

var MILLISECONDS_IN_WEEK = 604800000

/**
 * @category ISO Week Helpers
 * @summary Get the ISO week of the given date.
 *
 * @description
 * Get the ISO week of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the ISO week
 *
 * @example
 * // Which week of the ISO-week numbering year is 2 January 2005?
 * var result = getISOWeek(new Date(2005, 0, 2))
 * //=> 53
 */
function getISOWeek (dirtyDate) {
  var date = parse(dirtyDate)
  var diff = startOfISOWeek(date).getTime() - startOfISOYear(date).getTime()

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1
}

module.exports = getISOWeek


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Common Helpers
 * @summary Is the first date before the second one?
 *
 * @description
 * Is the first date before the second one?
 *
 * @param {Date|String|Number} date - the date that should be before the other one to return true
 * @param {Date|String|Number} dateToCompare - the date to compare with
 * @returns {Boolean} the first date is before the second date
 *
 * @example
 * // Is 10 July 1989 before 11 February 1987?
 * var result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> false
 */
function isBefore (dirtyDate, dirtyDateToCompare) {
  var date = parse(dirtyDate)
  var dateToCompare = parse(dirtyDateToCompare)
  return date.getTime() < dateToCompare.getTime()
}

module.exports = isBefore


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var startOfDay = __webpack_require__(62)

/**
 * @category Day Helpers
 * @summary Are the given dates in the same day?
 *
 * @description
 * Are the given dates in the same day?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same day
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * var result = isSameDay(
 *   new Date(2014, 8, 4, 6, 0),
 *   new Date(2014, 8, 4, 18, 0)
 * )
 * //=> true
 */
function isSameDay (dirtyDateLeft, dirtyDateRight) {
  var dateLeftStartOfDay = startOfDay(dirtyDateLeft)
  var dateRightStartOfDay = startOfDay(dirtyDateRight)

  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime()
}

module.exports = isSameDay


/***/ }),
/* 167 */
/***/ (function(module, exports) {

var commonFormatterKeys = [
  'M', 'MM', 'Q', 'D', 'DD', 'DDD', 'DDDD', 'd',
  'E', 'W', 'WW', 'YY', 'YYYY', 'GG', 'GGGG',
  'H', 'HH', 'h', 'hh', 'm', 'mm',
  's', 'ss', 'S', 'SS', 'SSS',
  'Z', 'ZZ', 'X', 'x'
]

function buildFormattingTokensRegExp (formatters) {
  var formatterKeys = []
  for (var key in formatters) {
    if (formatters.hasOwnProperty(key)) {
      formatterKeys.push(key)
    }
  }

  var formattingTokens = commonFormatterKeys
    .concat(formatterKeys)
    .sort()
    .reverse()
  var formattingTokensRegExp = new RegExp(
    '(\\[[^\\[]*\\])|(\\\\)?' + '(' + formattingTokens.join('|') + '|.)', 'g'
  )

  return formattingTokensRegExp
}

module.exports = buildFormattingTokensRegExp


/***/ }),
/* 168 */
/***/ (function(module, exports) {

function buildDistanceInWordsLocale () {
  var distanceInWordsLocale = {
    lessThanXSeconds: {
      one: 'less than a second',
      other: 'less than {{count}} seconds'
    },

    xSeconds: {
      one: '1 second',
      other: '{{count}} seconds'
    },

    halfAMinute: 'half a minute',

    lessThanXMinutes: {
      one: 'less than a minute',
      other: 'less than {{count}} minutes'
    },

    xMinutes: {
      one: '1 minute',
      other: '{{count}} minutes'
    },

    aboutXHours: {
      one: 'about 1 hour',
      other: 'about {{count}} hours'
    },

    xHours: {
      one: '1 hour',
      other: '{{count}} hours'
    },

    xDays: {
      one: '1 day',
      other: '{{count}} days'
    },

    aboutXMonths: {
      one: 'about 1 month',
      other: 'about {{count}} months'
    },

    xMonths: {
      one: '1 month',
      other: '{{count}} months'
    },

    aboutXYears: {
      one: 'about 1 year',
      other: 'about {{count}} years'
    },

    xYears: {
      one: '1 year',
      other: '{{count}} years'
    },

    overXYears: {
      one: 'over 1 year',
      other: 'over {{count}} years'
    },

    almostXYears: {
      one: 'almost 1 year',
      other: 'almost {{count}} years'
    }
  }

  function localize (token, count, options) {
    options = options || {}

    var result
    if (typeof distanceInWordsLocale[token] === 'string') {
      result = distanceInWordsLocale[token]
    } else if (count === 1) {
      result = distanceInWordsLocale[token].one
    } else {
      result = distanceInWordsLocale[token].other.replace('{{count}}', count)
    }

    if (options.addSuffix) {
      if (options.comparison > 0) {
        return 'in ' + result
      } else {
        return result + ' ago'
      }
    }

    return result
  }

  return {
    localize: localize
  }
}

module.exports = buildDistanceInWordsLocale


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

var buildFormattingTokensRegExp = __webpack_require__(167)

function buildFormatLocale () {
  // Note: in English, the names of days of the week and months are capitalized.
  // If you are making a new locale based on this one, check if the same is true for the language you're working on.
  // Generally, formatted dates should look like they are in the middle of a sentence,
  // e.g. in Spanish language the weekdays and months should be in the lowercase.
  var months3char = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  var monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  var weekdays2char = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  var weekdays3char = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  var weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  var meridiemUppercase = ['AM', 'PM']
  var meridiemLowercase = ['am', 'pm']
  var meridiemFull = ['a.m.', 'p.m.']

  var formatters = {
    // Month: Jan, Feb, ..., Dec
    'MMM': function (date) {
      return months3char[date.getMonth()]
    },

    // Month: January, February, ..., December
    'MMMM': function (date) {
      return monthsFull[date.getMonth()]
    },

    // Day of week: Su, Mo, ..., Sa
    'dd': function (date) {
      return weekdays2char[date.getDay()]
    },

    // Day of week: Sun, Mon, ..., Sat
    'ddd': function (date) {
      return weekdays3char[date.getDay()]
    },

    // Day of week: Sunday, Monday, ..., Saturday
    'dddd': function (date) {
      return weekdaysFull[date.getDay()]
    },

    // AM, PM
    'A': function (date) {
      return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
    },

    // am, pm
    'a': function (date) {
      return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
    },

    // a.m., p.m.
    'aa': function (date) {
      return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
    }
  }

  // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
  var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
  ordinalFormatters.forEach(function (formatterToken) {
    formatters[formatterToken + 'o'] = function (date, formatters) {
      return ordinal(formatters[formatterToken](date))
    }
  })

  return {
    formatters: formatters,
    formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
  }
}

function ordinal (number) {
  var rem100 = number % 100
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'st'
      case 2:
        return number + 'nd'
      case 3:
        return number + 'rd'
    }
  }
  return number + 'th'
}

module.exports = buildFormatLocale


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

var buildDistanceInWordsLocale = __webpack_require__(168)
var buildFormatLocale = __webpack_require__(169)

/**
 * @category Locales
 * @summary English locale.
 */
module.exports = {
  distanceInWords: buildDistanceInWordsLocale(),
  format: buildFormatLocale()
}


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)
var getDaysInMonth = __webpack_require__(56)

/**
 * @category Month Helpers
 * @summary Set the month to the given date.
 *
 * @description
 * Set the month to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} month - the month of the new date
 * @returns {Date} the new date with the month setted
 *
 * @example
 * // Set February to 1 September 2014:
 * var result = setMonth(new Date(2014, 8, 1), 1)
 * //=> Sat Feb 01 2014 00:00:00
 */
function setMonth (dirtyDate, month) {
  var date = parse(dirtyDate)
  var year = date.getFullYear()
  var day = date.getDate()

  var dateWithDesiredMonth = new Date(0)
  dateWithDesiredMonth.setFullYear(year, month, 15)
  dateWithDesiredMonth.setHours(0, 0, 0, 0)
  var daysInMonth = getDaysInMonth(dateWithDesiredMonth)
  // Set the last day of the new month
  // if the original date was the last day of the longer month
  date.setMonth(month, Math.min(day, daysInMonth))
  return date
}

module.exports = setMonth


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Year Helpers
 * @summary Set the year to the given date.
 *
 * @description
 * Set the year to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} year - the year of the new date
 * @returns {Date} the new date with the year setted
 *
 * @example
 * // Set year 2013 to 1 September 2014:
 * var result = setYear(new Date(2014, 8, 1), 2013)
 * //=> Sun Sep 01 2013 00:00:00
 */
function setYear (dirtyDate, year) {
  var date = parse(dirtyDate)
  date.setFullYear(year)
  return date
}

module.exports = setYear


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var getISOYear = __webpack_require__(57)
var startOfISOWeek = __webpack_require__(39)

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the start of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the start of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of an ISO year
 *
 * @example
 * // The start of an ISO week-numbering year for 2 July 2005:
 * var result = startOfISOYear(new Date(2005, 6, 2))
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfISOYear (dirtyDate) {
  var year = getISOYear(dirtyDate)
  var fourthOfJanuary = new Date(0)
  fourthOfJanuary.setFullYear(year, 0, 4)
  fourthOfJanuary.setHours(0, 0, 0, 0)
  var date = startOfISOWeek(fourthOfJanuary)
  return date
}

module.exports = startOfISOYear


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Month Helpers
 * @summary Return the start of a month for the given date.
 *
 * @description
 * Return the start of a month for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a month
 *
 * @example
 * // The start of a month for 2 September 2014 11:55:00:
 * var result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfMonth (dirtyDate) {
  var date = parse(dirtyDate)
  date.setDate(1)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = startOfMonth


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Year Helpers
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a year
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * var result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */
function startOfYear (dirtyDate) {
  var cleanDate = parse(dirtyDate)
  var date = new Date(0)
  date.setFullYear(cleanDate.getFullYear(), 0, 1)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = startOfYear


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

var addDays = __webpack_require__(36)

/**
 * @category Day Helpers
 * @summary Subtract the specified number of days from the given date.
 *
 * @description
 * Subtract the specified number of days from the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be subtracted
 * @returns {Date} the new date with the days subtracted
 *
 * @example
 * // Subtract 10 days from 1 September 2014:
 * var result = subDays(new Date(2014, 8, 1), 10)
 * //=> Fri Aug 22 2014 00:00:00
 */
function subDays (dirtyDate, amount) {
  return addDays(dirtyDate, -amount)
}

module.exports = subDays


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

var addMonths = __webpack_require__(21)

/**
 * @category Month Helpers
 * @summary Subtract the specified number of months from the given date.
 *
 * @description
 * Subtract the specified number of months from the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of months to be subtracted
 * @returns {Date} the new date with the months subtracted
 *
 * @example
 * // Subtract 5 months from 1 February 2015:
 * var result = subMonths(new Date(2015, 1, 1), 5)
 * //=> Mon Sep 01 2014 00:00:00
 */
function subMonths (dirtyDate, amount) {
  return addMonths(dirtyDate, -amount)
}

module.exports = subMonths


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(204)))

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(178);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(181),
    now = __webpack_require__(182),
    toNumber = __webpack_require__(183);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),
/* 181 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(179);

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),
/* 183 */
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),
/* 184 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;
  return _vm._c('ul', {
    staticClass: "uk-subnav",
    class: {
      'uk-subnav-line': _vm.line,
      'uk-subnav-pill': _vm.pill
    }
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-084cd5f5", module.exports)
  }
}

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;
  return _vm._c('div', {
    class: {
      'uk-button-group': _vm.group
    }
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-098070af", module.exports)
  }
}

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;
  return _vm._c('transition', {
    attrs: {
      "css": _vm.transition ? true : false,
      "name": _vm.transition ? _vm.transition : ''
    }
  }, [_vm._c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    class: {
      'uk-dropdown': !_vm.blank,
      'uk-dropdown-blank': _vm.blank,
      'uk-dropdown-small': _vm.expand
    }
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0b49863b", module.exports)
  }
}

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;
  return _vm._c('div', {
    staticClass: "uk-grid",
    class: {
      'uk-flex uk-flex-row-reverse': _vm.flip
    }
  }, [_vm._c('div', {
    class: ("uk-width-medium-" + _vm.width)
  }, [_vm._c('ul', {
    staticClass: "uk-tab",
    class: [_vm.flip ?
      'uk-tab-right' :
      'uk-tab-left'
    ]
  }, [_vm._t("default")], 2)]), _vm._v(" "), _vm._c('div', {
    class: ("uk-width-medium-" + _vm.contentWidth)
  }, [_vm._c('transition', {
    attrs: {
      "name": _vm.transition,
      "mode": "out-in"
    }
  }, [_vm._c('div', {
    key: _vm.activeTab
  }, [_vm._c('tab-content')], 1)])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-238c1c6b", module.exports)
  }
}

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;
  return _vm._c('transition', {
    attrs: {
      "name": _vm.transition
    },
    on: {
      "afterLeave": _vm.remove
    }
  }, [_vm._c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.active),
      expression: "active"
    }],
    staticClass: "uk-tooltip",
    class: _vm.placementClass
  }, [_vm._c('div', {
    staticClass: "uk-tooltip-inner",
    domProps: {
      "textContent": _vm._s(_vm.content)
    }
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2eb57ec9", module.exports)
  }
}

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;
  return _vm._c('transition', {
    attrs: {
      "name": _vm.transition
    },
    on: {
      "beforeEnter": _vm.beforeEnter,
      "beforeLeave": _vm.beforeLeave,
      "afterLeave": _vm.afterLeave
    }
  }, [_vm._c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    staticClass: "uk-offcanvas",
    on: {
      "click": function (e) {
        if (e.target !== _vm.$el && _vm.$el.contains(e.target)) {
          _vm.$emit('clickIn', e)
        } else {
          _vm.$emit('clickOut', e)
        }
      }
    }
  }, [_vm._c('div', {
    ref: "bar",
    staticClass: "uk-offcanvas-bar",
    class: {
      'uk-offcanvas-bar-flip': _vm.flip
    }
  }, [_vm._t("default")], 2)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3157accd", module.exports)
  }
}

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;
  return _vm._c('div', {
    class: {
      'uk-button-group': _vm.group
    }
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-32bec082", module.exports)
  }
}

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;
  return _vm._c('div', [_vm._c('div', {
    staticClass: "uk-datepicker-nav"
  }, [_vm._c('a', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isMonthDisplayable(_vm.prevMonth)),
      expression: "isMonthDisplayable(prevMonth)"
    }],
    staticClass: "uk-datepicker-previous",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.triggerChangeEvent(_vm.prevMonth)
      }
    }
  }), _vm._v(" "), _vm._c('a', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isMonthDisplayable(_vm.nextMonth)),
      expression: "isMonthDisplayable(nextMonth)"
    }],
    staticClass: "uk-datepicker-next",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.triggerChangeEvent(_vm.nextMonth)
      }
    }
  }), _vm._v(" "), _vm._c('PickerHeader')], 1), _vm._v(" "), _vm._c('table', {
    staticClass: "uk-datepicker-table"
  }, [_vm._c('thead', [_vm._c('tr', _vm._l((_vm.weekDays), function(day) {
    return _vm._c('th', [_vm._v("\n          " + _vm._s(_vm.format(day, 'ddd')) + "\n        ")])
  }))]), _vm._v(" "), _vm._c('tbody', _vm._l((_vm.matrix), function(week) {
    return _vm._c('tr', _vm._l((week), function(date, index) {
      return _vm._c('td', [_vm._c('a', {
        class: {
          'uk-active': _vm.isPicked(date),
            'uk-datepicker-table-disabled': _vm.isDisabled(date),
            'uk-datepicker-table-muted': !_vm.isCurrentMonth(date) || _vm.isDisabled(date)
        },
        on: {
          "click": function($event) {
            $event.preventDefault();
            !_vm.isDisabled(date) && (_vm.isPicked(date) ?
              _vm.triggerUnpickEvent(date) :
              _vm.triggerPickEvent(date)
            )
          }
        }
      }, [_vm._v("\n            " + _vm._s(_vm.format(date, 'D')) + "\n          ")])])
    }))
  }))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-468ab7e9", module.exports)
  }
}

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;
  return _vm._c('div', {
    staticClass: "uk-notify",
    class: [("uk-notify-" + _vm.placement)]
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4f0a59f3", module.exports)
  }
}

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;
  return _vm._c('transition', {
    attrs: {
      "css": _vm.transition ? true : false,
      "name": _vm.transition ? _vm.transition : ''
    },
    on: {
      "beforeEnter": _vm.beforeEnter,
      "afterEnter": _vm.afterEnter,
      "afterLeave": _vm.afterLeave
    }
  }, [_vm._c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    staticClass: "uk-modal",
    staticStyle: {
      "display": "block"
    }
  }, [_vm._c('div', {
    ref: "dialog",
    staticClass: "uk-modal-dialog",
    class: {
      'uk-modal-dialog-large': _vm.large,
      'uk-modal-dialog-lightbox': _vm.lightbox,
      'uk-modal-dialog-blank': _vm.blank
    }
  }, [_vm._t("default")], 2)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5481d7f3", module.exports)
  }
}

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;
  return _vm._c('li', {
    class: {
      'uk-active': _vm.active,
      'uk-disabled': _vm.disabled
    }
  }, [_vm._c('a', {
    on: {
      "click": function($event) {
        $event.preventDefault();
        (!_vm.disabled && !_vm.active) && _vm.$parent.$emit('change', _vm.alias)
      }
    }
  }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))])], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5f0ea6b6", module.exports)
  }
}

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;
  return _vm._c('div', {
    class: {
      'uk-flex uk-flex-column-reverse': _vm.bottom
    }
  }, [_vm._c('div', {
    class: {
      'uk-tab-center': _vm.center,
      'uk-tab-center-bottom': _vm.center && _vm.bottom
    }
  }, [_vm._c('ul', {
    staticClass: "uk-tab",
    class: {
      'uk-tab-grid': _vm.width,
      'uk-tab-flip': _vm.flip,
      'uk-tab-bottom': _vm.bottom
    }
  }, [_vm._t("default")], 2)]), _vm._v(" "), _vm._c('transition', {
    attrs: {
      "name": _vm.transition,
      "mode": "out-in"
    }
  }, [_vm._c('div', {
    key: _vm.activeTab,
    staticClass: "uk-margin"
  }, [_vm._c('TabContent')], 1)])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-65eece56", module.exports)
  }
}

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;
  return _vm._c('ul', {
    staticClass: "uk-pagination",
    class: {
      'uk-pagination-left': _vm.align === 'left',
        'uk-pagination-right': _vm.align === 'right'
    }
  }, [_vm._c('li', {
    class: {
      'uk-disabled': !_vm.prevPage,
      'uk-pagination-previous': !_vm.compact
    }
  }, [(_vm.prevPage) ? _vm._c('a', {
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.emitChange({
          page: 1
        })
      }
    }
  }, [_vm._c('i', {
    staticClass: "uk-icon-angle-double-left"
  })]) : _vm._c('span', [_vm._c('i', {
    staticClass: "uk-icon"
  })]), _vm._v(" "), (_vm.prevPage) ? _vm._c('a', {
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.emitChange({
          page: _vm.prevPage
        })
      }
    }
  }, [_vm._c('i', {
    staticClass: "uk-icon-angle-left"
  })]) : _vm._c('span', [_vm._c('i', {
    staticClass: "uk-icon"
  })])]), _vm._v(" "), _vm._l((_vm.prePages), function(page) {
    return _vm._c('li', {
      class: {
        'uk-active': page === _vm.activePage
      }
    }, [(page === _vm.activePage) ? _vm._c('span', {
      domProps: {
        "textContent": _vm._s(page)
      }
    }) : _vm._c('a', {
      domProps: {
        "textContent": _vm._s(page)
      },
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.emitChange({
            page: page
          })
        }
      }
    })])
  }), _vm._v(" "), (_vm.mainPages[0] > (_vm.prePages.length + 1)) ? _vm._c('li', [_vm._c('span', [_vm._v("...")])]) : _vm._e(), _vm._v(" "), _vm._l((_vm.mainPages), function(page) {
    return _vm._c('li', {
      class: {
        'uk-active': page === _vm.activePage
      }
    }, [(page === _vm.activePage) ? _vm._c('span', {
      domProps: {
        "textContent": _vm._s(page)
      }
    }) : _vm._c('a', {
      domProps: {
        "textContent": _vm._s(page)
      },
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.emitChange({
            page: page
          })
        }
      }
    })])
  }), _vm._v(" "), ((_vm.mainPages[_vm.mainPages.length - 1] + 1) < _vm.postPages[0]) ? _vm._c('li', [_vm._c('span', [_vm._v("...")])]) : _vm._e(), _vm._v(" "), _vm._l((_vm.postPages), function(page) {
    return _vm._c('li', {
      class: {
        'uk-active': page === _vm.activePage
      }
    }, [(page === _vm.activePage) ? _vm._c('span', {
      domProps: {
        "textContent": _vm._s(page)
      }
    }) : _vm._c('a', {
      domProps: {
        "textContent": _vm._s(page)
      },
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.emitChange({
            page: page
          })
        }
      }
    })])
  }), _vm._v(" "), _vm._c('li', {
    class: {
      'uk-disabled': !_vm.nextPage,
      'uk-pagination-next': !_vm.compact
    }
  }, [(_vm.nextPage) ? _vm._c('a', {
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.emitChange({
          page: _vm.nextPage
        })
      }
    }
  }, [_vm._c('i', {
    staticClass: "uk-icon-angle-right"
  })]) : _vm._c('span', [_vm._c('i', {
    staticClass: "uk-icon"
  })]), _vm._v(" "), (_vm.nextPage) ? _vm._c('a', {
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.emitChange({
          page: _vm.totalPages
        })
      }
    }
  }, [_vm._c('i', {
    staticClass: "uk-icon-angle-double-right"
  })]) : _vm._c('span', [_vm._c('i', {
    staticClass: "uk-icon"
  })])])], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6c3cd0c4", module.exports)
  }
}

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;
  return _vm._c('li', {
    class: {
      'uk-active': _vm.active
    }
  }, [(!_vm.disabled && !_vm.active) ? _vm._c('a', {
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.$parent.$emit('change', _vm.path)
      }
    }
  }, [_vm._t("default", [_vm._v("\n      " + _vm._s(_vm.label) + "\n    ")])], 2) : _vm._c('span', [_vm._t("default", [_vm._v("\n      " + _vm._s(_vm.label) + "\n    ")])], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7e537c85", module.exports)
  }
}

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;
  return _vm._c('li', {
    class: {
      'uk-active': _vm.active,
      'uk-disabled': _vm.disabled
    }
  }, [_vm._c('a', {
    on: {
      "click": function($event) {
        $event.preventDefault();
        (!_vm.disabled && !_vm.active) && _vm.$parent.$emit('change', _vm.alias)
      }
    }
  }, [_vm._t("header", [_vm._v("\n      " + _vm._s(_vm.label) + "\n    ")])], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-87a76be4", module.exports)
  }
}

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;
  var _obj;
  return _vm._c('button', {
    staticClass: "uk-button",
    class: ( _obj = {
      'uk-active': _vm.active
    }, _obj[("uk-button-" + _vm.color)] = _vm.color, _obj[("uk-button-" + _vm.size)] = _vm.size, _obj[("uk-width-" + _vm.width)] = _vm.width, _obj ),
    attrs: {
      "type": _vm.type,
      "disabled": _vm.disabled
    },
    on: {
      "click": function (e) { return _vm.$emit('click', e); }
    }
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-ac4e6548", module.exports)
  }
}

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;
  return _vm._c('ul', {
    staticClass: "uk-breadcrumb"
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e78be416", module.exports)
  }
}

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;
  var _obj;
  return _vm._c('transition', {
    attrs: {
      "name": _vm.transition
    }
  }, [_vm._c('div', {
    staticClass: "uk-notify-message",
    class: ( _obj = {
      'vk-notify-message-sticky': _vm.timeout === 0
    }, _obj[_vm.statusClass] = _vm.status, _obj ),
    on: {
      "click": function($event) {
        _vm.$parent.$emit('click', _vm.id)
      }
    }
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-eb692978", module.exports)
  }
}

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;
  return _vm._c('div', {
    staticClass: "uk-placeholder uk-text-center",
    class: {
      'uk-dragover': _vm.dragged
    },
    on: {
      "dragenter": function($event) {
        $event.stopPropagation();
        $event.preventDefault();
      },
      "dragover": function($event) {
        $event.stopPropagation();
        $event.preventDefault();
        _vm.dragged = true
      },
      "dragleave": function($event) {
        $event.stopPropagation();
        $event.preventDefault();
        _vm.dragged = false
      },
      "drop": _vm.dropped
    }
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-f40696aa", module.exports)
  }
}

/***/ }),
/* 204 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _keys = __webpack_require__(68);

var _keys2 = _interopRequireDefault(_keys);

var _Breadcrumb = __webpack_require__(69);

var _Breadcrumb2 = _interopRequireDefault(_Breadcrumb);

var _Item = __webpack_require__(70);

var _Item2 = _interopRequireDefault(_Item);

var _Button = __webpack_require__(71);

var _Button2 = _interopRequireDefault(_Button);

var _ButtonCheckbox = __webpack_require__(72);

var _ButtonCheckbox2 = _interopRequireDefault(_ButtonCheckbox);

var _ButtonRadio = __webpack_require__(73);

var _ButtonRadio2 = _interopRequireDefault(_ButtonRadio);

var _Datepicker = __webpack_require__(74);

var _Datepicker2 = _interopRequireDefault(_Datepicker);

var _Notify = __webpack_require__(77);

var _Notify2 = _interopRequireDefault(_Notify);

var _NotifyMessage = __webpack_require__(78);

var _NotifyMessage2 = _interopRequireDefault(_NotifyMessage);

var _Dropdown = __webpack_require__(75);

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _Modal = __webpack_require__(76);

var _Modal2 = _interopRequireDefault(_Modal);

var _Offcanvas = __webpack_require__(79);

var _Offcanvas2 = _interopRequireDefault(_Offcanvas);

var _Pagination = __webpack_require__(80);

var _Pagination2 = _interopRequireDefault(_Pagination);

var _Subnav = __webpack_require__(82);

var _Subnav2 = _interopRequireDefault(_Subnav);

var _Item3 = __webpack_require__(81);

var _Item4 = _interopRequireDefault(_Item3);

var _Table = __webpack_require__(67);

var _Table2 = _interopRequireDefault(_Table);

var _Default = __webpack_require__(64);

var _Default2 = _interopRequireDefault(_Default);

var _Select = __webpack_require__(65);

var _Select2 = _interopRequireDefault(_Select);

var _Sort = __webpack_require__(66);

var _Sort2 = _interopRequireDefault(_Sort);

var _Tab = __webpack_require__(83);

var _Tab2 = _interopRequireDefault(_Tab);

var _Tabs = __webpack_require__(84);

var _Tabs2 = _interopRequireDefault(_Tabs);

var _TabsVertical = __webpack_require__(85);

var _TabsVertical2 = _interopRequireDefault(_TabsVertical);

var _Tooltip = __webpack_require__(86);

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _Upload = __webpack_require__(87);

var _Upload2 = _interopRequireDefault(_Upload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Vuikit = {
  Breadcrumb: _Breadcrumb2.default,
  BreadcrumbItem: _Item2.default,
  Button: _Button2.default,
  ButtonCheckbox: _ButtonCheckbox2.default,
  ButtonRadio: _ButtonRadio2.default,
  Datepicker: _Datepicker2.default,
  Notify: _Notify2.default,
  NotifyMessage: _NotifyMessage2.default,
  Dropdown: _Dropdown2.default,
  Modal: _Modal2.default,
  Offcanvas: _Offcanvas2.default,
  Pagination: _Pagination2.default,
  Subnav: _Subnav2.default,
  SubnavItem: _Item4.default,
  Table: _Table2.default,
  TableColumn: _Default2.default,
  TableColumnSelect: _Select2.default,
  TableColumnSort: _Sort2.default,
  Tab: _Tab2.default,
  Tabs: _Tabs2.default,
  TabsVertical: _TabsVertical2.default,
  Tooltip: _Tooltip2.default,
  Upload: _Upload2.default,
  install: function install(Vue) {
    var keys = (0, _keys2.default)(this);
    keys.pop();
    var i = keys.length;
    while (i--) {
      if (this[keys[i]].bind) {
        Vue.directive('Vk' + keys[i], this[keys[i]]);
      } else {
        Vue.component('Vk' + keys[i], this[keys[i]]);
      }
    }
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vuikit);
}

module.exports = Vuikit;

/***/ })
/******/ ]);