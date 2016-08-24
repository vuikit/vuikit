import Checkbox from './Checkbox'
import Header from './Header'
import Row from './Row'

export default function (h) {
  const allSelected = this.rows.every(row =>
    this.selectedRows.find(id => id === row[this.trackBy])
  )
  return (
    <table staticClass="uk-table" class={{
      'uk-table-striped': this.striped,
      'uk-table-condensed': this.condensed,
      'uk-table-hover': this.hover
    }}>
      <thead>
        <tr>{
          this.selectable && h('th', [ h(Checkbox, {
            props: {
              checked: allSelected,
              onClick: e => {
                if (allSelected) {
                  const affectedRows = this.rows.slice() // clone array
                  this.$emit('unselect', [], affectedRows)
                } else {
                  const newState = this.rows.map(row => row[this.trackBy])
                  const affectedRows = this.rows.filter(row =>
                    // filter out selected rows
                    !this.selectedRows.find(id => row[this.trackBy] === id)
                  )
                  this.$emit('select', newState, affectedRows)
                }
              }
            }
          }) ])
        }
        { this.fieldsDef.map(field => h(Header, { props: {field} })) }
        </tr>
      </thead>
      <tbody>{
        this.rows.map(row => h(Row, { props: {row} }))
      }</tbody>
    </table>
  )
}
