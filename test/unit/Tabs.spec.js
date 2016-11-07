import Vue from 'vue/dist/vue.js'
import VkTabs from '../../src/lib/Tabs'
import VkTabsItem from '../../src/lib/TabsItem'
import VkSwitcherItem from '../../src/lib/SwitcherItem'
import VkSwitcher from '../../src/lib/Switcher'

Vue.component('VkTabs', VkTabs)
Vue.component('VkTabsItem', VkTabsItem)
Vue.component('VkSwitcherItem', VkSwitcherItem)
Vue.component('VkSwitcher', VkSwitcher)

describe('VkTabs', () => {
  let $vm

  beforeEach(() => {
    $vm = new Vue({
      data: {
        flip: false,
        bottom: false,
        center: false,
        width: '',
        index: 0
      },
      template: `<vk-tabs
      :index="index"
      :flip="flip"
      :bottom="bottom"
      :center="center"
      :width="width"
      @change="index = arguments[0]">
        <vk-tabs-item name="Tab 1">Content Tab 1</vk-tabs-item>
        <vk-tabs-item name="Tab 2">Content Tab 2</vk-tabs-item>
        <vk-tabs-item name="Tab 3">Content Tab 3</vk-tabs-item>
        <vk-tabs-item disabled name="Tab 4">Content Tab 4</vk-tabs-item>
    </vk-tabs>`
    }).$mount()
    document.body.appendChild($vm.$el)
  })

  afterEach(() => {
    document.body.removeChild($vm.$el)
  })

  it('should set active tab on index var change', done => {
    expect($vm.$el.querySelectorAll('.uk-tab li')[0].classList.contains('uk-active')).toBeTruthy()
    $vm.index = 2
    waitForUpdate(() => {
      expect($vm.$el.querySelectorAll('.uk-tab li')[0].classList.contains('uk-active')).toBeFalsy()
      expect($vm.$el.querySelectorAll('.uk-tab li')[2].classList.contains('uk-active')).toBeTruthy()
    }).then(done)
  })

  it('should change index on tab click', done => {
    triggerEvent($vm.$el.querySelectorAll('.uk-tab li a')[1], 'click')
    waitForUpdate(() => {
      expect($vm.index).toBe(1)
    }).then(done)
  })

  it('should set active tab on href click', done => {
    expect($vm.$el.querySelectorAll('.uk-tab li')[0].classList.contains('uk-active')).toBeTruthy()
    triggerEvent($vm.$el.querySelectorAll('.uk-tab li a')[1], 'click')
    waitForUpdate(() => {
      expect($vm.$el.querySelectorAll('.uk-tab li')[0].classList.contains('uk-active')).toBeFalsy()
      expect($vm.$el.querySelectorAll('.uk-tab li')[1].classList.contains('uk-active')).toBeTruthy()
    }).then(done)
  })

  it('should add uk-tab-flip if flip enabled', done => {
    expect($vm.$el.querySelector('.uk-tab').classList.contains('uk-tab-flip')).toBeFalsy()
    $vm.flip = true
    waitForUpdate(() => {
      expect($vm.$el.querySelector('.uk-tab').classList.contains('uk-tab-flip')).toBeTruthy()
    }).then(done)
  })

  it('should add .uk-tab-bottom, .uk-flex, .uk-flex-column-reverse on bottom enabled', done => {
    expect($vm.$el.classList.contains('uk-flex')).toBeFalsy()
    expect($vm.$el.classList.contains('uk-flex-column-reverse')).toBeFalsy()
    expect($vm.$el.querySelector('.uk-tab').classList.contains('uk-tab-bottom')).toBeFalsy()
    $vm.bottom = true
    waitForUpdate(() => {
      expect($vm.$el.classList.contains('uk-flex-column-reverse')).toBeTruthy()
      expect($vm.$el.classList.contains('uk-flex')).toBeTruthy()
      expect($vm.$el.querySelector('.uk-tab').classList.contains('uk-tab-bottom')).toBeTruthy()
    }).then(done)
  })

  it('should add .uk-tab-center to the div wrapper', done => {
    expect($vm.$el.querySelector('div div').classList.contains('uk-tab-center')).toBeFalsy()
    $vm.center = true
    waitForUpdate(() => {
      expect($vm.$el.querySelector('div div').classList.contains('uk-tab-center')).toBeTruthy()
    }).then(done)
  })

  it('should add .uk-tab-center-bottom if bottom and centre enabled', done => {
    expect($vm.$el.querySelector('div div').classList.contains('uk-tab-center-bottom')).toBeFalsy()
    $vm.center = true
    $vm.bottom = true
    waitForUpdate(() => {
      expect($vm.$el.querySelector('div div').classList.contains('uk-tab-center-bottom')).toBeTruthy()
    }).then(done)
  })

  it('should add .uk-tab-grid to the ul and .uk-width-* to the li', done => {
    expect($vm.$el.querySelector('.uk-tab').classList.contains('uk-tab-grid')).toBeFalsy()
    Array.from($vm.$el.querySelectorAll('.uk-tab li')).forEach(li => {
      expect(li.classList.contains('uk-width-' + $vm.width)).toBeFalsy()
    })
    $vm.width = '1-5'
    waitForUpdate(() => {
      expect($vm.$el.querySelector('.uk-tab').classList.contains('uk-tab-grid')).toBeTruthy()
      Array.from($vm.$el.querySelectorAll('.uk-tab li')).forEach(li => {
        expect(li.classList.contains('uk-width-' + $vm.width)).toBeTruthy()
      })
    }).then(done)
  })
})
