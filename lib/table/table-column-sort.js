import Column from './column.js'

export default {
  name: 'VkTableColumnSort',
  extends: Column,
  props: {
    // the row value to be sorted by (defaults to cell prop)
    sortBy: {
      type: String
    },
    // the header label
    header: {
      type: String
    },
    headerClass: {
      type: String
    },
    // the cell key
    cell: {
      type: String
    },
    cellClass: {
      type: String
    }
  },
  headerRender (h) {
    const Table = this.$parent
    const orderedBy = Table.sortedBy[this.cell]
    const sortBy = this.sortBy || this.cell
    return h('th', {
      staticClass: this.headerClass,
      scopedSlots: this.$scopedSlots,
      class: [
        'uk-visible-hover-inline',
        { 'uk-active': orderedBy }
      ]
    }, [
      this._t('header', h(Header, {
        props: {
          sortBy,
          orderedBy,
          name: this.header,
          Table
        }
      }))
    ])
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
