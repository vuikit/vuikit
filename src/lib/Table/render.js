import { merge } from 'lodash'

export default function (h) {
  return (
    <table class={{
      'uk-table': true,
      'uk-table-striped': this.striped,
      'uk-table-condensed': this.condensed,
      'uk-table-hover': this.hover
    }}>
      <thead>
        <tr>{
          this.fieldsDef.map(field => (
            <th class={ field.headerClass }>{ field.sortBy
              ? (<a on-click={event => {
                event.preventDefault()
                this.emitSort(field)
              }}>
                { field.header }
                <i class={{
                  'uk-icon-justify uk-position-absolute': true,
                  'uk-icon-caret-up': this.sortOrder[field.name] === 'asc',
                  'uk-icon-caret-down': this.sortOrder[field.name] === 'desc'
                }}></i>
              </a>)
              : field.header
            }</th>
          ))
        }</tr>
      </thead>
      <tbody>{
        this.rows.map(row => (
          <tr>{
            this.fieldsDef.map((field, index) => (
              h(fieldComponent, {
                key: index,
                class: field.cellClass,
                props: {
                  row: row,
                  field: field
                }
              })
            ))
          }</tr>
        ))
      }</tbody>
    </table>
  )
}

const fieldComponent = {
  functional: true,
  props: {
    row: {
      required: true
    },
    field: {
      required: true
    }
  },
  render (h, { parent, props, data }) {
    let customComponent = false
    if (parent.fieldComponent) {
      customComponent = h(parent.fieldComponent, {
        props: merge({}, parent.fieldProps, props)
      })
    }
    return (
      <td {...data}>{ customComponent || props.row[ props.field.name ] }</td>
    )
  }
}
