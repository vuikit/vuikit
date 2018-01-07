export default {
  functional: true,
  props: {
    label: {
      type: String,
      required: true
    }
  },
  render (h, { props }) {

    return h('li', {
      class: 'uk-nav-header'
    }, [
      props.label
    ])

  }
}
