import elDrop from '../elements/drop'
import { Transition } from 'vuikit/src/components/transition'
import { positionBefore } from 'vuikit/src/core/v-position/events'

import { css } from 'vuikit/src/util/style'
import { offset as getOffset } from 'vuikit/src/util/dimensions'
import { addClass, removeClass } from 'vuikit/src/util/class'

export default {
  render (h) {
    let { position } = this
    let { boundary, target } = this.$refs
    const [, align] = position.split('-')
    const { boundaryAlign, animation, duration, mainClass, flip, offset } = this

    // justify is a drop specific position,
    // it must be maped for v-position
    position = position.replace('justify', 'center')

    // set final target
    target = boundaryAlign ? boundary : target

    // delay render until target
    // is evaluated
    if (!target) return

    const def = {
      on: {
        [positionBefore]: e => {
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
      h(elDrop, def, this.$slots.default)
    ])
  },
  mounted () {
    // evaluate target and boundary elements
    this.$refs.target = this.$el.previousElementSibling
    this.$refs.boundary = this.queryElement(this.boundary)

    // must force a rerended after
    this.$forceUpdate()
  }
}

function getAxis (position) {
  const [dir] = position.split('-')
  return dir === 'top' || dir === 'bottom'
    ? 'y'
    : 'x'
}
