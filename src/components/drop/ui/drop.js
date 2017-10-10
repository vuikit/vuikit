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
    boundary: {
      default: () => window
    },
    show: {
      type: Boolean,
      default: false
    },
    flip: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'bottom-left',
      validator: val => positions.indexOf(val) !== -1
    },
    clsPrefix: {
      type: String,
      default: 'uk-drop'
    }
  },
  render (h, { props, data, children }) {
    const { show, target, boundary, position, clsPrefix, flip } = props

    // sometimes the target is provided
    // with a delay, lets wait for it
    if (!target || !show) {
      return
    }

    if (!isObject(target)) {
      warn('The drop target must be a dom element.')
      return
    }

    const def = {
      class: clsPrefix,
      directives: [{
        name: 'drop-position', value: { target, boundary, position, clsPrefix, flip }
      }]
    }

    return h('div', merge({}, def, data), [ children ])
  }
}
