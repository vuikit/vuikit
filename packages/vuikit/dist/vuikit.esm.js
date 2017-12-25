/**
 * Vuikit 0.7.15
 * (c) 2017 Miljan Aleksic
 * @license MIT
 */

import { cloneArray, debounce, each, get, includes, isArray, isEmpty, isInteger, isObject, isString, isUndefined, toArray, toInteger } from '@vuikit/core/util';
import mergeData from '@vuikit/core/helpers/vue-data-merge';
import { warn } from '@vuikit/core/helpers/debug';
import { off, offAll, on, one } from '@vuikit/core/helpers/dom/event';
import Position from '@vuikit/core/directives/position';
import { flipPosition, getPositionAxis, height, positionAt, width } from '@vuikit/core/helpers/dom/position';
import css from '@vuikit/core/helpers/css';
import { transitionend } from '@vuikit/core/helpers/dom/env';
import { addClass, removeClass, toggleClass } from '@vuikit/core/helpers/dom/class';
import paginationMatrix from '@vuikit/core/helpers/pagination/matrix';
import { Animation as Animation$1 } from '@vuikit/core/helpers/dom/animation';

var breadcrumb = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"uk-breadcrumb"},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'Breadcrumb',
  props: {
    location: {
      type: String,
      default: '/'
    }
  },
  computed: {
    items: {
      get: function get$$1 () {
        return this.$slots.default.filter(function (c) { return c.componentOptions && c.componentOptions.tag === 'vk-breadcrumb-item'; }
        )
      },
      cache: false
    }
  },
  beforeMount: function beforeMount () {
    this.updateItems();
  },
  beforeUpdate: function beforeUpdate () {
    this.updateItems();
  },
  methods: {
    updateItems: function updateItems () {
      var this$1 = this;

      this.items.forEach(function (item) {
        var props = item.componentOptions.propsData;
        props.active = this$1.location === props.path;
      });
    }
  }
}

var breadcrumbItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{class:{ 'uk-active': _vm.active }},[(!_vm.disabled && !_vm.active)?_c('a',{on:{"click":function($event){$event.preventDefault();_vm.$parent.$emit('change', _vm.path);}}},[_vm._t("default",[_vm._v(" "+_vm._s(_vm.label)+" ")])],2):_c('span',[_vm._t("default",[_vm._v(" "+_vm._s(_vm.label)+" ")])],2)])},staticRenderFns: [],
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
}

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
    var obj;
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
      class: ['uk-button', ("uk-button-" + type), ( obj = {}, obj[("uk-button-" + size)] = size, obj)]
    };
    return h('button', mergeData(data, def), [
      children
    ])
  }
}

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
}
function validate (data, buttons) {
  if (!data.model) {
    warn('ButtonGroupCheckbox declaration is missing the v-model directive.');
    return false
  }
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
}
function validate$1 (data, buttons) {
  if (!data.model) {
    warn('ButtonGroupRadio declaration is missing the v-model directive.');
    return false
  }
  var btnValues = buttons.map(function (btn) { return btn.data.attrs.value; });
  if (includes(btnValues, undefined)) {
    warn("Some of the ButtonGroupRadio buttons declaration is missing the 'value' prop.");
    return false
  }
  return true
}

var padding = ['small', 'large'];
var types = ['primary', 'secondary', 'blank'];
var Header = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;
    return h('div', { class: 'uk-card-header' }, children);
}
};
var Body = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;
    return h('div', { class: 'uk-card-body' }, children);
}
};
var Footer = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;
    return h('div', { class: 'uk-card-footer' }, children);
}
};
var Badge = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;
    return h('div', { class: 'uk-card-badge' }, children);
}
};
var card = {
  functional: true,
  props: {
    type: {
      type: String,
      validator: function (val) { return !val || includes(types, val); }
    },
    padding: {
      type: String,
      validator: function (val) { return !val || includes(padding, val); }
    },
    hover: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var obj;
    var props = ref.props;
    var children = ref.children;
    var data = ref.data;
    var slots = ref.slots;
    var type = props.type;
    var padding = props.padding;
    var hover = props.hover;
    var _slots = slots();
    return h('div', mergeData(data, {
      class: ['uk-card', ( obj = {
        'uk-card-default': !includes(types, type),
        'uk-card-hover': hover
      }, obj[("uk-card-" + type)] = type, obj[("uk-card-" + padding)] = padding, obj)]
    }), [
      _slots.header && h(Header, _slots.header),
      _slots.default && h(Body, _slots.default),
      _slots.footer && h(Footer, _slots.footer),
      _slots.badge && h(Badge, _slots.badge)
    ])
  }
}

var cardTitle = {
  functional: true,
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var data = ref.data;
    return h('h3', mergeData(data, { class: 'uk-card-title' }), children)
  }
}

var isRtl = document.documentElement.getAttribute('dir') === 'rtl';

var positions = [
  'top-left',
  'top-center',
  'top-right',
  'top-justify',

  'bottom-left',
  'bottom-center',
  'bottom-right',
  'bottom-justify',

  'left-top',
  'left-center',
  'left-bottom',

  'right-top',
  'right-center',
  'right-bottom'
];

var Drop = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"position",rawName:"v-position",value:({
    flip: _vm.flip,
    target: _vm.$target,
    position: _vm.$position,
    boundary: _vm.$boundary,
    classPrefix: 'uk-drop'
  }),expression:"{\n    flip,\n    target: $target,\n    position: $position,\n    boundary: $boundary,\n    classPrefix: 'uk-drop'\n  }"}],class:['uk-drop', { 'uk-open': _vm.show }],style:(_vm.$style),on:{"mouseenter":function($event){if($event.target !== $event.currentTarget){ return null; }_vm.triggerShow($event);},"mouseleave":function($event){if($event.target !== $event.currentTarget){ return null; }_vm.hideOnLeave && _vm.triggerHide();}}},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'Drop',
  directives: {
    Position: Position
  },
  props: {
    // a Dom element to attach to
    target: {},
    // a Dom element as boundary
    boundary: {
      default: function () { return window; }
    },
    // a Dom element where to append the drop
    placement: {
      default: function () { return document.body; }
    },
    show: {
      type: Boolean,
      required: true
    },
    flip: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: ("bottom-" + (isRtl ? 'right' : 'left')),
      validator: function (pos) { return includes(positions, pos); }
    },
    triggers: {
      type: String,
      default: 'hover focus'
    },
    showDelay: {
      type: Number,
      default: 0
    },
    hideDelay: {
      type: Number,
      default: 100
    },
    // determines if hide should be
    // trriggered on drop mouseleave
    hideOnLeave: {
      type: Boolean,
      default: true
    },
    // determines if hide should be
    // trriggered on click outside
    hideOnClick: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    $position: function $position () {
      return this.position.replace('justify', 'center')
    },
    $dir: function $dir () {
      return this.position.split('-')[0]
    },
    $align: function $align () {
      return this.position.split('-')[1]
    },
    $style: function $style () {
      var style = {};
      var isJustified = this.$align === 'justify';

      if (!this.target || !isJustified) {
        return style
      }

      var rect = this.target.getBoundingClientRect();
      var prop = getPositionAxis(this.position) === 'y'
        ? 'width'
        : 'height';

      style[prop] = (rect[prop]) + "px";

      return style
    },
    $target: function $target () {
      return isString(this.target)
        ? get(this.$vnode.context.$refs, this.target)
        : this.target
    },
    $boundary: function $boundary () {
      return isString(this.boundary)
        ? get(this.$vnode.context.$refs, this.boundary)
        : this.boundary
    },
    $placement: function $placement () {
      return isString(this.placement)
        ? get(this.$vnode.context.$refs, this.placement)
        : this.placement
    }
  },
  watch: {
    triggers: function triggers () {
      this.removeTargetEvents(this.target);
      this.setTargetEvents(this.target);
    },
    target: function target (target$1, oldTarget) {
      this.removeTargetEvents(oldTarget);
      this.setTargetEvents();
    },
    show: function show (val) {
      var this$1 = this;

      if (val && this.triggers.match(/click/) && this.hideOnClick) {
        // trigger events when clicked outside drop
        on(window.document, 'click', function (e) {
          var clickInside = this$1.$el.contains(e.target);

          if (clickInside) {
            return
          }

          this$1.triggerHide();
        }, this._uid);
      } else {
        off(window.document, 'click', this._uid);
      }
    }
  },
  methods: {
    removeTargetEvents: function removeTargetEvents (target) {
      if (!target) {
        return
      }

      off(target, 'click mouseenter mouseleave focusin focusout', this._uid);
    },
    setTargetEvents: function setTargetEvents () {
      if (!this.$target) {
        return
      }

      if (this.triggers.match(/click/)) {
        on(this.$target, 'click', this.toggleShow, this._uid);
      }

      if (this.triggers.match(/hover/)) {
        on(this.$target, 'mouseenter', this.triggerShow, this._uid);
        on(this.$target, 'mouseleave', this.triggerHide, this._uid);
      }

      if (this.triggers.match(/focus/)) {
        on(this.$target, 'focusin', this.triggerShow, this._uid);
        on(this.$target, 'focusout', this.triggerHide, this._uid);
      }
    },
    triggerShow: function triggerShow () {
      var this$1 = this;

      clearTimeout(this.hideTimeout);

      this.showTimeout = setTimeout(function () {
        this$1.$emit('update:show', true);
      }, this.showDelay);
    },
    triggerHide: function triggerHide () {
      var this$1 = this;

      clearTimeout(this.showTimeout);

      this.hideTimeout = setTimeout(function () {
        this$1.$emit('update:show', false);
      }, this.hideDelay);
    },
    toggleShow: function toggleShow () {
      this.show
        ? this.triggerHide()
        : this.triggerShow();
    }
  },
  mounted: function mounted () {
    // placed in root to avoid being styled
    // from parent elements rules
    if (this.$placement) {
      this.$placement.appendChild(this.$el);
    }

    // set events
    this.setTargetEvents();
  },
  beforeDestroy: function beforeDestroy () {
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
}

