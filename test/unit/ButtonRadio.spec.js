import Vue from 'vue/dist/vue.js'
import VkButton from '../../src/lib/Button'
import VkButtonRadio from '../../src/lib/ButtonRadio'

Vue.component('VkButton', VkButton)
Vue.component('VkButtonRadio', VkButtonRadio)

describe('VkButtonRadio', () => {
  let $vm

  beforeEach(() => {
    $vm = new Vue({
      data: {
        value: [],
        group: false
      },
      template: `<vk-button-radio :group="group" v-model="value" @change="value = arguments[0]">
        <vk-button :value="10">Button 1</vk-button>
        <vk-button :value="20">Button 2</vk-button>
        <vk-button :value="30">Button 3</vk-button>
      </vk-button-radio>`
    }).$mount()
    document.body.appendChild($vm.$el)
  })

  afterEach(() => {
    document.body.removeChild($vm.$el)
  })

  it('should be button tag', () => {
    expect($vm.$el.querySelectorAll('button').length).toBe(3)
  })

  it('should respect value bindings: becomes active and checked', done => {
    $vm.value = 20
    waitForUpdate(() => {
      expect($vm.$el.children[0].getAttribute('aria-checked')).toBe('false')
      expect($vm.$el.children[1].getAttribute('aria-checked')).toBe('true')
      expect($vm.$el.children[2].getAttribute('aria-checked')).toBe('false')
      expect($vm.$el.children[0].classList.contains('uk-active')).toBe(false)
      expect($vm.$el.children[1].classList.contains('uk-active')).toBe(true)
      expect($vm.$el.children[2].classList.contains('uk-active')).toBe(false)
      $vm.$el.children[2].click()
    }).then(() => {
      expect($vm.value).toEqual(30)
      expect($vm.$el.children[0].getAttribute('aria-checked')).toBe('false')
      expect($vm.$el.children[1].getAttribute('aria-checked')).toBe('false')
      expect($vm.$el.children[2].getAttribute('aria-checked')).toBe('true')
      expect($vm.$el.children[0].classList.contains('uk-active')).toBe(false)
      expect($vm.$el.children[1].classList.contains('uk-active')).toBe(false)
      expect($vm.$el.children[2].classList.contains('uk-active')).toBe(true)
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
