import { ElementDrop } from '../../elements'
import { Transition } from 'vuikit/src/core/transition'
import { BEFORE_POSITION } from 'vuikit/src/core/v-position'

import { css } from 'vuikit/src/util/style'
import { offset as getOffset } from 'vuikit/src/util/dimensions'
import { addClass, removeClass } from 'vuikit/src/util/class'

export default {
  mounted () {
    // evaluate target and boundary elements
    this.$refs.target = this.queryElement(this.target) || this.$el.previousElementSibling
    this.$refs.boundary = this.queryElement(this.boundary) || window
    // must force a rerended after
    this.$forceUpdate()
  },
  render (h) {
    let { position } = this
    let { boundary, target } = this.$refs
    const [, align] = position.split('-')
    const { boundaryAlign, animation, duration, mainClass, flip, offset } = this

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
      class: [mainClass, {
        [`${mainClass}-boundary`]: this.boundaryAlign
      }],
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
      h(ElementDrop, def, this.$slots.default)
    ])
  }
}

function getAxis (position) {
  const [dir] = position.split('-')
  return dir === 'top' || dir === 'bottom'
    ? 'y'
    : 'x'
}
