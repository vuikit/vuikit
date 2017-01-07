import Datepicker from 'src/lib/Datepicker'
import { createTest, destroyVM } from '../util'
import { toArray } from 'helpers/util'
import matrix from 'helpers/date-matrix'
import isValidDate from 'date-fns/is_valid'
import parse from 'date-fns/parse'
import format from 'date-fns/format'
import localeEs from 'date-fns/locale/es'

const DELAY = 10

describe('Datepicker', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  function createDatepicker (props) {
    return createTest(Datepicker, props, true)
  }

  function plainNodeContent (nodes) {
    return toArray(nodes).map(node => node.textContent.trim()).toString()
  }

  function getPlainMatrix (date) {
    return matrix(date, true).toString().replace(/-/g, '')
  }

  describe('render', () => {
    it('nav', () => {
      vm = createDatepicker({
        date: '2014-12'
      })
      const prev = vm.$el.querySelector('.uk-datepicker-previous')
      const next = vm.$el.querySelector('.uk-datepicker-previous')
      const month = vm.$el.querySelectorAll('.uk-datepicker-heading a')[0]
      const year = vm.$el.querySelectorAll('.uk-datepicker-heading a')[1]

      expect(prev).to.exist
      expect(next).to.exist
      expect(month.innerText.trim()).to.equal('December')
      expect(year.innerText.trim()).to.equal('2014')
    })

    it('table headers', () => {
      vm = createDatepicker()
      const cells = toArray(vm.$el.querySelectorAll('thead th'))
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      expect(cells).to.length(7)
      expect(plainNodeContent(cells)).to.equal(days.toString())
    })

    it('table rows', () => {
      vm = createDatepicker({
        date: '2014-12'
      })
      expect(plainNodeContent(vm.$el.querySelectorAll('td')))
        .to.equal(getPlainMatrix({ year: 2014, month: 11 }))
    })

    it('muted rows', () => {
      vm = createDatepicker({
        date: '2014-12'
      })
      const cells = toArray(vm.$el.querySelectorAll('td .uk-datepicker-table-muted'))
      const muted = [30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      expect(plainNodeContent(cells)).to.equal(muted.toString())
    })

    it('disabled dates', () => {
      vm = createDatepicker({
        date: '2014-12',
        disabledDates: ['2014-12-05']
      })
      const cell = vm.$el.querySelector('td .uk-datepicker-table-disabled')
      expect(cell.textContent.trim()).to.eql('5')
    })

    it('picked dates', () => {
      vm = createDatepicker({
        date: '2014-12',
        pickedDates: ['2014-12-06']
      })
      const cell = vm.$el.querySelector('.uk-active')
      expect(cell.textContent.trim()).to.eql('6')
    })
  })

  describe('props', () => {
    it('date', () => {
      // default
      vm = createDatepicker()
      expect(format(vm.date, 'YYYY-MM-DD'))
        .to.equal(format(new Date(), 'YYYY-MM-DD'))
      destroyVM(vm)
      // Date
      vm = createDatepicker({
        date: new Date(2014, 11, 1)
      })
      expect(format(vm.date, 'YYYY-MM-DD'))
        .to.equal(format(new Date(2014, 11, 1), 'YYYY-MM-DD'))
      // String
      vm = createDatepicker({
        date: '2014-12-01'
      })
      expect(format(vm.date, 'YYYY-MM-DD'))
        .to.equal(format(new Date(2014, 11, 1), 'YYYY-MM-DD'))
    })

    it('weekStartsOn', () => {
      vm = createDatepicker({
        date: '2014-12',
        weekStartsOn: 1
      })
      expect(plainNodeContent(vm.$el.querySelectorAll('td')))
        .to.equal(getPlainMatrix({ year: 2014, month: 11, weekStartsOn: 1 }))
    })

    it('minDate', () => {
      vm = createDatepicker({
        date: '2014-12',
        minDate: '2014-12-05'
      })
      const disabledDates = vm.$el.querySelectorAll('td .uk-datepicker-table-disabled')
      expect(plainNodeContent(disabledDates))
        .to.equal('30,1,2,3,4')
    })

    it('minDate relative', () => {
      const clock = sinon.useFakeTimers(new Date(2014, 11, 15).valueOf())
      vm = createDatepicker({
        minDate: 1
      })
      expect(format(vm.minPickableDate, 'YYYY-MM-DD')).to.equal('2014-12-13')
      const disabledDates = vm.$el.querySelectorAll('td .uk-datepicker-table-disabled')
      expect(plainNodeContent(disabledDates))
        .to.equal('30,1,2,3,4,5,6,7,8,9,10,11,12')
      clock.restore()
    })

    it('maxDate', () => {
      vm = createDatepicker({
        date: '2014-12',
        maxDate: '2014-12-25'
      })
      const disabledDates = vm.$el.querySelectorAll('td .uk-datepicker-table-disabled')
      expect(plainNodeContent(disabledDates))
        .to.equal('26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10')
    })

    it('maxDate relative', () => {
      const clock = sinon.useFakeTimers(new Date(2014, 11, 15).valueOf())
      vm = createDatepicker({
        maxDate: 1
      })
      expect(format(vm.maxPickableDate, 'YYYY-MM-DD')).to.equal('2014-12-16')
      const disabledDates = vm.$el.querySelectorAll('td .uk-datepicker-table-disabled')
      expect(plainNodeContent(disabledDates))
        .to.equal('17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10')
      clock.restore()
    })

    it('locale', () => {
      vm = createDatepicker({
        locale: localeEs
      })
      const days = ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sáb']
      expect(plainNodeContent(vm.$el.querySelectorAll('thead th')))
        .to.equal(days.toString())
    })
  })

  describe('events', () => {
    it('pick', done => {
      vm = createDatepicker()
      const cb = sinon.spy()

      vm.$on('pick', cb)
      setTimeout(_ => {
        vm.$el.querySelector('td a').click()
        setTimeout(_ => {
          const args = cb.args[0]
          const { date, dates, format } = args[0]
          expect(cb).to.have.been.called
          expect(args).to.length(1)
          expect(args[0]).to.be.object
          expect(isValidDate(parse(date))).to.be.true
          expect(dates).to.be.array
          expect(format).to.be.function
          destroyVM(vm)
          done()
        }, DELAY)
      }, DELAY)
    })

    it('unpick', done => {
      vm = createDatepicker()
      const cb = sinon.spy()

      vm.$on('pick', cb)
      setTimeout(_ => {
        vm.$el.querySelector('td a').click()
        setTimeout(_ => {
          const args = cb.args[0]
          const { date, dates, format } = args[0]
          expect(cb).to.have.been.called
          expect(args).to.length(1)
          expect(args[0]).to.be.object
          expect(isValidDate(parse(date))).to.be.true
          expect(dates).to.be.array
          expect(format).to.be.function
          destroyVM(vm)
          done()
        }, DELAY)
      }, DELAY)
    })

    it('change', done => {
      vm = createDatepicker()
      const cb = sinon.spy()

      vm.$on('change', cb)
      setTimeout(_ => {
        vm.$el.querySelector('.uk-datepicker-next').click()
        setTimeout(_ => {
          const args = cb.args[0]
          const { date, format } = args[0]
          expect(cb).to.have.been.called
          expect(args).to.length(1)
          expect(args[0]).to.be.object
          expect(isValidDate(parse(date))).to.be.true
          expect(format).to.be.function
          destroyVM(vm)
          done()
        }, DELAY)
      }, DELAY)
    })
  })
})
