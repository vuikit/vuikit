export default {
  name: 'TmTabs',
  data: () => ({
    index: 0
  }),
  render (h) {
    const tmTabs = this.$slots.default.filter(node =>
      node.componentOptions && node.componentOptions.tag === 'tm-tabs-item'
    )
    const tabs = tmTabs.map(tab => {
      return (<vk-tabs-item>{ tab.componentOptions.propsData.name }</vk-tabs-item>)
    })
    const switchers = tmTabs.map(tab => {
      return (<vk-switcher-item>{ tab.componentOptions.children }</vk-switcher-item>)
    })
    return (
      <vk-tabs
        index={ this.index }
        on-change={index => {
          this.index = index
        }}>
        { tabs }
        <vk-switcher slot="switcher"
          index={ this.index }>
          { switchers }
        </vk-switcher>
      </vk-tabs>
    )
  }
}
