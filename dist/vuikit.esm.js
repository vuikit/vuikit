/*
 * Vuikit 0.7.2
 * (c) 2017 Miljan Aleksic
 * Released under the MIT License.
*/

import { Animation, addClass, css, debounce, each, flipPosition, forceRedraw, get, getDimensions, getFnArgs, getPosition, hasClass, inArray, isArray, isFunction, isInteger, isRtl, isString, off, offAll, offsetTop, on, range, removeClass, toMs, toNumber, toggleClass, warn } from '@vuikit/util';

function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? _ctx(out, _global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
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
var _export = $export;

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var toString$1 = {}.toString;

var _cof = function (it) {
  return toString$1.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});
var _shared = function (key) {
  return store[key] || (store[key] = {});
};

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var f$1 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$1
};

var f$2 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$2
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

// 19.1.2.1 Object.assign(target, source, ...)





var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = _toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = _objectGops.f;
  var isEnum = _objectPie.f;
  while (aLen > index) {
    var S = _iobject(arguments[index++]);
    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

var assign$2 = _core.Object.assign;

var assign = createCommonjsModule(function (module) {
module.exports = { "default": assign$2, __esModule: true };
});

var _extends = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;



var _assign2 = _interopRequireDefault(assign);

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
});

var _extends$1 = unwrapExports(_extends);

var index = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('ul', { staticClass: "uk-breadcrumb" }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'Breadcrumb',
  props: {
    location: {
      type: String,
      default: '/'
    }
  },
  computed: {
    items: {
      get: function get$$1() {
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

var index$1 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { class: { 'uk-active': _vm.active } }, [!_vm.disabled && !_vm.active ? _c('a', { on: { "click": function click($event) {
          $event.preventDefault();_vm.$parent.$emit('change', _vm.path);
        } } }, [_vm._t("default", [_vm._v(" " + _vm._s(_vm.label) + " ")])], 2) : _c('span', [_vm._t("default", [_vm._v(" " + _vm._s(_vm.label) + " ")])], 2)]);
  }, staticRenderFns: [],
  name: 'BreadcrumbItem',
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

var index$2 = {
  name: 'Button',
  functional: true,
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
    primary: {
      type: Boolean,
      default: false
    },
    secondary: {
      type: Boolean,
      default: false
    },
    danger: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    },
    link: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        children = _ref.children,
        listeners = _ref.listeners;
    var value = props.value,
        type = props.type,
        active = props.active,
        large = props.large,
        small = props.small,
        disabled = props.disabled;
    var primary = props.primary,
        secondary = props.secondary,
        danger = props.danger,
        text = props.text,
        link = props.link;


    var data = {
      value: value,
      attrs: {
        type: type,
        disabled: disabled
      },
      on: _extends$1({}, listeners),
      class: ['uk-button', {
        'uk-active': active,
        'uk-button-default': !(primary || secondary || danger || text || link),
        'uk-button-primary': primary,
        'uk-button-secondary': secondary,
        'uk-button-danger': danger,
        'uk-button-text': text,
        'uk-button-link': link,
        'uk-button-large': large,
        'uk-button-small': small
      }]
    };

    return h(
      'button',
      data,
      [children]
    );
  }
};

// true  -> String#at
// false -> String#codePointAt
var _stringAt = function (TO_STRING) {
  return function (that, pos) {
    var s = String(_defined(that));
    var i = _toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var _library = true;

var _redefine = _hide;

var _iterators = {};

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject(O);
  var keys = _objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
  return O;
};

var document$2 = _global.document;
var _html = document$2 && document$2.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



var IE_PROTO$1 = _sharedKey('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe');
  var i = _enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = createDict();
  return Properties === undefined ? result : _objectDps(result, Properties);
};

var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

var def = _objectDp.f;

var TAG = _wks('toStringTag');

var _setToStringTag = function (it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

var _iterCreate = function (Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
  _setToStringTag(Constructor, NAME + ' Iterator');
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


var IE_PROTO$2 = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = _toObject(O);
  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

var ITERATOR = _wks('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!_library && !_has(IteratorPrototype, ITERATOR)) _hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    _hide(proto, ITERATOR, $default);
  }
  // Plug for library
  _iterators[NAME] = $default;
  _iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) _redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

var $at = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

// call something on iterator step with safe closing on error

var _iterCall = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) _anObject(ret.call(iterator));
    throw e;
  }
};

// check on default Array iterator

var ITERATOR$1 = _wks('iterator');
var ArrayProto = Array.prototype;

var _isArrayIter = function (it) {
  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
};

var _createProperty = function (object, index, value) {
  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
  else object[index] = value;
};

// getting tag from 19.1.3.6 Object.prototype.toString()

var TAG$1 = _wks('toStringTag');
// ES3 wrong here
var ARG = _cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

var _classof = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
    // builtinTag case
    : ARG ? _cof(O)
    // ES3 arguments fallback
    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

var ITERATOR$2 = _wks('iterator');

var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$2]
    || it['@@iterator']
    || _iterators[_classof(it)];
};

var ITERATOR$3 = _wks('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR$3]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

var _iterDetect = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR$3]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR$3] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

_export(_export.S + _export.F * !_iterDetect(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = _toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = core_getIteratorMethod(O);
    var length, result, step, iterator;
    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = _toLength(O.length);
      for (result = new C(length); length > index; index++) {
        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

var from$2 = _core.Array.from;

var from = createCommonjsModule(function (module) {
module.exports = { "default": from$2, __esModule: true };
});

var toConsumableArray = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;



var _from2 = _interopRequireDefault(from);

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
});

var _toConsumableArray = unwrapExports(toConsumableArray);

// filter out text nodes (possible whitespaces)
function filterOutEmptyNodes(nodes) {
  return nodes.filter(function (c) {
    return c.tag || isAsyncPlaceholder(c);
  });
}

function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}

var index$3 = {
  name: 'ButtonGroupCheckbox',
  functional: true,
  props: {
    spaced: {
      type: Boolean,
      default: false
    }
  },
  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        children = _ref.children,
        listeners = _ref.listeners;

    var renderData = {
      class: {
        'uk-button-group': !props.spaced
      }
    };

    var value = [].concat(_toConsumableArray(data.model.value));
    var buttons = filterOutEmptyNodes(children);

    buttons.forEach(function (btnNode) {
      var btnValue = btnNode.data.value;
      var isActive = inArray(value, btnValue);

      btnNode.data.class['uk-active'] = isActive;
      btnNode.data.on.click = function () {
        // toggle value
        if (isActive) {
          var index = value.findIndex(function (v) {
            return v === btnValue;
          });
          value.splice(index, 1);
        } else {
          var _index = buttons.findIndex(function (v) {
            return v === btnNode;
          });
          value.splice(_index, 0, btnValue);
        }

        listeners.input(value);
      };
    });

    return h(
      'div',
      renderData,
      [children]
    );
  }
};

var index$4 = {
  name: 'ButtonGroupRadio',
  functional: true,
  props: {
    spaced: {
      type: Boolean,
      default: false
    }
  },
  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        children = _ref.children,
        listeners = _ref.listeners;

    var renderData = {
      class: {
        'uk-button-group': !props.spaced
      }
    };

    var radioValue = data.model.value;
    var buttons = filterOutEmptyNodes(children);

    buttons.forEach(function (node) {
      var btnValue = node.data.value;

      node.data.class['uk-active'] = btnValue === radioValue;
      node.data.on.click = function () {
        return listeners.input(btnValue);
      };
    });

    return h(
      'div',
      renderData,
      [children]
    );
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
function isDate (argument) {
  return argument instanceof Date
}

var is_date = isDate;

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
function parse (argument, dirtyOptions) {
  if (is_date(argument)) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime())
  } else if (typeof argument !== 'string') {
    return new Date(argument)
  }

  var options = dirtyOptions || {};
  var additionalDigits = options.additionalDigits;
  if (additionalDigits == null) {
    additionalDigits = DEFAULT_ADDITIONAL_DIGITS;
  } else {
    additionalDigits = Number(additionalDigits);
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

var parse_1 = parse;

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
  var date = parse_1(dirtyDate);
  var year = date.getFullYear();
  return year
}

var get_year = getYear;

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
  var date = parse_1(dirtyDate);
  var month = date.getMonth();
  return month
}

var get_month = getMonth;

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
  var date = parse_1(dirtyDate);
  var dayOfMonth = date.getDate();
  return dayOfMonth
}

var get_date = getDate;

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
  var dateLeft = parse_1(dirtyDateLeft);
  var dateRight = parse_1(dirtyDateRight);
  return dateLeft.getFullYear() === dateRight.getFullYear() &&
    dateLeft.getMonth() === dateRight.getMonth()
}

var is_same_month = isSameMonth;

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
  var date = parse_1(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date
}

var start_of_day = startOfDay;

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
  var dateLeftStartOfDay = start_of_day(dirtyDateLeft);
  var dateRightStartOfDay = start_of_day(dirtyDateRight);

  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime()
}

var is_same_day = isSameDay;

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
  var time = parse_1(dirtyDate).getTime();
  var startTime = parse_1(dirtyStartDate).getTime();
  var endTime = parse_1(dirtyEndDate).getTime();

  if (startTime > endTime) {
    throw new Error('The start of the range cannot be after the end of the range')
  }

  return time >= startTime && time <= endTime
}

var is_within_range = isWithinRange;

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
function isValid (dirtyDate) {
  if (is_date(dirtyDate)) {
    return !isNaN(dirtyDate)
  } else {
    throw new TypeError(toString.call(dirtyDate) + ' is not an instance of Date')
  }
}

var is_valid = isValid;

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
  var initialStartTime = parse_1(dirtyInitialRangeStartDate).getTime();
  var initialEndTime = parse_1(dirtyInitialRangeEndDate).getTime();
  var comparedStartTime = parse_1(dirtyComparedRangeStartDate).getTime();
  var comparedEndTime = parse_1(dirtyComparedRangeEndDate).getTime();

  if (initialStartTime > initialEndTime || comparedStartTime > comparedEndTime) {
    throw new Error('The start of the range cannot be after the end of the range')
  }

  return initialStartTime < comparedEndTime && comparedStartTime < initialEndTime
}

var are_ranges_overlapping = areRangesOverlapping;

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
  var date = parse_1(dirtyDate);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date
}

var start_of_month = startOfMonth;

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
function startOfWeek (dirtyDate, dirtyOptions) {
  var weekStartsOn = dirtyOptions ? (Number(dirtyOptions.weekStartsOn) || 0) : 0;

  var date = parse_1(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date
}

var start_of_week = startOfWeek;

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
  var date = parse_1(dirtyDate);
  var month = date.getMonth();
  date.setFullYear(date.getFullYear(), month + 1, 0);
  date.setHours(23, 59, 59, 999);
  return date
}

var end_of_month = endOfMonth;

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
  var date = parse_1(dirtyDate);
  var year = date.getFullYear();
  var monthIndex = date.getMonth();
  var lastDayOfMonth = new Date(0);
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setHours(0, 0, 0, 0);
  return lastDayOfMonth.getDate()
}

var get_days_in_month = getDaysInMonth;

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
function addMonths (dirtyDate, dirtyAmount) {
  var date = parse_1(dirtyDate);
  var amount = Number(dirtyAmount);
  var desiredMonth = date.getMonth() + amount;
  var dateWithDesiredMonth = new Date(0);
  dateWithDesiredMonth.setFullYear(date.getFullYear(), desiredMonth, 1);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  var daysInMonth = get_days_in_month(dateWithDesiredMonth);
  // Set the last day of the new month
  // if the original date was the last day of the longer month
  date.setMonth(desiredMonth, Math.min(daysInMonth, date.getDate()));
  return date
}

var add_months = addMonths;

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
function addDays (dirtyDate, dirtyAmount) {
  var date = parse_1(dirtyDate);
  var amount = Number(dirtyAmount);
  date.setDate(date.getDate() + amount);
  return date
}

var add_days = addDays;

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
function subMonths (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return add_months(dirtyDate, -amount)
}

var sub_months = subMonths;

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
function subDays (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return add_days(dirtyDate, -amount)
}

var sub_days = subDays;

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
  var cleanDate = parse_1(dirtyDate);
  var date = new Date(0);
  date.setFullYear(cleanDate.getFullYear(), 0, 1);
  date.setHours(0, 0, 0, 0);
  return date
}

var start_of_year = startOfYear;

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
function differenceInCalendarDays (dirtyDateLeft, dirtyDateRight) {
  var startOfDayLeft = start_of_day(dirtyDateLeft);
  var startOfDayRight = start_of_day(dirtyDateRight);

  var timestampLeft = startOfDayLeft.getTime() -
    startOfDayLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE$1;
  var timestampRight = startOfDayRight.getTime() -
    startOfDayRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE$1;

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a day is not constant
  // (e.g. it's different in the day of the daylight saving time clock shift)
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY)
}