var Dropdown = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"position",rawName:"v-position",value:({
    flip: _vm.flip,
    target: _vm.$target,
    position: _vm.$position,
    boundary: _vm.$boundary,
    classPrefix: 'uk-dropdown',
  }),expression:"{\n    flip,\n    target: $target,\n    position: $position,\n    boundary: $boundary,\n    classPrefix: 'uk-dropdown',\n  }"}],class:['uk-dropdown', { 'uk-open': _vm.show }],style:(_vm.$style),on:{"mouseenter":function($event){if($event.target !== $event.currentTarget){ return null; }_vm.triggerShow($event);},"mouseleave":function($event){if($event.target !== $event.currentTarget){ return null; }_vm.hideOnLeave && _vm.triggerHide();}}},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'Dropdown',
  extends: Drop
}

var dropdownNav = {
  functional: true,
  props: Dropdown.props,
  render: function (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var children = ref.children;
      return h(Dropdown, mergeData(data, { props: props }), [
      h('ul', { class: 'uk-nav uk-dropdown-nav' }, children)
    ]);
}
}

var VkIcon = {
  functional: true,
  props: {
    name: {
      type: String,
      default: ''
    },
    viewBox: String,
    ratio: [String, Number],
    width: [String, Number],
    height: [String, Number]
  },
  render: function (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var children = ref.children;
      return h('span', mergeData(data, { class: ['uk-icon'] }), [
      props.name
        ? h(("icon-" + (props.name)), { props: props })
        : children
    ]);
}
}

var VkIconLink = {
  functional: true,
  props: mergeData(VkIcon.props, {
    reset: {
      type: Boolean,
      default: false
    }
  }),
  render: function (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var children = ref.children;
      return h('a', mergeData(data, {
      class: ['uk-icon', {
        'uk-icon-link': props.reset
      }]
    }), [
      props.name
        ? h(("icon-" + (props.name)), { props: props })
        : children
    ]);
}
}

var iconButton = {
  functional: true,
  props: VkIcon.props,
  render: function (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var children = ref.children;
      return h('a', mergeData(data, { class: 'uk-icon uk-icon-button' }), [
      props.name
        ? h(("icon-" + (props.name)), { props: props })
        : children
    ]);
}
}

var iconnav = {
  functional: true,
  render: function (h, ref) {
      var children = ref.children;
      var data = ref.data;
      return h('ul', mergeData(data, { class: 'uk-iconnav' }), children);
}
}

var iconnavItem = {
  functional: true,
  props: {
    active: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      required: true
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var active = props.active;
    var icon = props.icon;
    return h('li', { class: { 'uk-active': active } }, [
      h(VkIconLink, mergeData(data, {
        props: { name: icon }
      }))
    ])
  }
}

var iconnavVertical = {
  functional: true,
  render: function (h, ref) {
      var children = ref.children;
      var data = ref.data;
      return h('ul', mergeData(data, { class: 'uk-iconnav uk-iconnav-vertical' }), children);
}
}

var obj;
var label = {
  functional: true,
  props: {
    type: {
      type: String,
      default: '',
      validator: function (val) { return !val || includes(['success', 'warning', 'danger'], val); }
    }
  },
  render: function (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var children = ref.children;
      return h('span', mergeData(data, {
      class: ['uk-label', ( obj = {}, obj[("uk-label-" + (props.type))] = props.type, obj)]
    }), children);
}
}

var doc = document.documentElement;
var active;
var activeModals;
var core = {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    closeOnKey: {
      type: [Number, Boolean],
      default: 27
    },
    closeOnBg: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    beforeEnter: function beforeEnter () {
      addClass(doc, 'uk-modal-page');
    },
    enter: function enter (el, done) {
      el.offsetWidth;
      addClass(el, 'uk-open');
      one(el, transitionend, done, function (e) { return e.target === el; });
    },
    afterEnter: function afterEnter () {
      activeModals++;
      if (active) {
        active.$emit('update:show', false);
      }
      active = this;
    },
    beforeLeave: function beforeLeave (el) {
      removeClass(el, 'uk-open');
    },
    leave: function leave (el, done) {
      one(el, transitionend, done, function (e) { return e.target === el; });
    },
    afterLeave: function afterLeave () {
      activeModals--;
      if (!activeModals) {
        removeClass(doc, 'uk-modal-page');
      }
      if (active === this) {
        active = null;
      }
    }
  },
  mounted: function mounted () {
    var this$1 = this;
    this.$root.$el.appendChild(this.$el);
    on(window, 'resize', debounce(function () {
      if (!this$1.show) {
        return
      }
      this$1.updateOverflowAuto();
    }, 30), this._uid);
    on(doc, 'keyup', function (e) {
      if (this$1.closeOnKey && e.keyCode === this$1.closeOnKey) {
        e.preventDefault();
        this$1.$emit('update:show', false);
      }
    }, this._uid);
  },
  beforeDestroy: function beforeDestroy () {
    off(doc, 'key', this._uid);
    off(window, 'resize', this._uid);
    this.$root.$el.removeChild(this.$el);
    this.afterLeave();
  }
}

var ModalTransition = {
  functional: true,
  render: function render (h, ref) {
    var modal = ref.parent;
    var children = ref.children;
    var data = ref.data;
    var def = {
      props: {
        css: false
      },
      on: {
        beforeEnter: modal.beforeEnter,
        enter: modal.enter,
        afterEnter: modal.afterEnter,
        beforeLeave: modal.beforeLeave,
        leave: modal.leave,
        afterLeave: modal.afterLeave
      }
    };
    return h('transition', mergeData(data, def), children)
  }
}

var IconClose = {
  functional: true,
  render: function (h, ctx) {
    var props = ctx.props;
    var ratio = props.ratio || 1;
    var width$$1 = props.width || 14;
    var height$$1 = props.height || 14;
    var viewBox = props.viewBox || '0 0 14 14';
    if (ratio !== 1) {
      width$$1 = width$$1 * ratio;
      height$$1 = height$$1 * ratio;
    }
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'icon-close-icon ratio-' + ratio,
        width: width$$1,
        height: height$$1,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<path fill="none" stroke="#000" stroke-width="1.1" d="M1 1l12 12M13 1L1 13"/>'
      }
    })
  }
}

var IconCloseLarge = {
  functional: true,
  render: function (h, ctx) {
    var props = ctx.props;
    var ratio = props.ratio || 1;
    var width$$1 = props.width || 20;
    var height$$1 = props.height || 20;
    var viewBox = props.viewBox || '0 0 20 20';
    if (ratio !== 1) {
      width$$1 = width$$1 * ratio;
      height$$1 = height$$1 * ratio;
    }
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'icon-close-large ratio-' + ratio,
        width: width$$1,
        height: height$$1,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<path fill="none" stroke="#000" stroke-width="1.4" d="M1 1l18 18M19 1L1 19"/>'
      }
    })
  }
}

