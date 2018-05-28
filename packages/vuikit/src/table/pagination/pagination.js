import { extractProps } from 'vuikit/src/_core/utils/vue'
import { ElPagination, Pagination, PaginationPages } from 'vuikit/src/pagination'

import PaginationState from './states/state'
import PaginationPerpage from './states/perpage'

export default {
  props: extractProps(Pagination),
  data: () => ({
    view: 'state'
  }),
  methods: {
    resetView () {
      this.view = 'state'
    }
  },
  render (h) {
    const { view, align } = this

    let viewContent
    switch (view) {
      case 'state':
        viewContent = h(ElPagination, {
          class: 'uk-margin-remove',
          key: 'state'
        }, [
          h(PaginationState)
        ])
        break
      case 'perpage':
        viewContent = h(ElPagination, {
          class: 'uk-margin-remove',
          key: 'perpage'
        }, [
          h(PaginationPerpage)
        ])
        break
      case 'pages':
        viewContent = h(Pagination, {
          class: 'uk-margin-remove',
          props: this.$props,
          on: this.$listeners,
          key: 'pages'
        }, [
          h(PaginationPages)
        ])
        break
    }

    return h('div', {
      class: ['vk-table-pagination', {
        [`uk-flex uk-flex-${align}`]: align !== 'left'
      }],
      on: {
        mouseleave: e => {
          this.timer = setTimeout(() => {
            this.view = 'state'
          }, 1000)
        },
        mouseenter: e => {
          clearTimeout(this.timer)
        }
      }
    }, [
      h('transition', {
        props: { name: 'fade', mode: 'out-in' }
      }, [
        viewContent
      ])
    ])
  }
}
