import { warn } from 'helpers/util'

export default {
  functional: true,
  render (h, { parent: vm }) {
    const activeTabSlot = vm.tabs.find(tab => vm.getTabAlias(tab) === vm.activeTab)
    const content = activeTabSlot && activeTabSlot.componentOptions.children
    if (activeTabSlot && content) {
      return h('div', [ content ])
    } else if (warn) {
      warn(`VkTabs: No tab found with with identifier '${vm.activeTab}'`)
    }
  }
}