var ModalBtnClose = {
  functional: true,
  props: ['type'],
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var type = props.type;
    var large = type === 'large';
    var outside = type === 'outside';
    var def = {
      class: ['uk-close', 'uk-icon', {
        'uk-modal-close-large': large,
        'uk-modal-close-outside': outside
      }],
      attrs: {
        type: 'button'
      }
    };
    return h('button', mergeData(data, def), [
      large
        ? h(IconCloseLarge)
        : h(IconClose)
    ])
  }
}

var modal = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('modal-transition',{on:{"enter":_vm.updateOverflowAuto}},[(_vm.show)?_c('div',{ref:"modal",class:['uk-modal', { 'uk-modal-container': _vm.container, 'uk-flex uk-flex-top': _vm.center }],style:({
      display: _vm.center
        ? ''
        : 'block'
    }),on:{"click":function($event){if($event.target !== $event.currentTarget){ return null; }_vm.closeOnBg && _vm.$emit('update:show', false);}}},[_c('div',{ref:"dialog",class:['uk-modal-dialog', _vm.widthClasses, { 'uk-margin-auto-vertical': _vm.center }]},[(_vm.closeBtn)?_c('modal-btn-close',{staticClass:"uk-modal-close-default",attrs:{"type":_vm.closeBtn},on:{"click":function($event){_vm.$emit('update:show', false);}}}):_vm._e(),_vm._v(" "),(_vm.$slots.header)?_c('div',{ref:"header",staticClass:"uk-modal-header"},[_vm._t("header")],2):_vm._e(),_vm._v(" "),_vm._t("dialog"),_vm._v(" "),(_vm.$slots.default)?_c('div',{ref:"body",class:['uk-modal-body', { 'uk-overflow-auto': _vm.overflowAuto }]},[_vm._t("default")],2):_vm._e(),_vm._v(" "),(_vm.$slots.footer)?_c('div',{ref:"footer",staticClass:"uk-modal-footer"},[_vm._t("footer")],2):_vm._e()],2)]):_vm._e()])},staticRenderFns: [],
  name: 'Modal',
  extends: core,
  components: {
    ModalBtnClose: ModalBtnClose,
    ModalTransition: ModalTransition
  },
  props: {
    // determines if close button should be displayed
    closeBtn: {
      type: [Boolean, String],
      default: false,
      validator: function (val) { return !val || includes([true, 'outside'], val); }
    },
    // determines if the modal should auto
    // adjust the height overflow
    overflowAuto: {
      type: Boolean,
      default: false
    },
    // expands the modal dialog to the default Container width
    container: {
      type: Boolean,
      default: false
    },
    // vertically centers the modal dialog
    center: {
      type: Boolean,
      default: false
    },
    // allows setting the dialog with using the uk-width-* classes
    width: {
      type: String,
      default: ''
    }
  },
  computed: {
    widthClasses: function widthClasses () {
      return this.width
        ? this.width.split(' ').map(function (width$$1) { return ("uk-width-" + width$$1); })
        : ''
    }
  },
  methods: {
    updateOverflowAuto: function updateOverflowAuto () {
      if (!this.overflowAuto) {
        return
      }

      var modal = this.$el;
      var modalBody = this.$refs.body;
      var modalDialog = this.$refs.dialog;

      css(modalBody, 'maxHeight', '150px');
      var maxHeight = Math.max(150, 150 + height(modal) - modalDialog.offsetHeight);
      css(modalBody, 'maxHeight', (maxHeight + "px"));
    }
  }
}

var modalFull = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('modal-transition',[(_vm.show)?_c('div',{staticClass:"uk-modal uk-modal-full",staticStyle:{"display":"block"}},[_c('div',{staticClass:"uk-modal-dialog uk-flex uk-flex-center uk-flex-middle",staticStyle:{"box-sizing":"border-box","min-height":"100vh","height":"100vh"}},[(_vm.closeBtn)?_c('modal-btn-close',{staticClass:"uk-modal-close-full",attrs:{"type":_vm.closeBtn},on:{"click":function($event){_vm.$emit('update:show', false);}}}):_vm._e(),_vm._v(" "),_vm._t("default")],2)]):_vm._e()])},staticRenderFns: [],
  name: 'ModalFull',
  extends: core,
  components: {
    ModalBtnClose: ModalBtnClose,
    ModalTransition: ModalTransition
  },
  props: {
    // determines if close button should be displayed
    closeBtn: {
      type: [Boolean, String],
      default: true,
      validator: function (val) { return !val || includes([true, 'large'], val); }
    }
  }
}

var nav = {
  functional: true,
  props: {
    center: {
      type: Boolean,
      default: false
    },
    primary: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var data = ref.data;
    var center = props.center;
    var primary = props.primary;
    return h('ul', mergeData(data, {
      class: ['uk-nav', {
        'uk-nav-center': center,
        'uk-nav-default': !primary,
        'uk-nav-primary': primary
      }]
    }), children)
  }
}

var navItem = {
  functional: true,
  props: {
    active: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var active = props.active;
    var label = props.label;
    var icon = props.icon;
    return h('li', mergeData(data, { class: { 'uk-active': active } }), [
      h('a', [
        icon && h(VkIcon, {
          class: 'uk-margin-small-right',
          props: { icon: icon }
        }),
        label
      ])
    ])
  }
}

var navItemHeader = {
  functional: true,
  props: {
    label: {
      type: String,
      required: true
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    return h('li', {
      class: 'uk-nav-header'
    }, [
      props.label
    ])
  }
}

var navItemParent = {
  functional: true,
  label: {
    type: String,
    required: true
  },
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var data = ref.data;
    return h('li', mergeData(data, {
      class: 'uk-parent'
    }), [
      h('a', [
        props.label
      ]),
      h('ul', {
        class: 'uk-nav-sub'
      }, children)
    ])
  }
}

var navItemDivider = {
  functional: true,
  render: function render (h, ref) {
    var children = ref.children;
    return h('li', {
      class: 'uk-nav-divider'
    })
  }
}

var LeftSlot = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;
    return h('div', { class: 'uk-navbar-left' }, children);
}
};
var CenterSlot = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;
    return h('div', { class: 'uk-navbar-center' }, children);
}
};
var RightSlot = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;
    return h('div', { class: 'uk-navbar-right' }, children);
}
};
var navbar = {
  functional: true,
  props: {
    transparent: {
      type: Boolean,
      default: false
    },
    container: {
      type: String,
      validator: function (val) { return includes(['expand', 'small', 'large'], val); }
    }
  },
  render: function render (h, ref) {
    var slots = ref.slots;
    var props = ref.props;
    var data = ref.data;
    var container = props.container;
    var transparent = props.transparent;
    var _slots = slots();
    var content = [
      (_slots.default || _slots.left) && h(LeftSlot, (_slots.default || _slots.left)),
      _slots.center && h(CenterSlot, _slots.center),
      _slots.right && h(RightSlot, _slots.right)
    ];
    return h('nav', mergeData(data, {
      class: ['uk-navbar-container', {
        'uk-navbar-transparent': transparent
      }]
    }), [
      h('div', {
        class: ['uk-container', {
          'uk-container-small': container === 'small',
          'uk-container-large': container === 'large',
          'uk-container-expand': container === 'expand'
        }]
      }, [
        h('div', { class: 'uk-navbar' }, content)
      ])
    ])
  }
}

var navbarItem = {
  functional: true,
  render: function render (h, ref) {
    var children = ref.children;
    var data = ref.data;
    return h('div', mergeData(data, { class: 'uk-navbar-item' }), children)
  }
}

var IconToggle = {
  functional: true,
  render: function (h, ctx) {
    var props = ctx.props;
    var ratio = props.ratio || 1;
    var width$$1 = props.width || 20;
    var height$$1 = props.height || 20;
    var viewBox = props.viewBox || '0 0 20 20';
    if (ratio !== 1) {
      width$$1 = width$$1 * ratio;
      height$$1 = height$$1 * ratio;
    }
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'icon-navbar-toggle-icon ratio-' + ratio,
        width: width$$1,
        height: height$$1,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<path d="M0 9h20v2H0zM0 3h20v2H0zM0 15h20v2H0z"/>'
      }
    })
  }
}

