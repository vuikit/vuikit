import Checkbox from './Checkbox'
import Field from './Field'

export default {
  functional: true,
  props: ['row'],
  render (h, { parent, props }) {
    const rowId = props.row[parent.trackBy]
    return <tr on-click={e => {
      if (e.target.tagName === 'TD') {
        triggerChangeEvent(parent, props.row)
      }
    }}>
      { parent.selectable && (
        <td class="vk-table-width-minimum">{
          h(Checkbox, {
            props: {
              checked: parent.selectedRows.find(id => id === rowId),
              onClick: e => {
                triggerChangeEvent(parent, props.row)
              }
            }
          })
        }</td>
      )}
      { parent.fieldsDef.map((field, index) =>
        <td class={ field.cellClass }>
          { h(Field, { props: { row: props.row, field } }) }
        </td>
      )}
    </tr>
  }
}

function triggerChangeEvent (parent, row) {
  const rowId = row[parent.trackBy]
  const selectedRows = parent.selectedRows.slice() // clones the array
  // if already selected
  if (selectedRows.find(id => id === rowId)) {
    const index = selectedRows.indexOf(rowId)
    selectedRows.splice(index, 1)
    parent.$emit('unselect', selectedRows, [ row ])
  } else {
    selectedRows.push(rowId)
    parent.$emit('select', selectedRows, [ row ])
  }
}
