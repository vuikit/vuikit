/*!
 * Vuikit v0.7.0
 * (c) 2016-present Miljan Aleksic
 * Released under the MIT License.
 */
var Breadcrumb = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"uk-breadcrumb"},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'VkBreadcrumb',
  props: {
    location: {
      type: String,
      default: '/'
    }
  },
  computed: {
    items: {
      get: function get () {
        return this.$slots.default.filter(function (c) { return c.componentOptions && c.componentOptions.tag === 'vk-breadcrumb-item'; }
        )
      },
      cache: false
    }
  },
  beforeMount: function beforeMount () {
    this.updateItems();
  },
  beforeUpdate: function beforeUpdate () {
    this.updateItems();
  },
  methods: {
    updateItems: function updateItems () {
      var this$1 = this;

      this.items.forEach(function (item) {
        var props = item.componentOptions.propsData;
        props.active = this$1.location === props.path;
      });
    }
  }
};

var BreadcrumbItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{class:{ 'uk-active': _vm.active }},[(!_vm.disabled && !_vm.active)?_c('a',{on:{"click":function($event){$event.preventDefault();_vm.$parent.$emit('change', _vm.path);}}},[_vm._t("default",[_vm._v(_vm._s(_vm.label))])],2):_c('span',[_vm._t("default",[_vm._v(_vm._s(_vm.label))])],2)])},staticRenderFns: [],
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

var Button = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"uk-button",class:{ 'uk-active': _vm.active, 'uk-button-default': !_vm.hasCustomStyle },attrs:{"type":_vm.type,"disabled":_vm.disabled},on:{"click":function (e) { return _vm.$emit('click', e); }}},[_vm._t("default")],2)},staticRenderFns: [],
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
    }
  },
  computed: {
    hasCustomStyle: function hasCustomStyle () {
      var classes = this.$options._parentVnode && this.$options._parentVnode.data.staticClass;
      return classes && classes.match(/uk-button-(primary|secondary|danger|text|link)/)
    }
  }
};

/**
 * Utility functions
 */

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}



/**
 * Check if value is plain string
 */


/**
 * Check if value is plain integer
 */
function isInteger (val) {
  return Number.isInteger(val)
}

/**
 * Check if value is plain function
 */


/**
 * Check if value is plain array
 */
var isArray = Array.isArray;

/**
 * Check if value is in array
 */
function inArray (array, value) {
  return (array || []).indexOf(value) !== -1
}

/**
* Convert an Array-like object or value to Array
*/
function toArray (value) {
  if (isArray(value)) {
    return value
  }
  return isObject(value)
    ? _toArray(value)
    : [value]
}

function _toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Returns an array range
 */
function range (start, stop, step) {
  if ( step === void 0 ) step = 1;

  if (typeof stop === 'undefined') {
    stop = start;
    start = 0;
  }
  return Array.from(new Array(Math.floor((stop - start) / step)), function (x, i) { return start + i * step; })
}

function each (obj, iterator) {
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
  return obj
}



/**
 * Warn about errors only in no production
 */

var warn;

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  warn = function (msg) {
    if (hasConsole) {
      console.error(msg);
    }
  };
}

function filterByTag (nodes, tag) {
  var result = [];
  each(nodes, function (node) {
    if (node.componentOptions && node.componentOptions.tag === tag) {
      result.push(node);
    }
  });
  return result
}

function getProps (vm) {
  return vm.componentOptions.propsData
}

var ButtonCheckbox = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:{ 'uk-button-group': _vm.group }},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'VkButtonCheckbox',
  props: {
    value: {
      type: Array,
      default: function () { return []; }
    },
    group: {
      type: Boolean,
      default: false
    }
  },
  beforeMount: function beforeMount () {
    this.updateButtonsState();
  },
  beforeUpdate: function beforeUpdate () {
    this.updateButtonsState();
  },
  mounted: function mounted () {
    var this$1 = this;

    each(this.$children, function (button) {
      button.$on('click', function () { return this$1.toggle(button); });
    });
  },
  methods: {
    updateButtonsState: function updateButtonsState () {
      var this$1 = this;

      each(filterByTag(this.$slots.default, 'vk-button'), function (component) {
        var props = getProps(component);
        props.active = inArray(this$1.value, props.value);
      });
    },
    toggle: function toggle (selected) {
      // recreate new value respecting buttons order
      var value = this.$children
        .filter(function (button) { return button === selected
          ? !button.active
          : button.active; })
        .map(function (button) { return button.value; });
      this.$emit('change', value);
    }
  }
};

var ButtonRadio = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:{ 'uk-button-group': _vm.group }},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'VkButtonRadio',
  props: {
    value: {},
    group: {
      type: Boolean,
      default: false
    }
  },
  beforeMount: function beforeMount () {
    this.updateButtonsState();
  },
  beforeUpdate: function beforeUpdate () {
    this.updateButtonsState();
  },
  mounted: function mounted () {
    var this$1 = this;

    each(this.$children, function (button) {
      button.$on('click', function () { return this$1.$emit('change', button.value); });
    });
  },
  methods: {
    updateButtonsState: function updateButtonsState () {
      var this$1 = this;

      each(filterByTag(this.$slots.default, 'vk-button'), function (component) {
        var props = getProps(component);
        props.active = props.value === this$1.value;
      });
    }
  }
};

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
function isDate$1 (argument) {
  return argument instanceof Date
}

var index$2 = isDate$1;

var isDate = index$2;

var MILLISECONDS_IN_HOUR = 3600000;
var MILLISECONDS_IN_MINUTE = 60000;
var DEFAULT_ADDITIONAL_DIGITS = 2;

var parseTokenDateTimeDelimeter = /[T ]/;
var parseTokenPlainTime = /:/;

// year tokens
var parseTokenYY = /^(\d{2})$/;
var parseTokensYYY = [
  /^([+-]\d{2})$/, // 0 additional digits
  /^([+-]\d{3})$/, // 1 additional digit
  /^([+-]\d{4})$/ // 2 additional digits
];

var parseTokenYYYY = /^(\d{4})/;
var parseTokensYYYYY = [
  /^([+-]\d{4})/, // 0 additional digits
  /^([+-]\d{5})/, // 1 additional digit
  /^([+-]\d{6})/ // 2 additional digits
];

// date tokens
var parseTokenMM = /^-(\d{2})$/;
var parseTokenDDD = /^-?(\d{3})$/;
var parseTokenMMDD = /^-?(\d{2})-?(\d{2})$/;
var parseTokenWww = /^-?W(\d{2})$/;
var parseTokenWwwD = /^-?W(\d{2})-?(\d{1})$/;

// time tokens
var parseTokenHH = /^(\d{2}([.,]\d*)?)$/;
var parseTokenHHMM = /^(\d{2}):?(\d{2}([.,]\d*)?)$/;
var parseTokenHHMMSS = /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/;

// timezone tokens
var parseTokenTimezone = /([Z+-].*)$/;
var parseTokenTimezoneZ = /^(Z)$/;
var parseTokenTimezoneHH = /^([+-])(\d{2})$/;
var parseTokenTimezoneHHMM = /^([+-])(\d{2}):?(\d{2})$/;

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
function parse$1 (argument, options) {
  if (isDate(argument)) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime())
  } else if (typeof argument !== 'string') {
    return new Date(argument)
  }

  options = options || {};
  var additionalDigits = options.additionalDigits;
  if (additionalDigits == null) {
    additionalDigits = DEFAULT_ADDITIONAL_DIGITS;
  }

  var dateStrings = splitDateString(argument);

  var parseYearResult = parseYear(dateStrings.date, additionalDigits);
  var year = parseYearResult.year;
  var restDateString = parseYearResult.restDateString;

  var date = parseDate(restDateString, year);

  if (date) {
    var timestamp = date.getTime();
    var time = 0;
    var offset;

    if (dateStrings.time) {
      time = parseTime(dateStrings.time);
    }

    if (dateStrings.timezone) {
      offset = parseTimezone(dateStrings.timezone);
    } else {
      // get offset accurate to hour in timezones that change offset
      offset = new Date(timestamp + time).getTimezoneOffset();
      offset = new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE).getTimezoneOffset();
    }

    return new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE)
  } else {
    return new Date(argument)
  }
}

function splitDateString (dateString) {
  var dateStrings = {};
  var array = dateString.split(parseTokenDateTimeDelimeter);
  var timeString;

  if (parseTokenPlainTime.test(array[0])) {
    dateStrings.date = null;
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];
  }

  if (timeString) {
    var token = parseTokenTimezone.exec(timeString);
    if (token) {
      dateStrings.time = timeString.replace(token[1], '');
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }

  return dateStrings
}

