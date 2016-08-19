import Checkbox from './Checkbox'
import Field from './Field'

export default {
  functional: true,
  props: ['row'],
  render (h, { parent, props }) {
    return <tr on-click={e => {
      if (e.target.tagName === 'TD') {
        parent.toggleSelected(props.row)
      }
    }}>
      { parent.selectable && (
        <td class="vk-table-width-minimum">{
          h(Checkbox, {
            props: {
              checked: parent.isSelected(props.row),
              onChange: e => parent.toggleSelected(props.row)
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
