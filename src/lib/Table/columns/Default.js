import Core from './core.js'

export default {
  name: 'VkTableColumn',
  extends: Core,
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