var NavbarToggleIcon = {
  functional: true,
  render: function (h) { return h('span', { class: 'uk-navbar-toggle-icon uk-icon' }, [ h(IconToggle) ]); }
};
var NavbarToggleLabel = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;
    return h('span', { class: 'uk-margin-small-left' }, children);
}
};
var navbarToggle = {
  functional: true,
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  render: function render (h, ref) {
    var children = ref.children;
    var data = ref.data;
    var props = ref.props;
    var label = props.label;
    return h('a', mergeData(data, { class: 'uk-navbar-toggle' }), [
      h(NavbarToggleIcon),
      label && h(NavbarToggleLabel, label)
    ])
  }
}

var navbarNav = {
  functional: true,
  render: function render (h, ref) {
    var children = ref.children;
    var data = ref.data;
    return h('ul', mergeData(data, { class: 'uk-navbar-nav' }), children)
  }
}

var Subtitle = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;
    return h('div', { class: 'uk-navbar-subtitle' }, children);
}
};
var navbarNavItem = {
  functional: true,
  props: {
    active: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var data = ref.data;
    var active = props.active;
    var label = props.label;
    var subtitle = props.subtitle;
    return h('li', mergeData(data, { class: { 'uk-active': active } }), [
      h('a', [
        subtitle
          ? h('div', [ label, h(Subtitle, subtitle) ])
          : label
      ]),
      children
    ])
  }
}

var navbarNavDropdown = {
  functional: true,
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var data = ref.data;
    var open = props.open;
    return h('div', mergeData(data, {
      class: ['uk-navbar-dropdown', {
        'uk-open': open
      }]
    }), [
      h('ul', { class: 'uk-nav uk-navbar-dropdown-nav' }, children)
    ])
  }
}

var status = [
  'primary',
  'success',
  'warning',
  'danger'
];
var NotificationMessage = {
  functional: true,
  props: {
    status: {
      type: String,
      default: '',
      validator: function (val) { return !val || status.indexOf(val) !== -1; }
    },
    transition: {
      type: String,
      default: ''
    }
  },
  render: function render (h, ref) {
    var parent = ref.parent;
    var props = ref.props;
    var children = ref.children;
    var data = ref.data;
    var status = props.status;
    var def = {
      class: ['uk-notification-message']
    };
    if (status) {
      def.class.push(("uk-notification-message-" + status));
    }
    return h('div', mergeData(data, def), [
      children
    ])
  }
}

var timeouts = {};
var defaultTimeout = 4500;

var positions$1 = [
  'bottom-left',
  'bottom-center',
  'bottom-right',

  'top-left',
  'top-center',
  'top-right'
];

var notification = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[ 'uk-notification', ("uk-notification-" + (this.position)) ]},_vm._l((_vm.normalizedNfcs),function(n){return _c('notification-message',{key:n.key || n.message,attrs:{"status":n.status,"timeout":n.timeout},on:{"click":function($event){_vm.remove(n);},"mouseenter":function($event){_vm.cancelTimeout(n);},"mouseleave":function($event){_vm.initTimeout(n);}}},[_vm._t("default",[_vm._v(" "+_vm._s(n.message)+" ")],{message:n.message})],2)}))},staticRenderFns: [],
  name: 'Notification',
  components: {
    NotificationMessage: NotificationMessage
  },
  props: {
    notifications: {
      type: Array,
      default: function () { return []; }
      // validator: val => {
      //   const ntfs = val.filter(isObject)
      // }
    },
    position: {
      type: String,
      default: 'top-center',
      validator: function (pos) { return positions$1.indexOf(pos) !== -1; }
    }
  },
  computed: {
    normalizedNfcs: function normalizedNfcs () {
      var this$1 = this;

      return this.notifications.map(function (n) {
        if (!isObject(n)) {
          warn('The Notification value must be an Object');
          return
        }

        this$1.initTimeout(n);

        return n
      })
    }
  },
  methods: {
    remove: function remove (n) {
      var index = this.notifications.indexOf(n);

      if (index !== -1) {
        var notifications = cloneArray(this.notifications);
        notifications.splice(index, 1);

        this.$emit('update:notifications', notifications);
      }
    },
    initTimeout: function initTimeout (n) {
      var this$1 = this;

      var timeout = n.timeout || defaultTimeout;

      if (!isInteger(timeout)) {
        warn('Notification timeout is invalid');
      }

      var id = getId(n);
      var timeoutIsSet = !isUndefined(timeouts[id]);
      var timeoutShouldBeSet = timeout > 0;

      if (timeoutShouldBeSet && !timeoutIsSet) {
        var timeoutId = setTimeout(function () {
          this$1.remove(n);
          delete timeouts[id];
        }, timeout);

        timeouts[id] = timeoutId;
      }
    },
    cancelTimeout: function cancelTimeout (n) {
      var id = getId(n);
      var timeoutIsSet = !isUndefined(timeouts[id]);

      if (timeoutIsSet) {
        clearTimeout(timeouts[id]);
        delete timeouts[id];
      }
    }
  },
  mounted: function mounted () {
    document.body.appendChild(this.$el);
  },
  beforeDestroy: function beforeDestroy () {
    if (this.$el.parentNode) {
      document.body.removeChild(this.$el);
    }
  }
}

function getId (n) {
  var msg = n.message.replace(/ /g, '');
  var key = n.key || 'key';
  var timeout = n.timeout || 0;

  return (msg + "-" + key + "-" + timeout)
}

var win$1 = window;
var body = document.body;
var doc$2 = document.documentElement;
var scroll;
var active$1;
var activeCount;
var scrollbarWidth;
function common (vm) { return ({
  on: {
    beforeEnter: function beforeEnter (el) {
      scrollbarWidth = width(win$1) - doc$2.offsetWidth;
      scroll = scroll || { x: win$1.pageXOffset, y: win$1.pageYOffset };
      addClass(doc$2, 'uk-offcanvas-page');
      addClass(body, 'uk-offcanvas-container');
      if (vm.flip) {
        addClass(body, 'uk-offcanvas-flip');
        addClass(vm.$refs.bar, 'uk-offcanvas-bar-flip');
      }
      if (vm.overlay) {
        addClass(el, 'uk-offcanvas-overlay');
        addClass(body, 'uk-offcanvas-overlay');
      }
    },
    afterEnter: function afterEnter (el) {
      if (vm.overlay) {
        width(vm.$refs.content, width(win$1) - scrollbarWidth);
        height(vm.$refs.content, height(win$1));
        if (scroll) {
          vm.$refs.content.scrollTop = scroll.y;
        }
      }
      if (!activeCount) {
        setGlobalEvents();
      }
      active$1 = vm;
      activeCount++;
    },
    afterLeave: function afterLeave (el) {
      if (!vm.overlay) {
        scroll = { x: win$1.pageXOffset, y: win$1.pageYOffset };
      } else if (!scroll) {
        var ref = vm.$refs.content;
        var x = ref.scrollLeft;
        var y = ref.scrollTop;
        scroll = { x: x, y: y };
      }
      removeClass(body, 'uk-offcanvas-flip');
      removeClass(vm.$refs.bar, 'uk-offcanvas-bar-flip');
      removeClass(doc$2, 'uk-offcanvas-page');
      removeClass(body, 'uk-offcanvas-container');
      removeClass(el, 'uk-offcanvas-overlay');
      removeClass(body, 'uk-offcanvas-overlay');
      body.scrollTop = scroll.y;
      css(body, 'overflowY', '');
      css(doc$2, 'overflowY', '');
      width(vm.$refs.content, '');
      height(vm.$refs.content, '');
      win$1.scrollTo(scroll.x, scroll.y);
      scroll = null;
      activeCount--;
      if (!activeCount) {
        unsetGlobalEvents();
      }
      if (active$1 === vm) {
        active$1 = null;
      }
    }
  }
}); }
function unsetGlobalEvents () {
  offAll('vk-offcanvas');
}
function setGlobalEvents () {
  on(doc$2, 'click', function (e) {
    var clickOut = !active$1.$el.contains(e.target);
    var clickOnOverlay = e.target === active$1.$el && active$1.overlay;
    if (clickOut || clickOnOverlay) {
      active$1.hide();
    }
  }, 'vk-offcanvas');
  on(doc$2, 'keyup', function (e) {
    if (e.keyCode === 27 && active$1) {
      e.preventDefault();
      active$1.hide();
    }
  }, 'vk-offcanvas');
}

