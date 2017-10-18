import { merge } from '@vuikit/util'

const status = [
  'primary',
  'success',
  'warning',
  'danger'
]

export default {
  functional: true,
  props: {
    status: {
      type: String,
      default: '',
      validator: val => !val || status.indexOf(val) !== -1
    },
    transition: {
      type: String,
      default: ''
    }
  },
  render (h, { parent, props, children, data }) {
    const { status } = props

    const def = {
      class: [
        'uk-notification-message'
      ]
    }

    if (status) {
      def.class.push(`uk-notification-message-${status}`)
    }

    return h('div', merge({}, def, data), [
      children
    ])
  }
}
