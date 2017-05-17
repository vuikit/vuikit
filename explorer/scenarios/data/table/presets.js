export default {
  name: {
    type: 'sort',
    header: 'Name',
    headerClass: 'uk-text-center',
    cell: 'name',
    cellClass: 'uk-text-center uk-text-bold'
  },
  hits: {
    type: 'sort',
    header: 'Hits',
    cell: 'hits',
    cellRender (row) {
      const h = this.$createElement
      return h('i', row.hits)
    }
  },
  nested: {
    header: 'Author',
    cell: 'author.name'
  }
}