var win = window;
var doc$1 = document.documentElement;
var VkOffcanvasTransitionNone = {
  functional: true,
  render: function render (h, ref) {
    var vm = ref.parent;
    var data = ref.data;
    var children = ref.children;
    var def = {
      props: {
        css: false
      },
      on: {
        enter: function (el, done) { return done(); },
        leave: function (el, done) { return done(); },
        beforeEnter: function beforeEnter (el) {
          var scrollbarWidth = width(win) - doc$1.offsetWidth;
          css(doc$1, 'overflowY', scrollbarWidth && vm.overlay
            ? 'scroll'
            : ''
          );
          addClass(el, 'uk-open');
          addClass(vm.$refs.bar, 'uk-offcanvas-none');
        },
        afterLeave: function afterLeave (el) {
          removeClass(el, 'uk-open');
          removeClass(vm.$refs.bar, 'uk-offcanvas-none');
        }
      }
    };
    return h('transition', mergeData(data, def, common(vm)), children)
  }
}

var win$2 = window;
var doc$3 = document.documentElement;
var VkOffcanvasTransitionPush = {
  functional: true,
  render: function render (h, ref) {
    var vm = ref.parent;
    var data = ref.data;
    var children = ref.children;
    var def = {
      props: {
        css: false
      },
      on: {
        beforeEnter: function beforeEnter (el) {
          var scrollbarWidth = width(win$2) - doc$3.offsetWidth;
          css(doc$3, 'overflowY', vm.flip && scrollbarWidth && vm.overlay
            ? 'scroll'
            : ''
          );
          addClass(vm.$refs.bar, 'uk-offcanvas-bar-animation uk-offcanvas-push');
        },
        enter: function enter (el, done) {
          height(el);
          addClass(el, 'uk-open');
          addClass(vm.$refs.content, 'uk-offcanvas-content-animation');
          one(el, transitionend, done, function (e) { return e.target === vm.$refs.bar; });
        },
        beforeLeave: function beforeLeave (el) {
          removeClass(el, 'uk-open');
          removeClass(vm.$refs.content, 'uk-offcanvas-content-animation');
        },
        leave: function leave (el, done) {
          var bar = vm.$refs.bar;
          one(el, transitionend, done, function (e) { return e.target === bar; });
        },
        afterLeave: function afterLeave (el) {
          removeClass(vm.$refs.bar, 'uk-offcanvas-bar-animation uk-offcanvas-push');
        }
      }
    };
    return h('transition', mergeData(data, def, common(vm)), children)
  }
}

var win$3 = window;
var doc$4 = document.documentElement;
var VkOffcanvasTransitionSlide = {
  functional: true,
  render: function render (h, ref) {
    var vm = ref.parent;
    var data = ref.data;
    var children = ref.children;
    var def = {
      props: {
        css: false
      },
      on: {
        beforeEnter: function beforeEnter (el) {
          var scrollbarWidth = width(win$3) - doc$4.offsetWidth;
          css(doc$4, 'overflowY', scrollbarWidth && vm.overlay
            ? 'scroll'
            : ''
          );
          addClass(vm.$refs.bar, 'uk-offcanvas-bar-animation uk-offcanvas-slide');
        },
        enter: function enter (el, done) {
          height(el);
          addClass(el, 'uk-open');
          one(el, transitionend, done, function (e) { return e.target === vm.$refs.bar; });
        },
        beforeLeave: function beforeLeave (el) {
          removeClass(el, 'uk-open');
        },
        leave: function leave (el, done) {
          var bar = vm.$refs.bar;
          one(el, transitionend, done, function (e) { return e.target === bar; });
        },
        afterLeave: function afterLeave (el) {
          removeClass(vm.$refs.bar, 'uk-offcanvas-bar-animation uk-offcanvas-slide');
        }
      }
    };
    return h('transition', mergeData(data, def, common(vm)), children)
  }
}

var win$4 = window;
var doc$5 = document.documentElement;
var VkOffcanvasTransitionReveal = {
  functional: true,
  render: function render (h, ref) {
    var vm = ref.parent;
    var data = ref.data;
    var children = ref.children;
    var wrapper = vm.$refs.wrapper;
    var bar;
    var def = {
      props: {
        css: false
      },
      on: {
        beforeEnter: function beforeEnter (el) {
          var scrollbarWidth = width(win$4) - doc$5.offsetWidth;
          width(vm.$refs.content, width(win$4) - scrollbarWidth);
          css(doc$5, 'overflowY', vm.flip && scrollbarWidth && vm.overlay
            ? 'scroll'
            : ''
          );
          wrapper = document.createElement('div');
          addClass(wrapper, 'uk-offcanvas-reveal');
          el.appendChild(wrapper);
          wrapper.appendChild(vm.$refs.bar);
          vm.$refs.wrapper = wrapper;
        },
        enter: function enter (el, done) {
          height(el);
          addClass(el, 'uk-open');
          addClass(vm.$refs.content, 'uk-offcanvas-content-animation');
          one(el, transitionend, done, function (e) { return e.target === wrapper; });
        },
        beforeLeave: function beforeLeave (el) {
          bar = vm.$refs.bar;
          removeClass(el, 'uk-open');
          removeClass(vm.$refs.content, 'uk-offcanvas-content-animation');
        },
        leave: function leave (el, done) {
          one(el, transitionend, done, function (e) { return e.target === wrapper; });
        },
        afterLeave: function afterLeave (el) {
          el.appendChild(bar);
          el.removeChild(wrapper);
        }
      }
    };
    return h('transition', mergeData(data, def, common(vm)), children)
  }
}

var offcanvas = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(("vk-offcanvas-transition-" + (_vm.transition)),{tag:"component"},[(_vm.show)?_c('div',{staticClass:"uk-offcanvas",staticStyle:{"display":"block"}},[_c('div',{ref:"bar",staticClass:"uk-offcanvas-bar"},[_vm._t("default")],2)]):_vm._e()])},staticRenderFns: [],
  name: 'Offcanvas',
  components: {
    VkOffcanvasTransitionNone: VkOffcanvasTransitionNone,
    VkOffcanvasTransitionPush: VkOffcanvasTransitionPush,
    VkOffcanvasTransitionSlide: VkOffcanvasTransitionSlide,
    VkOffcanvasTransitionReveal: VkOffcanvasTransitionReveal
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    flip: {
      type: Boolean,
      default: false
    },
    overlay: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
      default: 'slide',
      validator: function (mode) { return mode.match(/none|slide|push|reveal/); }
    }
  },
  methods: {
    hide: function hide () {
      this.$emit('update:show', false);
    }
  },
  mounted: function mounted () {
    this.$refs.content = document.body.querySelector(".uk-offcanvas-content");

    if (!this.$refs.content) {
      warn('Offcanvas content is not detected, make sure to wrap the content with VkOffcanvasContent or a custom div.uk-offcanvas-content.', this);
      this.$destroy();
    }
  }
}

var offcanvasContent = {
  functional: true,
  render: function (h, ref) {
      var children = ref.children;
      return h('div', {
      class: 'uk-offcanvas-content'
    }, children);
}
}

var offcanvasClose = {
  functional: true,
  render: function (h, ref) {
      var data = ref.data;
      return h('button', {
      class: 'uk-offcanvas-close uk-close uk-icon',
      attrs: {
        type: 'button'
      },
      on: data.on
    }, [
      h(IconClose)
    ]);
}
}

var IconNext = {
  functional: true,
  render: function (h, ctx) {
    var props = ctx.props;
    var ratio = props.ratio || 1;
    var width$$1 = props.width || 7;
    var height$$1 = props.height || 12;
    var viewBox = props.viewBox || '0 0 7 12';
    if (ratio !== 1) {
      width$$1 = width$$1 * ratio;
      height$$1 = height$$1 * ratio;
    }
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'icon-pagination-next ratio-' + ratio,
        width: width$$1,
        height: height$$1,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<path fill="none" stroke="#000" stroke-width="1.2" d="M1 1l5 5-5 5"/>'
      }
    })
  }
}

var PaginationLast = {
  functional: true,
  props: ['label', 'expand'],
  render: function render (h, ref) {
    var props = ref.props;
    var parent = ref.parent;
    var label = props.label;
    var expand = props.expand;
    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', { attrs: { label: label, expand: expand } }, 'last')
    }
    return h('li', {
      class: {
        'uk-disabled': parent.nextPage > parent.lastPage,
        'uk-margin-auto-left': expand !== undefined
      }
    }, [
      h('a', {
        on: { click: function (e) { return parent.$emit('update:page', parent.lastPage); } }
      }, [
        label && label,
        h('span', {
          staticClass: 'uk-icon uk-pagination-next',
          class: {
            'uk-margin-small-left': label
          }
        }, [ h(IconNext) ])
      ])
    ])
  }
}