function parseYear (dateString, additionalDigits) {
  var parseTokenYYY = parseTokensYYY[additionalDigits];
  var parseTokenYYYYY = parseTokensYYYYY[additionalDigits];

  var token;

  // YYYY or ±YYYYY
  token = parseTokenYYYY.exec(dateString) || parseTokenYYYYY.exec(dateString);
  if (token) {
    var yearString = token[1];
    return {
      year: parseInt(yearString, 10),
      restDateString: dateString.slice(yearString.length)
    }
  }

  // YY or ±YYY
  token = parseTokenYY.exec(dateString) || parseTokenYYY.exec(dateString);
  if (token) {
    var centuryString = token[1];
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

  var token;
  var date;
  var month;
  var week;

  // YYYY
  if (dateString.length === 0) {
    date = new Date(0);
    date.setUTCFullYear(year);
    return date
  }

  // YYYY-MM
  token = parseTokenMM.exec(dateString);
  if (token) {
    date = new Date(0);
    month = parseInt(token[1], 10) - 1;
    date.setUTCFullYear(year, month);
    return date
  }

  // YYYY-DDD or YYYYDDD
  token = parseTokenDDD.exec(dateString);
  if (token) {
    date = new Date(0);
    var dayOfYear = parseInt(token[1], 10);
    date.setUTCFullYear(year, 0, dayOfYear);
    return date
  }

  // YYYY-MM-DD or YYYYMMDD
  token = parseTokenMMDD.exec(dateString);
  if (token) {
    date = new Date(0);
    month = parseInt(token[1], 10) - 1;
    var day = parseInt(token[2], 10);
    date.setUTCFullYear(year, month, day);
    return date
  }

  // YYYY-Www or YYYYWww
  token = parseTokenWww.exec(dateString);
  if (token) {
    week = parseInt(token[1], 10) - 1;
    return dayOfISOYear(year, week)
  }

  // YYYY-Www-D or YYYYWwwD
  token = parseTokenWwwD.exec(dateString);
  if (token) {
    week = parseInt(token[1], 10) - 1;
    var dayOfWeek = parseInt(token[2], 10) - 1;
    return dayOfISOYear(year, week, dayOfWeek)
  }

  // Invalid ISO-formatted date
  return null
}

function parseTime (timeString) {
  var token;
  var hours;
  var minutes;

  // hh
  token = parseTokenHH.exec(timeString);
  if (token) {
    hours = parseFloat(token[1].replace(',', '.'));
    return (hours % 24) * MILLISECONDS_IN_HOUR
  }

  // hh:mm or hhmm
  token = parseTokenHHMM.exec(timeString);
  if (token) {
    hours = parseInt(token[1], 10);
    minutes = parseFloat(token[2].replace(',', '.'));
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE
  }

  // hh:mm:ss or hhmmss
  token = parseTokenHHMMSS.exec(timeString);
  if (token) {
    hours = parseInt(token[1], 10);
    minutes = parseInt(token[2], 10);
    var seconds = parseFloat(token[3].replace(',', '.'));
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE +
      seconds * 1000
  }

  // Invalid ISO-formatted time
  return null
}

function parseTimezone (timezoneString) {
  var token;
  var absoluteOffset;

  // Z
  token = parseTokenTimezoneZ.exec(timezoneString);
  if (token) {
    return 0
  }

  // ±hh
  token = parseTokenTimezoneHH.exec(timezoneString);
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60;
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset
  }

  // ±hh:mm or ±hhmm
  token = parseTokenTimezoneHHMM.exec(timezoneString);
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10);
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset
  }

  return 0
}

function dayOfISOYear (isoYear, week, day) {
  week = week || 0;
  day = day || 0;
  var date = new Date(0);
  date.setUTCFullYear(isoYear, 0, 4);
  var fourthOfJanuaryDay = date.getUTCDay() || 7;
  var diff = week * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date
}

var index$1 = parse$1;

var parse = index$1;

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
  var date = parse(dirtyDate);
  var year = date.getFullYear();
  return year
}

var index = getYear;

var parse$3 = index$1;

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
  var date = parse$3(dirtyDate);
  var month = date.getMonth();
  return month
}

var index$4 = getMonth;

var parse$4 = index$1;

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
  var date = parse$4(dirtyDate);
  var dayOfMonth = date.getDate();
  return dayOfMonth
}

var index$5 = getDate;

var parse$5 = index$1;

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
  var dateLeft = parse$5(dirtyDateLeft);
  var dateRight = parse$5(dirtyDateRight);
  return dateLeft.getFullYear() === dateRight.getFullYear() &&
    dateLeft.getMonth() === dateRight.getMonth()
}

var index$6 = isSameMonth;

var parse$6 = index$1;

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
function startOfDay$1 (dirtyDate) {
  var date = parse$6(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date
}

var index$8 = startOfDay$1;

var startOfDay = index$8;

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
  var dateLeftStartOfDay = startOfDay(dirtyDateLeft);
  var dateRightStartOfDay = startOfDay(dirtyDateRight);

  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime()
}

var index$7 = isSameDay;

var parse$7 = index$1;

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
  var time = parse$7(dirtyDate).getTime();
  var startTime = parse$7(dirtyStartDate).getTime();
  var endTime = parse$7(dirtyEndDate).getTime();

  if (startTime > endTime) {
    throw new Error('The start of the range cannot be after the end of the range')
  }

  return time >= startTime && time <= endTime
}

var index$10 = isWithinRange;

var isDate$2 = index$2;

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
  if (isDate$2(date)) {
    return !isNaN(date)
  } else {
    throw new TypeError(toString.call(date) + ' is not an instance of Date')
  }
}

var index$11 = isValid;

var parse$8 = index$1;

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
  var initialStartTime = parse$8(dirtyInitialRangeStartDate).getTime();
  var initialEndTime = parse$8(dirtyInitialRangeEndDate).getTime();
  var comparedStartTime = parse$8(dirtyComparedRangeStartDate).getTime();
  var comparedEndTime = parse$8(dirtyComparedRangeEndDate).getTime();

  if (initialStartTime > initialEndTime || comparedStartTime > comparedEndTime) {
    throw new Error('The start of the range cannot be after the end of the range')
  }

  return initialStartTime < comparedEndTime && comparedStartTime < initialEndTime
}

var index$12 = areRangesOverlapping;

var parse$9 = index$1;

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
  var date = parse$9(dirtyDate);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date
}

var index$13 = startOfMonth;

var parse$10 = index$1;

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
  var weekStartsOn = options ? (options.weekStartsOn || 0) : 0;

  var date = parse$10(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date
}

var index$14 = startOfWeek;

var parse$11 = index$1;

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
  var date = parse$11(dirtyDate);
  var month = date.getMonth();
  date.setFullYear(date.getFullYear(), month + 1, 0);
  date.setHours(23, 59, 59, 999);
  return date
}

var index$15 = endOfMonth;

var parse$13 = index$1;

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
function getDaysInMonth$1 (dirtyDate) {
  var date = parse$13(dirtyDate);
  var year = date.getFullYear();
  var monthIndex = date.getMonth();
  var lastDayOfMonth = new Date(0);
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setHours(0, 0, 0, 0);
  return lastDayOfMonth.getDate()
}

var index$17 = getDaysInMonth$1;

var parse$12 = index$1;
var getDaysInMonth = index$17;

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
  var date = parse$12(dirtyDate);
  var desiredMonth = date.getMonth() + amount;
  var dateWithDesiredMonth = new Date(0);
  dateWithDesiredMonth.setFullYear(date.getFullYear(), desiredMonth, 1);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  var daysInMonth = getDaysInMonth(dateWithDesiredMonth);
  // Set the last day of the new month
  // if the original date was the last day of the longer month
  date.setMonth(desiredMonth, Math.min(daysInMonth, date.getDate()));
  return date
}

var index$16 = addMonths;

var parse$14 = index$1;

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
  var date = parse$14(dirtyDate);
  date.setDate(date.getDate() + amount);
  return date
}

var index$19 = addDays;

var addMonths$2 = index$16;

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
  return addMonths$2(dirtyDate, -amount)
}

var index$20 = subMonths;

var addDays$2 = index$19;

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
  return addDays$2(dirtyDate, -amount)
}

var index$21 = subDays;

var parse$17 = index$1;

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
function startOfYear$1 (dirtyDate) {
  var cleanDate = parse$17(dirtyDate);
  var date = new Date(0);
  date.setFullYear(cleanDate.getFullYear(), 0, 1);
  date.setHours(0, 0, 0, 0);
  return date
}

var index$25 = startOfYear$1;

var startOfDay$2 = index$8;

var MILLISECONDS_IN_MINUTE$1 = 60000;
var MILLISECONDS_IN_DAY = 86400000;

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
function differenceInCalendarDays$1 (dirtyDateLeft, dirtyDateRight) {
  var startOfDayLeft = startOfDay$2(dirtyDateLeft);
  var startOfDayRight = startOfDay$2(dirtyDateRight);

  var timestampLeft = startOfDayLeft.getTime() -
    startOfDayLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE$1;
  var timestampRight = startOfDayRight.getTime() -
    startOfDayRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE$1;

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a day is not constant
  // (e.g. it's different in the day of the daylight saving time clock shift)
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY)
}

var index$27 = differenceInCalendarDays$1;

var parse$16 = index$1;
var startOfYear = index$25;
var differenceInCalendarDays = index$27;

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
function getDayOfYear$1 (dirtyDate) {
  var date = parse$16(dirtyDate);
  var diff = differenceInCalendarDays(date, startOfYear(date));
  var dayOfYear = diff + 1;
  return dayOfYear
}

var index$23 = getDayOfYear$1;

var startOfWeek$2 = index$14;

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
function startOfISOWeek$1 (dirtyDate) {
  return startOfWeek$2(dirtyDate, {weekStartsOn: 1})
}

var index$31 = startOfISOWeek$1;

var parse$19 = index$1;
var startOfISOWeek$3 = index$31;

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
function getISOYear$2 (dirtyDate) {
  var date = parse$19(dirtyDate);
  var year = date.getFullYear();

  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  var startOfNextYear = startOfISOWeek$3(fourthOfJanuaryOfNextYear);

  var fourthOfJanuaryOfThisYear = new Date(0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  var startOfThisYear = startOfISOWeek$3(fourthOfJanuaryOfThisYear);

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year
  } else {
    return year - 1
  }
}

var index$35 = getISOYear$2;

var getISOYear$1 = index$35;
var startOfISOWeek$2 = index$31;

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
function startOfISOYear$1 (dirtyDate) {
  var year = getISOYear$1(dirtyDate);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  var date = startOfISOWeek$2(fourthOfJanuary);
  return date
}

var index$33 = startOfISOYear$1;

var parse$18 = index$1;
var startOfISOWeek = index$31;
var startOfISOYear = index$33;

var MILLISECONDS_IN_WEEK = 604800000;

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
function getISOWeek$1 (dirtyDate) {
  var date = parse$18(dirtyDate);
  var diff = startOfISOWeek(date).getTime() - startOfISOYear(date).getTime();

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1
}

var index$29 = getISOWeek$1;

