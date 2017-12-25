import css from '@vuikit/core/helpers/css';
import { debounce, isInteger } from '@vuikit/core/util';
import { off, on } from '@vuikit/core/helpers/dom/event';

function offsetTop (element) {
  return element.getBoundingClientRect().top + window.pageYOffset
}
var index = {
  inserted: function inserted (el, binding, vnode) {
    vnode.context.$nextTick(function () {
      update(el, binding.modifiers, binding.value);
    });
    on(window, 'resize', debounce(function () {
      update(el, binding.modifiers, binding.value);
    }, 20), 'vk-height-viewport');
  },
  unbind: function unbind (el, binding, vnode) {
    off(window, 'resize', 'vk-height-viewport');
  }
}
function update (el, modifiers, value) {
  if ( value === void 0 ) value = {};
  var viewport = window.innerHeight;
  var offset = 0;
  var height;
  css(el, 'boxSizing', 'border-box');
  if (modifiers.expand) {
    css(el, 'height', '');
    css(el, 'minHeight', '');
    var diff = viewport - document.documentElement.offsetHeight;
    height = (el.offsetHeight + diff) + "px";
    css(el, 'minHeight', height);
  } else {
    var top = offsetTop(el);
    if (top < viewport / 2 && value.offsetTop) {
      offset += top;
    }
    if (value.offsetBottom === true) {
      offset += el.nextElementSibling.offsetHeight || 0;
    } else if (isInteger(value.offsetBottom)) {
      offset += (viewport / 100) * value.offsetBottom;
    } else if (value.offsetBottom && value.offsetBottom.substr(-2) === 'px') {
      offset += parseFloat(value.offsetBottom);
    }
    height = offset
      ? ("calc(100vh - " + offset + "px)")
      : '100vh';
    css(el, 'min-height', height);
  }
}

export default index;
