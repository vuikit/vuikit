import UiBreadcrumbItem from './ui/breadcrumb-item'
import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: UiBreadcrumbItem.props,
  render (h, { data, props, children, parent }) {
    return h(UiBreadcrumbItem, mergeData(data, { props }), children)
  }
}