function buildDistanceInWordsLocale$1 () {
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
  };

  function localize (token, count, options) {
    options = options || {};

    var result;
    if (typeof distanceInWordsLocale[token] === 'string') {
      result = distanceInWordsLocale[token];
    } else if (count === 1) {
      result = distanceInWordsLocale[token].one;
    } else {
      result = distanceInWordsLocale[token].other.replace('{{count}}', count);
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

var index$39 = buildDistanceInWordsLocale$1;

var commonFormatterKeys = [
  'M', 'MM', 'Q', 'D', 'DD', 'DDD', 'DDDD', 'd',
  'E', 'W', 'WW', 'YY', 'YYYY', 'GG', 'GGGG',
  'H', 'HH', 'h', 'hh', 'm', 'mm',
  's', 'ss', 'S', 'SS', 'SSS',
  'Z', 'ZZ', 'X', 'x'
];

function buildFormattingTokensRegExp$1 (formatters) {
  var formatterKeys = [];
  for (var key in formatters) {
    if (formatters.hasOwnProperty(key)) {
      formatterKeys.push(key);
    }
  }

  var formattingTokens = commonFormatterKeys
    .concat(formatterKeys)
    .sort()
    .reverse();
  var formattingTokensRegExp = new RegExp(
    '(\\[[^\\[]*\\])|(\\\\)?' + '(' + formattingTokens.join('|') + '|.)', 'g'
  );

  return formattingTokensRegExp
}

var index$43 = buildFormattingTokensRegExp$1;

var buildFormattingTokensRegExp = index$43;

function buildFormatLocale$1 () {
  // Note: in English, the names of days of the week and months are capitalized.
  // If you are making a new locale based on this one, check if the same is true for the language you're working on.
  // Generally, formatted dates should look like they are in the middle of a sentence,
  // e.g. in Spanish language the weekdays and months should be in the lowercase.
  var months3char = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var weekdays2char = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  var weekdays3char = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var meridiemUppercase = ['AM', 'PM'];
  var meridiemLowercase = ['am', 'pm'];
  var meridiemFull = ['a.m.', 'p.m.'];

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
  };

  // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
  var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W'];
  ordinalFormatters.forEach(function (formatterToken) {
    formatters[formatterToken + 'o'] = function (date, formatters) {
      return ordinal(formatters[formatterToken](date))
    };
  });

  return {
    formatters: formatters,
    formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
  }
}

function ordinal (number) {
  var rem100 = number % 100;
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

var index$41 = buildFormatLocale$1;

var buildDistanceInWordsLocale = index$39;
var buildFormatLocale = index$41;

/**
 * @category Locales
 * @summary English locale.
 */
var index$37 = {
  distanceInWords: buildDistanceInWordsLocale(),
  format: buildFormatLocale()
};

var getDayOfYear = index$23;
var getISOWeek = index$29;
var getISOYear = index$35;
var parse$15 = index$1;
var isValid$2 = index$11;
var enLocale = index$37;

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
  formatStr = formatStr || 'YYYY-MM-DDTHH:mm:ss.SSSZ';
  options = options || {};

  var locale = options.locale;
  var localeFormatters = enLocale.format.formatters;
  var formattingTokensRegExp = enLocale.format.formattingTokensRegExp;
  if (locale && locale.format && locale.format.formatters) {
    localeFormatters = locale.format.formatters;

    if (locale.format.formattingTokensRegExp) {
      formattingTokensRegExp = locale.format.formattingTokensRegExp;
    }
  }

  var date = parse$15(dirtyDate);

  if (!isValid$2(date)) {
    return 'Invalid Date'
  }

  var formatFn = buildFormatFn(formatStr, localeFormatters, formattingTokensRegExp);

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
    var hours = date.getHours();
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
};

function buildFormatFn (formatStr, localeFormatters, formattingTokensRegExp) {
  var array = formatStr.match(formattingTokensRegExp);
  var length = array.length;

  var i;
  var formatter;
  for (i = 0; i < length; i++) {
    formatter = localeFormatters[array[i]] || formatters[array[i]];
    if (formatter) {
      array[i] = formatter;
    } else {
      array[i] = removeFormattingTokens(array[i]);
    }
  }

  return function (date) {
    var output = '';
    for (var i = 0; i < length; i++) {
      if (array[i] instanceof Function) {
        output += array[i](date, formatters);
      } else {
        output += array[i];
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
  delimeter = delimeter || '';
  var sign = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;
  return sign + addLeadingZeros(hours, 2) + delimeter + addLeadingZeros(minutes, 2)
}

function addLeadingZeros (number, targetLength) {
  var output = Math.abs(number).toString();
  while (output.length < targetLength) {
    output = '0' + output;
  }
  return output
}

var index$22 = format;

var parse$20 = index$1;

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
  var dateLeft = parse$20(dirtyDateLeft);
  var dateRight = parse$20(dirtyDateRight);

  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
  var monthDiff = dateLeft.getMonth() - dateRight.getMonth();

  return yearDiff * 12 + monthDiff
}

var index$45 = differenceInCalendarMonths;

var parse$21 = index$1;

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
  var date = parse$21(dirtyDate);
  var dateToCompare = parse$21(dirtyDateToCompare);
  return date.getTime() < dateToCompare.getTime()
}

var index$46 = isBefore;

var addMonths$3 = index$16;

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
  return addMonths$3(dirtyDate, amount * 12)
}

var index$47 = addYears;

var parse$22 = index$1;

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
  var date = parse$22(dirtyDate);
  date.setFullYear(year);
  return date
}

var index$48 = setYear;

var parse$23 = index$1;
var getDaysInMonth$2 = index$17;

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
  var date = parse$23(dirtyDate);
  var year = date.getFullYear();
  var day = date.getDate();

  var dateWithDesiredMonth = new Date(0);
  dateWithDesiredMonth.setFullYear(year, month, 15);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  var daysInMonth = getDaysInMonth$2(dateWithDesiredMonth);
  // Set the last day of the new month
  // if the original date was the last day of the longer month
  date.setMonth(month, Math.min(day, daysInMonth));
  return date
}

var index$49 = setMonth;

var PickerHeader = {
  functional: true,
  render: function render (h, ref) {
    var vm = ref.parent;

    return h('div', { class: 'uk-datepicker-heading' }, [
      h(Select, {
        props: {
          value: index$4(vm.date),
          options: getMonthsRange(vm.minPickableDate, vm.maxPickableDate)
            .filter(function (month) { return index$10(index$49(vm.date, month), vm.minPickableDate, vm.maxPickableDate); }
            )
            .map(function (month) { return ({
              text: vm.format(index$49(vm.date, month), 'MMMM'),
              value: month
            }); }),
          onChange: function (e) {
            var selectedMonth = e.target.selectedOptions[0].value;
            vm.$emit('change', index$49(vm.date, selectedMonth));
          }
        }
      }, [
        vm.format(vm.date, 'MMMM')
      ]),
      '&nbsp',
      h(Select, {
        props: {
          value: index(vm.date),
          options: getYearsRange(vm.minPickableDate, vm.maxPickableDate)
            .filter(function (year) { return index$10(index$48(vm.date, year), vm.minPickableDate, vm.maxPickableDate); }
            )
            .map(function (year) { return ({ text: year, value: year }); }),
          onChange: function (e) {
            var selectedYear = e.target.selectedOptions[0].value;
            vm.$emit('change', index$48(vm.date, selectedYear));
          }
        }
      }, [
        index(vm.date)
      ])
    ])
  }
};

var Select = {
  functional: true,
  props: ['value', 'options', 'onChange'],
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;

    var options = props.options;
    var value = props.value;
    var onChange = props.onChange;
    if (options.length > 1) {
      return h('span', { class: 'uk-form-select' }, [
        h('a', {
          on: {
            click: function (e) { return e.preventDefault(); }
          }
        }, [
          children,
          h('select', {
            domProps: {
              value: value
            },
            on: {
              change: onChange
            }
          }, [
            options.map(function (option) { return h('option', { domProps: {
                value: option.value
              }}, [ option.text ]); }
            )
          ])
        ])
      ])
    } else {
      return children
    }
  }
};

function getYearsRange (startDate, endDate) {
  var years = [];
  var curDate = startDate;
  while (index$46(curDate, endDate)) {
    years.push(index(curDate));
    curDate = index$47(curDate, 1);
  }
  return years
}

function getMonthsRange (startDate, endDate) {
  var months = [];
  // if diff is bigger than 12, include all months
  if (index$45(endDate, startDate) >= 12) {
    range(12).forEach(function (month) {
      months.push(month);
    });
  // otherwise iterate range
  } else {
    var curDate = startDate;
    while (index$46(curDate, endDate)) {
      months.push(index$4(curDate));
      curDate = index$16(curDate, 1);
    }
  }
  return months
}

var rows = range(6);
var cols = range(7);

/**
 * Returns a two-dimensional array with calendar represented dates
 *
 * @date  Date or Object
 * @plain Boolean - Whetever the dates should be set as raw numbers
 */
var getMatrix = function (ref, plain) {
  if ( ref === void 0 ) ref = {
  year: index(Date.now()),
  month: index$4(Date.now()),
  weekStartsOn: 0
};
  var year = ref.year;
  var month = ref.month;
  var weekStartsOn = ref.weekStartsOn;
  if ( plain === void 0 ) plain = false;

  var matrix = [];
  var date = arguments[0] instanceof Date
    ? arguments[0]
    : new Date(year, month);
  var curDate = index$14(date, { weekStartsOn: weekStartsOn });

  rows.forEach(function (row) {
    var week = [];
    cols.forEach(function (col) {
      // when plain return a raw date re
      if (plain) {
        week.push(index$6(curDate, date)
          ? index$5(curDate)
          : -index$5(curDate)
        );
      } else {
        week.push(curDate);
      }
      curDate = index$19(curDate, 1);
    });

    matrix.push(week);
  });

  return matrix
};

