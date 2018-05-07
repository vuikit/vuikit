import { ElPaginationPage } from 'vuikit/src/pagination'

export default {
  functional: true,
  render (h, { data, props, parent, listeners }) {
    const { perPage } = parent
    const options = [5, 10, 20, 50, 100]

    return options.map(n =>
      h(ElPaginationPage, {
        props: {
          title: n,
          active: n === perPage
        },
        on: {
          click: e => {
            parent.$emit('update:perPage', n)
            parent.resetView()
          }
        }
      })
    )
  }
}