var difference_in_calendar_days = differenceInCalendarDays;

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
  var date = parse_1(dirtyDate);
  var diff = difference_in_calendar_days(date, start_of_year(date));
  var dayOfYear = diff + 1;
  return dayOfYear
}

var get_day_of_year = getDayOfYear;

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
  return start_of_week(dirtyDate, {weekStartsOn: 1})
}

var start_of_iso_week = startOfISOWeek;

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
  var date = parse_1(dirtyDate);
  var year = date.getFullYear();

  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  var startOfNextYear = start_of_iso_week(fourthOfJanuaryOfNextYear);

  var fourthOfJanuaryOfThisYear = new Date(0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  var startOfThisYear = start_of_iso_week(fourthOfJanuaryOfThisYear);

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year
  } else {
    return year - 1
  }
}

var get_iso_year = getISOYear;

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
  var year = get_iso_year(dirtyDate);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  var date = start_of_iso_week(fourthOfJanuary);
  return date
}

var start_of_iso_year = startOfISOYear;

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
function getISOWeek (dirtyDate) {
  var date = parse_1(dirtyDate);
  var diff = start_of_iso_week(date).getTime() - start_of_iso_year(date).getTime();

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1
}

var get_iso_week = getISOWeek;

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

var build_distance_in_words_locale = buildDistanceInWordsLocale;

var commonFormatterKeys = [
  'M', 'MM', 'Q', 'D', 'DD', 'DDD', 'DDDD', 'd',
  'E', 'W', 'WW', 'YY', 'YYYY', 'GG', 'GGGG',
  'H', 'HH', 'h', 'hh', 'm', 'mm',
  's', 'ss', 'S', 'SS', 'SSS',
  'Z', 'ZZ', 'X', 'x'
];

function buildFormattingTokensRegExp (formatters) {
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

var build_formatting_tokens_reg_exp = buildFormattingTokensRegExp;

function buildFormatLocale () {
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
    formattingTokensRegExp: build_formatting_tokens_reg_exp(formatters)
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

var build_format_locale = buildFormatLocale;

/**
 * @category Locales
 * @summary English locale.
 */
var en = {
  distanceInWords: build_distance_in_words_locale(),
  format: build_format_locale()
};

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
function format (dirtyDate, dirtyFormatStr, dirtyOptions) {
  var formatStr = dirtyFormatStr ? String(dirtyFormatStr) : 'YYYY-MM-DDTHH:mm:ss.SSSZ';
  var options = dirtyOptions || {};

  var locale = options.locale;
  var localeFormatters = en.format.formatters;
  var formattingTokensRegExp = en.format.formattingTokensRegExp;
  if (locale && locale.format && locale.format.formatters) {
    localeFormatters = locale.format.formatters;

    if (locale.format.formattingTokensRegExp) {
      formattingTokensRegExp = locale.format.formattingTokensRegExp;
    }
  }

  var date = parse_1(dirtyDate);

  if (!is_valid(date)) {
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
    return get_day_of_year(date)
  },

  // Day of year: 001, 002, ..., 366
  'DDDD': function (date) {
    return addLeadingZeros(get_day_of_year(date), 3)
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
    return get_iso_week(date)
  },

  // ISO week: 01, 02, ..., 53
  'WW': function (date) {
    return addLeadingZeros(get_iso_week(date), 2)
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
    return String(get_iso_year(date)).substr(2)
  },

  // ISO week-numbering year: 1900, 1901, ..., 2099
  'GGGG': function (date) {
    return get_iso_year(date)
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

var format_1 = format;

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
  var dateLeft = parse_1(dirtyDateLeft);
  var dateRight = parse_1(dirtyDateRight);

  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
  var monthDiff = dateLeft.getMonth() - dateRight.getMonth();

  return yearDiff * 12 + monthDiff
}

var difference_in_calendar_months = differenceInCalendarMonths;

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
  var date = parse_1(dirtyDate);
  var dateToCompare = parse_1(dirtyDateToCompare);
  return date.getTime() < dateToCompare.getTime()
}

var is_before = isBefore;

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
function addYears (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return add_months(dirtyDate, amount * 12)
}

var add_years = addYears;

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
function setYear (dirtyDate, dirtyYear) {
  var date = parse_1(dirtyDate);
  var year = Number(dirtyYear);
  date.setFullYear(year);
  return date
}

var set_year = setYear;

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
function setMonth (dirtyDate, dirtyMonth) {
  var date = parse_1(dirtyDate);
  var month = Number(dirtyMonth);
  var year = date.getFullYear();
  var day = date.getDate();

  var dateWithDesiredMonth = new Date(0);
  dateWithDesiredMonth.setFullYear(year, month, 15);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  var daysInMonth = get_days_in_month(dateWithDesiredMonth);
  // Set the last day of the new month
  // if the original date was the last day of the longer month
  date.setMonth(month, Math.min(day, daysInMonth));
  return date
}

var set_month = setMonth;

var PickerHeader = {
  functional: true,
  render: function render(h, _ref) {
    var vm = _ref.parent;

    return h('div', { class: 'uk-datepicker-heading' }, [h(Select, {
      props: {
        value: get_month(vm.date),
        options: getMonthsRange(vm.minPickableDate, vm.maxPickableDate).filter(function (month) {
          return is_within_range(set_month(vm.date, month), vm.minPickableDate, vm.maxPickableDate);
        }).map(function (month) {
          return {
            text: vm.format(set_month(vm.date, month), 'MMMM'),
            value: month
          };
        }),
        onChange: function onChange(e) {
          var selectedMonth = e.target.selectedOptions[0].value;
          vm.$emit('change', set_month(vm.date, selectedMonth));
        }
      }
    }, [vm.format(vm.date, 'MMMM')]), '&nbsp', h(Select, {
      props: {
        value: get_year(vm.date),
        options: getYearsRange(vm.minPickableDate, vm.maxPickableDate).filter(function (year) {
          return is_within_range(set_year(vm.date, year), vm.minPickableDate, vm.maxPickableDate);
        }).map(function (year) {
          return { text: year, value: year };
        }),
        onChange: function onChange(e) {
          var selectedYear = e.target.selectedOptions[0].value;
          vm.$emit('change', set_year(vm.date, selectedYear));
        }
      }
    }, [get_year(vm.date)])]);
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
      return h('span', { class: 'uk-form-select' }, [h('a', {
        on: {
          click: function click(e) {
            return e.preventDefault();
          }
        }
      }, [children, h('select', {
        domProps: {
          value: value
        },
        on: {
          change: onChange
        }
      }, [options.map(function (option) {
        return h('option', { domProps: {
            value: option.value
          } }, [option.text]);
      })])])]);
    } else {
      return children;
    }
  }
};

function getYearsRange(startDate, endDate) {
  var years = [];
  var curDate = startDate;
  while (is_before(curDate, endDate)) {
    years.push(get_year(curDate));
    curDate = add_years(curDate, 1);
  }
  return years;
}

function getMonthsRange(startDate, endDate) {
  var months = [];
  // if diff is bigger than 12, include all months
  if (difference_in_calendar_months(endDate, startDate) >= 12) {
    range(12).forEach(function (month) {
      months.push(month);
    });
    // otherwise iterate range
  } else {
    var curDate = startDate;
    while (is_before(curDate, endDate)) {
      months.push(get_month(curDate));
      curDate = add_months(curDate, 1);
    }
  }
  return months;
}

var rows = range(6);
var cols = range(7);

/**
 * Returns a two-dimensional array with calendar represented dates
 *
 * @date  Date or Object
 * @plain Boolean - Whetever the dates should be set as raw numbers
 */
var dateMatrix = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    year: get_year(Date.now()),
    month: get_month(Date.now()),
    weekStartsOn: 0
  },
      year = _ref.year,
      month = _ref.month,
      weekStartsOn = _ref.weekStartsOn;

  var plain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var matrix = [];
  var date = arguments[0] instanceof Date ? arguments[0] : new Date(year, month);
  var curDate = start_of_week(date, { weekStartsOn: weekStartsOn });

  rows.forEach(function (row) {
    var week = [];
    cols.forEach(function (col) {
      // when plain return a raw date re
      if (plain) {
        week.push(is_same_month(curDate, date) ? get_date(curDate) : -get_date(curDate));
      } else {
        week.push(curDate);
      }
      curDate = add_days(curDate, 1);
    });

    matrix.push(week);
  });

  return matrix;
};

var index$5 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', [_c('div', { staticClass: "uk-datepicker-nav" }, [_c('a', { directives: [{ name: "show", rawName: "v-show", value: _vm.isMonthDisplayable(_vm.prevMonth), expression: "isMonthDisplayable(prevMonth)" }], staticClass: "uk-datepicker-previous", on: { "click": function click($event) {
          $event.preventDefault();_vm.triggerChangeEvent(_vm.prevMonth);
        } } }), _vm._v(" "), _c('a', { directives: [{ name: "show", rawName: "v-show", value: _vm.isMonthDisplayable(_vm.nextMonth), expression: "isMonthDisplayable(nextMonth)" }], staticClass: "uk-datepicker-next", on: { "click": function click($event) {
          $event.preventDefault();_vm.triggerChangeEvent(_vm.nextMonth);
        } } }), _vm._v(" "), _c('picker-header')], 1), _vm._v(" "), _c('table', { staticClass: "uk-datepicker-table" }, [_c('thead', [_c('tr', _vm._l(_vm.weekDays, function (day) {
      return _c('th', [_vm._v(" " + _vm._s(_vm.format(day, 'ddd')) + " ")]);
    }))]), _vm._v(" "), _c('tbody', _vm._l(_vm.matrix, function (week) {
      return _c('tr', _vm._l(week, function (date, index) {
        return _c('td', [_c('a', { class: { 'uk-active': _vm.isPicked(date), 'uk-datepicker-table-disabled': _vm.isDisabled(date), 'uk-datepicker-table-muted': !_vm.isCurrentMonth(date) || _vm.isDisabled(date) }, on: { "click": function click($event) {
              $event.preventDefault();!_vm.isDisabled(date) && (_vm.isPicked(date) ? _vm.triggerUnpickEvent(date) : _vm.triggerPickEvent(date));
            } } }, [_vm._v(" " + _vm._s(_vm.format(date, 'D')) + " ")])]);
      }));
    }))])]);
  }, staticRenderFns: [],
  name: 'Datepicker',
  components: {
    PickerHeader: PickerHeader
  },
  props: {
    date: {
      type: [Date, String, Number],
      default: function _default() {
        return Date.now();
      },
      validator: function validator(date) {
        return is_valid(parse_1(date));
      }
    },
    // index first day week (0 - Sunday)
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
    // the minimum and maximum selectable dates
    // if Number, is relative from today
    minDate: {
      type: [Date, String, Number],
      default: '1980-01-01',
      validator: function validator(date) {
        return isInteger(date) ? true : is_valid(parse_1(date));
      }
    },
    maxDate: {
      type: [Date, String, Number],
      default: '2050-12-31',
      validator: function validator(date) {
        return isInteger(date) ? true : is_valid(parse_1(date));
      }
    }
  },
  computed: {
    matrix: function matrix() {
      return dateMatrix({
        year: get_year(this.date),
        month: get_month(this.date),
        weekStartsOn: this.weekStartsOn
      });
    },
    prevMonth: function prevMonth() {
      return this.format(sub_months(this.date, 1), 'YYYY-MM');
    },
    nextMonth: function nextMonth() {
      return this.format(add_months(this.date, 1), 'YYYY-MM');
    },
    minPickableDate: function minPickableDate() {
      return isInteger(this.minDate) ? sub_days(Date.now(), this.minDate + 1) : this.minDate;
    },
    maxPickableDate: function maxPickableDate() {
      return isInteger(this.maxDate) ? add_days(Date.now(), this.maxDate) : this.maxDate;
    },
    weekDays: function weekDays() {
      var startDay = start_of_week(this.date, { weekStartsOn: this.weekStartsOn });
      return range(7).map(function (val, index) {
        return add_days(startDay, index);
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
      var dirtyPickedDays = [].concat(_toConsumableArray(this.pickedDates), [pickedDate]);
      this.$emit('pick', {
        date: pickedDate,
        dates: dirtyPickedDays,
        format: this.format
      });
    },
    triggerUnpickEvent: function triggerUnpickEvent(unpickedDate) {
      var dirtyPickedDays = [].concat(_toConsumableArray(this.pickedDates));
      var index = dirtyPickedDays.findIndex(function (d) {
        return get_date(d) === get_date(unpickedDate);
      });
      dirtyPickedDays.splice(index, 1);
      this.$emit('unpick', {
        date: parse_1(unpickedDate),
        dates: dirtyPickedDays,
        format: this.format
      });
    },
    isCurrentMonth: function isCurrentMonth(date) {
      return is_same_month(this.date, date);
    },
    isPicked: function isPicked(date) {
      return this.pickedDates.some(function (d) {
        return is_same_day(d, date);
      });
    },
    isDisabled: function isDisabled(date) {
      return this.disabledDates.some(function (d) {
        return is_same_day(d, date);
      }) || !is_within_range(date, this.minPickableDate, this.maxPickableDate);
    },
    isMonthDisplayable: function isMonthDisplayable(date) {
      return are_ranges_overlapping(start_of_month(date), end_of_month(date), this.minPickableDate, this.maxPickableDate);
    },
    format: function format(date, _format) {
      return format_1(date, _format, { locale: this.locale });
    }
  }
};

// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

var $Object = _core.Object;
var defineProperty$3 = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

var defineProperty$1 = createCommonjsModule(function (module) {
module.exports = { "default": defineProperty$3, __esModule: true };
});

var defineProperty = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;



var _defineProperty2 = _interopRequireDefault(defineProperty$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};
});

