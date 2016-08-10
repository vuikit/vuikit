import VkDropdown from '../Dropdown'
import sQuery from 'search-query-parser'
import render from './render'

export default {
  name: 'VkFilter',
  components: {
    VkDropdown
  },
  render,
  mounted () {
    // set dropdown target and init it
    if (this.filters && this.$refs.dropdown) {
      this.dropdown.target = this.$refs.button
      setTimeout(() => this.$refs.dropdown.init())
    }
  },
  props: {
    // eg: [{ name: 'Filter Foo', query: 'is:bar', 'Filter Bar'... }]
    filters: {
      type: [Boolean, Array],
      default: false
    },
    parser: {
      type: Object,
      default: () => ({
        keywords: [],
        ranges: []
      })
    },
    // shows the reset btn
    showReset: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    query: '',
    dropdown: {
      show: false,
      target: false
    }
  }),
  computed: {
    parsed () {
      return sQuery.parse(this.query, this.parser)
    }
  },
  watch: {
    query () {
      this.$emit('query', this.parsed, this.query)
    }
  }
}
