import { merge } from 'lodash'

export default function (h) {
  const nodes = {}
  // headers
  nodes.headers = this.fieldsDef.map(field => {
    const orderedBy = this.sortOrder[field.name]
    const icon = <i class={{
      'uk-icon-justify uk-margin-small-left': true,
      'uk-invisible': !orderedBy,
      'vk-icon-arrow-down': orderedBy === 'asc' || orderedBy === undefined,
      'vk-icon-arrow-up': orderedBy === 'desc'
    }}></i>
    return (
      <th class={{
        'uk-visible-hover-inline': field.sortBy,
        'vk-table-order': field.sortBy,
        'uk-active': orderedBy,
        [field.headerClass]: field.headerClass
      }} on-click={e => {
        e.preventDefault()
        if (field.sortBy) {
          this.emitSort(field)
        }
      }}>
        <span class="uk-position-relative">
          { field.header }{ field.sortBy && icon }
        </span>
      </th>
    )
  })
  // rows
  nodes.rows = this.rows.map(row => (
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
  return (
    <table class={{
      'uk-table': true,
      'uk-table-striped': this.striped,
      'uk-table-condensed': this.condensed,
      'uk-table-hover': this.hover
    }}>
      <thead>
        <tr>{ nodes.headers }</tr>
      </thead>
      <tbody>{ nodes.rows }</tbody>
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
