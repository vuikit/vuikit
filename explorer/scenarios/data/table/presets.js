export default {
  select: {
    type: 'select'
  },
  id: {
    type: 'sort',
    header: 'Id',
    cell: 'id'
  },
  company: {
    type: 'sort',
    header: 'Company',
    cell: 'company'
  },
  website: {
    header: 'Websiste',
    cell: 'website',
    class: 'uk-text-right',
    cellClass: 'uk-text-right',
    cellTemplate (h, row) {
      return h('a', {
        href: `http://${row.website}`
      }, [ row.website ])
    }
  },
  version: {
    header: 'Version',
    cell: 'version'
  }
}
