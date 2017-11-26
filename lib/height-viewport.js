import css from '@vuikit/core/utils/css';
import { off, on } from '@vuikit/core/utils/event';
import debounce from '@vuikit/core/utils/debounce';
import isInteger from '@vuikit/core/utils/is-integer';

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
};

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
      // offset += this.$el.next().outerHeight() || 0
      offset += el.nextElementSibling.offsetHeight || 0;
    } else if (isInteger(value.offsetBottom)) {
      offset += (viewport / 100) * value.offsetBottom;
    } else if (value.offsetBottom && value.offsetBottom.substr(-2) === 'px') {
      offset += parseFloat(value.offsetBottom);
    }

    // TODO: support Vue el ref instead of query?
    // else if (isString(value.offsetBottom)) {
    //   var el = query(value.offsetBottom, el)
    //   offset += el && el.offsetHeight || 0
    // }

    height = offset
      ? ("calc(100vh - " + offset + "px)")
      : '100vh';

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

export default index;