var IconPrevious = {
  functional: true,
  render: function (h, ctx) {
    var props = ctx.props;
    var ratio = props.ratio || 1;
    var width$$1 = props.width || 7;
    var height$$1 = props.height || 12;
    var viewBox = props.viewBox || '0 0 7 12';
    if (ratio !== 1) {
      width$$1 = width$$1 * ratio;
      height$$1 = height$$1 * ratio;
    }
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'icon-pagination-previous ratio-' + ratio,
        width: width$$1,
        height: height$$1,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<path fill="none" stroke="#000" stroke-width="1.2" d="M6 1L1 6l5 5"/>'
      }
    })
  }
}

var PaginationPrev = {
  functional: true,
  props: ['label', 'expand'],
  render: function render (h, ref) {
    var props = ref.props;
    var parent = ref.parent;
    var label = props.label;
    var expand = props.expand;
    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', { attrs: { label: label, expand: expand } }, 'prev')
    }
    return h('li', {
      class: {
        'uk-disabled': parent.prevPage < 1,
        'uk-margin-auto-right': expand !== undefined
      }
    }, [
      h('a', {
        on: { click: function (e) { return parent.$emit('update:page', parent.prevPage); } }
      }, [
        h('span', {
          staticClass: 'uk-icon uk-pagination-prev',
          class: {
            'uk-margin-small-right': label
          }
        }, [ h(IconPrevious) ]),
        label && label
      ])
    ])
  }
}

var PaginationNext = {
  functional: true,
  props: ['label', 'expand'],
  render: function render (h, ref) {
    var props = ref.props;
    var parent = ref.parent;
    var label = props.label;
    var expand = props.expand;
    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', { attrs: { label: label, expand: expand } }, 'next')
    }
    return h('li', {
      class: {
        'uk-disabled': parent.nextPage > parent.lastPage,
        'uk-margin-auto-left': expand !== undefined
      }
    }, [
      h('a', {
        on: { click: function (e) { return parent.$emit('update:page', parent.nextPage); } }
      }, [
        label && label,
        h('span', {
          staticClass: 'uk-icon uk-pagination-next',
          class: {
            'uk-margin-small-left': label
          }
        }, [ h(IconNext) ])
      ])
    ])
  }
}

var PaginationFirst = {
  functional: true,
  props: ['label', 'expand'],
  render: function render (h, ref) {
    var props = ref.props;
    var parent = ref.parent;
    var label = props.label;
    var expand = props.expand;
    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', { attrs: { label: label, expand: expand } }, 'first')
    }
    return h('li', {
      class: {
        'uk-disabled': parent.prevPage < 1,
        'uk-margin-auto-right': expand !== undefined
      }
    }, [
      h('a', {
        on: { click: function (e) { return parent.$emit('update:page', 1); } }
      }, [
        h('span', {
          staticClass: 'uk-icon uk-pagination-prev',
          class: {
            'uk-margin-small-right': label
          }
        }, [ h(IconPrevious) ]),
        label && label
      ])
    ])
  }
}

var PaginationPages = {
  functional: true,
  render: function (h, ref) {
    var parent = ref.parent;
    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', 'pages')
    }
    var currentPage = parent.page;
    return parent.pages.map(function (page) {
      var isPage = isInteger(page);
      var isActive = isPage && currentPage === page;
      return h('li', { class: { 'uk-active': isActive } }, [
        isPage
          ? isActive
            ? h('span', page)
            : h('a', {
              on: { click: function (e) {
                parent.$emit('update:page', page);
              }}
            }, page)
          : h('span', '...')
      ])
    })
  }
}

var partsMap = {
  first: PaginationFirst,
  last: PaginationLast,
  prev: PaginationPrev,
  next: PaginationNext,
  pages: PaginationPages
};

var pagination = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"uk-pagination",class:{ 'uk-flex-center': _vm.align !== 'left' && _vm.align !== 'right', 'uk-flex-right': _vm.align === 'right' }},[_c('pag-parts')],1)},staticRenderFns: [],
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
    prevPage: function prevPage () {
      return this.page - 1
    },
    nextPage: function nextPage () {
      return this.page + 1
    },
    pages: function pages () {
      return paginationMatrix({ total: this.total, page: this.page, perPage: this.perPage })
    },
    lastPage: function lastPage () {
      return this.pages[this.pages.length - 1]
    }
  },
  components: {
    'pag-parts': {
      functional: true,
      render: function render (h, ref) {
        var parent = ref.parent;

        var lis = [];
        parent.$parts.forEach(function (part) {
          part = parent.$createElement(part.comp, { props: part.props });

          if (isArray(part)) {
            lis = lis.concat(part);
          } else {
            lis.push(part);
          }
        });

        return lis
      }
    }
  },
  created: function created () {
    this.$parts = this.$slots.default
      .filter(function (slot) { return slot.children; })
      .map(function (slot) { return ({
        comp: partsMap[slot.children[0].text],
        props: (slot.data && slot.data.attrs) || {}
      }); });
  }
}

var IconSpinner = {
  functional: true,
  render: function (h, ctx) {
    var props = ctx.props;
    var ratio = props.ratio || 1;
    var width$$1 = props.width || 30;
    var height$$1 = props.height || 30;
    var viewBox = props.viewBox || '0 0 30 30';
    if (ratio !== 1) {
      width$$1 = width$$1 * ratio;
      height$$1 = height$$1 * ratio;
    }
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'icon-spinner ratio-' + ratio,
        width: width$$1,
        height: height$$1,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<circle fill="none" stroke="#000" cx="15" cy="15" r="14"/>'
      }
    })
  }
}

var spinner = {
  functional: true,
  props: ['ratio'],
  render: function render (h, ref) {
    var props = ref.props;
    return h('div', {
      class: ['uk-icon uk-spinner']
    }, [
      h(IconSpinner, {
        props: {
          ratio: props.ratio
        }
      })
    ])
  }
}

