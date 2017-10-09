import { merge, isObject } from '@vuikit/util'
import { warn } from '~/helpers/debug'

const positions = [
  'bottom-left',
  'bottom-center',
  'bottom-right',
  'bottom-justify',

  'top-left',
  'top-center',
  'top-right',
  'top-justify',

  'left-top',
  'left-center',
  'left-bottom',

  'right-top',
  'right-center',
  'right-bottom'
]

export default {
  functional: true,
  props: {
    target: {
      required: true
    },
    boundary: {},
    show: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'bottom-left',
      validator: val => positions.indexOf(val) !== -1
    }
  },
  render (h, { props, data, children }) {
    const { show, target, boundary, position } = props

    // sometimes the target is provided with a delay,
    // silently abort in such case
    if (!target) {
      return
    }

    if (!isObject(target)) {
      warn('The UiDrop target is not a dom element.')
      return
    }

    const def = {
      class: ['uk-drop', {
        'uk-open': show
      }],
      directives: [{
        name: 'vk-drop-position', value: { target, boundary, position }
      }]
    }

    return h('div', merge({}, def, data), [ children ])
  }
}