var Datepicker = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"uk-datepicker-nav"},[_c('a',{directives:[{name:"show",rawName:"v-show",value:(_vm.isMonthDisplayable(_vm.prevMonth)),expression:"isMonthDisplayable(prevMonth)"}],staticClass:"uk-datepicker-previous",on:{"click":function($event){$event.preventDefault();_vm.triggerChangeEvent(_vm.prevMonth);}}}),_vm._v(" "),_c('a',{directives:[{name:"show",rawName:"v-show",value:(_vm.isMonthDisplayable(_vm.nextMonth)),expression:"isMonthDisplayable(nextMonth)"}],staticClass:"uk-datepicker-next",on:{"click":function($event){$event.preventDefault();_vm.triggerChangeEvent(_vm.nextMonth);}}}),_c('picker-header')],1),_c('table',{staticClass:"uk-datepicker-table"},[_c('thead',[_c('tr',_vm._l((_vm.weekDays),function(day){return _c('th',[_vm._v(_vm._s(_vm.format(day, 'ddd')))])}))]),_c('tbody',_vm._l((_vm.matrix),function(week){return _c('tr',_vm._l((week),function(date,index$$1){return _c('td',[_c('a',{class:{ 'uk-active': _vm.isPicked(date), 'uk-datepicker-table-disabled': _vm.isDisabled(date), 'uk-datepicker-table-muted': !_vm.isCurrentMonth(date) || _vm.isDisabled(date) },on:{"click":function($event){$event.preventDefault();!_vm.isDisabled(date) && (_vm.isPicked(date)
            ? _vm.triggerUnpickEvent(date)
            : _vm.triggerPickEvent (date)
          );}}},[_vm._v(_vm._s(_vm.format(date, 'D')))])])}))}))])])},staticRenderFns: [],
  name: 'VkDatepicker',
  components: {
    PickerHeader: PickerHeader
  },
  props: {
    date: {
      type: [Date, String, Number],
      default: function () { return Date.now(); },
      validator: function (date) { return index$11(index$1(date)); }
    },
    // index first day week (0 - Sunday)
    weekStartsOn: {
      type: Number,
      default: 0
    },
    locale: {
      type: Object,
      default: function () { return ({}); }
    },
    pickedDates: {
      type: Array,
      default: function () { return []; }
    },
    disabledDates: {
      type: Array,
      default: function () { return []; }
    },
    // the minimum and maximum selectable dates
    // if Number, is relative from today
    minDate: {
      type: [Date, String, Number],
      default: '1980-01-01',
      validator: function (date) {
        return isInteger(date)
          ? true
          : index$11(index$1(date))
      }
    },
    maxDate: {
      type: [Date, String, Number],
      default: '2050-12-31',
      validator: function (date) {
        return isInteger(date)
          ? true
          : index$11(index$1(date))
      }
    }
  },
  computed: {
    matrix: function matrix () {
      return getMatrix({
        year: index(this.date),
        month: index$4(this.date),
        weekStartsOn: this.weekStartsOn
      })
    },
    prevMonth: function prevMonth () {
      return this.format(index$20(this.date, 1), 'YYYY-MM')
    },
    nextMonth: function nextMonth () {
      return this.format(index$16(this.date, 1), 'YYYY-MM')
    },
    minPickableDate: function minPickableDate () {
      return isInteger(this.minDate)
        ? index$21(Date.now(), this.minDate + 1)
        : this.minDate
    },
    maxPickableDate: function maxPickableDate () {
      return isInteger(this.maxDate)
        ? index$19(Date.now(), this.maxDate)
        : this.maxDate
    },
    weekDays: function weekDays () {
      var startDay = index$14(this.date, { weekStartsOn: this.weekStartsOn });
      return range(7).map(function (val, index$$1) { return index$19(startDay, index$$1); })
    }
  },
  methods: {
    triggerChangeEvent: function triggerChangeEvent (newDate) {
      this.$emit('change', {
        date: newDate,
        format: this.format
      });
    },
    triggerPickEvent: function triggerPickEvent (pickedDate) {
      var dirtyPickedDays = this.pickedDates.concat( [pickedDate]);
      this.$emit('pick', {
        date: pickedDate,
        dates: dirtyPickedDays,
        format: this.format
      });
    },
    triggerUnpickEvent: function triggerUnpickEvent (unpickedDate) {
      var dirtyPickedDays = [].concat( this.pickedDates );
      var index$$1 = dirtyPickedDays.findIndex(function (d) { return index$5(d) === index$5(unpickedDate); });
      dirtyPickedDays.splice(index$$1, 1);
      this.$emit('unpick', {
        date: index$1(unpickedDate),
        dates: dirtyPickedDays,
        format: this.format
      });
    },
    isCurrentMonth: function isCurrentMonth (date) {
      return index$6(this.date, date)
    },
    isPicked: function isPicked (date) {
      return this.pickedDates.some(function (d) { return index$7(d, date); })
    },
    isDisabled: function isDisabled (date) {
      return this.disabledDates.some(function (d) { return index$7(d, date); }) ||
        !index$10(date, this.minPickableDate, this.maxPickableDate)
    },
    isMonthDisplayable: function isMonthDisplayable (date) {
      return index$12(
        index$13(date),
        index$15(date),
        this.minPickableDate,
        this.maxPickableDate
      )
    },
    format: function format (date, format$1) {
      return index$22(date, format$1, { locale: this.locale })
    }
  }
};

var boundEvents = [];

// add event listener shorthand
function on (el, event, handler, namespace) {
  if ( namespace === void 0 ) namespace = 'def';

  boundEvents[namespace] = boundEvents[namespace] || [];
  boundEvents[namespace].push({ el: el, event: event, handler: handler });
  el.addEventListener(event, handler);
}

function offAll (namespace) {
  if ( namespace === void 0 ) namespace = 'def';

  if (boundEvents[namespace] !== undefined) {
    for (var i = 0; i < boundEvents[namespace].length; ++i) {
      var ref = boundEvents[namespace][i];
      var el = ref.el;
      var event = ref.event;
      var handler = ref.handler;
      el.removeEventListener(event, handler);
    }
  }
}

function hasClass (el, className) {
  return el.classList.contains(className)
}

function addClass (el, classes) {
  return classes.split(' ').filter(function (c) { return c; }).forEach(function (className) { return _addClass(el, className); })
}

var _addClass = function (el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    // IE9
    el.className += ' ' + className;
  }
};

function removeClass (el, classes) {
  return classes.split(' ').filter(function (c) { return c; }).forEach(function (className) { return _removeClass(el, className); })
}

var _removeClass = function (el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    // IE9
    el.className = el.className.replace(new RegExp(("^" + className + "$")), '');
  }
};

function css (el, style) {
  return window.getComputedStyle(el)[style]
}

var UA = window.navigator.userAgent.toLowerCase();
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;

// Transition property/event sniffing





/**
 * Get the closest matching element up the DOM tree.
 * @private
 * @param  {Element} elem     Starting element
 * @param  {String}  selector Selector to match against
 * @return {Boolean|Element}  Returns null if not match found
 */