var scroll$1 = 0;
on(window, 'scroll', function () {
  scroll$1 = window.pageYOffset;
});
function offsetTop (element) {
  return element.getBoundingClientRect().top + window.pageYOffset
}
var sticky = {
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
  data: function () { return ({
    isActive: false,
    topOffset: 0,
    outerHeight: 0,
    clsFixed: 'uk-sticky-fixed',
    clsBelow: 'uk-sticky-below',
    clsActive: 'uk-active',
    clsInactive: ''
  }); },
  render: function render (h) {
    var this$1 = this;
    var children = this.$options._renderChildren;
    if (!children) {
      return
    }
    children = children.filter(function (n) { return n.tag; });
    if (!children.length) {
      return
    }
    if ("development" !== 'production' && children.length > 1) {
      warn('<vk-sticky> can only be used on a single element.', this.$parent);
    }
    var rawChild = children[0];
    on(window, 'scroll', function () {
      this$1.offsetTop = offsetTop(this$1.$el);
      this$1.visible = isVisible(this$1.$el);
      this$1.onScroll();
    }, this._uid);
    return rawChild
  },
  computed: {
    stickyStartPoint: function stickyStartPoint () {
      var top = this.top;
      if (isInteger(top) && this.topOffset) {
        top = this.topOffset + parseFloat(top);
      } else if (isString(top) && top.match(/^-?\d+vh$/)) {
        top = getViewportHeightOffset(top);
      } else {
        top = this.getElementOffset(top);
      }
      return Math.max(parseFloat(top), this.topOffset) - this.offset
    },
    stickyEndPoint: function stickyEndPoint () {
      var bottom = this.bottom;
      bottom = this.getElementOffset(bottom === true
        ? this.$el.parent()
        : bottom
      );
      return bottom && bottom - this.outerHeight
    },
    inactive: function inactive () {
      return this.media && !window.matchMedia(this.media).matches
    },
    $widthElement: function $widthElement () {
      return this.widthElement || this.$el
    },
    bottomOffset: function bottomOffset () {
      return this.topOffset + this.outerHeight
    }
  },
  methods: {
    show: function show () {
      this.isActive = true;
      this.update();
      this.placeholder.removeAttribute('hidden');
    },
    hide: function hide () {
      addClass(this.$el, this.clsInactive);
      removeClass(this.$el, ((this.clsFixed) + " " + (this.clsActive) + " " + (this.clsBelow)));
      css(this.$el, 'position', '');
      css(this.$el, 'width', '');
      css(this.$el, 'top', '');
      this.placeholder.setAttribute('hidden', 'hidden');
    },
    update: function update () {
      var top = Math.max(0, this.offset);
      var active = scroll$1 > this.stickyStartPoint;
      if (this.stickyEndPoint && scroll$1 > this.stickyEndPoint - this.offset) {
        top = this.stickyEndPoint - scroll$1;
      }
      addClass(this.$el, this.clsFixed);
      css(this.$el, 'width', ((this.$widthElement.offsetWidth) + "px"));
      css(this.$el, 'position', 'fixed');
      css(this.$el, 'top', (top + "px"));
      toggleClass(this.$el, this.clsActive, active);
      toggleClass(this.$el, this.clsInactive, !active);
      toggleClass(this.$el, this.clsBelow, scroll$1 > this.bottomOffset);
    },
    onScroll: function onScroll () {
      var this$1 = this;
      var scrollNotReachedStartPoint = scroll$1 < this.stickyStartPoint;
      if (this.inactive || scrollNotReachedStartPoint) {
        if (!this.isActive) {
          return
        }
        this.isActive = false;
        if (this.animation && scroll$1 > this.topOffset) {
          Animation.cancel(this.$el).then(function () { return Animation.out(this$1.$el, this$1.animation).then(function () { return this$1.hide(); }); }
          );
        } else {
          this.hide();
        }
      } else if (this.isActive) {
        this.update();
      } else if (this.animation) {
        Animation.cancel(this.$el).then(function () {
          this$1.show();
          Animation.in(this$1.$el, this$1.animation);
        });
      } else {
        this.show();
      }
    },
    createPlaceholder: function createPlaceholder () {
      this.placeholder = document.createElement('div');
      addClass(this.placeholder, 'uk-sticky-placeholder');
      this.placeholder.setAttribute('hidden', 'hidden');
      if (!this.$el.parentNode.contains(this.placeholder)) {
        this.$el.parentNode.appendChild(this.placeholder);
      }
    },
    updatePlaceholder: function updatePlaceholder () {
      css(this.placeholder, 'height', ((this.outerHeight) + "px"));
      css(this.placeholder, 'marginTop', css(this.$el, 'marginTop'));
      css(this.placeholder, 'marginBottom', css(this.$el, 'marginBottom'));
      css(this.placeholder, 'marginLeft', css(this.$el, 'marginLeft'));
      css(this.placeholder, 'marginRight', css(this.$el, 'marginRight'));
    },
    getElementOffset: function getElementOffset (el) {
      el = isString(el)
        ? this.$vnode.context.$refs[el]
        : el;
      if (el) {
        return offsetTop(el) + el.offsetHeight
      }
    }
  },
  mounted: function mounted () {
    addClass(this.$el, 'uk-sticky');
    this.topOffset = offsetTop(this.$el);
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
}
function isVisible (el) {
  if (!el) {
    return false
  }
  var elemTop = el.getBoundingClientRect().top;
  var elemBottom = el.getBoundingClientRect().bottom;
  var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
  return isVisible
}
function getViewportHeightOffset (height$$1) {
  return window.innerHeight * parseFloat(height$$1) / 100
}

var subnav = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"uk-subnav",class:{ 'uk-subnav-divider': _vm.divider, 'uk-subnav-pill': _vm.pill }},[_vm._t("default")],2)},staticRenderFns: [],
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
      get: function get$$1 () {
        return this.$slots.default.filter(function (c) { return c.componentOptions && c.componentOptions.tag === 'vk-subnav-item'; }
        )
      },
      cache: false
    }
  },
  beforeMount: function beforeMount () {
    this.updateItems();
  },
  beforeUpdate: function beforeUpdate () {
    this.updateItems();
  },
  methods: {
    updateItems: function updateItems () {
      var this$1 = this;

      this.items.forEach(function (item, index) {
        var alias = this$1.getItemAlias(item);
        var active = this$1.activeItem === alias;
        var props = item.componentOptions.propsData;
        props.active = active;
        props.alias = alias;
      });
    },
    getItemAlias: function getItemAlias (item) {
      return item.componentOptions.propsData.alias || this.items.indexOf(item) + 1
    }
  }
}

var subnavItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{class:{ 'uk-active': _vm.active, 'uk-disabled': _vm.disabled }},[_c('a',{on:{"click":function($event){$event.preventDefault();(!_vm.disabled && !_vm.active) && _vm.$parent.$emit('change', _vm.alias);}}},[_vm._t("default",[_vm._v(_vm._s(_vm.label))])],2)])},staticRenderFns: [],
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
}

var TabContent = {
  functional: true,
  render: function (h, ref) {
    var parent = ref.parent;
    return parent.tabs
    .filter(function (tab) { return parent.activeTab === tab.name; })
    .map(function (tab) { return tab.node; });
}
};
var core$1 = {
  components: {
    TabContent: TabContent
  },
  props: {
    activeTab: {
      type: String,
      required: true
    },
    transition: {
      type: String,
      default: ''
    }
  },
  computed: {
    tabs: {
      get: function get$$1 () {
        var slots = (this.$slots.default || [])
          .filter(function (n) { return n.tag; });
        if (!slots.length) {
          warn('At least one vk-tab-item must be set', this);
        }
        return slots.map(function (node) { return ({
          node: node,
          name: node.componentOptions.propsData.name,
          label: node.componentOptions.propsData.label,
          disabled: node.componentOptions.propsData.disabled !== undefined
        }); })
      },
      cache: false
    }
  },
  methods: {
    triggerTab: function triggerTab (name) {
      this.$emit('update:activeTab', name);
    }
  },
  created: function created () {
    if (!this.activeTab && this.tabs.length) {
      this.triggerTab(this.tabs[0].node.componentOptions.propsData.name);
    }
  }
}

var UiTab = {
  functional: true,
  props: {
    alignment: {
      type: String,
      default: '',
      validator: function (val) { return !val || includes(['right', 'center', 'justify'], val); }
    },
    bottom: {
      type: Boolean,
      default: false
    }
  },
  render: function (h, ref) {
    var children = ref.children;
    var props = ref.props;
    var data = ref.data;
    var alignment = props.alignment;
    var bottom = props.bottom;
    return h('ul', mergeData(data, {
      class: ['uk-tab', {
        'uk-tab-bottom': bottom,
        'uk-flex-right': alignment === 'right',
        'uk-flex-center': alignment === 'center',
        'uk-child-width-expand': alignment === 'justify'
      }]
    }), children)
  }
}

var UiTabItem = {
  functional: true,
  props: {
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var active = props.active;
    var disabled = props.disabled;
    var label = props.label;
    return h('li', mergeData(data, { class: {
      'uk-active': active && !disabled,
      'uk-disabled': disabled
    } }), [
      h('a', label)
    ])
  }
}

var tab = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:{ 'uk-flex uk-flex-column-reverse': _vm.bottom }},[_c('ui-tab',{attrs:{"bottom":_vm.bottom,"alignment":_vm.alignment}},_vm._l((_vm.tabs),function(tab){return _c('ui-tab-item',{key:tab.name,attrs:{"active":tab.name === _vm.activeTab,"label":tab.label,"disabled":tab.disabled},on:{"click":function($event){$event.preventDefault();!tab.disabled && _vm.triggerTab(tab.name);}}})})),_vm._v(" "),_c('div',{class:{ 'uk-margin': _vm.bottom }},[_c('transition',{attrs:{"name":_vm.transition,"mode":"out-in"}},[_c('keep-alive',[_c('tab-content')],1)],1)],1)],1)},staticRenderFns: [],
  name: 'Tab',
  extends: core$1,
  components: {
    UiTab: UiTab,
    UiTabItem: UiTabItem
  },
  props: UiTab.props
}

var tabItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._t("default")],2)},staticRenderFns: [],
  name: 'TabItem',
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}

var UiTab$1 = {
  functional: true,
  props: {
    alignment: {
      type: String,
      default: 'left',
      validator: function (val) { return !val || includes(['left', 'right'], val); }
    }
  },
  render: function (h, ref) {
    var children = ref.children;
    var props = ref.props;
    var data = ref.data;
    var alignment = props.alignment;
    return h('ul', mergeData(data, {
      class: ['uk-tab', {
        'uk-tab-left': alignment === 'left',
        'uk-tab-right': alignment === 'right'
      }]
    }), children)
  }
}

