import css from '@vuikit/core/helpers/css';
import { attr as attr$1 } from '@vuikit/core/helpers/dom/attr';
import { off, on } from '@vuikit/core/helpers/dom/event';
import { debounce, isUndefined, merge, toArray } from '@vuikit/core/util';

var docEl = document.documentElement;
var isRtl = attr$1(docEl, 'dir') === 'rtl';
var id = 1;
var index = {
  bind: function bind (el, binding) {
    el.vkheightmatchid = id++;
    on(window, 'resize', debounce(function () {
      update(el, binding);
    }, 10, true), ("vk-height-match-" + (el.vkheightmatchid)));
  },
  inserted: function inserted (el, binding, vnode) {
    vnode.context.$nextTick(function () { return update(el, binding); });
  },
  componentUpdated: function componentUpdated (el, binding) {
    update(el, binding);
  },
  unbind: function unbind (el) {
    off(window, 'resize', ("vk-height-match-" + (el.vkheightmatchid)));
  }
}
function update (el, binding) {
  var options = merge({
    target: ':scope > *',
    row: true
  }, (binding.value || {}));
  var elements = el.querySelectorAll(options.target);
  elements = [].slice.call(elements);
  applyHeight(elements, '');
  var rows = getRows(elements, options.row);
  rows.forEach(function (els) {
    var ref = match(els);
    var height = ref.height;
    var elements = ref.elements;
    applyHeight(elements, (height + "px"));
  });
}
function getRows (elements, row) {
  if (!row) {
    return [ elements ]
  }
  var rows = [[]];
  for (var i = 0; i < elements.length; i++) {
    var el = elements[i];
    var dim = el.getBoundingClientRect();
    if (!dim.height) {
      continue
    }
    for (var j = rows.length - 1; j >= 0; j--) {
      var row$1 = rows[j];
      if (!row$1[0]) {
        row$1.push(el);
        break
      }
      var leftDim = row$1[0].getBoundingClientRect();
      if (dim.top >= Math.floor(leftDim.bottom)) {
        rows.push([el]);
        break
      }
      if (Math.floor(dim.bottom) > leftDim.top) {
        if (dim.left < leftDim.left && !isRtl) {
          row$1.unshift(el);
          break
        }
        row$1.push(el);
        break
      }
      if (j === 0) {
        rows.unshift([el]);
        break
      }
    }
  }
  return rows
}
function match (elements) {
  if (elements.length < 2) {
    return {}
  }
  var max = 0;
  var heights = [];
  elements.forEach(function (el) {
    var style;
    var hidden;
    if (!isVisible(el)) {
      style = attr$1(el, 'style');
      hidden = attr$1(el, 'hidden');
      attr$1(el, {
        style: ((style || '') + ";display:block !important;"),
        hidden: null
      });
    }
    max = Math.max(max, el.offsetHeight);
    heights.push(el.offsetHeight);
    if (!isUndefined(style)) {
      attr$1(el, {style: style, hidden: hidden});
    }
  });
  elements = elements.filter(function (el, i) { return heights[i] < max; });
  return { height: max, elements: elements }
}
function isVisible (el) {
  return el.offsetHeight
}
function applyHeight (elements, height) {
  toArray(elements).forEach(function (el) { return css(el, 'minHeight', height); });
}

export default index;