function getClosest (elem, selector) {
  // Element.matches() polyfill
  var Element = window.Element;
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s);
        var i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1
      };
  }

  // Get closest match
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) { return elem }
  }

  return null
}

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var popper_es5 = createCommonjsModule(function (module, exports) {
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
  module.exports = factory();
}(commonjsGlobal, (function () { 'use strict';

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
      if ("value" in descriptor) { descriptor.writable = true; }
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) { defineProperties(Constructor.prototype, protoProps); }
    if (staticProps) { defineProperties(Constructor, staticProps); }
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  var arguments$1 = arguments;

  for (var i = 1; i < arguments.length; i++) {
    var source = arguments$1[i];

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

});

var PopperMixin = {
  name: 'VkDropdown',
  props: {
    // dom element reference,
    // defaults to parent
    target: null,
    /* [top|right|bottom|left]-[left|center|right] */
    position: {
      type: String,
      default: 'bottom-left'
    },
    animation: {
      type: String,
      default: ''
    },
    flip: {
      type: Boolean,
      default: true
    },
    modifiers: {
      type: Object,
      default: function () { return ({}); }
    }
  },
  computed: {
    targetElement: function targetElement () {
      // defaults to originalParentEl which remains
      // even when the dom changes it ubication
      return this.target || this.$options._parentElm
    },
    placement: function placement () {
      // translate position to popper.js placement
      return this.position
        .replace(/-(left|top)/, '-start')
        .replace(/-(right|bottom)/, '-end')
        .replace(/-(center|justify)/, '')
    },
    enterActiveClass: function enterActiveClass () {
      var classes = this.animation.split(',').map(function (c) { return c.trim(); }).filter(function (c) { return c; });
      return classes[0] || ' '
    },
    leaveActiveClass: function leaveActiveClass () {
      var classes = this.animation.split(',').map(function (c) { return c.trim(); }).filter(function (c) { return c; });
      return (classes[1] || classes[0]) || ' '
    }
  },
  beforeUpdate: function beforeUpdate () {
    // update popper
    this.$popper.options.placement = this.placement;
    // console.log(this.$popper)
    this.$popper.update();
  },
  mounted: function mounted () {
    var this$1 = this;

    // move dom to body
    document.body.appendChild(this.$el);

    // init popper
    this.$popper = new popper_es5(
      this.targetElement,
      this.$el,
      {
        placement: this.placement,
        modifiers: Object.assign({}, this.modifiers,
          {flip: { enabled: this.flip },
          applyStyle: { enabled: false },
          applyCustomStyles: {
            enabled: true,
            function: function (data) {
              this$1.$el.style.top = data.offsets.popper.top + 'px';
              this$1.$el.style.left = data.offsets.popper.left + 'px';
            },
            order: 800
          }})
      }
    );
  }
};

var onClickOut;
var onMouseenter;
var onMouseleave;
var onTargetClick;

var Dropdown = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"enter-to-class":"uk-open","enter-active-class":_vm.enterActiveClass,"leave-active-class":_vm.leaveActiveClass,"leave-class":"uk-open"},on:{"after-enter":_vm.afterEnter}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],staticClass:"uk-dropdown",staticStyle:{"display":"block"}},[_vm._t("default")],2)])},staticRenderFns: [],
  name: 'VkDropdown',
  mixins: [PopperMixin],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    /* [top|right|bottom|left]-[left|center|right|justify] */
    position: {
      type: String,
      default: 'bottom-left'
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    // prepare delay helper function
    var delayFn = function (time, cb) {
      setTimeout(function (_) { return cb(); }, time);
    };

    onTargetClick = function (e) {
      this$1.$emit('targetClick', e);
    };

    onMouseenter = function (e) {
      // ignore childs triggers
      if (this$1.targetElement.contains(e.fromElement)) {
        return
      }
      this$1.$emit('mouseenter', { delay: delayFn }, e);
    };

    onMouseleave = function (e) {
      // ignore childs triggers
      if (e.relatedTarget === this$1.targetElement || e.relatedTarget === this$1.$el ||
        this$1.targetElement.contains(e.relatedTarget) || this$1.$el.contains(e.relatedTarget)
      ) {
        return
      }
      this$1.$emit('mouseleave', { delay: delayFn }, e);
    };

    onClickOut = function (e) {
      if (this$1.show) {
        // clicking target
        if (e.target === this$1.targetElement || this$1.targetElement.contains(e.target)) {
          return
        }
        // click in/out dropdown
        if (e.target === this$1.$el || this$1.$el.contains(e.target)) {
          this$1.$emit('clickIn', e);
        } else {
          this$1.$emit('clickOut', e);
        }
      }
    };

    on(this.$el, 'mouseleave', onMouseleave, this._uid);
    on(this.targetElement, 'mouseenter', onMouseenter, this._uid);
    on(this.targetElement, 'mouseleave', onMouseleave, this._uid);
    on(this.targetElement, 'click', onTargetClick, this._uid);
    on(document, 'click', onClickOut, this._uid);
    if ('ontouchstart' in document.documentElement) {
      on(document, 'touchstart', onClickOut, this._uid);
    }
  },
  methods: {
    afterEnter: function afterEnter () {
      addClass(this.$el, 'uk-open');
    },
    remove: function remove () {
      if (this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  },
  beforeDestroy: function beforeDestroy () {
    offAll(this._uid);
    this.remove();
  }
};

var doc$1 = document.documentElement;
var body = document.body;

var active;
var activeCount;

on(doc$1, 'click', function (e) {
  if (active && !active.$refs.panel.contains(e.target)) {
    active.$emit('clickOut', e);
  }
});

on(doc$1, 'keyup', function (e) {
  if (e.keyCode === 27 && active) {
    e.preventDefault();
    active.$emit('keyEsc', e);
  }
});

var ModalMixin = {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    overlay: {
      type: Boolean,
      default: true
    }
  },
  data: function () { return ({
    active: active,
    activeCount: activeCount
  }); },
  mounted: function mounted () {
    // move dom to body
    body.appendChild(this.$el);
  },
  methods: {
    _beforeEnter: function _beforeEnter () {
      if (!active) {
        body.style['overflow-y'] = getScrollbarWidth() && this.overlay ? 'scroll' : '';
      }
    },
    _afterEnter: function _afterEnter () {
      // if any previous modal active
      // emit event for further actions
      if (active) {
        active.$emit('inactive');
      }
      // change current active modal
      active = this;
      activeCount++;
    },
    _afterLeave: function _afterLeave () {
      activeCount--;
      // if no active modals left
      if (!activeCount) {
        body.style['overflow-y'] = '';
      }
      if (active === this) {
        active = null;
      }
    }
  },
  beforeDestroy: function beforeDestroy () {
    offAll(this._uid);
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};

var getScrollbarWidth = function () {
  var width = doc$1.style.width;
  doc$1.style.width = '';
  var scrollbarWidth = window.innerWidth - doc$1.offsetWidth;

  if (width) {
    doc$1.style.width = width;
  }

  return scrollbarWidth
};

var doc = document.documentElement;

var Modal = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"enter-to-class":"uk-open","leave-class":"uk-open"},on:{"before-enter":_vm.beforeEnter,"after-enter":_vm.afterEnter,"after-leave":_vm.afterLeave}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],staticClass:"uk-modal",class:{ 'uk-modal-lightbox': _vm.lightbox, 'uk-modal-container': _vm.container, 'uk-modal-full': _vm.full },staticStyle:{"display":"block"}},[_c('modal-content')],1)])},staticRenderFns: [],
  name: 'VkModal',
  mixins: [ModalMixin],
  components: {
    'modal-content': {
      functional: true,
      render: function render (h, ref) {
        var vm = ref.parent;

        return vm.dialogIsOverriden
          ? vm.$slots.default
          : h('vk-modal-dialog', vm.$slots.default)
      }
    }
  },
  props: {
    center: {
      type: Boolean,
      default: false
    },
    container: {
      type: Boolean,
      default: false
    },
    lightbox: {
      type: Boolean,
      default: false
    },
    full: {
      type: Boolean,
      default: false
    },
    blank: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // if dialog is passed as slot is considered overriden
    dialogIsOverriden: function dialogIsOverriden () {
      return this.$slots.default[0] &&
        this.$slots.default[0].data &&
        this.$slots.default[0].data.staticClass === 'uk-modal-dialog'
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    // execute transition hooks if visible on load
    if (this.show) {
      this.beforeEnter();
      this.afterEnter();
    }

    // set refs programatically
    this.$refs.panel = this.$el.querySelector('.uk-modal-dialog');
    this.$refs.close = this.$el.querySelector('button.uk-close');

    // place close-top outside the dialog
    if (this.$refs.close && hasClass(this.$refs.close, 'vk-modal-close-top')) {
      removeClass(this.$refs.close, 'vk-modal-close-top');
      var bar = document.createElement('div');
      addClass(bar, 'uk-modal-bar');
      addClass(bar, 'uk-position-top');
      bar.appendChild(this.$refs.close);
      this.$el.appendChild(bar);
    }

    // place caption bottom outside the dialog
    var caption = this.$el.querySelector('.vk-modal-caption-bottom');
    if (caption) {
      addClass(caption, 'uk-modal-bar');
      addClass(caption, 'uk-position-bottom');
      removeClass(caption, 'vk-modal-caption-bottom');
      this.$el.appendChild(caption);
    }

    // update close style if full
    if (this.full) {
      removeClass(this.$refs.close, 'uk-modal-close-default');
      addClass(this.$refs.close, 'uk-modal-close-full');
    }

    // init events
    var clickHandler = function (e) {
      if (e.target === this$1.$refs.panel || this$1.$refs.panel.contains(e.target)) {
        this$1.$emit('clickIn', e);
      }
    };

    on(this.$el, 'click', clickHandler, this._uid);
    if ('ontouchstart' in document.documentElement) {
      on(this.$el, 'touchstart', clickHandler, this._uid);
    }
  },
  methods: {
    beforeEnter: function beforeEnter () {
      var this$1 = this;

      this._beforeEnter();
      this.$nextTick(function () {
        addClass(doc, 'uk-modal-page');
        this$1.resize();
      });
    },
    afterEnter: function afterEnter () {
      this._afterEnter();
      addClass(this.$el, 'uk-open');
    },
    afterLeave: function afterLeave () {
      this._afterLeave();
      // if no active modals left
      if (!this.activeCount) {
        removeClass(doc, 'uk-modal-page');
      }
    },
    resize: function resize () {
      if (css(this.$el, 'display') === 'block' && this.center) {
        removeClass(this.$el, 'uk-flex uk-flex-center uk-flex-middle');

        var dialog = this.$refs.panel;
        var dh = dialog.offsetHeight;
        var marginTop = css(dialog, 'margin-top');
        var marginBottom = css(dialog, 'margin-bottom');
        var pad = parseInt(marginTop, 10) + parseInt(marginBottom, 10);

        if (window.innerHeight > (dh + pad)) {
          addClass(this.$el, 'uk-flex uk-flex-center uk-flex-middle');
        } else {
          removeClass(this.$el, 'uk-flex uk-flex-center uk-flex-middle');
        }
        this.$el.style.display = hasClass(this.$el, 'uk-flex') ? '' : 'block';
      }
    }
  }
};

var ModalDialog = {
  functional: true,
  render: function render (h, ref) {
    var children = ref.children;
    var data = ref.data;

    return h('div', Object.assign({}, data,
      {staticClass: 'uk-modal-dialog',
      class: [data.staticClass]}), children)
  }
};

var ModalHeader = {
  functional: true,
  render: function render (h, ref) {
    var children = ref.children;
    var data = ref.data;

    return h('div', Object.assign({}, data,
      {staticClass: 'uk-modal-header',
      class: [data.staticClass]}), children)
  }
};

var ModalBody = {
  functional: true,
  render: function render (h, ref) {
    var children = ref.children;
    var data = ref.data;

    return h('div', Object.assign({}, data,
      {staticClass: 'uk-modal-body',
      class: [data.staticClass]}), children)
  }
};

var ModalFooter = {
  functional: true,
  render: function render (h, ref) {
    var children = ref.children;
    var data = ref.data;

    return h('div', Object.assign({}, data,
      {staticClass: 'uk-modal-footer',
      class: [data.staticClass]}), children)
  }
};

var ModalCaption = {
  functional: true,
  props: ['bottom'],
  render: function render (h, ref) {
    var children = ref.children;
    var data = ref.data;
    var props = ref.props;

    var bottom = props.bottom !== undefined;
    return h('div', Object.assign({}, data,
      {class: [
        {
          'uk-modal-caption': !bottom,
          'vk-modal-caption-bottom': bottom
        },
        data.staticClass
      ]}), children)
  }
};

var ModalClose = {
  functional: true,
  props: ['outside', 'full', 'top'],
  render: function render (h, ref) {
    var children = ref.children;
    var data = ref.data;
    var props = ref.props;

    var outside = props.outside !== undefined;
    var full = props.full !== undefined;
    var top = props.top !== undefined;
    return h('button', Object.assign({}, data,
      {staticClass: 'uk-close uk-icon',
      class: [
        {
          'uk-modal-close-default': !outside && !full,
          'uk-modal-close-outside': outside,
          'uk-modal-close-full': full,
          'vk-modal-close-top': top
        },
        data.staticClass
      ],
      attrs: {
        type: 'button',
        'uk-close': true
      }}), children)
  }
};

var Notification = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"uk-notification",class:[("uk-notification-" + (_vm.position))]},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'VkNotification',
  props: {
    position: {
      type: String,
      default: 'top-center' // (top|bottom)-(left|center|right)
    }
  },
  mounted: function mounted () {
    // move to body
    document.body.appendChild(this.$el);
  },
  beforeDestroy: function beforeDestroy () {
    if (this.$el.parentNode) {
      document.body.removeChild(this.$el);
    }
  }
};

