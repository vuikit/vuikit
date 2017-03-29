import Column from './column.js'

export default {
  name: 'VkTableColumn',
  extends: Column,
  props: {
    // the header label
    header: {
      type: String
    },
    headerClass: {
      type: String
    },
    // the cell key
    cell: {
      type: String
    },
    cellClass: {
      type: String
    }
  }
}
