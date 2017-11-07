import css from '@vuikit/core/utils/css.js';
import { off, on, one } from '@vuikit/core/utils/event.js';
import includes from '@vuikit/core/utils/includes.js';
import debounce from '@vuikit/core/utils/debounce.js';
import { height } from '@vuikit/core/helpers/position.js';
import { transitionend } from '@vuikit/core/helpers/env.js';
import mergeData from '@vuikit/core/helpers/fn-data-merge.js';
import { addClass, removeClass } from '@vuikit/core/utils/class.js';

var doc = document.documentElement;

var core = {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    // determines if the modal should be closed
    // when a key is pressed. Accepts a key number,
    // or false to disable
    closeOnKey: {
      type: [Number, Boolean],
      default: 27 // esc key
    },
    // determines if the modal should be closed
    // when the background is clicked
    closeOnBg: {
      type: Boolean,
      default: true
    }
  },
  mounted: function mounted () {
    var this$1 = this;


    on(doc, 'keyup', function (e) {
      if (this$1.closeOnKey && e.keyCode === this$1.closeOnKey) {
        e.preventDefault();
        this$1.$emit('update:show', false);
      }
    }, this._uid);

  },
  beforeDestroy: function beforeDestroy () {
    off(doc, 'key', this._uid);
  }
};

var doc$1 = document.documentElement;

var active;
var activeModals;

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
        beforeEnter: function (el) {
          addClass(doc$1, 'uk-modal-page');

          modal.$nextTick(function () {
            // this.resize()
          });
        },
        enter: function (el, done) {
          // redraw workaround, necessary so the browser
          // doesn't try to apply it all in one step not
          // giving enough time for the transition to init
          el.offsetWidth; // eslint-disable-line

          addClass(el, 'uk-open');

          // once uk-open transition finished
          one(el, transitionend, done, function (e) { return e.target === el; });
        },
        afterEnter: function (el) {
          activeModals++;

          if (active) {
            // close any active modal
            active.$emit('update:show', false);
          }

          // change current active modal
          active = modal;
        },
        beforeLeave: function beforeLeave (el) {
          removeClass(el, 'uk-open');
        },
        leave: function leave (el, done) {
          // once uk-open transition finished
          one(el, transitionend, done, function (e) { return e.target === el; });
        },
        afterLeave: function (el) {
          activeModals--;

          if (!activeModals) {
            // remove page class if not active modals left
            removeClass(doc$1, 'uk-modal-page');
          }

          // if the closing modal is the active one,
          // unset it
          if (active === modal) {
            active = null;
          }
        }
      }
    };

    return h('transition', mergeData(data, def), children)
  }
};

// icon-close-icon
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
};

// icon-close-large
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
};

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
};

var modal = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('modal-transition',{on:{"enter":_vm.updateOverflowAuto}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],ref:"modal",class:['uk-modal', { 'uk-modal-container': _vm.container, 'uk-flex uk-flex-top': _vm.center }],style:({
      display: _vm.center
        ? ''
        : 'block'
    }),on:{"click":function($event){if($event.target !== $event.currentTarget){ return null; }_vm.closeOnBg && _vm.$emit('update:show', false);}}},[_c('div',{ref:"dialog",class:['uk-modal-dialog', _vm.widthClasses, { 'uk-margin-auto-vertical': _vm.center }]},[(_vm.closeBtn)?_c('modal-btn-close',{staticClass:"uk-modal-close-default",attrs:{"type":_vm.closeBtn},on:{"click":function($event){_vm.$emit('update:show', false);}}}):_vm._e(),_vm._v(" "),(_vm.$slots.header || _vm.$slots.title)?_c('div',{ref:"header",staticClass:"uk-modal-header"},[_vm._t("header")],2):_vm._e(),_vm._v(" "),_c('div',{ref:"body",class:['uk-modal-body', { 'uk-overflow-auto': _vm.overflowAuto }]},[_vm._t("default")],2),_vm._v(" "),(_vm.$slots.footer)?_c('div',{ref:"footer",staticClass:"uk-modal-footer"},[_vm._t("footer")],2):_vm._e()],1)])])},staticRenderFns: [],
  name: 'Modal',
  extends: core,
  components: {
    ModalBtnClose: ModalBtnClose,
    ModalTransition: ModalTransition
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    // determines if close button should be displayed
    closeBtn: {
      type: [Boolean, String],
      default: true,
      validator: function (val) { return !val || includes([true, 'outside'], val); }
    },
    // determines if the modal should auto
    // adjust the height overflow
    overflowAuto: {
      type: Boolean,
      default: false
    },
    container: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
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
  },
  mounted: function mounted () {
    var this$1 = this;

    on(window, 'resize', debounce(function () {
      if (!this$1.show) {
        return
      }

      this$1.updateOverflowAuto();
    }, 30), this._uid);
  },
  beforeDestroy: function beforeDestroy () {
    off(window, 'resize', this._uid);
  }
};

var modalFull = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('modal-transition',[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],staticClass:"uk-modal uk-modal-full",staticStyle:{"display":"block"}},[_c('div',{staticClass:"uk-modal-dialog uk-flex uk-flex-center uk-flex-middle",staticStyle:{"box-sizing":"border-box","min-height":"100vh","height":"100vh"}},[(_vm.closeBtn)?_c('modal-btn-close',{staticClass:"uk-modal-close-full",attrs:{"type":_vm.closeBtn},on:{"click":function($event){_vm.$emit('update:show', false);}}}):_vm._e(),_vm._v(" "),_vm._t("default")],2)])])},staticRenderFns: [],
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
};

export { modal as Modal, modalFull as ModalFull };