var NotificationMessage = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.transition}},[_c('div',{staticClass:"uk-notification-message",class:( obj = {}, obj[("uk-notification-message-" + (_vm.status))] = _vm.status, obj ),on:{"click":function($event){_vm.$parent.$emit('click', _vm.id);}}},[_vm._t("default")],2)])
var obj;},staticRenderFns: [],
  name: 'VkNotificationMessage',
  props: {
    id: {
      type: [Number, String, Object],
      default: 0
    },
    /* primary|success|warning|danger */
    status: {
      type: String,
      default: ''
    },
    timeout: {
      type: Number,
      default: 5000
    },
    transition: {
      type: String,
      default: ''
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    if (this.timeout > 0) {
      setTimeout(function () {
        this$1.$parent.$emit('timeout', this$1.id);
      }, this.timeout);
    }
  }
};

var doc$2 = document.documentElement;

var Offcanvas = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"enter-to-class":"uk-open","leave-active-class":"uk-offcanvas-bar-animation"},on:{"before-enter":_vm.beforeEnter,"after-enter":_vm.afterEnter,"before-leave":_vm.beforeLeave,"after-leave":_vm.afterLeave}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],staticClass:"uk-offcanvas",staticStyle:{"display":"block"}},[_c('div',{ref:"panel",staticClass:"uk-offcanvas-bar",class:{ 'uk-offcanvas-bar-flip': _vm.flip }},[_vm._t("default")],2)])])},staticRenderFns: [],
  name: 'VkOffcanvas',
  mixins: [ModalMixin],
  props: {
    flip: {
      type: Boolean,
      default: false
    },
    overlay: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'slide'
    }
  },
  data: function () { return ({
    clsPage: 'uk-offcanvas-page',
    clsFlip: 'uk-offcanvas-flip',
    clsPageAnimation: 'uk-offcanvas-page-animation',
    clsSidebarAnimation: 'uk-offcanvas-bar-animation',
    clsMode: 'uk-offcanvas',
    clsOverlay: 'uk-offcanvas-overlay',
    clsPageOverlay: 'uk-offcanvas-page-overlay'
  }); },
  created: function created () {
    this.clsFlip = this.flip ? this.clsFlip : '';
    this.clsOverlay = this.overlay ? this.clsOverlay : '';
    this.clsPageOverlay = this.overlay ? this.clsPageOverlay : '';
    this.clsMode = (this.clsMode) + "-" + (this.mode);

    if (this.mode === 'none' || this.mode === 'reveal') {
      this.clsSidebarAnimation = '';
    }
    if (this.mode !== 'push' && this.mode !== 'reveal') {
      this.clsPageAnimation = '';
    }
  },
  methods: {
    beforeEnter: function beforeEnter () {
      this._beforeEnter();
      addClass(doc$2, ((this.clsPage) + " " + (this.clsFlip) + " " + (this.clsPageAnimation) + " " + (this.clsPageOverlay)));
      addClass(this.$refs.panel, ((this.clsSidebarAnimation) + " " + (this.clsMode)));
      addClass(this.$el, this.clsOverlay);
      this.$el.style.display = 'block';
      this.$el.offsetHeight; // force redraw
    },
    afterEnter: function afterEnter () {
      this._afterEnter();
      addClass(this.$el, 'uk-open');
      this._afterEnter();
    },
    beforeLeave: function beforeLeave () {
      removeClass(doc$2, this.clsPageAnimation);
      doc$2.style['margin-left'] = '';
      removeClass(this.$el, 'uk-open');

      // if (this.mode === 'none' || this.getActive() && this.getActive() !== this) {
      //     this.panel.trigger(transitionend);
      // }
    },
    afterLeave: function afterLeave () {
      this._afterLeave();
      removeClass(doc$2, ((this.clsPage) + " " + (this.clsFlip) + " " + (this.clsPageOverlay)));
      removeClass(this.$refs.panel, ((this.clsSidebarAnimation) + " " + (this.clsMode)));
      removeClass(this.$el, ("" + (this.clsOverlay)));
      this.$el.style.display = '';
      this.$el.offsetHeight; // force redraw
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    var clickHandler = function (e) {
      if (e.target === this$1.$refs.panel || this$1.$refs.panel.contains(e.target)) {
        this$1.$emit('clickIn', e);
      }
    };

    on(this.$el, 'click', clickHandler, this._uid);
    if ('ontouchstart' in document.documentElement) {
      on(this.$el, 'touchstart', clickHandler, this._uid);
    }
  }
};

/**
 * Returns an array with represented ranges pages
 */
var paginationMatrix = function (ref) {
  var active = ref.active; if ( active === void 0 ) active = 1;
  var total = ref.total; if ( total === void 0 ) total = 200;
  var limit = ref.limit; if ( limit === void 0 ) limit = 10;
  var range$$1 = ref.range; if ( range$$1 === void 0 ) range$$1 = 3;

  var matrix = [];
  var totalPages = Math.ceil(total / limit);
  // get main pages
  var mainPages = getMainPages({ active: active, range: range$$1, totalPages: totalPages });
  var first = mainPages[0];
  var last = mainPages[mainPages.length - 1];
  // get pre/post pages
  var prePages = range(1, (first <= 3) ? first : 2);
  var postPages = range(
    last >= (totalPages - 2) ? last + 1 : totalPages,
    totalPages + 1
  );

  var nextPage = 1;[].concat(prePages, mainPages, postPages).forEach(function (page) {
    if (page === nextPage) {
      matrix.push(page);
      nextPage++;
    } else {
      matrix.push('...');
      matrix.push(page);
      nextPage = page + 1;
    }
  });

  return matrix
};

var getMainPages = function (ref) {
  var active = ref.active;
  var range$$1 = ref.range;
  var totalPages = ref.totalPages;

  var start = active - range$$1;
  var end = active + range$$1;
  if (end > totalPages) {
    end = totalPages;
    start = totalPages - range$$1 * 2;
    start = start < 1 ? 1 : start;
  }
  if (start <= 1) {
    start = 1;
    end = Math.min(range$$1 * 2 + 1, totalPages);
  }
  return range(start, end + 1)
};

var Pagination = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"uk-pagination",class:{ 'uk-flex-center': _vm.alignment === 'center', 'uk-flex-right': _vm.alignment === 'right' }},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'VkPagination',
  props: {
    // currently active page
    active: {
      type: Number
    },
    // total amount of items
    total: {
      type: Number
    },
    // items displayed on each page
    limit: {
      type: Number
    },
    alignment: {
      type: String,
      default: 'left' // left|center|right|expand
    }
  },
  computed: {
    activePage: {
      get: function get () {
        var activeEl = this.$el.querySelector('li.uk-active');
        return this.active || (activeEl && activeEl.innerText) && parseInt(activeEl.innerText.trim())
      },
      cache: false
    },
    prevPage: {
      get: function get () {
        return this.activePage - 1
      },
      cache: false
    },
    nextPage: {
      get: function get () {
        return this.activePage + 1
      },
      cache: false
    },
    pages: function pages () {
      var activeEl = this.$el.querySelector('li.uk-active');
      if (activeEl) {
        return toArray(this.$el.querySelectorAll('a'))
          .filter(function (el) { return !el.querySelector('span') && el.innerText; })
          .map(function (el) { return parseInt(el.innerText.trim()); })
      } else {
        return paginationMatrix({ active: this.active, total: this.total, limit: this.limit })
      }
    },
    lastPage: function lastPage () {
      return this.pages[this.pages.length - 1]
    }
  },
  updated: function updated () {
    this.updatePrevNextState();
  },
  mounted: function mounted () {
    this.updatePrevNextState();
    // warn about missing props if 'vk-pagination-pages' is missing
    var activeEl = this.$el.querySelector('li.uk-active');
    if (warn && !activeEl && (!this.limit || !this.active || !this.total)) {
      warn("[VkPagination warn]: the 'limit', 'active' and 'total' props must be set if 'vk-pagination-pages' is omited");
    }
  },
  methods: {
    /**
     * As the parent of functional components stated through a slot
     * is the context and not the usual parent, we don't have the expected
     * parent/child relation. Thus, forced to do this kind of workarounds
     */
    updatePrevNextState: function updatePrevNextState () {
      var prev = toArray(this.$el.querySelectorAll('span[uk-pagination-previous]'));
      var next = toArray(this.$el.querySelectorAll('span[uk-pagination-next]'));

      // add/remove disabled classes
      this.prevPage < 1
        ? prev.forEach(function (el) { return addClass(el.parentNode.parentNode, 'uk-disabled'); })
        : prev.forEach(function (el) { return removeClass(el.parentNode.parentNode, 'uk-disabled'); });
      this.nextPage > this.lastPage
        ? next.forEach(function (el) { return addClass(el.parentNode.parentNode, 'uk-disabled'); })
        : next.forEach(function (el) { return removeClass(el.parentNode.parentNode, 'uk-disabled'); });

      // add expand classes
      if (this.alignment === 'expand') {
        var el = getClosest(next[0], 'li');
        addClass(el, 'uk-margin-auto-left');
      }
    }
  }
};

var PaginationFirst = {
  functional: true,
  props: ['label'],
  render: function render (h, ref) {
    var props = ref.props;

    var label = props.label;
    return h('li', [
      h('a', {
        on: { click: function (e) {
          var pagVM = getClosest(e.target, 'ul.uk-pagination').__vue__;
          pagVM.$emit('change', 1);
        }}
      }, [
        h('span', {
          staticClass: 'uk-pagination-prev uk-icon',
          class: { 'uk-margin-small-right': label },
          attrs: { 'uk-pagination-previous': true }
        }),
        label && label
      ])
    ])
  }
};

var PaginationLast = {
  functional: true,
  props: ['label'],
  render: function render (h, ref) {
    var props = ref.props;

    var label = props.label;
    return h('li', [
      h('a', {
        on: { click: function (e) {
          var pagVM = getClosest(e.target, 'ul.uk-pagination').__vue__;
          pagVM.$emit('change', pagVM.lastPage);
        }}
      }, [
        label && label,
        h('span', {
          staticClass: 'uk-pagination-next uk-icon',
          class: { 'uk-margin-small-left': label },
          attrs: { 'uk-pagination-next': true }
        })
      ])
    ])
  }
};

