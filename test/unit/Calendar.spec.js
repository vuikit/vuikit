import Vue from 'vue/dist/vue.js'
import VkCalendar from '../../src/lib/Calendar'
Vue.component('VkCalendar', VkCalendar)

describe('VkCalendar', () => {
  let $vm

  beforeEach(() => {
    $vm = new Vue({
      data: {
        year: null,
        month: null,
        min: null,
        max: null
      },
      template: `<vk-calendar ref="calendar"
        :year="year"
        :month="month"
        :min="min"
        :max="max"
        @change="
          year = arguments[0].year(),
          month = arguments[0].month()
        ">`
    }).$mount()
    document.body.appendChild($vm.$el)
  })

  afterEach(() => {
    document.body.removeChild($vm.$el)
  })

  it('should respect year binding', done => {
    let date = new Date()
    let nextYear = date.getFullYear() + 1
    $vm.year = nextYear
    waitForUpdate(() => {
      expect(+$vm.$el.querySelectorAll('.uk-datepicker-heading .uk-form-select a')[1].innerHTML.trim()).toBe(nextYear)
    }).then(done)
  })

  it('should respect month binding', done => {
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let date = new Date()
    let nextMonth = date.getMonth() + 2
    $vm.month = nextMonth
    waitForUpdate(() => {
      expect($vm.$el.querySelectorAll('.uk-datepicker-heading .uk-form-select a')[0].innerHTML.trim()).toBe(monthNames[nextMonth])
    }).then(done)
  })

  it('should respect min binding', done => {
    expect($vm.$el.querySelector('.uk-datepicker-previous')).not.toBeNull()
    $vm.year = 2016
    $vm.month = 6
    $vm.min = 5
    waitForUpdate(() => {
      expect($vm.$el.querySelector('.uk-datepicker-previous')).toBeNull()
    }).then(done)
  })

  it('should respect max binding', done => {
    expect($vm.$el.querySelector('.uk-datepicker-next')).not.toBeNull()
    $vm.year = 2016
    $vm.month = 7
    $vm.max = 5
    waitForUpdate(() => {
      expect($vm.$el.querySelector('.uk-datepicker-next')).toBeNull()
    }).then(done)
  })

  it('should change year value on click next', done => {
    $vm.year = 2016
    $vm.month = 7
    $vm.$el.querySelector('.uk-datepicker-next').click()
    waitForUpdate(() => {
      expect($vm.month).toBe(8)
    }).then(done)
  })
})
