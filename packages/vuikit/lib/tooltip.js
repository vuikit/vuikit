import css from '@vuikit/core/utils/css';
import get from '@vuikit/core/utils/get';
import isEmpty from '@vuikit/core/utils/is-empty';
import { warn } from '@vuikit/core/helpers/debug';
import { off, on } from '@vuikit/core/utils/event';
import includes from '@vuikit/core/utils/includes';
import isObject from '@vuikit/core/utils/is-object';
import toInteger from '@vuikit/core/utils/to-integer';
import { Animation } from '@vuikit/core/helpers/animation';
import { addClass, removeClass } from '@vuikit/core/utils/class';
import { flipPosition, getPositionAxis, positionAt } from '@vuikit/core/helpers/position';

var delayedShow;
var tooltip = {};
var uid = 'v-tooltip';

var positions = [
  'top',
  'top-left',
  'top-center',
  'top-right',

  'bottom',
  'bottom-left',
  'bottom-center',
  'bottom-right',

  'left',
  'left-center',
  'right',
  'right-center'
];

var index = {
  inserted: function inserted (target, binding, vnode) {
    var ctx = getContext(target, binding, vnode);

    if (ctx) {
      setEvents(ctx);
    }
  },
  componentUpdated: function componentUpdated (target, binding, vnode) {
    var ctx = getContext(target, binding, vnode);

    if (ctx) {
      setEvents(ctx);
      updateVisibles(ctx);
    }
  },
  unbind: function unbind (target, binding) {
    hide();
    removeEvents(target);
  }
}

/**
 * SET / REMOVE events
**/
function setEvents (ctx) {
  var ref = ctx.props;
  var triggers = ref.triggers;

  removeEvents(ctx);

  if (triggers.match(/click/)) {
    on(ctx.target, 'click', function () { return toggle(ctx); }, uid);
  }

  if (triggers.match(/hover/)) {
    on(ctx.target, 'mouseenter', function () { return show(ctx); }, uid);
    on(ctx.target, 'mouseleave', function () { return hide(ctx); }, uid);
  }

  if (triggers.match(/focus/)) {
    on(ctx.target, 'focusin', function () { return show(ctx); }, uid);
    on(ctx.target, 'focusout', function () { return hide(ctx); }, uid);
  }
}

function removeEvents (ctx) {
  off(ctx.target, 'click mouseenter mouseleave focusin focusout', uid);
}

/**
 * SHOW / HIDE the tooltip
**/
function show (ctx) {
  var props = ctx.props;
  var ref = getTooltip();
  var outer = ref.outer;
  var inner = ref.inner;

  inner.innerHTML = props.content;

  delayedShow = setTimeout(function () {
    document.body.appendChild(outer);
    var ref = positionTooltip(ctx);
    var dir = ref.dir;
    var align = ref.align;

    Animation.in({
      element: outer,
      duration: props.duration,
      origin: (dir + "-" + align),
      animation: props.animationIn
    });

  }, props.delay);
}

function hide (ctx) {
  var ref = getTooltip();
  var outer = ref.outer;

  clearTimeout(delayedShow);

  removeClass(outer, 'uk-active');

  // remove from dom
  if (outer.parentNode) {
    outer.parentNode.removeChild(outer);
  }

  // force recreating tooltip each time as in
  // edge situations redrawing doesn't work well
  tooltip = {};
}

function toggle (ctx) {
  isEmpty(tooltip)
    ? show(ctx)
    : hide(ctx);
}

/**
 * Update visible tooltips
**/
function updateVisibles (ctx) {
  // abort if no tooltip to update
  if (isEmpty(tooltip)) {
    return
  }

  var props = getProps(ctx);
  var ref = getTooltip();
  var inner = ref.inner;

  inner.innerHTML = props.content;
  positionTooltip(ctx);
}