var _defineProperty = unwrapExports(defineProperty);

var PositionMixin = {
  props: {
    animation: {
      type: String,
      default: ''
    },
    flip: {
      type: Boolean,
      default: true
    },
    offset: {
      type: [String, Boolean],
      default: false
    },
    boundaryAlign: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      top: '',
      left: ''
    };
  },
  computed: {
    pos: function pos() {
      return (this.position + (!~this.position.indexOf('-') ? '-center' : '')).split('-');
    }
  },
  methods: {
    positionAt: function positionAt(element, target, boundary) {
      var offset = toNumber(this.offset) || 0;
      var axis = this.getAxis();
      var flipped = getPosition(element, target, axis === 'x' ? flipPosition(this.dir) + ' ' + this.align : this.align + ' ' + flipPosition(this.dir), axis === 'x' ? this.dir + ' ' + this.align : this.align + ' ' + this.dir, axis === 'x' ? '' + (this.dir === 'left' ? -1 * offset : offset) : ' ' + (this.dir === 'top' ? -1 * offset : offset), null, this.flip, boundary);

      this.top = flipped.top;
      this.left = flipped.left;

      this.dir = axis === 'x' ? flipped.target.x : flipped.target.y;
      this.align = axis === 'x' ? flipped.target.y : flipped.target.x;
    },
    getAxis: function getAxis() {
      return this.pos[0] === 'top' || this.pos[0] === 'bottom' ? 'y' : 'x';
    }
  },
  created: function created() {
    this.dir = this.pos[0];
    this.align = this.pos[1];
  }
};

var onClickOut = void 0;
var onMouseenter = void 0;
var onTargetMouseenter = void 0;
var onTargetMouseleave = void 0;
var onClickTarget = void 0;

var Drop = { render: function render() {
    var _class;

    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.show, expression: "show" }], staticClass: "uk-drop", class: (_class = { 'uk-open': _vm.show, 'uk-drop-boundary': _vm.boundaryAlign }, _defineProperty(_class, 'uk-drop-' + _vm.position, _vm.show), _defineProperty(_class, 'uk-drop-' + _vm.dir + '-' + _vm.align, _vm.offset === false), _class), style: {
        'top': _vm.top + 'px',
        'left': _vm.left + 'px'
      } }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'Drop',
  mixins: [PositionMixin],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    targetRef: {
      type: String
      // defaults to previousElementSibling
    },
    boundaryRef: {
      default: function _default() {
        return window;
      }
    },
    boundaryAlign: {
      type: Boolean,
      default: false
    },
    /* [top|right|bottom|left]-[left|center|right] */
    position: {
      type: String,
      default: !isRtl ? 'bottom-left' : 'bottom-right'
    }
  },
  data: function data() {
    return {
      clsPos: 'uk-drop'
    };
  },
  computed: {
    $target: function $target() {
      return this.getRefElement(this.targetRef) || this.$el.previousElementSibling;
    },
    $boundary: function $boundary() {
      return this.getRefElement(this.boundaryRef) || window;
    }
  },
  methods: {
    getRefElement: function getRefElement(ref) {
      var context = this.$vnode.context;
      var target = context.$refs[ref];
      if (target) {
        return target._isVue ? target.$el : target;
      }
      return false;
    },
    doPosition: function doPosition() {
      var _this = this;

      this.top = '';
      this.left = '';

      var boundary = getDimensions(this.$boundary);
      var alignTo = this.boundaryAlign ? boundary : getDimensions(this.$target);

      if (this.align === 'justify') {
        var prop = this.getAxis() === 'y' ? 'width' : 'height';
        this.$el.style[prop] = alignTo[prop] + 'px';
      } else if (this.$el.offsetWidth > Math.max(boundary.right - alignTo.left, alignTo.right - boundary.left)) {
        // el.addClass(`uk-drop-stack`)
        // el.trigger('stack', [this])
      }

      this.$nextTick(function () {
        return _this.positionAt(_this.$el, _this.boundaryAlign ? _this.$boundary : _this.$target, _this.$boundary);
      });
    }
  },
  watch: {
    show: function show() {
      this.doPosition();
    }
  },
  init: function init() {
    // this.tracker = new MouseTracker();
  },
  mounted: function mounted() {
    var _this2 = this;

    var leaveTimeout = void 0;
    // prepare delay helper function
    var delayFn = function delayFn(time, cb) {
      setTimeout(function (_) {
        return cb();
      }, time);
    };

    onClickTarget = function onClickTarget(e) {
      _this2.$emit('click-target', e);
    };

    onMouseenter = function onMouseenter(e) {
      // ignore childs triggers
      if (_this2.$target.contains(e.fromElement)) {
        return;
      }
      clearTimeout(leaveTimeout);
      _this2.$emit('mouseenter', { delay: delayFn }, e);
    };

    onTargetMouseenter = function onTargetMouseenter(e) {
      if (_this2.$target.contains(e.fromElement)) {
        return;
      }
      clearTimeout(leaveTimeout);
      if (_this2.show) {
        return;
      }
      _this2.$emit('mouseenter', { delay: delayFn }, e);
      // return Animation.in(this.$el, this.animation[0], this.duration, this.origin);
      // Animation.in(this.$el, 'uk-animation-fade', 200, false)
    };

    onTargetMouseleave = function onTargetMouseleave(e) {
      // ignore childs triggers
      if (e.relatedTarget === _this2.$target || e.relatedTarget === _this2.$el || _this2.$target.contains(e.relatedTarget) || _this2.$el.contains(e.relatedTarget)) {
        return;
      }
      var delayFn = function delayFn(time, cb) {
        leaveTimeout = setTimeout(function (_) {
          return cb();
        }, time);
      };
      _this2.$emit('mouseleave', { delay: delayFn }, e);
    };

    onClickOut = function onClickOut(e) {
      if (_this2.show) {
        // clicking target
        if (e.target === _this2.$target || _this2.$target.contains(e.target)) {
          return;
        }
        // click in/out dropdown
        if (e.target === _this2.$el || _this2.$el.contains(e.target)) {
          _this2.$emit('click-in', e);
        } else {
          _this2.$emit('click-out', e);
        }
      }
    };

    on(this.$el, 'mouseleave', onTargetMouseleave, this._uid);
    on(this.$el, 'mouseenter', onMouseenter, this._uid);
    on(this.$target, 'mouseenter', onTargetMouseenter, this._uid);
    on(this.$target, 'mouseleave', onTargetMouseleave, this._uid);
    on(this.$target, 'click', onClickTarget, this._uid);
    on(document, 'click', onClickOut, this._uid);
    if ('ontouchstart' in document.documentElement) {
      on(document, 'touchstart', onClickOut, this._uid);
    }
  },
  beforeDestroy: function beforeDestroy() {
    offAll(this._uid);
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};

var index$6 = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.show, expression: "show" }], staticClass: "uk-dropdown", class: _defineProperty({ 'uk-open': _vm.show }, 'uk-dropdown-' + _vm.position, _vm.show), style: {
                'top': _vm.top + 'px',
                'left': _vm.left + 'px'
            } }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'Dropdown',
    extends: Drop
};

var index$7 = {
  name: 'Icon',
  functional: true,
  render: function render(h, _ref) {
    var data = _ref.data,
        listeners = _ref.listeners,
        children = _ref.children;

    // add static class now to avoid overrides
    data.class = ['uk-icon', data.class];

    return h('span', _extends$1({
      on: listeners
    }, data), children);
  }
};

var index$8 = {
  name: 'IconLink',
  functional: true,
  props: {
    reset: {
      type: Boolean,
      default: false
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        listeners = _ref.listeners,
        children = _ref.children;

    // add static class now to avoid overrides
    data.class = ['uk-icon', data.class, {
      'uk-icon-link': props.reset
    }];

    return h('a', _extends$1({
      on: listeners
    }, data), children);
  }
};

var index$9 = {
  name: 'IconButton',
  functional: true,
  render: function render(h, _ref) {
    var data = _ref.data,
        listeners = _ref.listeners,
        children = _ref.children;

    // add static class now to avoid overrides
    data.class = ['uk-icon uk-icon-button', data.class];

    return h('a', _extends$1({
      on: listeners
    }, data), children);
  }
};

var ModalDialog = {
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children,
        data = _ref.data;

    return h('div', _extends$1({}, data, {
      staticClass: 'uk-modal-dialog',
      class: [data.staticClass]
    }), children);
  }
};

var doc$1 = document.documentElement;
var body = document.body;

var active = void 0;
var activeCount = void 0;

on(doc$1, 'click', function (e) {
  if (active && !active.$refs.panel.contains(e.target)) {
    active.$emit('click-out', e);
  }
});

on(doc$1, 'keyup', function (e) {
  if (e.keyCode === 27 && active) {
    e.preventDefault();
    active.$emit('key-esc', e);
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
  data: function data() {
    return {
      active: active,
      activeCount: activeCount
    };
  },
  methods: {
    _beforeEnter: function _beforeEnter() {
      if (!active) {
        body.style['overflow-y'] = this.getScrollbarWidth() && this.overlay ? 'scroll' : '';
      }
    },
    _afterEnter: function _afterEnter() {
      // if any previous modal active
      // emit event for further actions
      if (active) {
        active.$emit('inactive');
      }
      // change current active modal
      active = this;
      activeCount++;
    },
    _afterLeave: function _afterLeave() {
      activeCount--;
      // if no active modals left
      if (!activeCount) {
        body.style['overflow-y'] = '';
      }
      if (active === this) {
        active = null;
      }
    },
    getScrollbarWidth: function getScrollbarWidth() {
      var width = doc$1.style.width;
      doc$1.style.width = '';
      var scrollbarWidth = window.innerWidth - doc$1.offsetWidth;

      if (width) {
        doc$1.style.width = width;
      }

      return scrollbarWidth;
    }
  },
  beforeDestroy: function beforeDestroy() {
    offAll(this._uid);
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};

var doc = document.documentElement;

var index$10 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('transition', { attrs: { "enter-to-class": "uk-open", "leave-class": "uk-open" }, on: { "before-enter": _vm.beforeEnter, "after-enter": _vm.afterEnter, "after-leave": _vm.afterLeave } }, [_c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.show, expression: "show" }], staticClass: "uk-modal", class: { 'uk-modal-lightbox': _vm.lightbox, 'uk-modal-container': _vm.container, 'uk-modal-full': _vm.full }, staticStyle: { "display": "block" } }, [_c('modal-content')], 1)]);
  }, staticRenderFns: [],
  name: 'Modal',
  mixins: [ModalMixin],
  components: {
    'modal-content': {
      functional: true,
      render: function render(h, _ref) {
        var vm = _ref.parent;

        return vm.dialogIsOverriden ? vm.$slots.default : h(ModalDialog, vm.$slots.default);
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
    dialogIsOverriden: function dialogIsOverriden() {
      return this.$slots.default[0] && this.$slots.default[0].data && this.$slots.default[0].data.staticClass === 'uk-modal-dialog';
    }
  },
  mounted: function mounted() {
    var _this = this;

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
    var clickHandler = function clickHandler(e) {
      if (e.target === _this.$refs.panel || _this.$refs.panel.contains(e.target)) {
        _this.$emit('click-in', e);
      }
    };

    on(this.$el, 'click', clickHandler, this._uid);
    if ('ontouchstart' in doc) {
      on(this.$el, 'touchstart', clickHandler, this._uid);
    }
  },

  methods: {
    beforeEnter: function beforeEnter() {
      var _this2 = this;

      this._beforeEnter();
      this.$nextTick(function () {
        addClass(doc, 'uk-modal-page');
        _this2.resize();
      });
    },
    afterEnter: function afterEnter() {
      this._afterEnter();
      addClass(this.$el, 'uk-open');
    },
    afterLeave: function afterLeave() {
      this._afterLeave();
      // if no active modals left
      if (!this.activeCount) {
        removeClass(doc, 'uk-modal-page');
      }
    },
    resize: function resize() {
      if (css(this.$el, 'display') === 'block' && this.center) {
        removeClass(this.$el, 'uk-flex uk-flex-center uk-flex-middle');

        var dialog = this.$refs.panel;
        var dh = dialog.offsetHeight;
        var marginTop = css(dialog, 'margin-top');
        var marginBottom = css(dialog, 'margin-bottom');
        var pad = parseInt(marginTop, 10) + parseInt(marginBottom, 10);

        if (window.innerHeight > dh + pad) {
          addClass(this.$el, 'uk-flex uk-flex-center uk-flex-middle');
        } else {
          removeClass(this.$el, 'uk-flex uk-flex-center uk-flex-middle');
        }
        this.$el.style.display = hasClass(this.$el, 'uk-flex') ? '' : 'block';
      }
    }
  }
};

var index$11 = {
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children,
        data = _ref.data;

    return h('div', _extends$1({}, data, {
      staticClass: 'uk-modal-header',
      class: [data.staticClass]
    }), children);
  }
};

