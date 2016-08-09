export default {
  name: 'VkBreadcrumb',
  props: {
    location: {
      type: String,
      default: '/'
    }
  },
  render (h) {
    const crumbs = this.$slots.default.filter(node =>
      node.componentOptions && node.componentOptions.tag === 'vk-breadcrumb-item'
    )
    return (
      <ul class="uk-breadcrumb">{ crumbs }</ul>
    )
  }
}