/**
 * Position tooltip
**/
function positionTooltip (ctx) {
  var target = ctx.target;
  var props = ctx.props;
  var ref = getTooltip();
  var tooltip = ref.outer;
  var position$$1 = props.position;
  var offset = props.offset;
  var boundary = props.boundary;
  var flip = props.flip;

  var ref$1 = position$$1.split('-');
  var dir = ref$1[0];
  var align = ref$1[1]; if ( align === void 0 ) align = 'center';

  // remove any position class
  var classesRx = new RegExp("uk-tooltip-(top|bottom|left|right)(-[a-z]+)?");
  tooltip.className = tooltip.className.replace(classesRx, '');

  // reset pos
  css(tooltip, { top: '', left: '' });

  var axis = getPositionAxis(position$$1);

  var elAttach = axis === 'x'
    ? ((flipPosition(dir)) + " " + align)
    : (align + " " + (flipPosition(dir)));

  var targetAttach = axis === 'x'
    ? (dir + " " + align)
    : (align + " " + dir);

  var elOffset = axis === 'x'
    ? ("" + (dir === 'left' ? -1 * offset : offset))
    : ("" + (dir === 'top' ? -1 * offset : offset));

  var ref$2 = positionAt({
    flip: flip,
    target: target,
    boundary: boundary,
    elAttach: elAttach,
    elOffset: elOffset,
    element: tooltip,
    targetAttach: targetAttach,
    targetOffset: null
  }).target;
  var x = ref$2.x;
  var y = ref$2.y;

  dir = axis === 'x' ? x : y;
  align = axis === 'x' ? y : x;

  addClass(tooltip, ("uk-tooltip-" + dir + "-" + align + " uk-active"));

  return {
    dir: dir,
    align: align
  }
}

/**
 * Get tooltip props
**/
function getProps (ctx) {
  var ref = ctx.binding;
  var arg = ref.arg;
  var value = ref.value;
  var vnode = ref.vnode;

  var delay = 1;
  var offset = 0;
  var flip = true;
  var content = null;
  var duration = 100;
  var position$$1 = 'top';
  var boundary = window;
  var animation$$1 = 'scale-up';
  var triggers = 'hover focus';

  if (isObject(value)) {
    content = value.content;
    flip = get(value, 'flip', flip);
    delay = get(value, 'delay', delay);
    offset = toInteger(offset) || offset;
    boundary = value.boundary || boundary;
    duration = get(value, 'duration', duration);
    triggers = get(value, 'triggers', triggers);
    position$$1 = value.position || arg || position$$1;
    animation$$1 = get(value, 'animation', animation$$1);
  } else {
    content = value;
    position$$1 = arg || position$$1;
  }

  if (!includes(positions, position$$1)) {
    warn('Invalid v-tooltip position', vnode);
    return false
  }

  if (!content) {
    warn('Invalid v-tooltip content', vnode);
    return false
  }

  // decompose animation
  var animations = animation$$1.split(',');
  var animationIn = prefixAnimations(animations[0]);

  return { delay: delay, offset: offset, flip: flip, content: content, position: position$$1, boundary: boundary, animationIn: animationIn, duration: duration, triggers: triggers }
}

/**
 * Prefix all animations (separated by space) with `uk-animation-`
**/
function prefixAnimations (str) {
  if (!str.trim()) {
    return ''
  }

  return str.match(/[\w-]+/g).map(function (v) { return ("uk-animation-" + v); }).join(' ')
}

/**
 * Get or create the tooltip element
**/
function getTooltip () {
  if (!isEmpty(tooltip)) {
    return tooltip
  }

  var outer = document.createElement('div');
  var inner = document.createElement('div');

  addClass(outer, 'uk-tooltip');
  addClass(inner, 'uk-tooltip-inner');

  outer.appendChild(inner);

  tooltip.outer = outer;
  tooltip.inner = inner;

  return tooltip
}

/**
 * Get the context used across
**/
function getContext (target, binding, vnode) {
  var ctx = { target: target, binding: binding, vnode: vnode };
  ctx.props = getProps(ctx);

  if (!ctx.props) {
    binding.def.unbind(target, binding);
    return
  }

  return ctx
}

export default index;
