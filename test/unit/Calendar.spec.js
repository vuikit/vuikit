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
    let year = 2017
    $vm.year = year
    waitForUpdate(() => {
      expect(+$vm.$el.querySelectorAll('.uk-datepicker-heading .uk-form-select a')[1].innerHTML.trim()).toBe(year)
    }).then(done)
  })

  it('should respect month binding', done => {
    let month = 4
    let monthName = 'May'
    $vm.month = month
    waitForUpdate(() => {
      expect($vm.$el.querySelectorAll('.uk-datepicker-heading .uk-form-select a')[0].innerHTML.trim()).toBe(monthName)
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
    $vm.month = 9
    $vm.max = '2016-11-06'
    waitForUpdate(() => {
      expect($vm.$el.querySelector('.uk-datepicker-next')).toBeNull()
    }).then(done)
  })

  it('should change year value on click next', done => {
    $vm.year = 2016
    $vm.month = 7
    waitForUpdate(() => {
      triggerEvent($vm.$el.querySelector('.uk-datepicker-next'), 'click')
    }).then(() => {
      expect($vm.month).toBe(8)
    }).then(done)
  })
})
