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
          pagVM.$emit('change', 1)
        }}
      }, [
        h('span', {
          staticClass: 'uk-pagination-prev uk-icon',
          class: { 'uk-margin-small-right': label },
          attrs: { 'uk-pagination-previous': true }
        }),
        label && label
      ])
    ])
  }
}
