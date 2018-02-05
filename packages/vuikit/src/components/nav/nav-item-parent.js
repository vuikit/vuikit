import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  label: {
    type: String,
    required: true
  },
  render (h, { props, data, children }) {

    return h('li', mergeData(data, {
      class: 'uk-parent'
    }), [

      h('a', [
        props.label
      ]),

      h('ul', {
        class: 'uk-nav-sub'
      }, children)

    ])

  }
}
