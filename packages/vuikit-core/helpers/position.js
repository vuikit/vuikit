import css from '@vuikit/core/utils/css';
import each from '@vuikit/core/utils/each';
import toFloat from '@vuikit/core/utils/to-float';
import toArray from '@vuikit/core/utils/to-array';
import isWindow from '@vuikit/core/utils/is-window';
import includes from '@vuikit/core/utils/includes';
import endsWith from '@vuikit/core/utils/ends-with';
import isDocument from '@vuikit/core/utils/is-document';
import isUndefined from '@vuikit/core/utils/is-undefined';
import ucfirst from '@vuikit/core/utils/to-capital';

var dirs = {
  width: ['x', 'left', 'right'],
  height: ['y', 'top', 'bottom']
};

var height = dimension('height');
var width = dimension('width');

function positionAt (ref) {
  var element = ref.element;
  var target = ref.target;
  var elAttach = ref.elAttach;
  var targetAttach = ref.targetAttach;
  var elOffset = ref.elOffset;
  var targetOffset = ref.targetOffset;
  var flip = ref.flip;
  var boundary = ref.boundary;

  elAttach = getPos(elAttach);
  targetAttach = getPos(targetAttach);

  var flipped = { element: elAttach, target: targetAttach };

  if (!element || !target) {
    return flipped
  }

  var dim = getDimensions(element);
  var targetDim = getDimensions(target);
  var position = targetDim;

  moveTo(position, elAttach, dim, -1);
  moveTo(position, targetAttach, targetDim, 1);

  elOffset = getOffsets(elOffset, dim.width, dim.height);
  targetOffset = getOffsets(targetOffset, targetDim.width, targetDim.height);

  elOffset['x'] += targetOffset['x'];
  elOffset['y'] += targetOffset['y'];

  position.left += elOffset['x'];
  position.top += elOffset['y'];

  boundary = getDimensions(boundary || getWindow(element));

  if (flip) {
    each(dirs, function (ref, prop) {
      var dir = ref[0];
      var align = ref[1];
      var alignFlip = ref[2];


      if (!(flip === true || includes(flip, dir))) {
        return
      }

      var elemOffset = elAttach[dir] === align
        ? -dim[prop]
        : elAttach[dir] === alignFlip
          ? dim[prop]
          : 0;
      var targetOffset = targetAttach[dir] === align
        ? targetDim[prop]
        : targetAttach[dir] === alignFlip
          ? -targetDim[prop]
          : 0;

      if (position[align] < boundary[align] || position[align] + dim[prop] > boundary[alignFlip]) {

        var centerOffset = dim[prop] / 2;
        var centerTargetOffset = targetAttach[dir] === 'center' ? -targetDim[prop] / 2 : 0;

        if (elAttach[dir] === 'center') {
          apply(centerOffset, centerTargetOffset) || apply(-centerOffset, -centerTargetOffset);
        } else {
          apply(elemOffset, targetOffset);
        }
      }

      function apply (elemOffset, targetOffset) {
        var newVal = position[align] + elemOffset + targetOffset - elOffset[dir] * 2;

        if (newVal >= boundary[align] && newVal + dim[prop] <= boundary[alignFlip]) {
          position[align] = newVal

          ;['element', 'target'].forEach(function (el) {
            flipped[el][dir] = !elemOffset
              ? flipped[el][dir]
              : flipped[el][dir] === dirs[prop][1]
                ? dirs[prop][2]
                : dirs[prop][1];
          });

          return true
        }

      }

    });
  }

  offset(element, position);

  return flipped
}

function offset (element, coordinates) {
  if (coordinates) {

    var currentOffset = offset(element);
    var pos = css(element, 'position');['left', 'top'].forEach(function (prop) {
      if (prop in coordinates) {
        var value = css(element, prop);
        element.style[prop] = ((coordinates[prop] - currentOffset[prop]) +
          toFloat(pos === 'absolute' && value === 'auto' ? position(element)[prop] : value)) + "px";
      }
    });

    return
  }

  return getDimensions(element)
}

