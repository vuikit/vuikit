import { warn } from '@vuikit/core/helpers/debug';
import { addClass } from '@vuikit/core/utils/class';
import { off, offAll, on } from '@vuikit/core/utils/event';
import { flipPosition, getPositionAxis, positionAt } from '@vuikit/core/helpers/position';
import css from '@vuikit/core/utils/css';
import get from '@vuikit/core/utils/get';
import includes from '@vuikit/core/utils/includes';
import debounce from '@vuikit/core/utils/debounce';
import isObject from '@vuikit/core/utils/is-object';
import isString from '@vuikit/core/utils/is-string';
import toInteger from '@vuikit/core/utils/to-integer';
import isUndefined from '@vuikit/core/utils/is-undefined';

var uid = 'v-position';

var positions = [
  'top-left',
  'top-center',
  'top-right',

  'bottom-left',
  'bottom-center',
  'bottom-right',

  'left-top',
  'left-center',
  'left-bottom',

  'right-top',
  'right-center',
  'right-bottom'
];

var index = {
  inserted: function inserted (el, binding, vnode) {
    var ctx = getContext(el, binding, vnode);

    if (ctx) {
      position$1(ctx);
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    var ctx = getContext(el, binding, vnode);

    if (ctx) {
      position$1(ctx);
    }
  },
  unbind: function unbind (el, binding, vnode) {
    offAll(uid);
  }
}

function position$1 (ctx) {
  var el = ctx.el;
  var props = ctx.props;
  var vnode = ctx.vnode;
  var target = props.target;
  var position$$1 = props.position;
  var offset = props.offset;
  var boundary = props.boundary;
  var flip = props.flip;
  var classPrefix = props.classPrefix;

  if (!includes(positions, position$$1)) {
    warn('Invalid v-position position', vnode);
  }

  var ref = position$$1.split('-');
  var dir = ref[0];
  var align = ref[1];

  // remove any position class
  var classesRx = new RegExp((classPrefix + "-(top|bottom|left|right)(-[a-z]+)?"));
  el.className = el.className.replace(classesRx, '');

  // reset pos
  css(el, { top: '', left: '' });

  var axis = getPositionAxis(position$$1);

  var elAttach = axis === 'x'
    ? ((flipPosition(dir)) + " " + align)
    : (align + " " + (flipPosition(dir)));

  var targetAttach = axis === 'x'
    ? (dir + " " + align)
    : (align + " " + dir);

  var elOffset = axis === 'x'
    ? ("" + (dir === 'left' ? -1 * offset : offset))
    : (" " + (dir === 'top' ? -1 * offset : offset));

  var ref$1 = positionAt({
    flip: flip,
    target: target,
    boundary: boundary,
    elAttach: elAttach,
    elOffset: elOffset,
    element: el,
    targetAttach: targetAttach,
    targetOffset: null
  }).target;
  var x = ref$1.x;
  var y = ref$1.y;

  dir = axis === 'x' ? x : y;
  align = axis === 'x' ? y : x;

  // add on resize events
  setResizeEvent(ctx);

  // add position class
  if (classPrefix) {
    addClass(el, (classPrefix + "-" + dir + "-" + align));
  }
}

/**
 * Get the directive props
**/
function getProps (ctx) {
  var vnode = ctx.vnode;
  var ref = ctx.binding;
  var value = ref.value;

  if (isUndefined(value) || !isObject(value)) {
    warn('v-position configuration is missing or is not an Object', vnode.context);
    return false
  }

  var target = value.target || null;
  var delay = get(value, 'delay', 0);
  var flip = get(value, 'flip', true);
  var classPrefix = get(value, 'classPrefix', 'v-position');
  var boundary = value.boundary || window;
  var offset = toInteger(value.offset) || 0;
  var position$$1 = value.position || 'top-center';

  if (isString(target)) {
    target = vnode.context.$refs[target];
  }

  return { target: target, delay: delay, offset: offset, flip: flip, position: position$$1, boundary: boundary, classPrefix: classPrefix }
}

function setResizeEvent (ctx) {
  off(window, 'resize', uid);
  on(window, 'resize', debounce(function () {
    position$1(ctx);
  }, 50), uid);
}

/**
 * Get the context used across
**/
function getContext (el, binding, vnode) {
  var ctx = { el: el, binding: binding, vnode: vnode };
  ctx.props = getProps(ctx);

  if (!ctx.props) {
    binding.def.unbind(el, binding);
    return
  }

  return ctx
}

export default index;
