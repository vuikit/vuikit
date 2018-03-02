import { Transition } from 'vuikit/src/util/animation'
import { active as activeDrop } from '../drop/drop/toggle'

import { css } from 'vuikit/src/util/style'
import { height } from 'vuikit/src/util/dimensions'
import { isVisible, within } from 'vuikit/src/util/filter'
import { noop, toFloat, includes } from 'vuikit/src/util/lang'

import ElementNavbarDropbar from './elements/navbar-dropbar'

export default {
  name: 'VkNavbarDropbar',
  props: {
    mode: {
      type: String,
      default: 'slide'
    },
    duration: {
      type: Number,
      default: 200
    }
  },
  render (h) {
    const { mode } = this

    return h('div', {
      class: 'uk-position-relative'
    }, [
      this.$slots.default,
      h(ElementNavbarDropbar, {
        ref: 'dropbar',
        props: {
          slide: mode === 'slide'
        }
      })
    ])
  },
  methods: {
    getActiveDrop () {
      const active = activeDrop
      return active && includes(active.mode, 'hover') && within(active.$refs.target, this.$el) && active
    },
    transitionDropbar (dropdownEl) {
      const el = dropdownEl

      const marginTop = toFloat(css(el, 'margin-top'))
      const marginBottom = toFloat(css(el, 'margin-bottom'))

      const height = el.offsetHeight + marginTop + marginBottom

      this.transitionTo(height, el)
    },
    transitionTo (newHeight, el) {
      const dropbar = this.$refs.dropbar
      const oldHeight = isVisible(dropbar) ? height(dropbar) : 0

      el = oldHeight < newHeight && el

      css(el, { height: oldHeight, overflow: 'hidden' })
      height(dropbar, oldHeight)

      Transition.cancel([el, dropbar])
      return Transition
        .start([el, dropbar], { height: newHeight }, this.duration)
        .catch(noop)
        .finally(() => css(el, { height: '', overflow: '' }))
    }
  },
  mounted () {
    const dropdowns = this.$children
      .filter(child => /NavbarDropdown/.test(child.$options.name))

    dropdowns.forEach(dropdown => {
      dropdown.$refs.drop.$on('show', () => {
        this.$nextTick(() => {
          this.transitionDropbar(dropdown.$refs.drop.$el)
        })
      })
      dropdown.$refs.drop.$on('hide', () => {
        this.$nextTick(() => {
          const active = this.getActiveDrop()
          if (!active) {
            this.transitionDropbar(dropdown.$refs.drop.$el)
          }
        })
      })
    })
  }
}
