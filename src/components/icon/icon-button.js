import VkIcon from './icon'
import mergeData from '~helpers/fn-data-merge'

export default {
  functional: true,
  props: VkIcon.props,
  render: (h, { props, data, listeners, children }) =>

    h('a', mergeData(data, { class: 'uk-icon uk-icon-button' }), [
      h(`icon-${props.icon}`, { props: { ratio: props.ratio } })
    ])

}