var index$12 = {
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children,
        data = _ref.data;

    return h('div', _extends$1({}, data, {
      staticClass: 'uk-modal-body',
      class: [data.staticClass]
    }), children);
  }
};

var index$13 = {
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children,
        data = _ref.data;

    return h('div', _extends$1({}, data, {
      staticClass: 'uk-modal-footer',
      class: [data.staticClass]
    }), children);
  }
};

var index$14 = {
  functional: true,
  props: ['bottom'],
  render: function render(h, _ref) {
    var children = _ref.children,
        data = _ref.data,
        props = _ref.props;

    var bottom = props.bottom !== undefined;
    return h('div', _extends$1({}, data, {
      class: [{
        'uk-modal-caption': !bottom,
        'vk-modal-caption-bottom': bottom
      }, data.staticClass]
    }), children);
  }
};

var index$15 = {
  functional: true,
  props: ['outside', 'full', 'top'],
  render: function render(h, _ref) {
    var children = _ref.children,
        data = _ref.data,
        props = _ref.props;

    var outside = props.outside !== undefined;
    var full = props.full !== undefined;
    var top = props.top !== undefined;
    return h('button', _extends$1({}, data, {
      staticClass: 'uk-close uk-icon',
      class: [{
        'uk-modal-close-default': !outside && !full,
        'uk-modal-close-outside': outside,
        'uk-modal-close-full': full,
        'vk-modal-close-top': top
      }, data.staticClass],
      attrs: {
        type: 'button',
        'uk-close': true
      }
    }), children);
  }
};

var index$16 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "uk-notification", class: ["uk-notification-" + _vm.position] }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'Notification',
  props: {
    position: {
      type: String,
      default: 'top-center' // (top|bottom)-(left|center|right)
    }
  },
  mounted: function mounted() {
    // move to body
    document.body.appendChild(this.$el);
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$el.parentNode) {
      document.body.removeChild(this.$el);
    }
  }
};

var index$17 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('transition', { attrs: { "name": _vm.transition } }, [_c('div', { staticClass: "uk-notification-message", class: _defineProperty({}, 'uk-notification-message-' + _vm.status, _vm.status), on: { "click": function click($event) {
          _vm.$parent.$emit('click', _vm.id);
        } } }, [_vm._t("default")], 2)]);
  }, staticRenderFns: [],
  name: 'NotificationMessage',
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
  mounted: function mounted() {
    var _this = this;

    if (this.timeout > 0) {
      setTimeout(function () {
        _this.$parent.$emit('timeout', _this.id);
      }, this.timeout);
    }
  }
};

function warn$1(msg, vm) {
  return warn('[Vuikit Warn]: ' + msg, vm);
}

var doc$2 = document.documentElement;
var body$1 = document.body;
var scroll = void 0;

var index$18 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('transition', { attrs: { "css": false }, on: { "enter": _vm.transitionEnd, "leave": _vm.transitionEnd, "before-enter": _vm.beforeShow, "after-enter": _vm.afterEnter, "before-leave": _vm.beforeHide, "after-leave": _vm.hidden } }, [_c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.show, expression: "show" }], staticClass: "uk-offcanvas", staticStyle: { "display": "block" } }, [_vm.mode === 'reveal' ? _c('div', { class: [_vm.clsMode] }, [_c('div', { ref: "panel", staticClass: "uk-offcanvas-bar", class: { 'uk-offcanvas-bar-flip': _vm.flip } }, [_vm._t("default")], 2)]) : _c('div', { ref: "panel", staticClass: "uk-offcanvas-bar", class: { 'uk-offcanvas-bar-flip': _vm.flip } }, [_vm._t("default")], 2)])]);
  }, staticRenderFns: [],
  name: 'Offcanvas',
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
      default: 'slide' // none|slide|push|reveal
    }
  },
  data: function data() {
    return {
      defaults: {
        clsMode: 'uk-offcanvas',
        clsFlip: 'uk-offcanvas-flip',
        clsOverlay: 'uk-offcanvas-overlay',
        clsSidebarAnimation: 'uk-offcanvas-bar-animation',
        clsContentAnimation: 'uk-offcanvas-content-animation'
      },
      clsPage: 'uk-offcanvas-page',
      clsPageAnimation: 'uk-offcanvas-page-animation',
      clsContainer: 'uk-offcanvas-container',
      clsContent: 'uk-offcanvas-content'
    };
  },
  computed: {
    clsFlip: function clsFlip() {
      return this.flip ? this.defaults.clsFlip : '';
    },
    clsOverlay: function clsOverlay() {
      return this.overlay ? this.defaults.clsOverlay : '';
    },
    clsMode: function clsMode() {
      return this.defaults.clsMode + '-' + this.mode;
    },
    clsSidebarAnimation: function clsSidebarAnimation() {
      return this.mode === 'none' || this.mode === 'reveal' ? '' : this.defaults.clsSidebarAnimation;
    },
    clsContentAnimation: function clsContentAnimation() {
      return this.mode !== 'push' && this.mode !== 'reveal' ? '' : this.defaults.clsContentAnimation;
    },
    transitionElement: function transitionElement() {
      return this.mode === 'reveal' ? this.$refs.panel.parentNode : this.$refs.panel;
    },
    transitionDuration: function transitionDuration() {
      return toMs(css(this.transitionElement, 'transition-duration'));
    }
  },
  methods: {
    afterEnter: function afterEnter(el) {
      this._afterEnter();
      this.$emit('displayed');
    },
    getRefElement: function getRefElement(ref) {
      var context = this.$vnode.context;
      var target = context.$refs[ref];
      if (target) {
        return target._isVue ? target.$el : target;
      }
      return false;
    },
    beforeShow: function beforeShow() {
      scroll = scroll || { x: window.pageXOffset, y: window.pageYOffset };

      css(doc$2, 'overflow-y', (!this.clsContentAnimation || this.flip) && this.getScrollbarWidth() && this.overlay ? 'scroll' : '');

      // set fixed with so the page can slide-out without shinking
      css(doc$2, 'width', window.innerWidth - this.getScrollbarWidth() + 'px');

      addClass(doc$2, '' + this.clsPage);
      addClass(body$1, this.clsContainer + ' ' + this.clsFlip + ' ' + this.clsOverlay);
      forceRedraw(body$1);

      addClass(this.$refs.panel, this.clsSidebarAnimation + ' ' + (this.mode !== 'reveal' ? this.clsMode : ''));
      addClass(this.$el, this.clsOverlay);
      addClass(this.$refs.content, this.clsContentAnimation);

      // toggle element
      addClass(this.$el, this.clsOverlay);
      css(this.$el, 'display', 'block');
      forceRedraw(this.$el);
      addClass(this.$el, 'uk-open');
    },
    beforeHide: function beforeHide() {
      removeClass(this.$refs.content, this.clsContentAnimation);
      removeClass(this.$el, 'uk-open');
    },

    transitionEnd: function transitionEnd(el, done) {
      setTimeout(done, this.transitionDuration);
    },
    hidden: function hidden() {
      if (!this.overlay) {
        scroll = { x: window.pageXOffset, y: window.pageYOffset };
      }

      css(doc$2, 'width', '');
      removeClass(doc$2, '' + this.clsPage);

      removeClass(this.$refs.panel, this.clsSidebarAnimation + ' ' + this.clsMode);
      removeClass(this.$el, this.clsOverlay);
      css(this.$el, 'display', 'none');
      forceRedraw(this.$el);
      removeClass(body$1, this.clsContainer + ' ' + this.clsFlip + ' ' + this.clsOverlay);

      body$1.scrollTop = scroll.y;

      css(doc$2, 'overflow-y', '');
      css(this.$refs.content, 'width', '');
      css(this.$refs.content, 'height', '');
      forceRedraw(this.$refs.content);

      window.scrollTo(scroll.x, scroll.y);
      scroll = null;

      this._afterLeave();
      this.$emit('hidden');
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$refs.content = document.body.querySelector('.' + this.clsContent);

    if (!this.$refs.content) {
      warn$1('Offcanvas content is not detected, make sure to wrap it with OffcanvasContent.', this);
      this.$destroy();
      return;
    }

    var clickHandler = function clickHandler(e) {
      if (e.target === _this.$refs.panel || _this.$refs.panel.contains(e.target)) {
        _this.$emit('click-in', e);
      }
    };

    on(this.$el, 'click', clickHandler, this._uid);
    if ('ontouchstart' in document.documentElement) {
      on(this.$el, 'touchstart', clickHandler, this._uid);
    }
  },
  beforeDestroy: function beforeDestroy() {
    removeClass(doc$2, this.clsPage + ' ' + this.clsFlip + ' ' + this.clsPageOverlay);
    doc$2.style['margin-left'] = '';
    this._afterLeave();
  }
};

var index$19 = {
  name: 'OffcanvasContent',
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children;

    var nodesCount = children.length;

    if (nodesCount === 1) {
      var rawChild = children[0];

      if (rawChild.tag) {
        addNodeClass(rawChild);
        return rawChild;
      }
    }

    return h('div', {
      staticClass: 'uk-offcanvas-content'
    }, children);
  }
};

function addNodeClass(node) {
  var classes = node.data.staticClass ? node.data.staticClass.split(' ') : [];
  classes.push('uk-offcanvas-content');
  node.data.staticClass = classes.join(' ');
}

var IconClose = {
  functional: true,
  name: 'close-icon',
  render: function render(h, _ref) {
    var props = _ref.props;
    var viewBox = props.viewBox,
        _props$ratio = props.ratio,
        ratio = _props$ratio === undefined ? 1 : _props$ratio;
    var _props$width = props.width,
        width = _props$width === undefined ? 14 : _props$width,
        _props$height = props.height,
        height = _props$height === undefined ? 14 : _props$height;


    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }

    return h('svg', {
      attrs: {
        width: width,
        height: height,
        version: '1.1',
        meta: 'icon-close-icon ratio-' + ratio,
        viewBox: viewBox || '0 0 14 14'
      },
      domProps: {
        innerHTML: '<path fill="none" stroke="#000" stroke-width="1.1" d="M1 1l12 12M13 1L1 13"/>'
      }
    });
  }
};

var index$20 = {
  name: 'OffcanvasClose',
  functional: true,
  render: function render(h, _ref) {
    var data = _ref.data;

    return h('button', {
      staticClass: 'uk-offcanvas-close uk-close uk-icon',
      attrs: {
        type: 'button'
      },
      on: data.on
    }, [h(IconClose)]);
  }
};

