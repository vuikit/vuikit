import Vue from 'vue/dist/vue.js'
import VkSwitcher from '../../src/lib/Switcher'
import VkSwitcherItem from '../../src/lib/SwitcherItem'

Vue.component('VkSwitcher', VkSwitcher)
Vue.component('VkSwitcherItem', VkSwitcherItem)

describe('VkSwitcher', () => {
  let $vm

  beforeEach(() => {
    $vm = new Vue({
      data: {
        index: 0,
        transition: '',
        transitionMode: 'out-in'
      },
      template: `<vk-switcher
        :index="index"
        :transition="transition"
        :transitionMode="transitionMode">
        <vk-switcher-item>Item 1</vk-switcher-item>
        <vk-switcher-item>Item 2</vk-switcher-item>
        <vk-switcher-item>Item 3</vk-switcher-item>
      </vk-switcher>`
    }).$mount()
    document.body.appendChild($vm.$el)
  })

  it('should change text on index change', done => {
    expect($vm.$el.querySelector('li').innerText.trim(), 'Item 1')
    $vm.index = 2
    waitForUpdate(() => {
      expect($vm.$el.querySelector('li').innerText.trim(), 'Item 3')
    }).then(done)
  })
})
