import mergeData from '@vuikit/core/helpers/vue-data-merge'

export default {
  functional: true,
  label: {
    type: String,
    required: true
  },
  render (h, { props, children, data }) {

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