var def$1 = { total: 200, page: 1, perPage: 10, range: 3

  /**
   * Returns an array with represented ranges pages
   */
};var paginationMatrix = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : def$1,
      _ref$total = _ref.total,
      total = _ref$total === undefined ? def$1.total : _ref$total,
      _ref$page = _ref.page,
      page = _ref$page === undefined ? def$1.page : _ref$page,
      _ref$perPage = _ref.perPage,
      perPage = _ref$perPage === undefined ? def$1.perPage : _ref$perPage,
      _ref$range = _ref.range,
      range$$1 = _ref$range === undefined ? def$1.range : _ref$range;

  var matrix = [];
  var totalPages = Math.ceil(total / perPage);
  // return early if no more than 1 page
  if (totalPages < 2) {
    return [1];
  }
  // get main pages
  var mainPages = getMainPages({ page: page, range: range$$1, totalPages: totalPages });
  var first = mainPages[0];
  var last = mainPages[mainPages.length - 1];
  // get pre/post pages
  var prePages = range(1, first <= 3 ? first : 2);
  var postPages = range(last >= totalPages - 2 ? last + 1 : totalPages, totalPages + 1);

  var nextPage = 1;[].concat(prePages, mainPages, postPages).forEach(function (p) {
    if (p === nextPage) {
      matrix.push(p);
      nextPage++;
    } else {
      matrix.push('...');
      matrix.push(p);
      nextPage = p + 1;
    }
  });

  return matrix;
};

var getMainPages = function getMainPages(_ref2) {
  var page = _ref2.page,
      range$$1 = _ref2.range,
      totalPages = _ref2.totalPages;

  var start = page - range$$1;
  var end = page + range$$1;
  if (end > totalPages) {
    end = totalPages;
    start = totalPages - range$$1 * 2;
    start = start < 1 ? 1 : start;
  }
  if (start <= 1) {
    start = 1;
    end = Math.min(range$$1 * 2 + 1, totalPages);
  }
  return range(start, end + 1);
};

var IconPrevious = {
  functional: true,
  name: 'pagination-previous',
  render: function render(h, _ref) {
    var props = _ref.props;
    var viewBox = props.viewBox,
        _props$ratio = props.ratio,
        ratio = _props$ratio === undefined ? 1 : _props$ratio;
    var _props$width = props.width,
        width = _props$width === undefined ? 7 : _props$width,
        _props$height = props.height,
        height = _props$height === undefined ? 12 : _props$height;


    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }

    return h('svg', {
      attrs: {
        width: width,
        height: height,
        version: '1.1',
        meta: 'icon-pagination-previous ratio-' + ratio,
        viewBox: viewBox || '0 0 7 12'
      },
      domProps: {
        innerHTML: '<path fill="none" stroke="#000" stroke-width="1.2" d="M6 1L1 6l5 5"/>'
      }
    });
  }
};

var PaginationFirst = {
  functional: true,
  props: ['label', 'expand'],
  render: function render(h, _ref) {
    var props = _ref.props,
        parent = _ref.parent;
    var label = props.label,
        expand = props.expand;

    // if not rendered by VkPagination, return comment to mark the position

    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', { attrs: { label: label, expand: expand } }, 'first');
    }

    return h('li', {
      class: {
        'uk-disabled': parent.prevPage < 1,
        'uk-margin-auto-right': expand !== undefined
      }
    }, [h('a', {
      on: { click: function click(e) {
          return parent.$emit('update:page', 1);
        } }
    }, [h('span', {
      staticClass: 'uk-icon uk-pagination-prev',
      class: {
        'uk-margin-small-right': label
      }
    }, [h(IconPrevious)]), label && label])]);
  }
};

var IconNext = {
  functional: true,
  name: 'pagination-next',
  render: function render(h, _ref) {
    var props = _ref.props;
    var viewBox = props.viewBox,
        _props$ratio = props.ratio,
        ratio = _props$ratio === undefined ? 1 : _props$ratio;
    var _props$width = props.width,
        width = _props$width === undefined ? 7 : _props$width,
        _props$height = props.height,
        height = _props$height === undefined ? 12 : _props$height;


    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }

    return h('svg', {
      attrs: {
        width: width,
        height: height,
        version: '1.1',
        meta: 'icon-pagination-next ratio-' + ratio,
        viewBox: viewBox || '0 0 7 12'
      },
      domProps: {
        innerHTML: '<path fill="none" stroke="#000" stroke-width="1.2" d="M1 1l5 5-5 5"/>'
      }
    });
  }
};

var PaginationLast = {
  functional: true,
  props: ['label', 'expand'],
  render: function render(h, _ref) {
    var props = _ref.props,
        parent = _ref.parent;
    var label = props.label,
        expand = props.expand;

    // if not rendered by VkPagination, return comment to mark the position

    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', { attrs: { label: label, expand: expand } }, 'last');
    }

    return h('li', {
      class: {
        'uk-disabled': parent.nextPage > parent.lastPage,
        'uk-margin-auto-left': expand !== undefined
      }
    }, [h('a', {
      on: { click: function click(e) {
          return parent.$emit('update:page', parent.lastPage);
        } }
    }, [label && label, h('span', {
      staticClass: 'uk-icon uk-pagination-next',
      class: {
        'uk-margin-small-left': label
      }
    }, [h(IconNext)])])]);
  }
};

var PaginationPrev = {
  functional: true,
  props: ['label', 'expand'],
  render: function render(h, _ref) {
    var props = _ref.props,
        parent = _ref.parent;
    var label = props.label,
        expand = props.expand;

    // if not rendered by VkPagination, return comment to mark the position

    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', { attrs: { label: label, expand: expand } }, 'prev');
    }

    return h('li', {
      class: {
        'uk-disabled': parent.prevPage < 1,
        'uk-margin-auto-right': expand !== undefined
      }
    }, [h('a', {
      on: { click: function click(e) {
          return parent.$emit('update:page', parent.prevPage);
        } }
    }, [h('span', {
      staticClass: 'uk-icon uk-pagination-prev',
      class: {
        'uk-margin-small-right': label
      }
    }, [h(IconPrevious)]), label && label])]);
  }
};

var PaginationNext = {
  functional: true,
  props: ['label', 'expand'],
  render: function render(h, _ref) {
    var props = _ref.props,
        parent = _ref.parent;
    var label = props.label,
        expand = props.expand;

    // if not rendered by VkPagination, return comment to mark the position

    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', { attrs: { label: label, expand: expand } }, 'next');
    }

    return h('li', {
      class: {
        'uk-disabled': parent.nextPage > parent.lastPage,
        'uk-margin-auto-left': expand !== undefined
      }
    }, [h('a', {
      on: { click: function click(e) {
          return parent.$emit('update:page', parent.nextPage);
        } }
    }, [label && label, h('span', {
      staticClass: 'uk-icon uk-pagination-next',
      class: {
        'uk-margin-small-left': label
      }
    }, [h(IconNext)])])]);
  }
};

var PaginationPages = {
  functional: true,
  render: function render(h, _ref) {
    var parent = _ref.parent;

    // if not rendered by VkPagination, return comment to mark the position
    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', 'pages');
    }

    var currentPage = parent.page;

    return parent.pages.map(function (page) {
      var isPage = isInteger(page);
      var isActive = isPage && currentPage === page;
      return h('li', { class: { 'uk-active': isActive } }, [isPage ? isActive ? h('span', page) : h('a', {
        on: { click: function click(e) {
            parent.$emit('update:page', page);
          } }
      }, page) : h('span', '...')]);
    });
  }
};

var partsMap = {
  first: PaginationFirst,
  last: PaginationLast,
  prev: PaginationPrev,
  next: PaginationNext,
  pages: PaginationPages
};

var index$21 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('ul', { staticClass: "uk-pagination", class: { 'uk-flex-center': _vm.align !== 'left' && _vm.align !== 'right', 'uk-flex-right': _vm.align === 'right' } }, [_c('pag-parts')], 1);
  }, staticRenderFns: [],
  name: 'Pagination',
  props: {
    align: {
      type: String,
      default: 'center' // left|center|right
    },
    // the active page
    page: {
      type: Number
    },
    // items displayed on each page
    perPage: {
      type: Number
    },
    // amount of visible pages around the active one
    range: {
      type: Number,
      default: 3
    },
    // total amount of items
    total: {
      type: Number
    }
  },
  computed: {
    prevPage: function prevPage() {
      return this.page - 1;
    },
    nextPage: function nextPage() {
      return this.page + 1;
    },
    pages: function pages() {
      return paginationMatrix({ total: this.total, page: this.page, perPage: this.perPage });
    },
    lastPage: function lastPage() {
      return this.pages[this.pages.length - 1];
    }
  },
  components: {
    'pag-parts': {
      functional: true,
      render: function render(h, _ref) {
        var parent = _ref.parent;

        var lis = [];
        parent.$parts.forEach(function (part) {
          part = parent.$createElement(part.comp, { props: part.props });
          lis = isArray(part) ? [].concat(_toConsumableArray(lis), _toConsumableArray(part)) : [].concat(_toConsumableArray(lis), [part]);
        });
        return lis;
      }
    }
  },
  created: function created() {
    this.$parts = this.$slots.default.filter(function (slot) {
      return slot.children;
    }).map(function (slot) {
      return {
        comp: partsMap[slot.children[0].text],
        props: slot.data && slot.data.attrs || {}
      };
    });
  }
};

var IconSpinner = {
  functional: true,
  name: 'spinner',
  render: function render(h, _ref) {
    var props = _ref.props;
    var viewBox = props.viewBox,
        _props$ratio = props.ratio,
        ratio = _props$ratio === undefined ? 1 : _props$ratio;
    var _props$width = props.width,
        width = _props$width === undefined ? 30 : _props$width,
        _props$height = props.height,
        height = _props$height === undefined ? 30 : _props$height;


    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }

    return h('svg', {
      attrs: {
        width: width,
        height: height,
        version: '1.1',
        meta: 'icon-spinner ratio-' + ratio,
        viewBox: viewBox || '0 0 30 30'
      },
      domProps: {
        innerHTML: '<circle fill="none" stroke="#000" cx="15" cy="15" r="14"/>'
      }
    });
  }
};

var index$22 = {
  name: 'Spinner',
  functional: true,
  props: ['ratio'],
  render: function render(h, _ref) {
    var props = _ref.props;

    return h('div', {
      staticClass: 'uk-icon uk-spinner'
    }, [h(IconSpinner, {
      props: {
        ratio: props.ratio
      }
    })]);
  }
};

// let dir
var scroll$1 = 0;

on(window, 'scroll', function () {
  // dir = scroll < window.pageYOffset
  //   ? 'down'
  //   : 'up'
  scroll$1 = window.pageYOffset;
});