function getDimensions (element) {
  var ref = getWindow(element);
  var top = ref.pageYOffset;
  var left = ref.pageXOffset;

  if (isWindow(element)) {

    var height = element.innerHeight;
    var width = element.innerWidth;

    return {
      top: top,
      left: left,
      height: height,
      width: width,
      bottom: top + height,
      right: left + width
    }
  }

  var display = false;
  if (!isVisible(element)) {
    display = element.style.display;
    element.style.display = 'block';
  }

  var rect = element.getBoundingClientRect();

  if (display !== false) {
    element.style.display = display;
  }

  return {
    height: rect.height,
    width: rect.width,
    top: rect.top + top,
    left: rect.left + left,
    bottom: rect.bottom + top,
    right: rect.right + left
  }
}

function position (element) {
  var parent = offsetParent(element);
  var parentOffset = parent === docEl(element) ? {top: 0, left: 0} : offset(parent);

  return ['top', 'left'].reduce(function (props, prop) {
    var propName = ucfirst(prop);
    props[prop] -= parentOffset[prop] +
      (toFloat(css(element, ("margin" + propName))) || 0) +
      (toFloat(css(parent, ("border" + propName + "Width"))) || 0);
    return props
  }, offset(element))
}

function offsetParent (element) {
  var parent = element.offsetParent;

  while (parent && css(parent, 'position') === 'static') {
    parent = parent.offsetParent;
  }

  return parent || docEl(element)
}

function dimension (prop) {
  var propName = ucfirst(prop);
  return function (element, value) {

    if (isUndefined(value)) {

      if (isWindow(element)) {
        return element[("inner" + propName)]
      }

      if (isDocument(element)) {
        var doc = element.documentElement;
        return Math.max(doc.offsetHeight, doc.scrollHeight)
      }

      value = css(element, prop);
      value = value === 'auto' ? element[("offset" + propName)] : toFloat(value) || 0;

      return getContentSize(prop, element, value)

    } else {

      css(element, prop, !value && value !== 0
        ? ''
        : getContentSize(prop, element, value) + 'px'
      );

    }

  }
}

function getContentSize (prop, element, value) {
  return css(element, 'boxSizing') === 'border-box' ? dirs[prop].slice(1).map(ucfirst).reduce(function (value, prop) { return value -
            toFloat(css(element, ("padding" + prop))) -
            toFloat(css(element, ("border" + prop + "Width"))); }
    , value) : value
}

function getWindow (element) {
  return isWindow(element)
    ? element
    : document(element).defaultView
}

function moveTo (position, attach, dim, factor) {
  each(dirs, function (ref, prop) {
    var dir = ref[0];
    var align = ref[1];
    var alignFlip = ref[2];

    if (attach[dir] === alignFlip) {
      position[align] += dim[prop] * factor;
    } else if (attach[dir] === 'center') {
      position[align] += dim[prop] * factor / 2;
    }
  });
}

function getPos (pos) {

  var x = /left|center|right/;
  var y = /top|center|bottom/;

  pos = (pos || '').split(' ');

  if (pos.length === 1) {
    pos = x.test(pos[0])
      ? pos.concat(['center'])
      : y.test(pos[0])
        ? ['center'].concat(pos)
        : ['center', 'center'];
  }

  return {
    x: x.test(pos[0]) ? pos[0] : 'center',
    y: y.test(pos[1]) ? pos[1] : 'center'
  }
}

function getOffsets (offsets, width, height) {

  var ref = (offsets || '').split(' ');
  var x = ref[0];
  var y = ref[1];

  return {
    x: x ? toFloat(x) * (endsWith(x, '%') ? width / 100 : 1) : 0,
    y: y ? toFloat(y) * (endsWith(y, '%') ? height / 100 : 1) : 0
  }
}

function flipPosition (pos) {
  switch (pos) {
    case 'left':
      return 'right'
    case 'right':
      return 'left'
    case 'top':
      return 'bottom'
    case 'bottom':
      return 'top'
    default:
      return pos
  }
}

function getPositionAxis (position) {
  var ref = position.split('-');
  var dir = ref[0];
  return dir === 'top' || dir === 'bottom'
    ? 'y'
    : 'x'
}

function document (element) {
  return element.ownerDocument
}

function docEl (element) {
  return document(element).documentElement
}

function isVisible (element) {
  return toArray(element).some(function (element) { return element.offsetHeight; })
}

export { height, width, positionAt, offset, position, flipPosition, getPositionAxis };
