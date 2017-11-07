import { offAll, on } from '@vuikit/core/utils/event.js';
import css from '@vuikit/core/utils/css.js';
import { warn } from '@vuikit/core/helpers/debug.js';
import { addClass, removeClass } from '@vuikit/core/utils/class.js';

var doc$1 = document.documentElement;
var body$1 = document.body;

var active;
var activeCount;

on(doc$1, 'click', function (e) {
  if (active && !active.$refs.panel.contains(e.target)) {
    active.$emit('click-out', e);
  }
});

on(doc$1, 'keyup', function (e) {
  if (e.keyCode === 27 && active) {
    e.preventDefault();
    active.$emit('key-esc', e);
  }
});

var ModalMixin = {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    overlay: {
      type: Boolean,
      default: true
    }
  },
  data: function () { return ({
    active: active,
    activeCount: activeCount
  }); },
  methods: {
    _beforeEnter: function _beforeEnter () {
      if (!active) {
        body$1.style['overflow-y'] = this.getScrollbarWidth() && this.overlay ? 'scroll' : '';
      }
    },
    _afterEnter: function _afterEnter () {
      // if any previous modal active
      // emit event for further actions
      if (active) {
        active.$emit('inactive');
      }
      // change current active modal
      active = this;
      activeCount++;
    },
    _afterLeave: function _afterLeave () {
      activeCount--;
      // if no active modals left
      if (!activeCount) {
        body$1.style['overflow-y'] = '';
      }
      if (active === this) {
        active = null;
      }
    },
    getScrollbarWidth: function getScrollbarWidth () {
      var width = doc$1.style.width;
      doc$1.style.width = '';
      var scrollbarWidth = window.innerWidth - doc$1.offsetWidth;

      if (width) {
        doc$1.style.width = width;
      }

      return scrollbarWidth
    }
  },
  beforeDestroy: function beforeDestroy () {
    offAll(this._uid);
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};

var doc = document.documentElement;
var body = document.body;
var scroll;

function toMs (time) {
  return !time
    ? 0
    : time.substr(-2) === 'ms'
      ? parseFloat(time)
      : parseFloat(time) * 1000
}

// force redraw/repaint for WebKit
function forceRedraw (el) {
  el.offsetHeight; // eslint-disable-line
}

