import VkRoot from 'vuikit/src/_core/directives/root'
import VkPosition, { BEFORE_POSITION } from 'vuikit/src/_core/directives/position'
import mixinEvents from 'vuikit/src/_core/mixins/events'

import { $ } from 'vuikit/src/_core/utils/core'
import { get } from 'vuikit/src/_core/utils/object'
import { css } from 'vuikit/src/_core/utils/style'
import { isTouch } from 'vuikit/src/_core/utils/touch'
import { MouseTracker } from 'vuikit/src/_core/utils/mouse'
import { isNode, isString } from 'vuikit/src/_core/utils/lang'
import { offset as getOffset } from 'vuikit/src/_core/utils/dimensions'
import { addClass, removeClass } from 'vuikit/src/_core/utils/class'
import { isRtl, pointerEnter, pointerLeave, hasTouch } from 'vuikit/src/_core/utils/env'

import { ElDrop } from '../elements'
import { mixinTree } from '../mixins'
import { Transition } from 'vuikit/src/_core/components/transition'

import { SHOW, HIDE } from '../constants'

export default {
  name: 'VkDrop',
  mixins: [ mixinEvents, mixinTree ],
  directives: {
    VkRoot,
    VkPosition
  },
  props: {
    target: {},
    boundary: {},
    boundaryAlign: {
      type: Boolean,
      default: false
    },
    flip: {
      type: [String, Boolean],
      default: true
    },
    position: {
      type: String,
      default: `bottom-${isRtl ? 'right' : 'left'}`,
      validator: pos =>
        /^(top|bottom)-(left|right|center|justify)$/.test(pos) ||
        /^(left|right)-(top|bottom|center|justify)$/.test(pos)
    },
    offset: {
      type: [Boolean, Number],
      default: false
    },
    animation: {
      type: String,
      default: 'fade'
    },
    duration: {
      type: Number,
      default: 200
    },
    mode: {
      type: String,
      default: 'click hover'
    },
    delayShow: {
      type: Number,
      default: 0
    },
    delayHide: {
      type: Number,
      default: 800
    },
    mainClass: {
      type: String,
      default: 'uk-drop'
    },
    mainElement: {
      type: Object,
      default: () => ElDrop
    }
  },
  data: () => ({
    shown: false
  }),
  render (h) {
    let { position } = this
    let { boundary, target } = this.$refs
    const [, align] = position.split('-')
    const { boundaryAlign, animation, duration, mainClass, mainElement, flip, offset } = this

    // delay until elements are evaluated
    if (!target || !boundary) return

    // justify is a drop specific position,
    // it must be maped for v-position
    position = position.replace('justify', 'center')

    // set final target
    target = boundaryAlign ? boundary : target

    const def = {
      on: {
        [BEFORE_POSITION]: e => {
          const { $el } = this
          const alignTo = getOffset(target)
          const boundaryOffset = getOffset(boundary)

          css($el, { width: '', height: '' })
          removeClass($el, `${mainClass}-stack`)

          if (align === 'justify') {
            const prop = getAxis(position) === 'y' ? 'width' : 'height'
            css($el, prop, alignTo[prop])
          } else if ($el.offsetWidth > Math.max(boundaryOffset.right - alignTo.left, alignTo.right - boundaryOffset.left)) {
            addClass($el, `${mainClass}-stack`)
          }
        }
      },
      props: {
        show: this.shown
      },
      class: {
        [`${mainClass}-boundary`]: this.boundaryAlign
      },
      directives: [
        {
          name: 'show',
          value: this.shown
        },
        {
          name: 'vk-position',
          value: {
            flip,
            offset,
            target,
            boundary,
            position,
            mainClass
          }
        }
      ]
    }

    return h(Transition, {
      props: {
        name: [animation],
        duration: duration
      }
    }, [
      h(mainElement, def, this.$slots.default)
    ])
  },
  methods: {
    show () {
      this.clearTimers()
      this.showTimer = setTimeout(this._show, this.delayShow)
    },
    _show () {
      this.shown = true
      this.tracker.init()

      this.setAsActive()
      this.$emit(SHOW)
    },
    hide () {
      const hoverIdle = 200
      this.clearTimers()

      this.isDelaying = this.tracker.movesTo(this.$el)

      if (this.isDelaying) {
        this.hideTimer = setTimeout(this.hide, hoverIdle)
      } else {
        this.hideTimer = setTimeout(this._hide, this.delayHide)
      }
    },
    _hide () {
      this.shown = false
      this.tracker.cancel()

      this.setAsInactive()
      this.$emit(HIDE)
    },
    clearTimers () {
      clearTimeout(this.showTimer)
      clearTimeout(this.hideTimer)
      this.showTimer = null
      this.hideTimer = null
    },
    toggle () {
      this.shown ? this._hide() : this.show()
    },
    assignTriggerEvents () {
      const { on, show, hide, toggle, mode, clearTimers } = this

      if (/click/.test(mode) || hasTouch) {
        on(this.$refs.target, 'click', toggle)
      }

      if (/hover/.test(mode)) {
        on(this.$refs.target, pointerEnter, e => {
          if (isTouch(e)) {
            return
          }

          e.preventDefault()
          show()
        })
        on(this.$refs.target, pointerLeave, e => {
          if (isTouch(e)) {
            return
          }

          e.preventDefault()
          hide()
        })
        on(this.$el, pointerLeave, hide)
        on(this.$el, pointerEnter, clearTimers)
      }
    },
    queryElement (el) {
      return isNode(el)
        ? el
        : isString(el)
          ? (get(this.$vnode.context.$refs, el) || $(el, this.$el))
          : el
    }
  },
  mounted () {
    // evaluate target and boundary elements
    this.$refs.target = this.queryElement(this.target) || this.$el.previousElementSibling
    this.$refs.boundary = this.queryElement(this.boundary) || window

    // must force a rerended after
    this.$forceUpdate()

    this.$nextTick(() => {
      this.assignTriggerEvents()
    })
  },
  created () {
    this.tracker = new MouseTracker()
  },
  beforeDestroy () {
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}

function getAxis (position) {
  const [dir] = position.split('-')
  return dir === 'top' || dir === 'bottom'
    ? 'y'
    : 'x'
}
