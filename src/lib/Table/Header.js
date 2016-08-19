export default {
  functional: true,
  props: ['field'],
  render (h, { parent, props }) {
    const orderedBy = parent.sortOrder[props.field.name]
    const icon = <i staticClass="uk-icon-justify uk-margin-small-left" class={{
      'uk-invisible': !orderedBy,
      'vk-icon-arrow-down': orderedBy === 'asc' || orderedBy === undefined,
      'vk-icon-arrow-up': orderedBy === 'desc'
    }}></i>
    return (
      <th class={{
        'uk-visible-hover-inline': props.field.sortBy,
        'vk-table-order': props.field.sortBy,
        'uk-active': orderedBy,
        [props.field.headerClass]: props.field.headerClass
      }} on-click={e => props.field.sortBy && parent.emitSort(props.field)}>
        <span class="uk-position-relative">
          { props.field.header }{ props.field.sortBy && icon }
        </span>
      </th>
    )
  }
}
