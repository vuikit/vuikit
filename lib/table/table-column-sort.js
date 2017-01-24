import Column from './column.js'

function processSortOrder (sortBy, sortedBy) {
  const newOrder = {}
  // prepare the final order object state
  if (sortedBy[sortBy]) {
    newOrder[sortBy] = sortedBy[sortBy] === 'asc'
      ? 'desc'
      : 'asc'
  } else {
    newOrder[sortBy] = 'asc'
  }
  return newOrder
}

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
        'uk-visible-hover-inline uk-link uk-link-reset',
        { 'uk-active': orderedBy }
      ],
      on: {
        click: e => {
          Table.$emit('sort', processSortOrder(sortBy, Table.sortedBy))
        }
      }
    }, [ scopedSlot
      ? scopedSlot()
      : h('span', {
        class: 'uk-position-relative'
      }, [
        this.header,
        h('span', {
          staticClass: 'uk-margin-small-left',
          attrs: {
            'uk-icon': `icon: arrow-${orderedBy === 'asc' || orderedBy === undefined ? 'down' : 'up'}`
          },
          class: {
            'uk-invisible': !orderedBy
          }
        })
      ])
    ])
  }
}