var tabVertical = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"uk-grid",class:{ 'uk-flex uk-flex-row-reverse': _vm.alignment === 'right' }},[_c('div',{staticClass:"uk-width-auto"},[_c('ui-tab',{attrs:{"alignment":_vm.alignment}},_vm._l((_vm.tabs),function(tab){return _c('ui-tab-item',{key:tab.name,attrs:{"active":tab.name === _vm.activeTab,"label":tab.label,"disabled":tab.disabled},on:{"click":function($event){$event.preventDefault();!tab.disabled && _vm.triggerTab(tab.name);}}})}))],1),_vm._v(" "),_c('div',{staticClass:"uk-width-expand"},[_c('transition',{attrs:{"name":_vm.transition,"mode":"out-in"}},[_c('keep-alive',[_c('tab-content')],1)],1)],1)])},staticRenderFns: [],
  name: 'TabVertical',
  extends: core$1,
  components: {
    UiTab: UiTab$1,
    UiTabItem: UiTabItem
  },
  props: UiTab$1.props
}

var upload = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"uk-placeholder uk-text-center",class:{ 'uk-dragover': _vm.dragged },on:{"dragenter":function($event){$event.stopPropagation();$event.preventDefault();},"dragover":function($event){$event.stopPropagation();$event.preventDefault();_vm.dragged = true;},"dragleave":function($event){$event.stopPropagation();$event.preventDefault();_vm.dragged = false;},"drop":_vm.dropped}},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'Upload',
  data: function () { return ({
    dragged: false
  }); },
  methods: {
    dropped: function dropped (e) {
      if (e.dataTransfer && e.dataTransfer.files) {
        e.stopPropagation();
        e.preventDefault();
        this.dragged = false;
        this.$emit('dropped', e.dataTransfer.files);
      }
    }
  }
}



var components = Object.freeze({
	Breadcrumb: breadcrumb,
	BreadcrumbItem: breadcrumbItem,
	Button: button,
	ButtonGroupCheckbox: buttonGroupCheckbox,
	ButtonGroupRadio: buttonGroupRadio,
	Card: card,
	CardTitle: cardTitle,
	Drop: Drop,
	Dropdown: Dropdown,
	DropdownNav: dropdownNav,
	Icon: VkIcon,
	IconLink: VkIconLink,
	IconButton: iconButton,
	Iconnav: iconnav,
	IconnavItem: iconnavItem,
	IconnavVertical: iconnavVertical,
	Label: label,
	Modal: modal,
	ModalFull: modalFull,
	Nav: nav,
	NavItem: navItem,
	NavItemHeader: navItemHeader,
	NavItemParent: navItemParent,
	NavItemDivider: navItemDivider,
	Navbar: navbar,
	NavbarItem: navbarItem,
	NavbarToggle: navbarToggle,
	NavbarNav: navbarNav,
	NavbarNavItem: navbarNavItem,
	NavbarNavDropdown: navbarNavDropdown,
	Notification: notification,
	Offcanvas: offcanvas,
	OffcanvasContent: offcanvasContent,
	OffcanvasClose: offcanvasClose,
	Pagination: pagination,
	PaginationFirst: PaginationFirst,
	PaginationLast: PaginationLast,
	PaginationPrev: PaginationPrev,
	PaginationNext: PaginationNext,
	PaginationPages: PaginationPages,
	Spinner: spinner,
	Sticky: sticky,
	Subnav: subnav,
	SubnavItem: subnavItem,
	Tab: tab,
	TabItem: tabItem,
	TabVertical: tabVertical,
	Upload: upload
});

var delayedShow;
var tooltip = {};
var uid = 'v-tooltip';
var positions$2 = [
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
function show (ctx) {
  var props = ctx.props;
  var ref = getTooltip();
  var outer = ref.outer;
  var inner = ref.inner;
  inner.innerHTML = props.content;
  delayedShow = setTimeout(function () {
    var $root = ctx.vnode.context.$root.$el;
    $root.appendChild(outer);
    var ref = positionTooltip(ctx);
    var dir = ref.dir;
    var align = ref.align;
    Animation$1.in({
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
  if (outer.parentNode) {
    outer.parentNode.removeChild(outer);
  }
  tooltip = {};
}
function toggle (ctx) {
  isEmpty(tooltip)
    ? show(ctx)
    : hide(ctx);
}
function updateVisibles (ctx) {
  if (isEmpty(tooltip)) {
    return
  }
  var props = getProps(ctx);
  var ref = getTooltip();
  var inner = ref.inner;
  inner.innerHTML = props.content;
  positionTooltip(ctx);
}
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
  var classesRx = new RegExp("uk-tooltip-(top|bottom|left|right)(-[a-z]+)?");
  tooltip.className = tooltip.className.replace(classesRx, '');
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
  if (!includes(positions$2, position$$1)) {
    warn('Invalid v-tooltip position', vnode);
    return false
  }
  if (!content) {
    warn('Invalid v-tooltip content', vnode);
    return false
  }
  var animations = animation$$1.split(',');
  var animationIn = prefixAnimations(animations[0]);
  return { delay: delay, offset: offset, flip: flip, content: content, position: position$$1, boundary: boundary, animationIn: animationIn, duration: duration, triggers: triggers }
}
function prefixAnimations (str) {
  if (!str.trim()) {
    return ''
  }
  return str.match(/[\w-]+/g).map(function (v) { return ("uk-animation-" + v); }).join(' ')
}
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
function getContext (target, binding, vnode) {
  var ctx = { target: target, binding: binding, vnode: vnode };
  ctx.props = getProps(ctx);
  if (!ctx.props) {
    binding.def.unbind(target, binding);
    return
  }
  return ctx
}

function offsetTop$1 (element) {
  return element.getBoundingClientRect().top + window.pageYOffset
}
var index$1 = {
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
  var height$$1;
  css(el, 'boxSizing', 'border-box');
  if (modifiers.expand) {
    css(el, 'height', '');
    css(el, 'minHeight', '');
    var diff = viewport - document.documentElement.offsetHeight;
    height$$1 = (el.offsetHeight + diff) + "px";
    css(el, 'minHeight', height$$1);
  } else {
    var top = offsetTop$1(el);
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
    height$$1 = offset
      ? ("calc(100vh - " + offset + "px)")
      : '100vh';
    css(el, 'min-height', height$$1);
  }
}



var directives = Object.freeze({
	Tooltip: index,
	HeightViewport: index$1
});

each(components, function (def, name) {
  def.name = "Vk" + (def.name);
});
var Vuikit = {
  components: components,
  directives: directives,
  install: function install (Vue) {
    each(components, function (def, name) {
      Vue.component(("Vk" + name), def);
    });
    each(directives, function (def, name) {
      Vue.directive(("Vk" + name), def);
    });
  }
};

export { breadcrumb as Breadcrumb, breadcrumbItem as BreadcrumbItem, button as Button, buttonGroupCheckbox as ButtonGroupCheckbox, buttonGroupRadio as ButtonGroupRadio, card as Card, cardTitle as CardTitle, Drop, Dropdown, dropdownNav as DropdownNav, VkIcon as Icon, VkIconLink as IconLink, iconButton as IconButton, iconnav as Iconnav, iconnavItem as IconnavItem, iconnavVertical as IconnavVertical, label as Label, modal as Modal, modalFull as ModalFull, nav as Nav, navItem as NavItem, navItemHeader as NavItemHeader, navItemParent as NavItemParent, navItemDivider as NavItemDivider, navbar as Navbar, navbarItem as NavbarItem, navbarToggle as NavbarToggle, navbarNav as NavbarNav, navbarNavItem as NavbarNavItem, navbarNavDropdown as NavbarNavDropdown, notification as Notification, offcanvas as Offcanvas, offcanvasContent as OffcanvasContent, offcanvasClose as OffcanvasClose, pagination as Pagination, PaginationFirst, PaginationLast, PaginationPrev, PaginationNext, PaginationPages, spinner as Spinner, sticky as Sticky, subnav as Subnav, subnavItem as SubnavItem, tab as Tab, tabItem as TabItem, tabVertical as TabVertical, upload as Upload, index as Tooltip, index$1 as HeightViewport };
export default Vuikit;
