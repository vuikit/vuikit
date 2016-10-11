const Cell = {
  functional: true,
  props: ['field'],
  render (h, { parent: vm, props }) {
    const { field } = props
    const { sortBy, headerClass } = field
    const orderedBy = vm.sortOrder[field.name]
    // Header, default or custom render
    const Header = (typeof field.header === 'function')
      ? h({
        functional: true,
        props: ['field'],
        render: field.header
      }, { props: { field } })
      : field.header
    return h('th', {
      class: {
        'uk-visible-hover-inline': sortBy,
        'vk-table-order': sortBy,
        'uk-active': orderedBy,
        [headerClass]: headerClass
      },
      on: {
        click: e => sortBy && vm.emitSort(props.field)
      }
    }, [
      sortBy
        ? h('span', {
          class: 'uk-position-relative'
        }, [
          Header,
          h(Icon, { props: { orderedBy } })
        ])
        : Header
    ])
  }
}

const Icon = {
  functional: true,
  props: ['orderedBy'],
  render (h, { props }) {
    const { orderedBy } = props
    return h('i', {
      staticClass: 'uk-icon-justify uk-margin-small-left',
      class: {
        'uk-invisible': !orderedBy,
        'vk-icon-arrow-down': orderedBy === 'asc' || orderedBy === undefined,
        'vk-icon-arrow-up': orderedBy === 'desc'
      }
    })
  }
}

export default Cell
