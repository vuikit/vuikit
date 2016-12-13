// Header is the default component render
function headerRender (h) {
  if (this.$scopedSlots.header) {
    return (<th>{ this.$scopedSlots.header() }</th>)
  } else {
    return (<th>{ this.header }</th>)
  }
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

export default {
  name: 'VkTableColumn',
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
    }
  }
}