var index$23 = {
  name: 'Sticky',
  abstract: true,
  props: {
    top: {
      type: [Number, String],
      default: 0
    },
    bottom: {
      type: [Number, String],
      default: 0
    },
    offset: {
      type: Number,
      default: 0
    },
    widthElement: {
      // dom ref
      default: false
    },
    animation: {
      type: String,
      default: ''
    },
    showOnUp: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      isActive: false,
      topOffset: 0,
      outerHeight: 0,
      clsFixed: 'uk-sticky-fixed',
      clsBelow: 'uk-sticky-below',
      clsActive: 'uk-active',
      clsInactive: ''
    };
  },
  render: function render(h) {
    var _this = this;

    var children = this.$options._renderChildren;

    if (!children) {
      return;
    }

    // filter out possible whitespaces
    children = filterOutEmptyNodes(children);

    if (!children.length) {
      return;
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn('<vk-sticky> can only be used on a single element.', this.$parent);
    }

    var rawChild = children[0];

    on(window, 'scroll', function () {
      _this.offsetTop = offsetTop(_this.$el);
      _this.visible = isVisible(_this.$el);
      _this.onScroll();
    }, this._uid);

    return rawChild;
  },

  computed: {
    stickyStartPoint: function stickyStartPoint() {
      var top = this.top;

      if (isInteger(top) && this.topOffset) {
        top = this.topOffset + parseFloat(top);
      } else if (isString(top) && top.match(/^-?\d+vh$/)) {
        top = getViewportHeightOffset(top);
      } else {
        top = this.getElementOffset(top);
      }

      return Math.max(parseFloat(top), this.topOffset) - this.offset;
    },
    stickyEndPoint: function stickyEndPoint() {
      var bottom = this.bottom;

      // get element
      bottom = this.getElementOffset(bottom === true ? this.$el.parent() : bottom);

      return bottom && bottom - this.outerHeight;
    },
    inactive: function inactive() {
      return this.media && !window.matchMedia(this.media).matches;
    },
    $widthElement: function $widthElement() {
      return this.widthElement || this.$el;
    },
    bottomOffset: function bottomOffset() {
      return this.topOffset + this.outerHeight;
    }
  },
  methods: {
    show: function show() {
      this.isActive = true;
      this.update();
      this.placeholder.removeAttribute('hidden');
    },
    hide: function hide() {
      addClass(this.$el, this.clsInactive);
      removeClass(this.$el, this.clsFixed + ' ' + this.clsActive + ' ' + this.clsBelow);
      css(this.$el, 'position', '');
      css(this.$el, 'width', '');
      css(this.$el, 'top', '');
      this.placeholder.setAttribute('hidden', 'hidden');
    },
    update: function update() {
      var top = Math.max(0, this.offset);
      var active = scroll$1 > this.stickyStartPoint;

      if (this.stickyEndPoint && scroll$1 > this.stickyEndPoint - this.offset) {
        top = this.stickyEndPoint - scroll$1;
      }

      addClass(this.$el, this.clsFixed);
      css(this.$el, 'width', this.$widthElement.offsetWidth + 'px');
      css(this.$el, 'position', 'fixed');
      css(this.$el, 'top', top + 'px');

      toggleClass(this.$el, this.clsActive, active);
      toggleClass(this.$el, this.clsInactive, !active);
      toggleClass(this.$el, this.clsBelow, scroll$1 > this.bottomOffset);
    },

    // ready () {
    //   if (!(this.target && window.location.hash && window.pageYOffset > 0)) {
    //     return
    //   }
    //
    //   var target = query(window.location.hash)
    //
    //   if (target) {
    //     window.requestAnimationFrame(() => {
    //       var top = offsetTop(target)
    //       var elTop = offsetTop(this.$el)
    //       var elHeight = this.$el[0].offsetHeight
    //
    //       if (elTop + elHeight >= top && elTop <= top + target[0].offsetHeight) {
    //         window.scrollTo(0, top - elHeight - this.target - this.offset)
    //       }
    //     })
    //   }
    // },
    onScroll: function onScroll() {
      var _this2 = this;

      // if (scroll < 0 || !this.visible || this.disabled || (this.showOnUp && !dir)) {
      //   return
      // }

      var scrollNotReachedStartPoint = scroll$1 < this.stickyStartPoint;
      // const scrollIsBehindStartPoint = scroll <= this.stickyStartPoint
      // const scrollNotReachedEndPoint = scroll <= this.bottomOffset
      // const uikitComplexEval = scrollIsBehindStartPoint || dir === 'down' || (dir === 'up' && !this.isActive && scrollNotReachedEndPoint)

      if (this.inactive || scrollNotReachedStartPoint) {
        if (!this.isActive) {
          return;
        }

        this.isActive = false;

        if (this.animation && scroll$1 > this.topOffset) {
          Animation.cancel(this.$el).then(function () {
            return Animation.out(_this2.$el, _this2.animation).then(function () {
              return _this2.hide();
            });
          });
        } else {
          this.hide();
        }
      } else if (this.isActive) {
        this.update();
      } else if (this.animation) {
        Animation.cancel(this.$el).then(function () {
          _this2.show();
          Animation.in(_this2.$el, _this2.animation);
        });
      } else {
        this.show();
      }
    },
    createPlaceholder: function createPlaceholder() {
      this.placeholder = document.createElement('div');
      addClass(this.placeholder, 'uk-sticky-placeholder');
      this.placeholder.setAttribute('hidden', 'hidden');
      if (!this.$el.parentNode.contains(this.placeholder)) {
        this.$el.parentNode.appendChild(this.placeholder);
      }
    },
    updatePlaceholder: function updatePlaceholder() {
      css(this.placeholder, 'height', this.outerHeight + 'px');
      css(this.placeholder, 'marginTop', css(this.$el, 'marginTop'));
      css(this.placeholder, 'marginBottom', css(this.$el, 'marginBottom'));
      css(this.placeholder, 'marginLeft', css(this.$el, 'marginLeft'));
      css(this.placeholder, 'marginRight', css(this.$el, 'marginRight'));
    },
    getElementOffset: function getElementOffset(el) {
      el = isString(el) ? this.$vnode.context.$refs[el] : el;

      if (el) {
        return offsetTop(el) + el.offsetHeight;
      }
    }
  },
  mounted: function mounted() {
    // add sticky class
    addClass(this.$el, 'uk-sticky');

    // calculate offset on load and resize
    // this.topOffset = this.isActive
    //   ? offsetTop(this.placeholder)
    //   : offsetTop(this.$el)

    this.topOffset = offsetTop(this.$el);

    // calculate outerHeight
    // const outerElement = active
    //   ? this.placeholder
    //   : this.$el
    // this.outerHeight = css(this.$el, 'position') !== 'absolute'
    //   ? outerElement.offsetHeight
    //   : ''

    this.outerHeight = this.$el.offsetHeight;

    this.createPlaceholder();
    this.updatePlaceholder();

    var active = scroll$1 > this.stickyStartPoint;

    if (active) {
      this.isActive = true;
      this.update();
    } else {
      addClass(this.$el, this.clsInactive);
    }
  }
};

function isVisible(el) {
  if (!el) {
    return false;
  }

  var elemTop = el.getBoundingClientRect().top;
  var elemBottom = el.getBoundingClientRect().bottom;
  var isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;

  return isVisible;
}

function getViewportHeightOffset(height) {
  return window.innerHeight * parseFloat(height) / 100;
}

var index$24 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('ul', { staticClass: "uk-subnav", class: { 'uk-subnav-divider': _vm.divider, 'uk-subnav-pill': _vm.pill } }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'Subnav',
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
      get: function get$$1() {
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

var index$25 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { class: { 'uk-active': _vm.active, 'uk-disabled': _vm.disabled } }, [_c('a', { on: { "click": function click($event) {
          $event.preventDefault();!_vm.disabled && !_vm.active && _vm.$parent.$emit('change', _vm.alias);
        } } }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))])], 2)]);
  }, staticRenderFns: [],
  name: 'SubnavItem',
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

var $JSON = _core.JSON || (_core.JSON = { stringify: JSON.stringify });
var stringify$1 = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

var stringify = createCommonjsModule(function (module) {
module.exports = { "default": stringify$1, __esModule: true };
});

var _JSON$stringify = unwrapExports(stringify);

var nestRE = /^(attrs|props|on|nativeOn|class|style|hook)$/;

var babelHelperVueJsxMergeProps = function mergeJSXProps (objs) {
  return objs.reduce(function (a, b) {
    var aa, bb, key, nestedKey, temp;
    for (key in b) {
      aa = a[key];
      bb = b[key];
      if (aa && nestRE.test(key)) {
        // normalize class
        if (key === 'class') {
          if (typeof aa === 'string') {
            temp = aa;
            a[key] = aa = {};
            aa[temp] = true;
          }
          if (typeof bb === 'string') {
            temp = bb;
            b[key] = bb = {};
            bb[temp] = true;
          }
        }
        if (key === 'on' || key === 'nativeOn' || key === 'hook') {
          // merge functions
          for (nestedKey in bb) {
            aa[nestedKey] = mergeFn(aa[nestedKey], bb[nestedKey]);
          }
        } else if (Array.isArray(aa)) {
          a[key] = aa.concat(bb);
        } else if (Array.isArray(bb)) {
          a[key] = [aa].concat(bb);
        } else {
          for (nestedKey in bb) {
            aa[nestedKey] = bb[nestedKey];
          }
        }
      } else {
        a[key] = b[key];
      }
    }
    return a
  }, {})
};

function mergeFn (a, b) {
  return function () {
    a.apply(this, arguments);
    b.apply(this, arguments);
  }
}

var Row = {
  functional: true,
  render: function render(h, _ref) {
    var props = _ref.props,
        children = _ref.children,
        table = _ref.parent;
    var row = props.row;

    var onClick = function onClick(e) {
      return targetIsRow(e) && table.$emit('click-row', row);
    };
    var classes = [resolveClass(table.rowClass, row) || ''];

    if (table.isSelected(row)) {
      classes.push('uk-active');
    }

    return h(
      'tr',
      babelHelperVueJsxMergeProps([{ 'class': classes }, {
        on: {
          'click': function click($event) {
            for (var _len = arguments.length, attrs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              attrs[_key - 1] = arguments[_key];
            }

            onClick.apply(undefined, [$event].concat(attrs));
          }
        }
      }]),
      [children]
    );
  }
};

function targetIsRow(e) {
  return e.target.tagName === 'TR' || e.target.tagName === 'TD';
}

function resolveClass(c, row) {
  return isFunction(c) ? c(row) : c;
}

var Cell = {
  functional: true,
  render: function render(h, _ref) {
    var parent = _ref.parent,
        data = _ref.data,
        props = _ref.props;
    var col = props.col,
        row = props.row;

    var cellRender = get(col, 'componentOptions.Ctor.options.cellRender');
    var scopedSlot = get(col, 'data.scopedSlots.default');

    // workaround when passing scopedSlot programatically
    if (scopedSlot) {
      var args = getFnArgs(scopedSlot);

      if (args[0] === 'h') {
        col.data.scopedSlots.default = scopedSlot.bind(null, h);
      }
    }

    if (cellRender) {
      return cellRender(h, { row: row, col: col, table: parent });
    } else {
      warn$1('The Column definition is missing the cellRender', parent);
    }
  }
};

var MixinSelect = {
  props: {
    selection: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    select: {
      type: Boolean,
      default: false
    },
    selectSingle: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    isSelected: function isSelected(row) {
      return this.selection.findIndex(function (r) {
        return r.id === row.id;
      }) !== -1;
    },
    selectRow: function selectRow(row) {
      this.updateSelection([].concat(_toConsumableArray(this.selection), [row]));
    },
    unselectRow: function unselectRow(row) {
      var index = this.selection.indexOf(row);
      var newSelection = [].concat(_toConsumableArray(this.selection));
      newSelection.splice(index, 1);

      this.updateSelection(newSelection);
    },
    toggleSelection: function toggleSelection(row) {
      this.isSelected(row) ? this.unselectRow(row) : this.selectRow(row);
    },
    updateSelection: function updateSelection(selection) {
      this.$emit('update:selection', selection);
    }
  },
  created: function created() {
    var _this = this;

    this.$on('click-row', function (row) {
      if (_this.selectSingle) {
        _this.updateSelection([row]);
      } else if (_this.select) {
        _this.toggleSelection(row);
      }
    });
  }
};

var index$26 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('table', { staticClass: "uk-table", class: { 'uk-table-hover': _vm.hover, 'uk-table-small': _vm.small, 'uk-table-middle': _vm.middle, 'uk-table-justify': _vm.justify, 'uk-table-divider': _vm.divider, 'uk-table-striped': _vm.striped, 'uk-table-responsive': _vm.responsive } }, [_c('thead', [_c('tr', [_vm._t("default")], 2)]), _vm._v(" "), _c('tbody', _vm._l(_vm.data, function (row) {
      return _c('row', { key: _JSON$stringify(row), attrs: { "row": row } }, _vm._l(_vm.columns, function (col, i) {
        return _c('cell', { key: i, attrs: { "col": col, "row": row } });
      }));
    }))]);
  }, staticRenderFns: [],
  name: 'Table',
  components: { Row: Row, Cell: Cell },
  mixins: [MixinSelect],
  inheritAttrs: false,
  props: {
    data: {
      type: Array,
      required: true
    },
    small: {
      type: Boolean,
      default: false
    },
    middle: {
      type: Boolean,
      default: false
    },
    divider: {
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
    justify: {
      type: Boolean,
      default: false
    },
    responsive: {
      type: Boolean,
      default: false
    },
    rowClass: {
      type: Function
    }
  },
  data: function data() {
    return {
      children: []
    };
  },
  computed: {
    columns: {
      get: function get$$1() {
        // default slots excluding spaces and comments
        return this.$slots.default.filter(function (vnode) {
          return vnode.tag;
        });
      },

      cache: false
    }
  },
  created: function created() {
    // forces the table to rerender
    // when children are available
    // which is required by some cols
    this.children = this.$children;
  }
};

var Column = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('th', { class: [_vm.headerClass, { 'uk-table-shrink': _vm.shrink, 'uk-table-expand': _vm.expand }] }, [_vm._v(" " + _vm._s(_vm.header) + " ")]);
  }, staticRenderFns: [],
  name: 'TableColumn',
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
    },
    shrink: {
      type: Boolean,
      default: false
    },
    expand: {
      type: Boolean,
      default: false
    },
    // when using TableColumns the group
    // name will be provided as prop
    columnGroup: {
      type: String
    }
  },
  cellRender: function cellRender(h, _ref) {
    var row = _ref.row,
        col = _ref.col;

    var scopedSlot = get(col, 'data.scopedSlots.default');
    var props = get(col, 'componentOptions.propsData');

    return h(
      'td',
      { 'class': props.cellClass },
      [scopedSlot ? scopedSlot(row) : get(row, props.cell, props.cell)]
    );
  }
};

