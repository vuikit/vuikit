/* global describe, it, expect */

import Vue from 'vue/dist/vue.js'
import VkButton from '../../src/lib/Button.vue'

describe('Button.vue state classes', () => {
  it('should be active', () => {
    const vm = new Vue({
      template: '<div><vk-button active>My text button</vk-button></div>',
      components: {
        VkButton: VkButton
      }
    }).$mount()
    expect(vm.$el.querySelector('button').classList.contains('uk-active')).toBeTruthy()
  })
  it('should be disabled', () => {
    const vm = new Vue({
      template: '<div><vk-button disabled>My text button</vk-button></div>',
      components: {
        VkButton: VkButton
      }
    }).$mount()
    expect(vm.$el.querySelector('button').hasAttribute('disabled')).toBeTruthy()
  })
})

describe('Button.vue size', () => {
  it('should contain uk-button-mini class', () => {
    const vm = new Vue({
      template: '<div><vk-button size="mini">My text button</vk-button></div>',
      components: {
        VkButton: VkButton
      }
    }).$mount()
    expect(vm.$el.querySelector('button').classList.contains('uk-button-mini')).toBeTruthy()
  })
  it('should contain uk-button-small class', () => {
    const vm = new Vue({
      template: '<div><vk-button size="small">My text button</vk-button></div>',
      components: {
        VkButton: VkButton
      }
    }).$mount()
    expect(vm.$el.querySelector('button').classList.contains('uk-button-small')).toBeTruthy()
  })
  it('should contain uk-button-large class', () => {
    const vm = new Vue({
      template: '<div><vk-button size="large">My text button</vk-button></div>',
      components: {
        VkButton: VkButton
      }
    }).$mount()
    expect(vm.$el.querySelector('button').classList.contains('uk-button-large')).toBeTruthy()
  })
})

describe('Button.vue color', () => {
  it('should contain uk-button-primary class', () => {
    const vm = new Vue({
      template: '<div><vk-button color="primary">My text button</vk-button></div>',
      components: {
        VkButton: VkButton
      }
    }).$mount()
    expect(vm.$el.querySelector('button').classList.contains('uk-button-primary')).toBeTruthy()
  })
  it('should contain uk-button-success class', () => {
    const vm = new Vue({
      template: '<div><vk-button color="success">My text button</vk-button></div>',
      components: {
        VkButton: VkButton
      }
    }).$mount()
    expect(vm.$el.querySelector('button').classList.contains('uk-button-success')).toBeTruthy()
  })
  it('should contain uk-button-danger class', () => {
    const vm = new Vue({
      template: '<div><vk-button color="danger">My text button</vk-button></div>',
      components: {
        VkButton: VkButton
      }
    }).$mount()
    expect(vm.$el.querySelector('button').classList.contains('uk-button-danger')).toBeTruthy()
  })
  it('should contain uk-button-link class', () => {
    const vm = new Vue({
      template: '<div><vk-button color="link">My text button</vk-button></div>',
      components: {
        VkButton: VkButton
      }
    }).$mount()
    expect(vm.$el.querySelector('button').classList.contains('uk-button-link')).toBeTruthy()
  })
})

describe('Button.vue width', () => {
  it('should contain uk-width-1-5 class', () => {
    const vm = new Vue({
      template: '<div><vk-button width="1-5">My text button</vk-button></div>',
      components: {
        VkButton: VkButton
      }
    }).$mount()
    expect(vm.$el.querySelector('button').classList.contains('uk-width-1-5')).toBeTruthy()
  })
})

describe('Button.vue icons', () => {
  it('should contain left flag icon', () => {
    const vm = new Vue({
      template: '<div><vk-button icon-left="flag">My text button</vk-button></div>',
      components: {
        VkButton: VkButton
      }
    }).$mount()
    expect(vm.$el.querySelector('button i').classList.contains('uk-icon-flag')).toBeTruthy()
  })
  it('should contain left flag icon', () => {
    const vm = new Vue({
      template: '<div><vk-button icon="microphone">My text button</vk-button></div>',
      components: {
        VkButton: VkButton
      }
    }).$mount()
    expect(vm.$el.querySelector('button i').classList.contains('uk-icon-microphone')).toBeTruthy()
  })
})

