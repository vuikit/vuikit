import Vue from 'vue/dist/vue.js'
import VkPagination from '../../src/lib/Pagination'
Vue.component('VkPagination', VkPagination)

describe('VkPagination', () => {
  let $vm

  beforeEach(() => {
    $vm = new Vue({
      data: {
        total: 200,
        limit: 10,
        page: 1,
        pageRange: 2,
        align: '',
        compact: false,
        pagination: {
          offset: 1,
          to: 20
        },
      },
      template: `<vk-pagination
        :total="total"
        :limit="limit"
        :page="page"
        :page-range="pageRange"
        :align="align"
        :compact="compact"
        @change="
          page = arguments[0].page
          pagination.offset = arguments[0].offset,
          pagination.to = arguments[0].to
        ">`
    }).$mount()
    document.body.appendChild($vm.$el)
  })

  afterEach(() => {
    document.body.removeChild($vm.$el)
  })

  it('should respect compact value', done => {
    $vm.page = 4
    waitForUpdate(() => {
      expect($vm.$el.children[0].classList.contains('uk-pagination-previous')).toBeTruthy()
      expect($vm.$el.children[$vm.$el.children.length - 1].classList.contains('uk-pagination-next')).toBeTruthy()
      $vm.compact = true
    }).then(() => {
      expect($vm.$el.children[0].classList.contains('uk-pagination-previous')).toBeFalsy()
      expect($vm.$el.children[$vm.$el.children.length - 1].classList.contains('uk-pagination-next')).toBeFalsy()
    }).then(done)
  })

  it('should show correct alignment', done => {
    $vm.align = 'left'
    waitForUpdate(() => {
      expect($vm.$el.classList.contains('uk-pagination-left')).toBeTruthy()
      $vm.align = 'right'
    }).then(() => {
      expect($vm.$el.classList.contains('uk-pagination-left')).toBeFalsy()
      expect($vm.$el.classList.contains('uk-pagination-right')).toBeTruthy()
    }).then(done)
  })

  it('should show the correct amount of visible pages', done => {
    $vm.pageRange = 3
    waitForUpdate(() => {
      expect($vm.$el.querySelectorAll('li').length).toBe(11)
      $vm.pageRange = 5
    }).then(() => {
      expect($vm.$el.querySelectorAll('li').length).toBe(15)
    }).then(done)
  })

  it('should select page', done => {
    $vm.pageRange = 3
    $vm.page = 5
    waitForUpdate(() => {
      expect($vm.$el.children[1].classList.contains('uk-active')).toBeFalsy()
      expect($vm.$el.children[5].classList.contains('uk-active')).toBeTruthy()
    }).then(done)
  })

  it('should select page on click', done => {
    $vm.pageRange = 3
    triggerEvent($vm.$el.querySelector('li:nth-child(5) a'), 'click')
    waitForUpdate(() => {
      expect($vm.$el.children[1].classList.contains('uk-active')).toBeFalsy()
      expect($vm.$el.children[4].classList.contains('uk-active')).toBeTruthy()
    }).then(done)
  })

  it('should display the limit of items each page is displaying.', done => {
    $vm.limit = 20
    waitForUpdate(() => {
      expect($vm.$el.children.length).toBe(9)
      $vm.limit = 50
    }).then(() => {
      expect($vm.$el.children.length).toBe(6)
    }).then(done)
  })

  it('should display the correct amount of items accross all pages', done => {
    $vm.total = 50
    $vm.pageRange = 3
    waitForUpdate(() => {
      expect($vm.$el.children.length).toBe(7)
      $vm.total = 200
    }).then(() => {
      expect($vm.$el.children.length).toBe(11)
    }).then(done)
  })
})

