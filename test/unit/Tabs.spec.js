import Vue from 'vue/dist/vue.js'
import VkTabs from '../../src/lib/Tabs'
import VkTabsItem from '../../src/lib/TabsItem'
import VkTabsVertical from '../../src/lib/TabsVertical'

Vue.component('VkTabs', VkTabs)
Vue.component('VkTabsItem', VkTabsItem)
Vue.component('VkTabsVertical', VkTabsVertical)

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
      <vk-tabs-item>Tab 1</vk-tabs-item>
      <vk-tabs-item>Tab 2</vk-tabs-item>
      <vk-tabs-item>Tab 3</vk-tabs-item>
      <vk-tabs-item disabled>Tab 4</vk-tabs-item>
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
    $vm.$el.querySelectorAll('.uk-tab li').forEach(li => {
      expect(li.classList.contains('uk-width-' + $vm.width)).toBeFalsy()
    })
    $vm.width = '1-5'
    waitForUpdate(() => {
      expect($vm.$el.querySelector('.uk-tab').classList.contains('uk-tab-grid')).toBeTruthy()
      $vm.$el.querySelectorAll('.uk-tab li').forEach(li => {
        expect(li.classList.contains('uk-width-' + $vm.width)).toBeTruthy()
      })
    }).then(done)
  })
})

describe('VkTabs Vertical', () => {
  let $vm

  beforeEach(() => {
    $vm = new Vue({
      data: {
        align: 'left',
        width: '1-3',
        bodyWidth: '2-3',
        index: 0
      },
      template: `<vk-tabs-vertical
        :align="align"
        :width="width"
        :body-width="bodyWidth"
        @change="index = arguments[0]">
        <tm-tabs-item>Tab 1</tm-tabs-item>
        <tm-tabs-item>Tab 2</tm-tabs-item>
        <tm-tabs-item>Tab 3</tm-tabs-item>
        <tm-tabs-item disabled>Tab 4</tm-tabs-item>
      </vk-tabs-vertical>`
    }).$mount()
    document.body.appendChild($vm.$el)
  })

  it('should set tabs align', done => {
    expect($vm.$el.querySelector('ul').classList.contains('uk-tab-left')).toBeTruthy()
    $vm.align = 'right'
    waitForUpdate(() => {
      expect($vm.$el.querySelector('ul').classList.contains('uk-tab-left')).toBeFalsy()
      expect($vm.$el.querySelector('ul').classList.contains('uk-tab-right')).toBeTruthy()
    }).then(done)
  })

  it('should set tabs and body width', done => {
    expect($vm.$el.querySelectorAll('div')[0].classList.contains('uk-width-medium-1-3')).toBeTruthy()
    expect($vm.$el.querySelectorAll('div')[1].classList.contains('uk-width-medium-2-3')).toBeTruthy()
    $vm.width = '1-2'
    $vm.bodyWidth = '1-2'
    waitForUpdate(() => {
      expect($vm.$el.querySelectorAll('div')[0].classList.contains('uk-width-medium-1-2')).toBeTruthy()
      expect($vm.$el.querySelectorAll('div')[1].classList.contains('uk-width-medium-1-2')).toBeTruthy()
    }).then(done)
  })
})
