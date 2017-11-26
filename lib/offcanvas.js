import { warn } from '@vuikit/core/helpers/debug';
import css from '@vuikit/core/utils/css';
import mergeData from '@vuikit/core/helpers/fn-data-merge';
import { height, width } from '@vuikit/core/helpers/position';
import { addClass, removeClass } from '@vuikit/core/utils/class';
import { offAll, on, one } from '@vuikit/core/utils/event';
import { transitionend } from '@vuikit/core/helpers/env';

var win$1 = window;
var body = document.body;
var doc$1 = document.documentElement;

var scroll;
var active;
var activeCount;
var scrollbarWidth;

var common = function (vm) { return ({
  on: {
    beforeEnter: function beforeEnter (el) {
      scrollbarWidth = width(win$1) - doc$1.offsetWidth;

      scroll = scroll || { x: win$1.pageXOffset, y: win$1.pageYOffset };

      addClass(doc$1, 'uk-offcanvas-page');
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

      active = vm;
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

      removeClass(doc$1, 'uk-offcanvas-page');
      removeClass(body, 'uk-offcanvas-container');

      removeClass(el, 'uk-offcanvas-overlay');
      removeClass(body, 'uk-offcanvas-overlay');

      body.scrollTop = scroll.y;
      css(body, 'overflowY', '');
      css(doc$1, 'overflowY', '');

      width(vm.$refs.content, '');
      height(vm.$refs.content, '');

      win$1.scrollTo(scroll.x, scroll.y);

      scroll = null;

      activeCount--;

      if (!activeCount) {
        unsetGlobalEvents();
      }

      if (active === vm) {
        active = null;
      }
    }
  }
}); };

function unsetGlobalEvents () {
  offAll('vk-offcanvas');
}

function setGlobalEvents () {
  // hide on click out
  on(doc$1, 'click', function (e) {
    var clickOut = !active.$el.contains(e.target);
    var clickOnOverlay = e.target === active.$el && active.overlay;

    if (clickOut || clickOnOverlay) {
      active.hide();
    }
  }, 'vk-offcanvas');

  // hide on key-esc
  on(doc$1, 'keyup', function (e) {
    if (e.keyCode === 27 && active) {
      e.preventDefault();
      active.hide();
    }
  }, 'vk-offcanvas');
}

var win = window;
var doc = document.documentElement;

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
          var scrollbarWidth = width(win) - doc.offsetWidth;

          css(doc, 'overflowY', scrollbarWidth && vm.overlay
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
};

var win$2 = window;
var doc$2 = document.documentElement;

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
          var scrollbarWidth = width(win$2) - doc$2.offsetWidth;

          css(doc$2, 'overflowY', vm.flip && scrollbarWidth && vm.overlay
            ? 'scroll'
            : ''
          );

          addClass(vm.$refs.bar, 'uk-offcanvas-bar-animation uk-offcanvas-push');
        },
        enter: function enter (el, done) {
          height(el); // force reflow
          addClass(el, 'uk-open');
          addClass(vm.$refs.content, 'uk-offcanvas-content-animation');

          // indicate end of transition
          one(el, transitionend, done, function (e) { return e.target === vm.$refs.bar; });
        },
        beforeLeave: function beforeLeave (el) {
          removeClass(el, 'uk-open');
          removeClass(vm.$refs.content, 'uk-offcanvas-content-animation');
        },
        leave: function leave (el, done) {
          // indicate end of transition
          one(el, transitionend, done, function (e) { return e.target === vm.$refs.bar; });
        },
        afterLeave: function afterLeave (el) {
          removeClass(vm.$refs.bar, 'uk-offcanvas-bar-animation uk-offcanvas-push');
        }
      }
    };

    return h('transition', mergeData(data, def, common(vm)), children)
  }
};

var win$3 = window;
var doc$3 = document.documentElement;

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
          var scrollbarWidth = width(win$3) - doc$3.offsetWidth;

          css(doc$3, 'overflowY', scrollbarWidth && vm.overlay
            ? 'scroll'
            : ''
          );

          addClass(vm.$refs.bar, 'uk-offcanvas-bar-animation uk-offcanvas-slide');
        },
        enter: function enter (el, done) {
          height(el); // force reflow
          addClass(el, 'uk-open');

          // indicate end of transition
          one(el, transitionend, done, function (e) { return e.target === vm.$refs.bar; });
        },
        beforeLeave: function beforeLeave (el) {
          removeClass(el, 'uk-open');
        },
        leave: function leave (el, done) {
          // indicate end of transition
          one(el, transitionend, done, function (e) { return e.target === vm.$refs.bar; });
        },
        afterLeave: function afterLeave (el) {
          removeClass(vm.$refs.bar, 'uk-offcanvas-bar-animation uk-offcanvas-slide');
        }
      }
    };

    return h('transition', mergeData(data, def, common(vm)), children)
  }
};

var win$4 = window;
var doc$4 = document.documentElement;

var VkOffcanvasTransitionReveal = {
  functional: true,
  render: function render (h, ref) {
    var vm = ref.parent;
    var data = ref.data;
    var children = ref.children;

    var wrapper = vm.$refs.wrapper;

    var def = {
      props: {
        css: false
      },
      on: {
        beforeEnter: function beforeEnter (el) {
          var scrollbarWidth = width(win$4) - doc$4.offsetWidth;

          width(vm.$refs.content, width(win$4) - scrollbarWidth);

          css(doc$4, 'overflowY', vm.flip && scrollbarWidth && vm.overlay
            ? 'scroll'
            : ''
          );

          // wrap bar, required for this animation
          wrapper = document.createElement('div');
          addClass(wrapper, 'uk-offcanvas-reveal');
          el.appendChild(wrapper);
          wrapper.appendChild(vm.$refs.bar);
          vm.$refs.wrapper = wrapper; // save ref
        },
        enter: function enter (el, done) {
          height(el); // force reflow
          addClass(el, 'uk-open');
          addClass(vm.$refs.content, 'uk-offcanvas-content-animation');

          // indicate end of transition
          one(el, transitionend, done, function (e) { return e.target === wrapper; });
        },
        beforeLeave: function beforeLeave (el) {
          removeClass(el, 'uk-open');
          removeClass(vm.$refs.content, 'uk-offcanvas-content-animation');
        },
        leave: function leave (el, done) {
          // indicate end of transition
          one(el, transitionend, done, function (e) { return e.target === wrapper; });
        },
        afterLeave: function afterLeave (el) {
          // remove wrapper
          el.appendChild(vm.$refs.bar);
          el.removeChild(wrapper);
        }
      }
    };

    return h('transition', mergeData(data, def, common(vm)), children)
  }
};

var offcanvas = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(("vk-offcanvas-transition-" + (_vm.transition)),{tag:"component"},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],staticClass:"uk-offcanvas",staticStyle:{"display":"block"}},[_c('div',{ref:"bar",staticClass:"uk-offcanvas-bar"},[_vm._t("default")],2)])])},staticRenderFns: [],
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
};

var offcanvasContent = {
  functional: true,
  render: function (h, ref) {
      var children = ref.children;

      return h('div', {
      class: 'uk-offcanvas-content'
    }, children);
}

};

// icon-close-icon
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
};

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

};

export { offcanvas as Offcanvas, offcanvasContent as OffcanvasContent, offcanvasClose as OffcanvasClose };
