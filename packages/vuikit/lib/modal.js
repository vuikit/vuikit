import { debounce, includes } from '@vuikit/core/util';
import css from '@vuikit/core/helpers/css';
import { height } from '@vuikit/core/helpers/dom/position';
import { transitionend } from '@vuikit/core/helpers/dom/env';
import { off, on, one } from '@vuikit/core/helpers/dom/event';
import { addClass, removeClass } from '@vuikit/core/helpers/dom/class';
import mergeData from '@vuikit/core/helpers/vue-data-merge';

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
    var width = props.width || 14;
    var height$$1 = props.height || 14;
    var viewBox = props.viewBox || '0 0 14 14';
    if (ratio !== 1) {
      width = width * ratio;
      height$$1 = height$$1 * ratio;
    }
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'icon-close-icon ratio-' + ratio,
        width: width,
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
    var width = props.width || 20;
    var height$$1 = props.height || 20;
    var viewBox = props.viewBox || '0 0 20 20';
    if (ratio !== 1) {
      width = width * ratio;
      height$$1 = height$$1 * ratio;
    }
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'icon-close-large ratio-' + ratio,
        width: width,
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
        ? this.width.split(' ').map(function (width) { return ("uk-width-" + width); })
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

export { modal as Modal, modalFull as ModalFull };
