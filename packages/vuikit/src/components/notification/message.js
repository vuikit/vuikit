import mergeData from 'vuikit/core/helpers/vue-data-merge'

export default {
  functional: true,
  props: {
    transition: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: '',
      validator: val => !val || val.match(/^(primary|success|warning|danger)$/)
    }
  },
  render (h, { props, data, children }) {
    const { status } = props

    const def = {
      class: ['uk-notification-message', {
        [`uk-notification-message-${status}`]: status
      }]
    }

    return h('div', mergeData(data, def), children)
  }
}
