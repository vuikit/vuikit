export default {
  name: {
    header: 'Name - Custom Class',
    headerClass: 'uk-text-center',
    cell: 'name',
    cellClass: 'uk-text-center uk-text-bold'
  },
  hits: {
    header: 'Hits - Scoped Slot',
    cell: 'hits',
    cellRender (row) {
      const h = this.$createElement
      return h('i', row.hits)
    }
  },
  nested: {
    header: 'Author - Nested Value',
    cell: 'author.name'
  },
  sort: {
    type: 'sort',
    header: 'Sort By Name',
    cell: 'name'
  }
}