var PaginationPrev = {
  functional: true,
  props: ['label'],
  render: function render (h, ref) {
    var props = ref.props;

    var label = props.label;
    return h('li', [
      h('a', {
        on: { click: function (e) {
          var pagVM = getClosest(e.target, 'ul.uk-pagination').__vue__;
          pagVM.$emit('change', pagVM.prevPage);
        }}
      }, [
        h('span', {
          staticClass: 'uk-pagination-prev uk-icon',
          class: { 'uk-margin-small-right': label },
          attrs: { 'uk-pagination-previous': true }
        }),
        label && label
      ])
    ])
  }
};

var PaginationNext = {
  functional: true,
  props: ['label'],
  render: function render (h, ref) {
    var props = ref.props;

    var label = props.label;
    return h('li', [
      h('a', {
        on: { click: function (e) {
          var pagVM = getClosest(e.target, 'ul.uk-pagination').__vue__;
          pagVM.$emit('change', pagVM.nextPage);
        }}
      }, [
        label && label,
        h('span', {
          staticClass: 'uk-pagination-next uk-icon',
          class: { 'uk-margin-small-left': label },
          attrs: { 'uk-pagination-next': true }
        })
      ])
    ])
  }
};

var PaginationPages = {
  functional: true,
  props: {
    // currently active page
    active: {
      type: Number,
      required: true
    },
    // total amount of items
    total: {
      type: Number,
      required: true
    },
    // items displayed on each page
    limit: {
      type: Number,
      required: true
    },
    // amount of visible pages around the active one
    range: {
      type: Number,
      default: 3
    }
  },
  render: function render (h, ref) {
    var props = ref.props;

    var active = props.active;
    var total = props.total;
    var limit = props.limit;
    var range$$1 = props.range;
    var pages = paginationMatrix({ active: active, total: total, limit: limit, range: range$$1 });
    return pages.map(function (page) {
      var isPage = isInteger(page);
      var isActive = isPage && active === page;
      return h('li', { class: { 'uk-active': isActive } }, [
        isPage
          ? isActive
            ? h('span', page)
            : h('a', {
              on: { click: function (e) {
                var pagVM = getClosest(e.target, 'ul.uk-pagination').__vue__;
                pagVM.$emit('change', page);
              }}
            }, page)
          : h('span', '...')
      ])
    })
  }
};

var Subnav = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"uk-subnav",class:{ 'uk-subnav-divider': _vm.divider, 'uk-subnav-pill': _vm.pill }},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'VkSubnav',
  props: {
    activeItem: [String, Number],
    divider: {
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
      get: function get () {
        return this.$slots.default.filter(function (c) { return c.componentOptions && c.componentOptions.tag === 'vk-subnav-item'; }
        )
      },
      cache: false
    }
  },
  beforeMount: function beforeMount () {
    this.updateItems();
  },
  beforeUpdate: function beforeUpdate () {
    this.updateItems();
  },
  methods: {
    updateItems: function updateItems () {
      var this$1 = this;

      this.items.forEach(function (item, index) {
        var alias = this$1.getItemAlias(item);
        var active = this$1.activeItem === alias;
        var props = item.componentOptions.propsData;
        props.active = active;
        props.alias = alias;
      });
    },
    getItemAlias: function getItemAlias (item) {
      return item.componentOptions.propsData.alias || this.items.indexOf(item) + 1
    }
  }
};

var SubnavItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{class:{ 'uk-active': _vm.active, 'uk-disabled': _vm.disabled }},[_c('a',{on:{"click":function($event){$event.preventDefault();(!_vm.disabled && !_vm.active) && _vm.$parent.$emit('change', _vm.alias);}}},[_vm._t("default",[_vm._v(_vm._s(_vm.label))])],2)])},staticRenderFns: [],
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

var Table = {
  name: 'VkTable',
  render: function render (h) {
    var this$1 = this;

    return h('table', { staticClass: 'uk-table' }, [
      this.$slots.default,
      h('thead', [
        h('tr', [
          this._l(this.columns, function (col) { return col._headerRender && col._headerRender.call(col._renderProxy, h); }
          )
        ])
      ]),
      h('tbody', [
        this._l(this.data, function (row, rowIndex) { return h('tr', {
            class: this$1.getRowClass(row, rowIndex),
            on: {
              click: function (e) {
                if (e.target.tagName === 'TR' || e.target.tagName === 'TD') {
                  this$1.$emit('clickRow', row);
                }
              }
            }
          }, [
            this$1._l(this$1.columns, function (col) { return col._cellRender && col._cellRender.call(col._renderProxy, h, { row: row, rowIndex: rowIndex }); }
            )
          ]); }
        )
      ])
    ])
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    sortedBy: {
      type: Object,
      default: function () { return ({}); } // { field: [asc|desc] }
    },
    rowClass: [String, Function]
  },
  data: function () { return ({
    columns: []
  }); },
  created: function created () {
    this.columns = this.$children;
  },
  methods: {
    getRowClass: function getRowClass (row, index) {
      return (typeof this.rowClass === 'function')
        ? this.rowClass(row, index)
        : this.rowClass
    }
  }
};

var Column = {
  render: function render (h) {
    return h('col')
  },
  created: function created () {
    this._headerRender = this.$options._parentVnode.componentOptions.Ctor.options.headerRender;
    this._cellRender = this.$options._parentVnode.componentOptions.Ctor.options.cellRender;
  },
  headerRender: function headerRender (h) {
    var scopedSlot = this.$scopedSlots && this.$scopedSlots.header;
    return h('th', {
      staticClass: this.headerClass
    }, [ scopedSlot
      ? scopedSlot()
      : this.header
    ])
  },
  cellRender: function cellRender (h, ref) {
    var row = ref.row;
    var rowIndex = ref.rowIndex;

    var cell = this.cell;
    var scopedSlot = this.$scopedSlots && this.$scopedSlots.cell;
    return h('td', {
      staticClass: this.cellClass
    }, [ scopedSlot
      ? scopedSlot({ row: row, rowIndex: rowIndex })
      : row[cell]
    ])
  }
};

var TableColumn = {
  name: 'VkTableColumn',
  extends: Column,
  props: {
    // the header label
    header: {
      type: String
    },
    headerClass: {
      type: String
    },
    // the cell key
    cell: {
      type: String
    },
    cellClass: {
      type: String
    }
  }
};

var Checkbox = {
  functional: true,
  props: ['checked'],
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;

    return h('input', Object.assign({}, data,
      {
        staticClass: 'uk-checkbox',
        attrs: {
          type: 'checkbox'
        },
        domProps: {
          checked: props.checked
        },
        on: Object.assign({}, data.on,
          {
            change: function (e) {
              // ensures checked state consistency
              e.target.checked = props.checked;
            }
          })
      }))
  }
};

var TableColumnSelect = {
  name: 'VkTableColumnSelect',
  extends: Column,
  props: {
    trackBy: {
      type: String
    },
    selection: {
      type: Object,
      default: function () { return ({}); }
    },
    headerClass: {
      type: String
    },
    cellClass: {
      type: String
    }
  },
  created: function created () {
    var this$1 = this;

    this.$parent.$on('clickRow', function (row) {
      this$1.$emit('selectRow', this$1.getRowId(row), row);
    });
  },
  methods: {
    getRowId: function getRowId (row) {
      if (warn && this.trackBy && row[this.trackBy] === undefined) {
        warn("[VkTable warn]: The selection of the rows could fail as some\n          data rows are missing the trackBy field.");
      }
      return this.trackBy
        ? row[this.trackBy]
        : this.$parent.data.indexOf(row)
    },
    isAllSelected: function isAllSelected () {
      var this$1 = this;

      return this.$parent.data.length && this.$parent.data.every(function (row) { return this$1.isSelected(row); })
    },
    isSelected: function isSelected (row) {
      return this.selection[this.getRowId(row)]
    }
  },
  headerRender: function headerRender (h) {
    var this$1 = this;

    var _parent = this.$parent;
    var scopedSlot = this.$scopedSlots && this.$scopedSlots.header;
    return h('th', {
      staticClass: this.headerClass,
      class: 'uk-form uk-text-center uk-table-shrink'
    }, [ scopedSlot
      ? scopedSlot()
      : h(Checkbox, {
        props: {
          checked: this.isAllSelected()
        },
        on: {
          click: function (e) {
            this$1.$emit('selectAll', _parent.data.map(function (row) { return this$1.getRowId(row); }), _parent.data);
          }
        }
      })
    ])
  },
  cellRender: function cellRender (h, ref) {
    var this$1 = this;
    var row = ref.row;

    var scopedSlot = this.$scopedSlots && this.$scopedSlots.cell;
    return h('td', {
      staticClass: this.cellClass,
      class: 'uk-form uk-text-center vk-table-width-minimum'
    }, [ scopedSlot
      ? scopedSlot({ rowId: this.getRowId(row), row: row })
      : h(Checkbox, {
        props: {
          checked: this.isSelected(row)
        },
        on: {
          click: function (e) {
            this$1.$emit('select', this$1.getRowId(row), row);
          }
        }
      })
    ])
  }
};

function processSortOrder (sortBy, sortedBy) {
  var newOrder = {};
  // prepare the final order object state
  if (sortedBy[sortBy]) {
    newOrder[sortBy] = sortedBy[sortBy] === 'asc'
      ? 'desc'
      : 'asc';
  } else {
    newOrder[sortBy] = 'asc';
  }
  return newOrder
}

