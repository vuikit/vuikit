import mergeData from '~helpers/fn-data-merge'

export default {
  functional: true,
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  render (h, { props, children, data }) {
    const { open } = props

    return h('div', mergeData(data, {
      class: ['uk-navbar-dropdown', {
        'uk-open': open
      }]
    }), [

      h('ul', { class: 'uk-nav uk-navbar-dropdown-nav' }, children)

    ])

  }
}
