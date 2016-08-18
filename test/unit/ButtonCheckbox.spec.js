import Vue from 'vue/dist/vue.js'
import VkButton from '../../src/lib/Button'
import VkButtonCheckbox from '../../src/lib/ButtonCheckbox'

Vue.component('VkButton', VkButton)
Vue.component('VkButtonCheckbox', VkButtonCheckbox)

describe('VkButtonCheckbox', () => {
  let $vm

  beforeEach(() => {
    $vm = new Vue({
      data: {
        values: [],
        group: false
      },
      template: `<vk-button-checkbox :group="group" v-model="values" @change="values = arguments[0]">
        <vk-button :value="10">Button 1</vk-button>
        <vk-button :value="20">Button 2</vk-button>
        <vk-button :value="30">Button 3</vk-button>
      </vk-button-checkbox>`
    }).$mount()
    document.body.appendChild($vm.$el)
  })

  afterEach(() => {
    document.body.removeChild($vm.$el)
  })

  it('should be button tag', () => {
    expect($vm.$el.querySelectorAll('button').length).toBe(3)
  })

  it('should respect value bindings', done => {
    $vm.values = [20, 30]
    waitForUpdate(() => {
      expect($vm.$el.children[0].getAttribute('aria-checked')).toBe('false')
      expect($vm.$el.children[1].getAttribute('aria-checked')).toBe('true')
      expect($vm.$el.children[2].getAttribute('aria-checked')).toBe('true')
      $vm.$el.children[1].click()
    }).then(() => {
      expect($vm.values).toEqual([30])
      expect($vm.$el.children[0].getAttribute('aria-checked')).toBe('false')
      expect($vm.$el.children[1].getAttribute('aria-checked')).toBe('false')
      expect($vm.$el.children[2].getAttribute('aria-checked')).toBe('true')
    }).then(done)
  })

  it('bind to Array value', done => {
    // init state
    expect($vm.$el.children[0].getAttribute('aria-checked')).toBe('false')
    expect($vm.$el.children[1].getAttribute('aria-checked')).toBe('false')
    expect($vm.$el.children[2].getAttribute('aria-checked')).toBe('false')
    expect($vm.$el.children[0].classList.contains('uk-active')).toBe(false)
    expect($vm.$el.children[1].classList.contains('uk-active')).toBe(false)
    expect($vm.$el.children[2].classList.contains('uk-active')).toBe(false)
    $vm.$el.children[2].click()
    waitForUpdate(() => {
      $vm.$el.children[0].click()
    }).then(() => {
      $vm.$el.children[1].click()
    }).then(() => {
      expect($vm.$el.children[0].getAttribute('aria-checked')).toBe('true')
      expect($vm.$el.children[1].getAttribute('aria-checked')).toBe('true')
      expect($vm.$el.children[2].getAttribute('aria-checked')).toBe('true')
      expect($vm.$el.children[0].classList.contains('uk-active')).toBe(true)
      expect($vm.$el.children[1].classList.contains('uk-active')).toBe(true)
      expect($vm.$el.children[2].classList.contains('uk-active')).toBe(true)
      expect($vm.values).toEqual([10, 20, 30])
    }).then(done)
  })

  it('grouped should add class uk-button-group', done => {
    // not grouped by default
    expect($vm.$el.classList.contains('uk-button-group')).toBe(false)
    $vm.group = true
    waitForUpdate(() => {
      expect($vm.$el.classList.contains('uk-button-group')).toBe(true)
    }).then(done)
  })
})

