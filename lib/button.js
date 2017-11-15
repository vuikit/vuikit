import mergeData from '@vuikit/core/helpers/fn-data-merge.js';
import toArray from '@vuikit/core/utils/to-array.js';
import includes from '@vuikit/core/utils/includes.js';
import { warn } from '@vuikit/core/helpers/debug.js';

var sizes = ['large', 'small'];
var styles = ['default', 'primary', 'secondary', 'danger', 'text', 'link'];

var button = {
  functional: true,
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default',
      validator: function (style) { return styles.indexOf(style) !== -1; }
    },
    size: {
      type: String,
      validator: function (size) { return !size || sizes.indexOf(size) !== -1; }
    },
    htmlType: {
      type: String,
      default: 'button'
    }
  },
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var children = ref.children;

    var disabled = props.disabled;
    var type = props.type;
    var size = props.size;
    var htmlType = props.htmlType;

    var def = {
      attrs: {
        type: htmlType,
        disabled: disabled
      },
      class: ['uk-button', ("uk-button-" + type)]
    };

    if (size) {
      def.class.push(("uk-button-" + size));
    }

    return h('button', mergeData(data, def), [
      children
    ])
  }
};

var buttonGroupCheckbox = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var children = ref.children;
    var listeners = ref.listeners;

    var buttons = children.filter(function (n) { return n.tag; });

    if (!validate(data, buttons)) {
      return
    }

    var groupValue = toArray(data.model.value);

    buttons.forEach(function (btn) {
      var index = buttons.indexOf(btn);
      var value = btn.data.attrs.value;
      var isActive = includes(groupValue, value);

      if (isActive) {
        btn.data.class.push('uk-active');
      }

      // on click toggle value
      btn.data.on = {
        click: function () {
          if (isActive) {
            groupValue.splice(index, 1);
          } else {
            groupValue.splice(index, 0, value);
          }

          listeners.input(groupValue);
        }
      };
    });

    return h('div', {
      class: ['uk-button-group']
    }, [
      children
    ])
  }
};

function validate (data, buttons) {
  // check group def
  if (!data.model) {
    warn('ButtonGroupCheckbox declaration is missing the v-model directive.');
    return false
  }

  // check buttons def
  var btnValues = buttons.map(function (btn) { return btn.data.attrs.value; });
  if (includes(btnValues, undefined)) {
    warn("Some of the ButtonGroupCheckbox buttons declaration is missing the 'value' prop.");
    return false
  }

  return true
}

var buttonGroupRadio = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var children = ref.children;
    var listeners = ref.listeners;

    var buttons = children.filter(function (n) { return n.tag; });

    if (!validate$1(data, buttons)) {
      return
    }

    var groupValue = data.model.value;

    buttons.forEach(function (btn) {
      var value = btn.data.attrs.value;

      if (value === groupValue) {
        btn.data.class.push('uk-active');
      }

      btn.data.on = {
        click: function () { return listeners.input(value); }
      };
    });

    return h('div', {
      class: ['uk-button-group']
    }, [
      children
    ])
  }
};

function validate$1 (data, buttons) {
  // check group def
  if (!data.model) {
    warn('ButtonGroupRadio declaration is missing the v-model directive.');
    return false
  }

  // check buttons def
  var btnValues = buttons.map(function (btn) { return btn.data.attrs.value; });
  if (includes(btnValues, undefined)) {
    warn("Some of the ButtonGroupRadio buttons declaration is missing the 'value' prop.");
    return false
  }

  return true
}

export { button as Button, buttonGroupCheckbox as ButtonGroupCheckbox, buttonGroupRadio as ButtonGroupRadio };