var Checkbox = {
  functional: true,
  props: ['checked'],
  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        listeners = _ref.listeners;

    return h('input', _extends$1({}, data, {
      staticClass: 'uk-checkbox',
      attrs: {
        type: 'checkbox'
      },
      domProps: {
        checked: props.checked
      },
      on: _extends$1({}, listeners, {
        change: function change(e) {
          // ensures checked state consistency
          e.target.checked = props.checked;
        }
      })
    }));
  }
};

var index$27 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('th', { class: ['uk-form uk-text-center uk-table-shrink', _vm.headerClass] }, [_c('checkbox', { attrs: { "checked": _vm.allSelected }, on: { "click": _vm.toggleAll } })], 1);
  }, staticRenderFns: [],
  name: 'TableColumnSelect',
  components: { Checkbox: Checkbox },
  props: {
    headerClass: {
      type: String
    },
    cellClass: {
      type: String
    }
  },
  computed: {
    $table: function $table() {
      return this.$parent;
    },
    allSelected: function allSelected() {
      return isAllSelected(this.$table.selection, this.$table.data);
    }
  },
  methods: {
    toggleAll: function toggleAll() {
      var selection = this.allSelected ? [] : [].concat(_toConsumableArray(this.$table.data));

      this.$table.updateSelection(selection);
    }
  },
  cellRender: function cellRender(h, _ref) {
    var row = _ref.row,
        col = _ref.col,
        table = _ref.table;

    var props = get(col, 'componentOptions.propsData');

    return h(
      'td',
      { 'class': ['uk-form uk-text-center', props.cellClass] },
      [h(
        Checkbox,
        babelHelperVueJsxMergeProps([{
          attrs: {
            checked: table.isSelected(row)
          }
        }, {
          on: {
            'click': function click($event) {
              for (var _len = arguments.length, attrs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                attrs[_key - 1] = arguments[_key];
              }

              (function (e) {
                return table.toggleSelection(row);
              }).apply(undefined, [$event].concat(attrs));
            }
          }
        }]),
        []
      )]
    );
  }
};

function isSelected(selection, row) {
  return selection.findIndex(function (r) {
    return r.id === row.id;
  }) !== -1;
}

function isAllSelected(selection, rows) {
  var ifSelected = function ifSelected(row) {
    return isSelected(selection, row);
  };
  var selected = rows.filter(ifSelected);

  if (selected.length === 0) {
    return false;
  }

  return selected.length === rows.length;
}

var IconArrowUp = {
  functional: true,
  name: 'arrow-up',
  render (h, { props }) {
    const { viewBox, ratio = 1 } = props;
    let { width = 20, height = 20 } = props;

    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }

    return h('svg', {
      attrs: {
        width,
        height,
        version: '1.1',
        meta: `icon-arrow-up ratio-${ratio}`,
        viewBox: viewBox || '0 0 20 20'
      },
      domProps: {
        innerHTML: '<path d="M10.5 4l4.87 5.4-.74.68-4.13-4.59-4.13 4.59-.74-.68z"/><path fill="none" stroke="#000" d="M10.5 16V5"/>'
      }
    })
  }
};

var IconArrowDown = {
  functional: true,
  name: 'arrow-down',
  render (h, { props }) {
    const { viewBox, ratio = 1 } = props;
    let { width = 20, height = 20 } = props;

    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }

    return h('svg', {
      attrs: {
        width,
        height,
        version: '1.1',
        meta: `icon-arrow-down ratio-${ratio}`,
        viewBox: viewBox || '0 0 20 20'
      },
      domProps: {
        innerHTML: '<path d="M10.5 16.08l-4.87-5.42.74-.66 4.13 4.58L14.63 10l.74.66z"/><path fill="none" stroke="#000" d="M10.5 4v11"/>'
      }
    })
  }
};

var index$28 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('th', { staticClass: "uk-visible-hover-inline", class: [_vm.headerClass, { 'uk-table-shrink': _vm.shrink, 'uk-table-expand': _vm.expand }] }, [_c('a', { staticClass: "uk-display-block uk-link-reset uk-text-nowrap uk-position-relative", on: { "click": function click($event) {
          $event.preventDefault();_vm.emitSortEvent($event);
        } } }, [_vm._v(" " + _vm._s(_vm.header) + " "), _c('vk-icon', { staticClass: "uk-position-absolute", class: { 'uk-invisible': !_vm.order } }, [_vm.order === 'asc' || _vm.order === undefined ? _c('icon-arrow-down', { attrs: { "ratio": "0.9" } }) : _c('icon-arrow-up', { attrs: { "ratio": "0.9" } })], 1)], 1)]);
  }, staticRenderFns: [],
  name: 'TableColumnSort',
  extends: Column,
  components: {
    IconArrowUp: IconArrowUp,
    IconArrowDown: IconArrowDown
  },
  computed: {
    // an attribute set on the table wrapper
    // because is to be used by all sort columns
    sortedBy: function sortedBy() {
      return this.$table.$attrs.sortedBy;
    },
    order: function order() {
      return this.sortedBy[this.cell];
    }
  },
  methods: {
    emitSortEvent: function emitSortEvent(e) {
      var sortOrder = getSortOrder(this.sortedBy, this.cell, e.shiftKey);
      this.$table.$emit('sort', sortOrder);
    }
  },
  created: function created() {
    this.$table = this.$parent;
  }
};

function getSortOrder(currentSort, by, multi) {
  var order = currentSort[by] === 'asc' ? 'desc' : 'asc';
  var sort = _defineProperty({}, by, order);

  return multi ? _extends$1({}, currentSort, sort) : sort;
}

var index$29 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'Tab',
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
  created: function created() {
    if (!this.disabled && !this.$slots.default) {
      warn('[VkTabs]: content is missing in tab ' + this.label);
    }
  }
};

var core$1 = {
  components: {
    TabContent: {
      functional: true,
      render: function render(h, _ref) {
        var parent = _ref.parent;

        return parent.$tabsNodes.filter(function (vn) {
          return parent.activeTab === parent.getTabId(vn);
        });
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
      get: function get$$1() {
        var _this = this;

        return this.$tabsNodes.map(function (vn) {
          return {
            id: _this.getTabId(vn),
            label: vn.componentOptions.propsData.label,
            disabled: vn.componentOptions.propsData.disabled !== undefined
          };
        });
      },

      cache: false
    }
  },
  created: function created() {
    var _this2 = this;

    // save tabs nodes
    this.$tabsNodes = this.$slots.default.filter(function (vn) {
      return vn.componentOptions && vn.componentOptions.tag === 'vk-tab';
    });
    if (warn && !this.$tabsNodes) {
      warn('[VkTabs]: there are no tabs defined');
    }
    // set tabs key for keep-alive
    this.$tabsNodes.forEach(function (vn) {
      vn.key = _this2.getTabId(vn);
    });
  },

  methods: {
    getTabId: function getTabId(vn) {
      return vn.componentOptions.propsData.alias || this.$tabsNodes.indexOf(vn) + 1;
    }
  }
};

var index$30 = { render: function render() {
    var _class;

    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: { 'uk-flex uk-flex-column-reverse': _vm.bottom } }, [_c('ul', { staticClass: "uk-tab", class: (_class = {}, _defineProperty(_class, 'uk-child-width-1-' + _vm.tabs.length, _vm.alignment === 'justify'), _defineProperty(_class, 'uk-flex-right', _vm.alignment === 'right'), _defineProperty(_class, 'uk-flex-center', _vm.alignment === 'center'), _defineProperty(_class, 'uk-tab-bottom uk-margin-remove-bottom', _vm.bottom), _class) }, _vm._l(_vm.tabs, function (_ref) {
      var id = _ref.id,
          label = _ref.label,
          disabled = _ref.disabled;
      return _c('li', { class: { 'uk-active': _vm.activeTab === id, 'uk-disabled': disabled } }, [_c('a', { on: { "click": function click($event) {
            $event.preventDefault();!disabled && _vm.$emit('change', id);
          } } }, [_vm._v(" " + _vm._s(label) + " ")])]);
    })), _vm._v(" "), _c('div', { class: { 'uk-margin': _vm.bottom } }, [_c('transition', { attrs: { "name": _vm.transition, "mode": "out-in" } }, [_c('keep-alive', [_c('tab-content')], 1)], 1)], 1)]);
  }, staticRenderFns: [],
  name: 'Tabs',
  extends: core$1,
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

var index$31 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "uk-grid", class: { 'uk-flex uk-flex-row-reverse': _vm.alignment === 'right' } }, [_c('div', { staticClass: "uk-width-auto" }, [_c('ul', { staticClass: "uk-tab", class: [_vm.alignment === 'right' ? 'uk-tab-right' : 'uk-tab-left'] }, _vm._l(_vm.tabs, function (_ref) {
      var id = _ref.id,
          label = _ref.label,
          disabled = _ref.disabled;
      return _c('li', { class: { 'uk-active': _vm.activeTab === id, 'uk-disabled': disabled } }, [_c('a', { on: { "click": function click($event) {
            $event.preventDefault();!disabled && _vm.$emit('change', id);
          } } }, [_vm._v(" " + _vm._s(label) + " ")])]);
    }))]), _vm._v(" "), _c('div', { staticClass: "uk-width-expand" }, [_c('transition', { attrs: { "name": _vm.transition, "mode": "out-in" } }, [_c('keep-alive', [_c('tab-content')], 1)], 1)], 1)]);
  }, staticRenderFns: [],
  name: 'TabsVertical',
  extends: core$1,
  props: {
    alignment: {
      type: String,
      default: 'left' // left|right
    }
  }
};

/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.12.5
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
var nativeHints = ['native code', '[object MutationObserverConstructor]'];

/**
 * Determine if a function is implemented natively (as opposed to a polyfill).
 * @method
 * @memberof Popper.Utils
 * @argument {Function | undefined} fn the function to check
 * @returns {Boolean}
 */
var isNative = (function (fn) {
  return nativeHints.some(function (hint) {
    return (fn || '').toString().indexOf(hint) > -1;
  });
});

var isBrowser = typeof window !== 'undefined';
var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
var timeoutDuration = 0;
for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
  if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
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
var supportsNativeMutationObserver = isBrowser && isNative(window.MutationObserver);

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce$1 = supportsNativeMutationObserver ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction$1(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
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
  var css$$1 = window.getComputedStyle(element, null);
  return property ? css$$1[property] : css$$1;
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
 * @returns {Element} scroll parent
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

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  // NOTE: 1 DOM access here
  var offsetParent = element && element.offsetParent;
  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return window.document.documentElement;
  }

  // .offsetParent will return the closest TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return window.document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range$$1 = document.createRange();
  range$$1.setStart(start, 0);
  range$$1.setEnd(end, 0);
  var commonAncestorContainer = range$$1.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
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

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return +styles['border' + sideA + 'Width'].split('px')[0] + +styles['border' + sideB + 'Width'].split('px')[0];
}

/**
 * Tells if you are running Internet Explorer 10
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean} isIE10
 */
var isIE10 = undefined;

var isIE10$1 = function () {
  if (isIE10 === undefined) {
    isIE10 = navigator.appVersion.indexOf('MSIE 10') !== -1;
  }
  return isIE10;
};

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE10$1() ? html['offset' + axis] + computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')] + computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')] : 0);
}

