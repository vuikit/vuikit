import UiSubnavItem from './ui/subnav-item'
import mergeData from 'vuikit/core/util/vue-data-merge'

export default {
  functional: true,
  props: mergeData(UiSubnavItem.props, {
    name: {
      type: String
    }
  }),
  render (h, { data, props, children }) {
    return h(UiSubnavItem, mergeData(data, { props }), children)
  }
}
