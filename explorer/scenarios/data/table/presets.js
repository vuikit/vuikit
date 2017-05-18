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
    cellRender (h, row) {
      return h('i', row.hits)
    }
  },
  author: {
    header: 'Author',
    cell: 'author.name'
  },
  desc: {
    type: 'sort',
    header: 'Description',
    cell: 'desc'
  }
}
