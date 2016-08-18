import Vue from 'vue/dist/vue.js'
import VkBreadcrumbItem from '../../src/lib/BreadcrumbItem'
import VkBreadcrumb from '../../src/lib/Breadcrumb'
Vue.component('VkBreadcrumb', VkBreadcrumb)
Vue.component('VkBreadcrumbItem', VkBreadcrumbItem)

describe('VkBreadcrumb', () => {
  let $vm

  beforeEach(() => {
    $vm = new Vue({
      data: {
        location: null
      },
      template: `<vk-breadcrumb :location="location" @change="location = arguments[0]">
        <vk-breadcrumb-item path="/">Home</vk-breadcrumb-item>
        <vk-breadcrumb-item path="/blog">Blog</vk-breadcrumb-item>
        <vk-breadcrumb-item path="/blog/category">Category</vk-breadcrumb-item>
        <vk-breadcrumb-item path="/blog/category/post" disabled>Post</vk-breadcrumb-item>
      </vk-breadcrumb>`
    }).$mount()
    document.body.appendChild($vm.$el)
  })

  afterEach(() => {
    document.body.removeChild($vm.$el)
  })

  it('should render all paths', () => {
    expect($vm.$el.querySelectorAll('li').length).toEqual(4)
  })

  it('should make not clickable disabled path', () => {
    expect($vm.$el.children[3].children[0].tagName).toEqual('SPAN')
  })

  it('should make not clickable active path', done => {
    $vm.location = '/blog/category'
    waitForUpdate(() => {
      expect($vm.$el.children[2].children[0].tagName).toEqual('SPAN')
      $vm.location = '/blog'
    }).then(() => {
      expect($vm.$el.children[2].children[0].tagName).toEqual('A')
      expect($vm.$el.children[1].children[0].tagName).toEqual('SPAN')
    }).then(done)
  })

  it('should respect location value binding', done => {
    $vm.location = '/blog/category'
    waitForUpdate(() => {
      expect($vm.$el.children[2].classList.contains('uk-active')).toBeTruthy()
      $vm.location = '/blog'
    }).then(() => {
      expect($vm.$el.children[2].classList.contains('uk-active')).toBeFalsy()
      expect($vm.$el.children[1].classList.contains('uk-active')).toBeTruthy()
    }).then(done)
  })

  it('should change location on click', done => {
    triggerEvent($vm.$el.children[2].children[0], 'click')
    waitForUpdate(() => {
      expect($vm.$el.children[2].classList.contains('uk-active')).toBeTruthy()
      $vm.$el.children[1].children[0].click()
    }).then(() => {
      expect($vm.$el.children[2].classList.contains('uk-active')).toBeFalsy()
      expect($vm.$el.children[1].classList.contains('uk-active')).toBeTruthy()
    }).then(done)
  })
})
