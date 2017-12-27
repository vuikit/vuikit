import { debounce, merge } from '@vuikit/core/util';
import { attr as attr$1 } from '@vuikit/core/helpers/dom/attr';
import { off, on } from '@vuikit/core/helpers/dom/event';
import { addClass, removeClass } from '@vuikit/core/helpers/dom/class';

var docEl = document.documentElement;
var isRtl = attr$1(docEl, 'dir') === 'rtl';
var id = 1;
var index = {
  bind: function bind (el, binding) {
    el.vkmarginid = id++;
    on(window, 'resize', debounce(function () {
      update(el, binding);
    }, 10, true), ("vk-margin-" + (el.vkmarginid)));
  },
  inserted: function inserted (el, binding, vnode) {
    vnode.context.$nextTick(function () { return update(el, binding); });
  },
  componentUpdated: function componentUpdated (el, binding) {
    update(el, binding);
  },
  unbind: function unbind (el) {
    off(window, 'resize', ("vk-margin-" + (el.vkmarginid)));
  }
}
function update (el, binding) {
  var options = merge({
    margin: 'uk-margin-small-top',
    firstColumn: 'uk-first-column'
  }, (binding.value || {}));
  var items = el.children;
  if (!items.length || !isVisible(el)) {
    return
  }
  var ref = getRows(items);
  var rows = ref.rows;
  rows.forEach(function (row, i) { return row.forEach(function (el, j) {
      removeClass(el, options.margin);
      removeClass(el, options.firstColumn)
      ;(i !== 0) && addClass(el, options.margin)
      ;(j === 0) && addClass(el, options.firstColumn);
    }); }
  );
}
function getRows (items) {
  var data = {};
  var rows = [[]];
  data.stacks = true;
  for (var i = 0; i < items.length; i++) {
    var el = items[i];
    var dim = el.getBoundingClientRect();
    if (!dim.height) {
      continue
    }
    for (var j = rows.length - 1; j >= 0; j--) {
      var row = rows[j];
      if (!row[0]) {
        row.push(el);
        break
      }
      var leftDim = row[0].getBoundingClientRect();
      if (dim.top >= Math.floor(leftDim.bottom)) {
        rows.push([el]);
        break
      }
      if (Math.floor(dim.bottom) > leftDim.top) {
        data.stacks = false;
        if (dim.left < leftDim.left && !isRtl) {
          row.unshift(el);
          break
        }
        row.push(el);
        break
      }
      if (j === 0) {
        rows.unshift([el]);
        break
      }
    }
  }
  data.rows = rows;
  return data
}
function isVisible (el) {
  return el.offsetHeight
}

export default index;
