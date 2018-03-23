import { Grid } from 'vuikit/src/library/grid'
import { Drop, constants } from 'vuikit/src/library/drop'

import { get } from 'vuikit/src/util/misc'
import { query } from 'vuikit/src/util/selector'
import { assign } from 'vuikit/src/util/lang'
import { isTouch } from 'vuikit/src/util/touch'
import { isRtl, pointerEnter, pointerLeave, hasTouch } from 'vuikit/src/util/env'

const { SHOW } = constants

export default {
  name: 'VkNavbarNavDropdown',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String
    },
    justified: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default: isRtl ? 'right' : 'left',
      validator: val => /^(left|center|right)$/.test(val)
    },
    navbarAligned: {
      type: Boolean,
      default: false
    },
    mode: Drop.props.mode,
    offset: Drop.props.offset,
    animation: Drop.props.animation,
    duration: Drop.props.duration,
    delayShow: Drop.props.delayShow,
    delayHide: Drop.props.delayHide
  },
  computed: {
    navbar () {
      return query('!.uk-navbar', this.$el)
    },
    dropbar () {
      return /NavbarDropbar/.test(get(this, '$parent.$options.name', ''))
        ? this.$parent
        : false
    }
  },
  mounted () {
    const { mode } = this
    const { on, toggle, show, hide } = this.$refs.drop
    const target = this.$refs.drop.$refs.target

    if (/click/.test(mode) || hasTouch) {
      on(target, 'click', toggle)
    }

    if (/hover/.test(mode)) {
      on(target, pointerEnter, e => {
        if (isTouch(e)) {
          return
        }

        e.preventDefault()
        show()
      })

      on(this.dropbar ? this.dropbar.$el : target, pointerLeave, e => {
        if (isTouch(e)) {
          return
        }

        e.preventDefault()
        hide()
      })
    }
  },
  render (h) {
    const { title, justified, mode, align, navbarAligned, subtitle } = this

    const defaultSlots = this.$slots.default || []
    const childrenNodes = defaultSlots.filter(n => n.tag)
    const colCount = childrenNodes.length

    const Subtitle = subtitle && h('div', [ title, h('div', {
      class: 'uk-navbar-subtitle'
    }, subtitle) ])

    return h('li', [
      h('a', [Subtitle || title]),
      h(Drop, {
        on: {
          [SHOW]: (e) => {
            this.$forceUpdate()
          }
        },
        nativeOn: {
          [pointerEnter]: e => {
            this.$refs.drop.clearTimers()

            if (/hover/.test(mode)) {
              this.$refs.drop.show()
            }
          },
          [pointerLeave]: e => {
            if (!this.dropbar && /hover/.test(mode)) {
              this.$refs.drop.hide()
            }
          }
        },
        ref: 'drop',
        class: {
          'uk-navbar-dropdown-dropbar': Boolean(this.dropbar),
          'uk-navbar-dropdown-boundary': justified || navbarAligned,
          [`uk-navbar-dropdown-width-${colCount}`]: colCount > 1 && !justified
        },
        props: assign({}, this.$props, {
          // mode is nulled for full
          // show/hide controll
          mode: '',
          position: justified
            ? 'bottom-justify'
            : `bottom-${align}`,
          mainClass: 'uk-navbar-dropdown',
          flip: justified ? 'x' : undefined,
          boundary: '!nav', // closest nav
          boundaryAlign: justified || navbarAligned
        })
      }, [
        colCount >= 2
          ? h(Grid, {
            class: [
              'uk-navbar-dropdown-grid',
              `uk-child-width-1-${colCount}${colCount > 2 ? '@m' : ''}`
            ]
          }, childrenNodes.map(child =>
            h('div', [ child ])
          ))
          : defaultSlots
      ])
    ])
  }
}
