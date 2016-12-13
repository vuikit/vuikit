// Header is the default component render
function headerRender (h) {
  const Table = this.$parent
  const orderedBy = Table.sortedBy[this.cell]
  const sortBy = this.sortBy || this.cell
  return (
    <th class={[
      'uk-visible-hover-inline vk-table-order',
      { 'uk-active': orderedBy }
    ]} on-click={e => {
      Table.$emit('sort', processSortOrder(sortBy, Table.sortedBy))
    }}>
    {
      this.$scopedSlots.header
        ? this.$scopedSlots.header()
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

// Cell is a functional component render
const cellRender = {
  functional: true,
  props: ['row', 'rowIndex', 'cell'],
  render (h, { props, data }) {
    const { scopedSlots } = data
    const scopedSlot = scopedSlots && scopedSlots.cell
    const { row, cell } = props
    return (<td>{ scopedSlot ? scopedSlot(props) : row[cell] }</td>)
  }
}

export function processSortOrder (sortBy, sortedBy) {
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
  render: headerRender,
  cellRender,
  props: {
    // the header label
    header: {
      type: String
    },
    // the cell value key retrieved
    // from the row
    cell: {
      type: String
    },
    // the row value to be sorted by
    // defaults to cell prop
    sortBy: {
      type: String
    }
  }
}
