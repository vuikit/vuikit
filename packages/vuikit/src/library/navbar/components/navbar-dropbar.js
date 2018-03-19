import { css } from 'vuikit/src/util/style'
import { get } from 'vuikit/src/util/misc'
import { height } from 'vuikit/src/util/dimensions'
import { Transition } from 'vuikit/src/util/animation'
import { noop, toFloat } from 'vuikit/src/util/lang'
import { isVisible, within } from 'vuikit/src/util/filter'

import { ElementNavbarDropbar } from '../elements'

import { active as activeDrop, constants } from 'vuikit/src/library/drop'
const { SHOW, HIDE } = constants

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

      drop.$on(SHOW, () => {
        this.$nextTick(() => {
          this.transitionDropbar(drop.$el)
        })
      })

      drop.$on(HIDE, () => {
        this.$nextTick(() => {
          const thereAreActiveDrops = activeDrop && within(activeDrop.$el, this.$el)

          if (!thereAreActiveDrops) {
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
      h(ElementNavbarDropbar, {
        ref: 'dropbar',
        props: {
          slide: this.mode === 'slide'
        }
      })
    ])
  }
}
