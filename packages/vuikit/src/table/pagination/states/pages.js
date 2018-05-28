import { extractProps } from 'vuikit/src/_core/utils/vue'
import { Pagination, PaginationPages } from 'vuikit/src/library/pagination'

export default {
  props: extractProps(Pagination),
  render (h) {

    return h(Pagination, {
      props: this.$props,
      on: this.$listeners
    }, [
      h(PaginationPages)
    ])
  }
}
