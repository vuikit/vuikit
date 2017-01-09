import Core from './core.js'

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
  extends: Core,
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
    return (
      <th staticClass={ this.headerClass } class={[
        'uk-visible-hover-inline vk-table-order',
        { 'uk-active': orderedBy }
      ]} on-click={e => {
        Table.$emit('sort', processSortOrder(sortBy, Table.sortedBy))
      }}>
      { scopedSlot
        ? scopedSlot()
        : (
          <span class="uk-position-relative">
            { this.header }
            <i staticClass="uk-icon-justify uk-margin-small-left" class={{
              'uk-invisible': !orderedBy,
              'vk-icon-arrow-down': orderedBy === 'asc' || orderedBy === undefined,
              'vk-icon-arrow-up': orderedBy === 'desc'
            }}></i>
          </span>
        )
      }
      </th>
    )
  }
}
