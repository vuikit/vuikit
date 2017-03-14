import Column from './column.js'

export default {
  name: 'VkTableColumnSort',
  extends: Column,
  props: {
    header: {
      type: String
    },
    headerClass: {
      type: String
    },
    // sort by and display data
    // use scopedSlots for altering the display
    cell: {
      type: String
    },
    cellClass: {
      type: String
    }
  },
  headerRender () {
    const h = this.$createElement
    const Table = this.$parent
    const sortBy = this.cell
    const orderedBy = Table.sortedBy[sortBy]
    const defaultContent = h(Header, {
      props: {
        sortBy,
        orderedBy,
        name: this.header,
        Table
      }
    })
    const slot = this.processSlot('header', {}, defaultContent)
    const staticClass = this.joinClasses('uk-visible-hover-inline', this.headerClass)
    return h('th', { staticClass, class: { 'uk-active': orderedBy } }, [ slot ])
  }
}

const Header = {
  functional: true,
  props: ['name', 'sortBy', 'orderedBy', 'Table'],
  render (h, { props }) {
    const { name, sortBy, orderedBy, Table } = props
    return h('a', {
      staticClass: 'uk-position-relative uk-display-block uk-link-reset uk-text-nowrap',
      on: {
        click: e => {
          Table.$emit('sort', processSortOrder(Table.sortedBy, sortBy, e.shiftKey))
        }
      }
    }, [
      name,
      h('span', {
        staticClass: 'uk-icon uk-position-absolute',
        attrs: {
          'uk-icon': 'icon: arrow-down'
        },
        class: {
          'uk-invisible': !orderedBy
        },
        directives: [{
          name: 'show',
          value: (orderedBy === 'asc' || orderedBy === undefined)
        }]
      }),
      h('span', {
        staticClass: 'uk-icon uk-position-absolute',
        attrs: {
          'uk-icon': 'icon: arrow-up'
        },
        class: {
          'uk-invisible': !orderedBy
        },
        directives: [{
          name: 'show',
          value: orderedBy === 'desc'
        }]
      })
    ])
  }
}

function processSortOrder (currentSort, by, multi) {
  const order = currentSort[by] === 'asc'
    ? 'desc'
    : 'asc'
  const sort = { [by]: order }
  return multi
    ? { ...currentSort, ...sort }
    : sort
}
