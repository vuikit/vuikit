import toArray from '@vuikit/core/utils/to-array';
import isObject from '@vuikit/core/utils/is-object';
import isFunction from '@vuikit/core/utils/is-function';
import isUndefined from '@vuikit/core/utils/is-undefined';

function attr (element, name, value) {

  if (isObject(name)) {
    for (var key in name) {
      attr(element, key, name[key]);
    }
    return
  }

  if (isUndefined(value)) {
    return element && element.getAttribute(name)
  } else {
    toArray(element).forEach(function (element) {

      if (isFunction(value)) {
        value = value.call(element, attr(element, name));
      }

      if (value === null) {
        removeAttr(element, name);
      } else {
        element.setAttribute(name, value);
      }
    });
  }

}

function hasAttr (element, name) {
  return toArray(element).some(function (element) { return element.hasAttribute(name); })
}

function removeAttr (element, name) {
  element = toArray(element);
  name.split(' ').forEach(function (name) { return element.forEach(function (element) { return element.removeAttribute(name); }
    ); }
  );
}

function filterAttr (element, attribute, pattern, replacement) {
  attr(element, attribute, function (value) { return value ? value.replace(pattern, replacement) : value; });
}

function data (element, attribute) {
  for (var i = 0, attrs = [attribute, ("data-" + attribute)]; i < attrs.length; i++) {
    if (hasAttr(element, attrs[i])) {
      return attr(element, attrs[i])
    }
  }
}

export { attr, hasAttr, removeAttr, filterAttr, data };
