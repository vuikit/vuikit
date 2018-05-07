import { ElTablePaginationOption } from '../../elements'
import { ElPaginationPagePrev, ElPaginationPageNext } from 'vuikit/src/pagination'

export default {
  functional: true,
  render (h, { props, data, parent }) {
    const { total, perPage, page } = parent

    const totalPages = Math.ceil(total / perPage)
    const isLastPage = page === totalPages
    const lastPageItems = total % perPage

    const totalItemsDisplayed = isLastPage && lastPageItems
      ? lastPageItems
      : perPage

    const ElPrev = h(ElPaginationPagePrev, {
      props: {
        disabled: page === 1
      },
      on: {
        click: e => parent.$emit('update:page', page - 1)
      }
    })

    const ElNext = h(ElPaginationPageNext, {
      props: {
        disabled: (page + 1) > totalPages
      },
      on: {
        click: e => parent.$emit('update:page', page + 1)
      }
    })

    const PerPageOption = total <= 5
      ? totalItemsDisplayed
      : h(ElTablePaginationOption, {
        props: { title: totalItemsDisplayed },
        on: {
          click: e => { parent.view = 'perpage' }
        }
      })

    const PageOption = totalPages <= 1
      ? 1
      : h(ElTablePaginationOption, {
        props: { title: page },
        on: {
          click: e => { parent.view = 'pages' }
        }
      })

    const ElState = h('li', {
      class: 'uk-text-center uk-text-nowrap'
    }, [
      PerPageOption,
      ' rows from page ',
      PageOption
    ])

    return [ElPrev, ElState, ElNext]
  }
}
