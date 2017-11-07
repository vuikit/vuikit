// import { Animation } from '~/helpers/animation'
import css from '@vuikit/core/utils/css'
import { offsetTop } from '~/helpers/util'
import { on } from '@vuikit/core/utils/event'
import { warn } from '@vuikit/core/helpers/debug'
import isString from '@vuikit/core/utils/is-string'
import isInteger from '@vuikit/core/utils/is-integer'
import filterOutEmptyNodes from '~/helpers/node/filter'
import { addClass, removeClass, toggleClass } from '@vuikit/core/utils/class'

// let dir
let scroll = 0

on(window, 'scroll', () => {
  // dir = scroll < window.pageYOffset
  //   ? 'down'
  //   : 'up'
  scroll = window.pageYOffset
})

export default {
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
      // dom ref
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
  data: () => ({
    isActive: false,
    topOffset: 0,
    outerHeight: 0,
    clsFixed: 'uk-sticky-fixed',
    clsBelow: 'uk-sticky-below',
    clsActive: 'uk-active',
    clsInactive: ''
  }),
  render (h) {
    let children = this.$options._renderChildren

    if (!children) {
      return
    }

    // filter out possible whitespaces
    children = filterOutEmptyNodes(children)

    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn('<vk-sticky> can only be used on a single element.', this.$parent)
    }

    const rawChild = children[0]

    on(window, 'scroll', () => {
      this.offsetTop = offsetTop(this.$el)
      this.visible = isVisible(this.$el)
      this.onScroll()
    }, this._uid)

    return rawChild
  },
  computed: {
    stickyStartPoint () {
      let top = this.top

      if (isInteger(top) && this.topOffset) {
        top = this.topOffset + parseFloat(top)
      } else if (isString(top) && top.match(/^-?\d+vh$/)) {
        top = getViewportHeightOffset(top)
      } else {
        top = this.getElementOffset(top)
      }

      return Math.max(parseFloat(top), this.topOffset) - this.offset
    },
    stickyEndPoint () {
      let bottom = this.bottom

      // get element
      bottom = this.getElementOffset(bottom === true
        ? this.$el.parent()
        : bottom
      )

      return bottom && bottom - this.outerHeight
    },
    inactive () {
      return this.media && !window.matchMedia(this.media).matches
    },
    $widthElement () {
      return this.widthElement || this.$el
    },
    bottomOffset () {
      return this.topOffset + this.outerHeight
    }
  },
  methods: {
    show () {
      this.isActive = true
      this.update()
      this.placeholder.removeAttribute('hidden')
    },
    hide () {
      addClass(this.$el, this.clsInactive)
      removeClass(this.$el, `${this.clsFixed} ${this.clsActive} ${this.clsBelow}`)
      css(this.$el, 'position', '')
      css(this.$el, 'width', '')
      css(this.$el, 'top', '')
      this.placeholder.setAttribute('hidden', 'hidden')
    },
    update () {
      let top = Math.max(0, this.offset)
      const active = scroll > this.stickyStartPoint

      if (this.stickyEndPoint && scroll > this.stickyEndPoint - this.offset) {
        top = this.stickyEndPoint - scroll
      }

      addClass(this.$el, this.clsFixed)
      css(this.$el, 'width', `${this.$widthElement.offsetWidth}px`)
      css(this.$el, 'position', 'fixed')
      css(this.$el, 'top', `${top}px`)

      toggleClass(this.$el, this.clsActive, active)
      toggleClass(this.$el, this.clsInactive, !active)
      toggleClass(this.$el, this.clsBelow, scroll > this.bottomOffset)
    },
    // ready () {
    //   if (!(this.target && window.location.hash && window.pageYOffset > 0)) {
    //     return
    //   }
    //
    //   var target = query(window.location.hash)
    //
    //   if (target) {
    //     window.requestAnimationFrame(() => {
    //       var top = offsetTop(target)
    //       var elTop = offsetTop(this.$el)
    //       var elHeight = this.$el[0].offsetHeight
    //
    //       if (elTop + elHeight >= top && elTop <= top + target[0].offsetHeight) {
    //         window.scrollTo(0, top - elHeight - this.target - this.offset)
    //       }
    //     })
    //   }
    // },
    onScroll () {
      // if (scroll < 0 || !this.visible || this.disabled || (this.showOnUp && !dir)) {
      //   return
      // }

      const scrollNotReachedStartPoint = scroll < this.stickyStartPoint
      // const scrollIsBehindStartPoint = scroll <= this.stickyStartPoint
      // const scrollNotReachedEndPoint = scroll <= this.bottomOffset
      // const uikitComplexEval = scrollIsBehindStartPoint || dir === 'down' || (dir === 'up' && !this.isActive && scrollNotReachedEndPoint)

      if (this.inactive || scrollNotReachedStartPoint) {
        if (!this.isActive) {
          return
        }

        this.isActive = false

        if (this.animation && scroll > this.topOffset) {
          Animation.cancel(this.$el).then(() =>
            Animation.out(this.$el, this.animation).then(() => this.hide())
          )
        } else {
          this.hide()
        }
      } else if (this.isActive) {
        this.update()
      } else if (this.animation) {
        Animation.cancel(this.$el).then(() => {
          this.show()
          Animation.in(this.$el, this.animation)
        })
      } else {
        this.show()
      }
    },
    createPlaceholder () {
      this.placeholder = document.createElement('div')
      addClass(this.placeholder, 'uk-sticky-placeholder')
      this.placeholder.setAttribute('hidden', 'hidden')
      if (!this.$el.parentNode.contains(this.placeholder)) {
        this.$el.parentNode.appendChild(this.placeholder)
      }
    },
    updatePlaceholder () {
      css(this.placeholder, 'height', `${this.outerHeight}px`)
      css(this.placeholder, 'marginTop', css(this.$el, 'marginTop'))
      css(this.placeholder, 'marginBottom', css(this.$el, 'marginBottom'))
      css(this.placeholder, 'marginLeft', css(this.$el, 'marginLeft'))
      css(this.placeholder, 'marginRight', css(this.$el, 'marginRight'))
    },
    getElementOffset (el) {
      el = isString(el)
        ? this.$vnode.context.$refs[el]
        : el

      if (el) {
        return offsetTop(el) + el.offsetHeight
      }
    }
  },
  mounted () {
    // add sticky class
    addClass(this.$el, 'uk-sticky')

    // calculate offset on load and resize
    // this.topOffset = this.isActive
    //   ? offsetTop(this.placeholder)
    //   : offsetTop(this.$el)

    this.topOffset = offsetTop(this.$el)

    // calculate outerHeight
    // const outerElement = active
    //   ? this.placeholder
    //   : this.$el
    // this.outerHeight = css(this.$el, 'position') !== 'absolute'
    //   ? outerElement.offsetHeight
    //   : ''

    this.outerHeight = this.$el.offsetHeight

    this.createPlaceholder()
    this.updatePlaceholder()

    const active = scroll > this.stickyStartPoint

    if (active) {
      this.isActive = true
      this.update()
    } else {
      addClass(this.$el, this.clsInactive)
    }
  }
}

function isVisible (el) {
  if (!el) {
    return false
  }

  const elemTop = el.getBoundingClientRect().top
  const elemBottom = el.getBoundingClientRect().bottom
  const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight)

  return isVisible
}

function getViewportHeightOffset (height) {
  return window.innerHeight * parseFloat(height) / 100
}
