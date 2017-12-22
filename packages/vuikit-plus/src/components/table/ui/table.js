const Thead = {
  functional: true,
  render: (h, { children }) => h('thead', [ h('tr', children) ])
}

const Tbody = {
  functional: true,
  render: (h, { children }) => h('tbody', children)
}

export default {
  functional: true,
  render (h, { slots, props }) {
    const _slots = slots()

    return h('table', {
      class: ['uk-table', {
        'uk-table-small': props.narrowed,
        'uk-table-hover': props.hoverable,
        'uk-table-divider': props.divided,
        'uk-table-striped': props.striped,
        'uk-table-justify': props.justified,
        'uk-table-middle': props.middleAligned,
        'uk-table-responsive': props.responsive
      }]
    }, [
      _slots.head && h(Thead, _slots.head),
      _slots.body && h(Tbody, _slots.body)
    ])

  },
  props: {
    narrowed: {
      type: Boolean,
      default: false
    },
    middleAligned: {
      type: Boolean,
      default: false
    },
    divided: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    hoverable: {
      type: Boolean,
      default: false
    },
    justified: {
      type: Boolean,
      default: false
    },
    responsive: {
      type: Boolean,
      default: false
    }
  }
}
