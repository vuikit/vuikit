import Vue from 'vue'
import Vuikit from 'vuikit'
import {
  createTest,
  createVue,
  destroyVM,
  renderSnapshot
} from 'jest/util'
import { arrify } from 'vuikit-utils'
import matrix from 'helpers/date-matrix'
import isValidDate from 'date-fns/is_valid'
import parse from 'date-fns/parse'
import format from 'date-fns/format'
import localeEs from 'date-fns/locale/es'
import MockDate from 'mockdate'

Vue.use(Vuikit)

// skipped until UIkit 3 support it
describe.skip('Datepicker', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  function createDatepicker (props) {
    return createTest(Vuikit.Datepicker, props, true)
  }

  function plainNodeContent (nodes) {
    return arrify(nodes).map(node => node.textContent.trim()).toString()
  }

  function getPlainMatrix (date) {
    return matrix(date, true).toString().replace(/-/g, '')
  }

  it('renders correctly', () => {
    vm = createVue(`
      <vk-datepicker date="2014-12" />
    `)
    expect(renderSnapshot(vm)).toMatchSnapshot()
  })

  describe('props', () => {
    it('date', () => {
      // default
      vm = createDatepicker()
      expect(format(vm.date, 'YYYY-MM-DD'))
        .toEqual(format(new Date(), 'YYYY-MM-DD'))
      destroyVM(vm)
      // Date
      vm = createDatepicker({
        date: new Date(2014, 11, 1)
      })
      expect(format(vm.date, 'YYYY-MM-DD'))
        .toEqual(format(new Date(2014, 11, 1), 'YYYY-MM-DD'))
      // String
      vm = createDatepicker({
        date: '2014-12-01'
      })
      expect(format(vm.date, 'YYYY-MM-DD'))
        .toEqual(format(new Date(2014, 11, 1), 'YYYY-MM-DD'))
    })

    it('renders the first week day correctly', () => {
      vm = createDatepicker({
        date: '2014-12',
        weekStartsOn: 1
      })
      expect(plainNodeContent(vm.$el.querySelectorAll('td')))
        .toEqual(getPlainMatrix({ year: 2014, month: 11, weekStartsOn: 1 }))
    })

    it('applies the minDate prop correctly', () => {
      vm = createDatepicker({
        date: '2014-12',
        minDate: '2014-12-05'
      })
      const disabledDates = vm.$el.querySelectorAll('td .uk-datepicker-table-disabled')
      expect(plainNodeContent(disabledDates))
        .toEqual('30,1,2,3,4')
    })

    it('applies the minDate prop with relative value correctly', () => {
      MockDate.set(new Date(2014, 11, 15).valueOf())
      vm = createDatepicker({
        minDate: 1
      })
      expect(format(vm.minPickableDate, 'YYYY-MM-DD')).toEqual('2014-12-13')
      const disabledDates = vm.$el.querySelectorAll('td .uk-datepicker-table-disabled')
      expect(plainNodeContent(disabledDates))
        .toEqual('30,1,2,3,4,5,6,7,8,9,10,11,12')
      MockDate.reset()
    })

    it('applies the maxDate prop correctly', () => {
      vm = createDatepicker({
        date: '2014-12',
        maxDate: '2014-12-25'
      })
      const disabledDates = vm.$el.querySelectorAll('td .uk-datepicker-table-disabled')
      expect(plainNodeContent(disabledDates))
        .toEqual('26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10')
    })

    it('applies the maxDate prop with relative value correctly', () => {
      MockDate.set(new Date(2014, 11, 15).valueOf())
      vm = createDatepicker({
        maxDate: 1
      })
      expect(format(vm.maxPickableDate, 'YYYY-MM-DD')).toEqual('2014-12-16')
      const disabledDates = vm.$el.querySelectorAll('td .uk-datepicker-table-disabled')
      expect(plainNodeContent(disabledDates))
        .toEqual('17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10')
      MockDate.reset()
    })

    it('applies the locales correctly', () => {
      vm = createDatepicker({
        locale: localeEs
      })
      const days = ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sáb']
      expect(plainNodeContent(vm.$el.querySelectorAll('thead th')))
        .toEqual(days.toString())
    })
  })

  it('triggers event pick when a day is clicked', () => {
    vm = createDatepicker()
    const cb = jest.fn()

    vm.$on('pick', cb)
    vm.$el.querySelector('td a').click()
    return vm.$nextTick().then(() => {
      const args = cb.mock.calls[0][0]
      const { date, dates, format } = args
      expect(cb).toHaveBeenCalled()
      expect(isValidDate(parse(date))).toBeTruthy()
      expect(dates).toBeDefined()
      expect(format).toBeDefined()
      destroyVM(vm)
    })
  })

  it('triggers event unpick when a day already picked is clicked', () => {
    vm = createDatepicker()
    const cb = jest.fn()

    vm.$on('pick', cb)
    vm.$el.querySelector('td a').click()
    return vm.$nextTick().then(() => {
      const args = cb.mock.calls[0][0]
      const { date, dates, format } = args
      expect(cb).toHaveBeenCalled()
      expect(isValidDate(parse(date))).toBeTruthy()
      expect(dates).toBeDefined()
      expect(format).toBeDefined()
      destroyVM(vm)
    })
  })

  it('triggers event change when next button is clicked', () => {
    vm = createDatepicker()
    const cb = jest.fn()

    vm.$on('change', cb)
    vm.$el.querySelector('.uk-datepicker-next').click()
    return vm.$nextTick().then(() => {
      const args = cb.mock.calls[0][0]
      const { date, format } = args
      expect(cb).toHaveBeenCalled()
      expect(isValidDate(parse(date))).toBeTruthy()
      expect(format).toBeDefined()
      destroyVM(vm)
    })
  })
})
