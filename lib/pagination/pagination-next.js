import { getClosest } from 'helpers/dom'

export default {
  functional: true,
  props: ['label'],
  render (h, { props }) {
    const { label } = props
    return h('li', [
      h('a', {
        on: { click: e => {
          const pagVM = getClosest(e.target, 'ul.uk-pagination').__vue__
          pagVM.$emit('change', pagVM.nextPage)
        }}
      }, [
        label && label,
        h('span', {
          staticClass: 'uk-pagination-next uk-icon',
          class: { 'uk-margin-small-left': label },
          attrs: { 'uk-pagination-next': true }
        })
      ])
    ])
  }
}