var TableColumnSort = {
  name: 'VkTableColumnSort',
  extends: Column,
  props: {
    // the row value to be sorted by (defaults to cell prop)
    sortBy: {
      type: String
    },
    // the header label
    header: {
      type: String
    },
    headerClass: {
      type: String
    },
    // the cell key
    cell: {
      type: String
    },
    cellClass: {
      type: String
    }
  },
  headerRender: function headerRender (h) {
    var scopedSlot = this.$scopedSlots && this.$scopedSlots.header;
    var Table = this.$parent;
    var orderedBy = Table.sortedBy[this.cell];
    var sortBy = this.sortBy || this.cell;
    return h('th', {
      staticClass: this.headerClass,
      class: [
        'uk-visible-hover-inline',
        { 'uk-active': orderedBy }
      ]
    }, [ scopedSlot
      ? scopedSlot()
      : h('a', {
        staticClass: 'uk-position-relative uk-display-block uk-link-reset uk-text-nowrap',
        on: {
          click: function (e) {
            Table.$emit('sort', processSortOrder(sortBy, Table.sortedBy));
          }
        }
      }, [
        this.header,
        h('span', {
          staticClass: 'uk-icon uk-position-absolute',
          attrs: {
            'uk-icon': 'icon: arrow-down'
          },
          class: {
            'uk-invisible': !orderedBy
          },
          directives: [{
            name: 'show',
            value: (orderedBy === 'asc' || orderedBy === undefined)
          }]
        }),
        h('span', {
          staticClass: 'uk-icon uk-position-absolute',
          attrs: {
            'uk-icon': 'icon: arrow-up'
          },
          class: {
            'uk-invisible': !orderedBy
          },
          directives: [{
            name: 'show',
            value: orderedBy === 'desc'
          }]
        })
      ])
    ])
  }
};

var Tab = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._t("default")],2)},staticRenderFns: [],
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
  },
  created: function created () {
    if (!this.disabled && !this.$slots.default) {
      warn(("[VkTabs]: content is missing in tab " + (this.label)));
    }
  }
};

var core = {
  components: {
    TabContent: {
      functional: true,
      render: function render (h, ref) {
        var parent = ref.parent;

        return parent.$tabsNodes.filter(function (vn) { return parent.activeTab === parent.getTabId(vn); })
      }
    }
  },
  props: {
    activeTab: {
      type: [String, Number],
      required: true
    },
    transition: {
      type: String,
      default: 'vk-tabs-transition'
    }
  },
  computed: {
    tabs: {
      get: function get () {
        var this$1 = this;

        return this.$tabsNodes.map(function (vn) { return ({
          id: this$1.getTabId(vn),
          label: vn.componentOptions.propsData.label,
          disabled: vn.componentOptions.propsData.disabled !== undefined
        }); })
      },
      cache: false
    }
  },
  created: function created () {
    var this$1 = this;

    // save tabs nodes
    this.$tabsNodes = this.$slots.default.filter(function (vn) { return vn.componentOptions && vn.componentOptions.tag === 'vk-tab'; }
    );
    if (warn && !this.$tabsNodes) {
      warn("[VkTabs]: there are no tabs defined");
    }
    // set tabs key for keep-alive
    this.$tabsNodes.forEach(function (vn) { vn.key = this$1.getTabId(vn); });
  },
  methods: {
    getTabId: function getTabId (vn) {
      return vn.componentOptions.propsData.alias || this.$tabsNodes.indexOf(vn) + 1
    }
  }
};

var Tabs = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:{ 'uk-flex uk-flex-column-reverse': _vm.bottom }},[_c('ul',{staticClass:"uk-tab",class:( obj = { 'uk-flex-right': _vm.alignment === 'right', 'uk-flex-center': _vm.alignment === 'center', 'uk-tab-bottom uk-margin-remove-bottom': _vm.bottom }, obj[("uk-child-width-1-" + (_vm.tabs.length))] = _vm.alignment === 'justify', obj )},_vm._l((_vm.tabs),function(ref){
var id = ref.id;
var label = ref.label;
var disabled = ref.disabled;
return _c('li',{class:{ 'uk-active': _vm.activeTab === id, 'uk-disabled': disabled }},[_c('a',{on:{"click":function($event){$event.preventDefault();!disabled && _vm.$emit('change', id);}}},[_vm._v(_vm._s(label))])])})),_c('div',{class:{ 'uk-margin': _vm.bottom }},[_c('transition',{attrs:{"name":_vm.transition,"mode":"out-in"}},[_c('keep-alive',[_c('tab-content')],1)],1)],1)])
var obj;},staticRenderFns: [],
  name: 'VkTabs',
  extends: core,
  props: {
    alignment: {
      type: String,
      default: 'left' // left|right|center|justify
    },
    // flips tabs vertically
    bottom: {
      type: Boolean,
      default: false
    }
  }
};

var TabsVertical = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"uk-grid",class:{ 'uk-flex uk-flex-row-reverse': _vm.alignment === 'right' }},[_c('div',{staticClass:"uk-width-auto"},[_c('ul',{staticClass:"uk-tab",class:[_vm.alignment === 'right' ? 'uk-tab-right' : 'uk-tab-left' ]},_vm._l((_vm.tabs),function(ref){
var id = ref.id;
var label = ref.label;
var disabled = ref.disabled;
return _c('li',{class:{ 'uk-active': _vm.activeTab === id, 'uk-disabled': disabled }},[_c('a',{on:{"click":function($event){$event.preventDefault();!disabled && _vm.$emit('change', id);}}},[_vm._v(_vm._s(label))])])}))]),_c('div',{staticClass:"uk-width-expand"},[_c('transition',{attrs:{"name":_vm.transition,"mode":"out-in"}},[_c('keep-alive',[_c('tab-content')],1)],1)],1)])},staticRenderFns: [],
  name: 'VkTabsVertical',
  extends: core,
  props: {
    alignment: {
      type: String,
      default: 'left' // left|right
    }
  }
};

var onMouseenter$1;
var onMouseleave$1;

var Tooltip = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"enter-active-class":_vm.enterActiveClass,"leave-active-class":_vm.leaveActiveClass},on:{"after-leave":_vm.remove}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.active),expression:"active"}],staticClass:"uk-tooltip",staticStyle:{"display":"block"}},[_c('div',{staticClass:"uk-tooltip-inner",domProps:{"textContent":_vm._s(_vm.content)}})])])},staticRenderFns: [],
  name: 'VkTooltip',
  mixins: [PopperMixin],
  props: {
    /* [top|right|bottom|left]-[left|center|right|justify] */
    position: {
      type: String,
      default: 'top'
    },
    content: {
      type: String,
      default: ''
    },
    animation: {
      type: String,
      default: 'uk-animation-scale-up'
    },
    delay: {
      type: [Number, String],
      default: 0
    },
    modifiers: {
      type: Object,
      default: function () { return ({
        offset: {
          offset: '0 5'
        }
      }); }
    }
  },
  data: function () { return ({
    active: false,
    flipped: false
  }); },
  mounted: function mounted () {
    var this$1 = this;

    // initially the tooltip is off document
    this.remove();

    onMouseenter$1 = function () {
      setTimeout(function (_) {
        document.body.appendChild(this$1.$el);
        this$1.active = true;
        this$1.$emit('show');
      }, parseInt(this$1.delay));
    };

    onMouseleave$1 = function (e) {
      // ignore childs and tooltip hover triggers
      if (e.relatedTarget === this$1.targetElement || e.relatedTarget === this$1.$el ||
        this$1.targetElement.contains(e.relatedTarget) || this$1.$el.contains(e.relatedTarget)
      ) {
        return
      }

      this$1.active = false;
      offAll(this$1.$el, this$1._uid);
      this$1.$emit('hide');
    };

    on(this.$el, 'mouseleave', onMouseleave$1, this._uid);
    on(this.targetElement, 'mouseleave', onMouseleave$1, this._uid);
    on(this.targetElement, 'mouseenter', onMouseenter$1, this._uid);
    on(this.targetElement, 'focus', onMouseenter$1, this._uid);
    on(this.targetElement, 'blur', onMouseleave$1, this._uid);
  },
  methods: {
    remove: function remove () {
      if (this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  },
  beforeDestroy: function beforeDestroy () {
    if (this.targetElement) {
      offAll(this.targetElement, this._uid);
    }
    this.active = false;
    this.remove();
  }
};

var Upload = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"uk-placeholder uk-text-center",class:{ 'uk-dragover': _vm.dragged },on:{"dragenter":function($event){$event.stopPropagation();$event.preventDefault();},"dragover":function($event){$event.stopPropagation();$event.preventDefault();_vm.dragged = true;},"dragleave":function($event){$event.stopPropagation();$event.preventDefault();_vm.dragged = false;},"drop":_vm.dropped}},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'VkUpload',
  data: function () { return ({
    dragged: false
  }); },
  methods: {
    dropped: function dropped (e) {
      if (e.dataTransfer && e.dataTransfer.files) {
        e.stopPropagation();
        e.preventDefault();
        this.dragged = false;
        this.$emit('dropped', e.dataTransfer.files);
      }
    }
  }
};

var Vuikit = {
  Breadcrumb: Breadcrumb,
  BreadcrumbItem: BreadcrumbItem,
  Button: Button,
  ButtonCheckbox: ButtonCheckbox,
  ButtonRadio: ButtonRadio,
  Datepicker: Datepicker,
  Dropdown: Dropdown,
  Modal: Modal,
  ModalDialog: ModalDialog,
  ModalHeader: ModalHeader,
  ModalBody: ModalBody,
  ModalFooter: ModalFooter,
  ModalCaption: ModalCaption,
  ModalClose: ModalClose,
  Notification: Notification,
  NotificationMessage: NotificationMessage,
  Offcanvas: Offcanvas,
  Pagination: Pagination,
  PaginationFirst: PaginationFirst,
  PaginationLast: PaginationLast,
  PaginationPrev: PaginationPrev,
  PaginationNext: PaginationNext,
  PaginationPages: PaginationPages,
  Subnav: Subnav,
  SubnavItem: SubnavItem,
  Table: Table,
  TableColumn: TableColumn,
  TableColumnSelect: TableColumnSelect,
  TableColumnSort: TableColumnSort,
  Tab: Tab,
  Tabs: Tabs,
  TabsVertical: TabsVertical,
  Tooltip: Tooltip,
  Upload: Upload,
  install: function install (Vue) {
    var this$1 = this;

    var keys = Object.keys(this);
    keys.pop(); // remove 'install' from keys
    var i = keys.length;
    while (i--) {
      if (this$1[keys[i]].bind) {
        Vue.directive(("Vk" + (keys[i])), this$1[keys[i]]);
      } else {
        Vue.component(("Vk" + (keys[i])), this$1[keys[i]]);
      }
    }
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vuikit);
}

export default Vuikit;