function getWindowSizes() {
  var body = window.document.body;
  var html = window.document.documentElement;
  var computedStyle = isIE10$1() && window.getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
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





var defineProperty$5 = function (obj, key, value) {
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
};

var _extends$2 = Object.assign || function (target) {
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
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends$2({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  if (isIE10$1()) {
    try {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } catch (err) {}
  } else {
    rect = element.getBoundingClientRect();
  }

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes() : {};
  var width = sizes.width || element.clientWidth || result.right - result.left;
  var height = sizes.height || element.clientHeight || result.bottom - result.top;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var isIE10 = isIE10$1();
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = +styles.borderTopWidth.split('px')[0];
  var borderLeftWidth = +styles.borderLeftWidth.split('px')[0];

  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = +styles.marginTop.split('px')[0];
    var marginLeft = +styles.marginLeft.split('px')[0];

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var html = window.document.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = getScroll(html);
  var scrollLeft = getScroll(html, 'left');

  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };

  return getClientRect(offset);
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
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  // NOTE: 1 DOM access here
  var boundaries = { top: 0, left: 0 };
  var offsetParent = findCommonOffsetParent(popper, reference);

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(popper));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = window.document.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = window.document.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  boundaries.left += padding;
  boundaries.top += padding;
  boundaries.right -= padding;
  boundaries.bottom -= padding;

  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return width * height;
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
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends$2({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });

  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
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
  var commonOffsetParent = findCommonOffsetParent(popper, reference);
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent);
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
 * Get the opposite placement of the given one
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
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
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
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
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
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier.function) {
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier.function || modifier.fn;
    if (modifier.enabled && isFunction$1(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
  data.offsets.popper.position = 'absolute';

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
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
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
 * Destroy the popper
 * @method
 * @memberof Popper
 */
function destroy() {
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

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? window : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  window.addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  window.removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger onUpdate callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    window.cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
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
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
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
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
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
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
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
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  // floor sides to avoid blurry text
  var offsets = {
    left: Math.floor(popper.left),
    top: Math.floor(popper.top),
    bottom: Math.floor(popper.bottom),
    right: Math.floor(popper.right)
  };

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
  if (sideA === 'bottom') {
    top = -offsetParentRect.height + offsets.bottom;
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    left = -offsetParentRect.width + offsets.right;
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends$2({}, attributes, data.attributes);
  data.styles = _extends$2({}, styles, data.styles);
  data.arrowStyles = _extends$2({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
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
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjuction
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
  // take popper margin in account because we don't have this info available
  var popperMarginSide = getStyleComputedProperty(data.instance.popper, 'margin' + sideCapitalized).replace('px', '');
  var sideValue = center - getClientRect(data.offsets.popper)[side] - popperMarginSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = {};
  data.offsets.arrow[side] = Math.round(sideValue);
  data.offsets.arrow[altSide] = ''; // make sure to unset any eventual altSide value from the DOM node

  return data;
}

/**
 * Get the opposite placement variation of the given one
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
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-right` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
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

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement);

  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';

  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

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

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends$2({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement);
  options.boundaries = boundaries;

  var order = options.priority;
  var popper = data.offsets.popper;

  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty$5({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty$5({}, mainSide, value);
    }
  };

  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends$2({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
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
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: defineProperty$5({}, side, reference[side]),
      end: defineProperty$5({}, side, reference[side] + reference[measurement] - popper[measurement])
    };

    data.offsets.popper = _extends$2({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
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
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unitless, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the height.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > More on this [reading this issue](https://github.com/FezVrasta/popper.js/issues/373)
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * An scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper this makes sure the popper has always a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier, can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near eachothers
   * without leaving any gap between the two. Expecially useful when the arrow is
   * enabled and you want to assure it to point to its reference element.
   * It cares only about the first axis, you can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjuction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations).
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position,
     * the popper will never be placed outside of the defined boundaries
     * (except if keepTogether is enabled)
     */
    boundariesElement: 'viewport'
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3d transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties.
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define you own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3d transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties.
     */
    gpuAcceleration: undefined
  }
};

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
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow, it expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements.
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overriden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass as 3rd argument an object with the same
 * structure of this object, example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Whether events (resize, scroll) are initially enabled
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated, this callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper = function () {
  /**
   * Create a new Popper.js instance
   * @class Popper
   * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper.
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce$1(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends$2({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference.jquery ? reference[0] : reference;
    this.popper = popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends$2({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends$2({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends$2({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction$1(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }

    /**
     * Schedule an update, it will run on the next UI update available
     * @method scheduleUpdate
     * @memberof Popper
     */


    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

var PopperMixin = {
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
    offset: {
      type: String,
      default: '0 5px'
    },
    modifiers: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  computed: {
    targetElement: function targetElement() {
      // defaults to originalParentEl which remains
      // even when the dropdown dom is removed
      return this.target || this.$options._parentElm;
    },
    placement: function placement() {
      // translate position to popper.js placement
      return this.position.replace(/-(left|top)/, '-start').replace(/-(right|bottom)/, '-end').replace(/-(center|justify)/, '');
    },
    enterActiveClass: function enterActiveClass() {
      var classes = this.animation.split(',').map(function (c) {
        return c.trim();
      }).filter(function (c) {
        return c;
      });
      return classes[0] || ' ';
    },
    leaveActiveClass: function leaveActiveClass() {
      var classes = this.animation.split(',').map(function (c) {
        return c.trim();
      }).filter(function (c) {
        return c;
      });
      return classes[1] || classes[0] || ' ';
    }
  },
  beforeUpdate: function beforeUpdate() {
    // update popper
    this.$popper.options.placement = this.placement;
    this.$popper.update();
  },
  mounted: function mounted() {
    var _this = this;

    // move dom to body
    document.body.appendChild(this.$el);

    // init popper
    this.$popper = new Popper(this.targetElement, this.$el, {
      placement: this.placement,
      modifiers: _extends$1({}, this.modifiers, {
        flip: { enabled: this.flip },
        applyStyle: { enabled: false },
        offset: {
          offset: this.offset
        },
        applyCustomStyles: {
          enabled: true,
          function: function _function(data) {
            _this.$el.style.top = data.offsets.popper.top + 'px';
            _this.$el.style.left = data.offsets.popper.left + 'px';
          },
          order: 800
        }
      })
    });

    // schedule an update to make sure everything gets positioned correct
    // after being instantiated
    this.$popper.scheduleUpdate();
  }
};

var onMouseenter$1 = void 0;
var onMouseleave = void 0;

var index$32 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('transition', { attrs: { "enter-active-class": _vm.enterActiveClass, "leave-active-class": _vm.leaveActiveClass }, on: { "after-leave": _vm.remove } }, [_c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.active, expression: "active" }], staticClass: "uk-tooltip", staticStyle: { "display": "block" } }, [_c('div', { staticClass: "uk-tooltip-inner", domProps: { "textContent": _vm._s(_vm.content) } })])]);
  }, staticRenderFns: [],
  name: 'Tooltip',
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
      default: function _default() {
        return {
          offset: {
            offset: '0 5'
          }
        };
      }
    }
  },
  data: function data() {
    return {
      active: false,
      flipped: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    // initially the tooltip is off document
    this.remove();

    onMouseenter$1 = function onMouseenter() {
      setTimeout(function (_) {
        document.body.appendChild(_this.$el);
        _this.active = true;
        _this.$emit('show');
      }, parseInt(_this.delay));
    };

    onMouseleave = function onMouseleave(e) {
      // ignore childs and tooltip hover triggers
      if (e.relatedTarget === _this.targetElement || e.relatedTarget === _this.$el || _this.targetElement.contains(e.relatedTarget) || _this.$el.contains(e.relatedTarget)) {
        return;
      }

      _this.active = false;
      offAll(_this.$el, _this._uid);
      _this.$emit('hide');
    };

    on(this.$el, 'mouseleave', onMouseleave, this._uid);
    on(this.targetElement, 'mouseleave', onMouseleave, this._uid);
    on(this.targetElement, 'mouseenter', onMouseenter$1, this._uid);
    on(this.targetElement, 'focus', onMouseenter$1, this._uid);
    on(this.targetElement, 'blur', onMouseleave, this._uid);
  },

  methods: {
    remove: function remove() {
      if (this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.targetElement) {
      offAll(this.targetElement, this._uid);
    }
    this.active = false;
    this.remove();
  }
};

var index$33 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "uk-placeholder uk-text-center", class: { 'uk-dragover': _vm.dragged }, on: { "dragenter": function dragenter($event) {
          $event.stopPropagation();$event.preventDefault();
        }, "dragover": function dragover($event) {
          $event.stopPropagation();$event.preventDefault();_vm.dragged = true;
        }, "dragleave": function dragleave($event) {
          $event.stopPropagation();$event.preventDefault();_vm.dragged = false;
        }, "drop": _vm.dropped } }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'Upload',
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
        this.dragged = false;
        this.$emit('dropped', e.dataTransfer.files);
      }
    }
  }
};



var components = Object.freeze({
	Breadcrumb: index,
	BreadcrumbItem: index$1,
	Button: index$2,
	ButtonGroupCheckbox: index$3,
	ButtonGroupRadio: index$4,
	Datepicker: index$5,
	Drop: Drop,
	Dropdown: index$6,
	Icon: index$7,
	IconLink: index$8,
	IconButton: index$9,
	Modal: index$10,
	ModalDialog: ModalDialog,
	ModalHeader: index$11,
	ModalBody: index$12,
	ModalFooter: index$13,
	ModalCaption: index$14,
	ModalClose: index$15,
	Notification: index$16,
	NotificationMessage: index$17,
	Offcanvas: index$18,
	OffcanvasContent: index$19,
	OffcanvasClose: index$20,
	Pagination: index$21,
	PaginationFirst: PaginationFirst,
	PaginationLast: PaginationLast,
	PaginationPrev: PaginationPrev,
	PaginationNext: PaginationNext,
	PaginationPages: PaginationPages,
	Spinner: index$22,
	Sticky: index$23,
	Subnav: index$24,
	SubnavItem: index$25,
	Table: index$26,
	TableColumn: Column,
	TableColumnSelect: index$27,
	TableColumnSort: index$28,
	Tab: index$29,
	Tabs: index$30,
	TabsVertical: index$31,
	Tooltip: index$32,
	Upload: index$33
});

var index$34 = {
  inserted: function inserted(el, binding, vnode) {
    vnode.context.$nextTick(function () {
      update$1(el, binding.modifiers, binding.value);
    });

    on(window, 'resize', debounce(function () {
      update$1(el, binding.modifiers, binding.value);
    }, 20), 'vk-height-viewport');
  },
  unbind: function unbind(el, binding, vnode) {
    off(window, 'resize', 'vk-height-viewport');
  }
};

function update$1(el, modifiers) {
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var viewport = window.innerHeight;
  var offset = 0;
  var height = void 0;

  css(el, 'boxSizing', 'border-box');

  if (modifiers.expand) {
    css(el, 'height', '');
    css(el, 'minHeight', '');

    var diff = viewport - document.documentElement.offsetHeight;

    height = el.offsetHeight + diff + 'px';
    css(el, 'minHeight', height);
  } else {
    var top = offsetTop(el);

    if (top < viewport / 2 && value.offsetTop) {
      offset += top;
    }

    if (value.offsetBottom === true) {
      // offset += this.$el.next().outerHeight() || 0
      offset += el.nextElementSibling.offsetHeight || 0;
    } else if (isInteger(value.offsetBottom)) {
      offset += viewport / 100 * value.offsetBottom;
    } else if (value.offsetBottom && value.offsetBottom.substr(-2) === 'px') {
      offset += parseFloat(value.offsetBottom);
    }

    // TODO: support Vue el ref instead of query?
    // else if (isString(value.offsetBottom)) {
    //   var el = query(value.offsetBottom, el)
    //   offset += el && el.offsetHeight || 0
    // }

    height = offset ? 'calc(100vh - ' + offset + 'px)' : '100vh';

    css(el, 'min-height', height);
  }

  // This fix is present in UIkit but is not a good fix.
  // The component content can be updated after applying a fixed height
  // forcing the height to be lower than the page. Until better
  // approach keep this fix disabled.

  // IE 10-11 fix (min-height on a flex container won't apply to its flex items)
  // css(el, 'height', '')
  // if (height && viewport - offset >= el.offsetHeight) {
  //   css(el, 'height', height)
  // }
}



var directives = Object.freeze({
	HeightViewport: index$34
});

each(components, function (def, name) {
  def.name = 'Vk' + def.name;
});

var Vuikit = _extends$1({}, components, directives, {
  install: function install(Vue) {
    each(components, function (def, name) {
      Vue.component('Vk' + name, def);
    });
    each(directives, function (def, name) {
      Vue.directive('Vk' + name, def);
    });
  }
});

export { index as Breadcrumb, index$1 as BreadcrumbItem, index$2 as Button, index$3 as ButtonGroupCheckbox, index$4 as ButtonGroupRadio, index$5 as Datepicker, Drop, index$6 as Dropdown, index$7 as Icon, index$8 as IconLink, index$9 as IconButton, index$10 as Modal, ModalDialog, index$11 as ModalHeader, index$12 as ModalBody, index$13 as ModalFooter, index$14 as ModalCaption, index$15 as ModalClose, index$16 as Notification, index$17 as NotificationMessage, index$18 as Offcanvas, index$19 as OffcanvasContent, index$20 as OffcanvasClose, index$21 as Pagination, PaginationFirst, PaginationLast, PaginationPrev, PaginationNext, PaginationPages, index$22 as Spinner, index$23 as Sticky, index$24 as Subnav, index$25 as SubnavItem, index$26 as Table, Column as TableColumn, index$27 as TableColumnSelect, index$28 as TableColumnSort, index$29 as Tab, index$30 as Tabs, index$31 as TabsVertical, index$32 as Tooltip, index$33 as Upload, index$34 as HeightViewport };export default Vuikit;
