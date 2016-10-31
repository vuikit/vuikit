import Vue from 'vue/dist/vue.js'
import VkTabsItem from '../../src/lib/TabsItem'
import VkTabsVertical from '../../src/lib/TabsVertical'
import VkSwitcherItem from '../../src/lib/SwitcherItem'
import VkSwitcher from '../../src/lib/Switcher'

Vue.component('VkTabsItem', VkTabsItem)
Vue.component('VkTabsVertical', VkTabsVertical)
Vue.component('VkSwitcherItem', VkSwitcherItem)
Vue.component('VkSwitcher', VkSwitcher)

describe('VkTabs Vertical', () => {
  let $vm

  beforeEach(() => {
    $vm = new Vue({
      data: {
        width: '1-3',
        flip: false,
        contentWidth: '2-3',
        index: 0
      },
      template: `<vk-tabs-vertical
        :flip="flip"
        :width="width"
        :index="index"
        :contentWidth="contentWidth"
        @change="index = arguments[0]">
        <vk-tabs-item name="Tab 1">Content Tab 1</vk-tabs-item>
        <vk-tabs-item name="Tab 2">Content Tab 2</vk-tabs-item>
        <vk-tabs-item name="Tab 3">Content Tab 3</vk-tabs-item>
        <vk-tabs-item disabled name="Tab 4">Content Tab 4</vk-tabs-item>
      </vk-tabs-vertical>`
    }).$mount()
    document.body.appendChild($vm.$el)
  })

  it('should set tabs flip', done => {
    expect($vm.$el.querySelector('ul').classList.contains('uk-tab-left')).toBeTruthy()
    $vm.flip = true
    waitForUpdate(() => {
      expect($vm.$el.querySelector('ul').classList.contains('uk-tab-left')).toBeFalsy()
      expect($vm.$el.querySelector('ul').classList.contains('uk-tab-right')).toBeTruthy()
    }).then(done)
  })

  it('should set tabs and body width', done => {
    expect($vm.$el.querySelectorAll('div')[0].classList.contains('uk-width-medium-1-3')).toBeTruthy()
    expect($vm.$el.querySelectorAll('div')[1].classList.contains('uk-width-medium-2-3')).toBeTruthy()
    $vm.width = '1-2'
    $vm.contentWidth = '1-2'
    waitForUpdate(() => {
      expect($vm.$el.querySelectorAll('div')[0].classList.contains('uk-width-medium-1-2')).toBeTruthy()
      expect($vm.$el.querySelectorAll('div')[1].classList.contains('uk-width-medium-1-2')).toBeTruthy()
    }).then(done)
  })

  it('should highlight active tab', done => {
    expect($vm.$el.querySelector('.uk-tab li:nth-child(1)').classList.contains('uk-active')).toBeTruthy()
    $vm.index = 1
    waitForUpdate(() => {
      expect($vm.$el.querySelector('.uk-tab li:nth-child(2)').classList.contains('uk-active')).toBeTruthy()
    }).then(done)
  })

  it('should disable tab', done => {
    waitForUpdate(() => {
      expect($vm.$el.querySelector('.uk-tab li:nth-child(4)').classList.contains('uk-disabled')).toBeTruthy()
    }).then(done)
  })
})
