import get from '@vuikit/core/utils/get.js';
import { off, on } from '@vuikit/core/utils/event.js';
import includes from '@vuikit/core/utils/includes.js';
import isString from '@vuikit/core/utils/is-string.js';
import Position from '@vuikit/core/directives/position.js';
import { getPositionAxis } from '@vuikit/core/helpers/position.js';
import mergeData from '@vuikit/core/helpers/fn-data-merge.js';

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
    clsPos: 'uk-drop',
    position: _vm.$position,
    boundary: _vm.$boundary
  }),expression:"{\n    flip,\n    target: $target,\n    clsPos: 'uk-drop',\n    position: $position,\n    boundary: $boundary\n  }"}],class:['uk-drop', { 'uk-open': _vm.show }],style:(_vm.$style),on:{"mouseenter":function($event){if($event.target !== $event.currentTarget){ return null; }_vm.triggerShow($event);},"mouseleave":function($event){if($event.target !== $event.currentTarget){ return null; }_vm.hideOnLeave && _vm.triggerHide();}}},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'Drop',
  directives: {
    Position: Position
  },
  props: {
    // a Dom element to attach to,
    // defaults to previousElementSibling
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
};

var Dropdown = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"position",rawName:"v-position",value:({
    flip: _vm.flip,
    target: _vm.$target,
    clsPos: 'uk-dropdown',
    position: _vm.$position,
    boundary: _vm.$boundary
  }),expression:"{\n    flip,\n    target: $target,\n    clsPos: 'uk-dropdown',\n    position: $position,\n    boundary: $boundary\n  }"}],class:['uk-dropdown', { 'uk-open': _vm.show }],style:(_vm.$style),on:{"mouseenter":function($event){if($event.target !== $event.currentTarget){ return null; }_vm.triggerShow($event);},"mouseleave":function($event){if($event.target !== $event.currentTarget){ return null; }_vm.hideOnLeave && _vm.triggerHide();}}},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'Dropdown',
  extends: Drop
};

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

};

export { Dropdown, dropdownNav as DropdownNav };
