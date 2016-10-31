import Vue from 'vue/dist/vue.js'
import VkCalendar from '../../src/lib/Calendar'
import VkDatepicker from '../../src/lib/Datepicker'
Vue.component('VkDatepicker', VkDatepicker)
Vue.component('VkCalendar', VkCalendar)

describe('VkDatepicker', () => {
  let $vm

  beforeEach(() => {
    $vm = new Vue({
      data: {
        calendar: {
          year: undefined,
          month: undefined
        },
        min: null,
        max: null,
        disabledDates: [],
        dates: [],
        unpick: false,
        pick: false
      },
      template: `<vk-datepicker
        :year="calendar.year"
        :month="calendar.month"
        :dates="dates"
        :disabled-dates="disabledDates"
        :min="min"
        :max="max"
        @pick="dates.push(arguments[0].format('YYYY-MM-DD'))"
        @unpick="dates.splice(dates.indexOf(arguments[0].format('YYYY-MM-DD')), 1)"
        @change="
          calendar.year = arguments[0].year(),
          calendar.month = arguments[0].month()
      ">
    </vk-datepicker>`
    }).$mount()
    document.body.appendChild($vm.$el)
  })

  afterEach(() => {
    document.body.removeChild($vm.$el)
  })

  it('should disable dates disallowing them to be picked', done => {
    $vm.calendar.year = 2016
    $vm.calendar.month = 7
    $vm.disabledDates = [
      '2016-08-11',
      '2016-08-12',
      '2016-08-13'
    ]

    waitForUpdate(() => {
      let week = $vm.$el.querySelectorAll('tr')[3]
      expect(week.querySelectorAll('td a')[3].classList.contains('uk-datepicker-table-disabled')).toBeTruthy()
      expect(week.querySelectorAll('td a')[3].classList.contains('uk-datepicker-table-muted')).toBeTruthy()
      expect(week.querySelectorAll('td a')[4].classList.contains('uk-datepicker-table-disabled')).toBeTruthy()
      expect(week.querySelectorAll('td a')[4].classList.contains('uk-datepicker-table-muted')).toBeTruthy()
      expect(week.querySelectorAll('td a')[5].classList.contains('uk-datepicker-table-disabled')).toBeTruthy()
      expect(week.querySelectorAll('td a')[5].classList.contains('uk-datepicker-table-muted')).toBeTruthy()
    }).then(done)
  })

  it('should change date values on pick / unpick', done => {
    $vm.calendar.year = 2016
    $vm.calendar.month = 7
    let week = $vm.$el.querySelectorAll('tr')[3]

    waitForUpdate(() => {
      expect($vm.dates).toEqual([])
      week.querySelectorAll('td a')[3].click()
      week.querySelectorAll('td a')[4].click()
      week.querySelectorAll('td a')[5].click()
    }).then(() => {
      expect($vm.dates).toEqual(['2016-08-11', '2016-08-12', '2016-08-13'])
    }).then(() => {
      week.querySelectorAll('td a')[3].click()
      week.querySelectorAll('td a')[4].click()
      week.querySelectorAll('td a')[5].click()
    }).then(() => {
      expect($vm.dates).toEqual([])
    }).then(done)
  })
})
