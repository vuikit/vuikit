import { css } from 'vuikit/src/_core/utils/style'
import { get } from 'vuikit/src/_core/utils/misc'
import { height } from 'vuikit/src/_core/utils/dimensions'
import { isVisible } from 'vuikit/src/_core/utils/filter'
import { Transition } from 'vuikit/src/_core/utils/animation'
import { noop, toFloat } from 'vuikit/src/_core/utils/lang'

import { ElNavbarDropbar } from '../elements'

let activeDrops

export default {
  name: 'VkNavbarDropbar',
  props: {
    mode: {
      type: String,
      default: 'slide',
      validator: val => /^(slide|push)$/.test(val)
    },
    duration: {
      type: Number,
      default: 200
    }
  },
  methods: {
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
    const dropdowns = get(this, '$children', [])
      .filter(child => /NavbarNavDropdown/.test(child.$options.name))
      .map(c => c.$children[0])

    dropdowns.forEach(drop => {
      drop.$vnode.data.class['uk-navbar-dropdown-dropbar'] = true

      drop.$on('show', () => {
        activeDrops++
        this.$nextTick(() => {
          this.transitionDropbar(drop.$el)
        })
      })

      drop.$on('hide', () => {
        activeDrops--
        this.$nextTick(() => {
          if (!activeDrops) {
            this.transitionDropbar(drop.$el)
          }
        })
      })
    })
  },
  render (h) {
    return h('div', {
      class: 'uk-position-relative'
    }, [
      this.$slots.default,
      h(ElNavbarDropbar, {
        ref: 'dropbar',
        props: {
          slide: this.mode === 'slide'
        }
      })
    ])
  }
}