var offcanvas = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"css":false},on:{"enter":_vm.transitionEnd,"leave":_vm.transitionEnd,"before-enter":_vm.beforeShow,"after-enter":_vm.afterEnter,"before-leave":_vm.beforeHide,"after-leave":_vm.hidden}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],staticClass:"uk-offcanvas",staticStyle:{"display":"block"}},[(_vm.mode === 'reveal')?_c('div',{class:[_vm.clsMode]},[_c('div',{ref:"panel",staticClass:"uk-offcanvas-bar",class:{ 'uk-offcanvas-bar-flip': _vm.flip }},[_vm._t("default")],2)]):_c('div',{ref:"panel",staticClass:"uk-offcanvas-bar",class:{ 'uk-offcanvas-bar-flip': _vm.flip }},[_vm._t("default")],2)])])},staticRenderFns: [],
  name: 'Offcanvas',
  mixins: [ModalMixin],
  props: {
    flip: {
      type: Boolean,
      default: false
    },
    overlay: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'slide' // none|slide|push|reveal
    }
  },
  data: function () { return ({
    defaults: {
      clsMode: 'uk-offcanvas',
      clsFlip: 'uk-offcanvas-flip',
      clsOverlay: 'uk-offcanvas-overlay',
      clsSidebarAnimation: 'uk-offcanvas-bar-animation',
      clsContentAnimation: 'uk-offcanvas-content-animation'
    },
    clsPage: 'uk-offcanvas-page',
    clsPageAnimation: 'uk-offcanvas-page-animation',
    clsContainer: 'uk-offcanvas-container',
    clsContent: 'uk-offcanvas-content'
  }); },
  computed: {
    clsFlip: function clsFlip () {
      return this.flip
        ? this.defaults.clsFlip
        : ''
    },
    clsOverlay: function clsOverlay () {
      return this.overlay
        ? this.defaults.clsOverlay
        : ''
    },
    clsMode: function clsMode () {
      return ((this.defaults.clsMode) + "-" + (this.mode))
    },
    clsSidebarAnimation: function clsSidebarAnimation () {
      return this.mode === 'none' || this.mode === 'reveal'
        ? ''
        : this.defaults.clsSidebarAnimation
    },
    clsContentAnimation: function clsContentAnimation () {
      return this.mode !== 'push' && this.mode !== 'reveal'
        ? ''
        : this.defaults.clsContentAnimation
    },
    transitionElement: function transitionElement () {
      return this.mode === 'reveal'
        ? this.$refs.panel.parentNode
        : this.$refs.panel
    },
    transitionDuration: function transitionDuration () {
      return toMs(css(this.transitionElement, 'transition-duration'))
    }
  },
  methods: {
    afterEnter: function afterEnter (el) {
      this._afterEnter();
      this.$emit('displayed');
    },
    getRefElement: function getRefElement (ref) {
      var context = this.$vnode.context;
      var target = context.$refs[ref];
      if (target) {
        return target._isVue
          ? target.$el
          : target
      }
      return false
    },
    beforeShow: function beforeShow () {
      scroll = scroll || { x: window.pageXOffset, y: window.pageYOffset };

      css(doc, 'overflow-y', (!this.clsContentAnimation || this.flip) && this.getScrollbarWidth() && this.overlay ? 'scroll' : '');

      // set fixed with so the page can slide-out without shinking
      css(doc, 'width', window.innerWidth - this.getScrollbarWidth() + 'px');

      addClass(doc, ("" + (this.clsPage)));
      addClass(body, ((this.clsContainer) + " " + (this.clsFlip) + " " + (this.clsOverlay)));
      forceRedraw(body);

      addClass(this.$refs.panel, ((this.clsSidebarAnimation) + " " + (this.mode !== 'reveal' ? this.clsMode : '')));
      addClass(this.$el, this.clsOverlay);
      addClass(this.$refs.content, this.clsContentAnimation);

      // toggle element
      addClass(this.$el, this.clsOverlay);
      css(this.$el, 'display', 'block');
      forceRedraw(this.$el);
      addClass(this.$el, 'uk-open');
    },
    beforeHide: function beforeHide () {
      removeClass(this.$refs.content, this.clsContentAnimation);
      removeClass(this.$el, 'uk-open');
    },
    transitionEnd: function (el, done) {
      setTimeout(done, this.transitionDuration);
    },
    hidden: function hidden () {
      if (!this.overlay) {
        scroll = { x: window.pageXOffset, y: window.pageYOffset };
      }

      css(doc, 'width', '');
      removeClass(doc, ("" + (this.clsPage)));

      removeClass(this.$refs.panel, ((this.clsSidebarAnimation) + " " + (this.clsMode)));
      removeClass(this.$el, this.clsOverlay);
      css(this.$el, 'display', 'none');
      forceRedraw(this.$el);
      removeClass(body, ((this.clsContainer) + " " + (this.clsFlip) + " " + (this.clsOverlay)));

      body.scrollTop = scroll.y;

      css(doc, 'overflow-y', '');
      css(this.$refs.content, 'width', '');
      css(this.$refs.content, 'height', '');
      forceRedraw(this.$refs.content);

      window.scrollTo(scroll.x, scroll.y);
      scroll = null;

      this._afterLeave();
      this.$emit('hidden');
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$refs.content = document.body.querySelector(("." + (this.clsContent)));

    if (!this.$refs.content) {
      warn('Offcanvas content is not detected, make sure to wrap it with OffcanvasContent.', this);
      this.$destroy();
      return
    }

    var clickHandler = function (e) {
      if (e.target === this$1.$refs.panel || this$1.$refs.panel.contains(e.target)) {
        this$1.$emit('click-in', e);
      }
    };

    on(this.$el, 'click', clickHandler, this._uid);
    if ('ontouchstart' in document.documentElement) {
      on(this.$el, 'touchstart', clickHandler, this._uid);
    }
  },
  beforeDestroy: function beforeDestroy () {
    removeClass(doc, ((this.clsPage) + " " + (this.clsFlip) + " " + (this.clsPageOverlay)));
    doc.style['margin-left'] = '';
    this._afterLeave();
  }
};

var offcanvasContent = {
  name: 'OffcanvasContent',
  functional: true,
  render: function render (h, ref) {
    var children = ref.children;

    var nodesCount = children.length;

    if (nodesCount === 1) {
      var rawChild = children[0];

      if (rawChild.tag) {
        addNodeClass(rawChild);
        return rawChild
      }
    }

    return h('div', {
      staticClass: 'uk-offcanvas-content'
    }, children)
  }
};

function addNodeClass (node) {
  var classes = node.data.staticClass
    ? node.data.staticClass.split(' ')
    : [];
  classes.push('uk-offcanvas-content');
  node.data.staticClass = classes.join(' ');
}

// icon-close-icon
var IconClose = {
  functional: true,
  render: function (h, ctx) {
    var props = ctx.props;
    var ratio = props.ratio || 1;
    var width = props.width || 14;
    var height = props.height || 14;
    var viewBox = props.viewBox || '0 0 14 14';

    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }

    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'icon-close-icon ratio-' + ratio,
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<path fill="none" stroke="#000" stroke-width="1.1" d="M1 1l12 12M13 1L1 13"/>'
      }
    })
  }
};

var offcanvasClose = {
  name: 'OffcanvasClose',
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;

    return h('button', {
      staticClass: 'uk-offcanvas-close uk-close uk-icon',
      attrs: {
        type: 'button'
      },
      on: data.on
    }, [
      h(IconClose)
    ])
  }
};

export { offcanvas as Offcanvas, offcanvasContent as OffcanvasContent, offcanvasClose as OffcanvasClose };
