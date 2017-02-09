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
    const scopedSlot = this.$scopedSlots && this.$scopedSlots.header
    const Table = this.$parent
    const orderedBy = Table.sortedBy[this.cell]
    const sortBy = this.sortBy || this.cell
    return h('th', {
      staticClass: this.headerClass,
      class: [
        'uk-visible-hover-inline',
        { 'uk-active': orderedBy }
      ]
    }, [ scopedSlot
      ? scopedSlot()
      : h('a', {
        staticClass: 'uk-position-relative uk-display-block uk-link-reset uk-text-nowrap',
        on: {
          click: e => {
            Table.$emit('sort', processSortOrder(Table.sortedBy, sortBy, e.shiftKey))
          }
        }
      }, [
        this.header,
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
