import dataMerge from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: {
    animated: {
      type: Boolean,
      default: false
    },
    width: {
      type: [Boolean, Number],
      default: false
    },
    height: {
      type: [Boolean, Number],
      default: false
    }
  },
  render: (h, { data, props, children }) => {
    const { animated, width, height } = props

    return h('div', dataMerge({
      class: {
        'vk-skeleton--animated': animated
      },
      style: {
        width: `${width}px`,
        height: `${height}px`
      }
    }, data), [
      h('div', {
        class: 'vk-skeleton-content'
      })
    ])
  }
}
