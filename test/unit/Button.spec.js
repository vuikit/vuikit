import Vue from 'vue/dist/vue.js'
import VkButton from '../../src/lib/Button'
Vue.component('VkButton', VkButton)

describe('VkButton', () => {
  describe('VkButton type', () => {
    it('should be correct button type', done => {
      const $vm = new Vue({
        data: {
          type: 'button'
        },
        template: '<vk-button :type="type">Button</vk-button>'
      }).$mount()
      expect($vm.$el.getAttribute('type')).toBe('button')
      $vm.type = 'reset'
      waitForUpdate(() => {
        expect($vm.$el.getAttribute('type')).toBe('reset')
        $vm.type = 'submit'
      }).then(() => {
        expect($vm.$el.getAttribute('type')).toBe('submit')
      }).then(done)
    })
  })

  describe('VkButton state', () => {
    it('should be active', () => {
      const $vm = new Vue({
        template: '<vk-button active>Button</vk-button>'
      }).$mount()
      expect($vm.$el.classList.contains('uk-active')).toBeTruthy()
    })
    it('should be disabled', () => {
      const $vm = new Vue({
        template: '<vk-button disabled>Button</vk-button>'
      }).$mount()
      expect($vm.$el.hasAttribute('disabled')).toBeTruthy()
    })
  })

  describe('VkButton size', () => {
    it('should contain uk-button-mini class', () => {
      const $vm = new Vue({
        template: '<vk-button size="mini">Button</vk-button>'
      }).$mount()
      expect($vm.$el.classList.contains('uk-button-mini')).toBeTruthy()
    })
    it('should contain uk-button-small class', () => {
      const $vm = new Vue({
        template: '<vk-button size="small">Button</vk-button>'
      }).$mount()
      expect($vm.$el.classList.contains('uk-button-small')).toBeTruthy()
    })
    it('should contain uk-button-large class', () => {
      const $vm = new Vue({
        template: '<vk-button size="large">Button</vk-button>'
      }).$mount()
      expect($vm.$el.classList.contains('uk-button-large')).toBeTruthy()
    })
  })

  describe('VkButton color', () => {
    it('should contain uk-button-primary class', () => {
      const $vm = new Vue({
        template: '<vk-button color="primary">Button</vk-button>'
      }).$mount()
      expect($vm.$el.classList.contains('uk-button-primary')).toBeTruthy()
    })
    it('should contain uk-button-success class', () => {
      const $vm = new Vue({
        template: '<vk-button color="success">Button</vk-button>'
      }).$mount()
      expect($vm.$el.classList.contains('uk-button-success')).toBeTruthy()
    })
    it('should contain uk-button-danger class', () => {
      const $vm = new Vue({
        template: '<vk-button color="danger">Button</vk-button>'
      }).$mount()
      expect($vm.$el.classList.contains('uk-button-danger')).toBeTruthy()
    })
    it('should contain uk-button-link class', () => {
      const $vm = new Vue({
        template: '<vk-button color="link">Button</vk-button>'
      }).$mount()
      expect($vm.$el.classList.contains('uk-button-link')).toBeTruthy()
    })
  })

  describe('VkButton width', () => {
    it('should contain uk-width-1-5 class', () => {
      const $vm = new Vue({
        template: '<vk-button width="1-5">Button</vk-button>'
      }).$mount()
      expect($vm.$el.classList.contains('uk-width-1-5')).toBeTruthy()
    })
  })

  describe('VkButton aria', () => {
    it('should toggle aria pressed value', done => {
      const $vm = new Vue({
        data: {
          active: false
        },
        template: '<vk-button ref="button" :active="active" @click.native="active = !$refs.button.active">Button</vk-button>'
      }).$mount()
      document.body.appendChild($vm.$el)
      $vm.$el.click()
      waitForUpdate(() => {
        expect($vm.$el.getAttribute('aria-pressed')).toBe('true')
        $vm.$el.click()
      }).then(() => {
        expect($vm.$el.getAttribute('aria-pressed')).toBe('false')
      }).then(done)
    })

    it('should toggle aria checked value', done => {
      const $vm = new Vue({
        data: {
          active: false
        },
        template: '<vk-button ref="button"  aria-type="checked" :active="active" @click.native="active = !$refs.button.active">Button</vk-button>'
      }).$mount()
      document.body.appendChild($vm.$el)
      $vm.$el.click()
      waitForUpdate(() => {
        expect($vm.$el.getAttribute('aria-checked')).toBe('true')
        $vm.$el.click()
      }).then(() => {
        expect($vm.$el.getAttribute('aria-checked')).toBe('false')
      }).then(done)
    })
  })
})
