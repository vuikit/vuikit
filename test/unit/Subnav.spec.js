import Vue from 'vue/dist/vue.js'
import VkSubnav from '../../src/lib/Subnav'
import VkSubnavItem from '../../src/lib/SubnavItem'

Vue.component('VkSubnav', VkSubnav)
Vue.component('VkSubnavItem', VkSubnavItem)

describe('VkSubnav', () => {
  let $vm

  beforeEach(() => {
    $vm = new Vue({
      data: {
        pill: false,
        line: false,
        index: 0
      },
      template: `<vk-subnav
        :index="index"
        :line="line"
        :pill="pill"
        @change="
          index = arguments[0]
        ">
        <vk-subnav-item>Item 1</vk-subnav-item>
        <vk-subnav-item>Item 2</vk-subnav-item>
        <vk-subnav-item>Item 3</vk-subnav-item>
        <vk-subnav-item disabled>Item 4</vk-subnav-item>
      </vk-subnav>`
    }).$mount()
    document.body.appendChild($vm.$el)
  })

  it('should set tab disabled', () => {
    expect($vm.$el.children[3].classList.contains('uk-disabled')).toBeTruthy()
  })

  it('should set active item on click', done => {
    $vm.$el.children[1].querySelector('a').click()
    waitForUpdate(() => {
      expect($vm.$el.children[0].classList.contains('uk-active')).toBeFalsy()
      expect($vm.$el.children[1].classList.contains('uk-active')).toBeTruthy()
    }).then(done)
  })

  it('should set active item on change value', done => {
    $vm.index = 1
    waitForUpdate(() => {
      expect($vm.$el.children[0].classList.contains('uk-active')).toBeFalsy()
      expect($vm.$el.children[1].classList.contains('uk-active')).toBeTruthy()
    }).then(done)
  })

  it('should set pill class', done => {
    expect($vm.$el.classList.contains('uk-subnav-pill')).toBeFalsy()
    $vm.pill = true
    waitForUpdate(() => {
      expect($vm.$el.classList.contains('uk-subnav-pill')).toBeTruthy()
    }).then(done)
  })

  it('should add class for line between the items', done => {
    expect($vm.$el.classList.contains('uk-subnav-line')).toBeFalsy()
    $vm.line = true
    waitForUpdate(() => {
      expect($vm.$el.classList.contains('uk-subnav-line')).toBeTruthy()
    }).then(done)
  })
})
