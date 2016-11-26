import { createTest, destroyVM } from '../util'
import Calendar from 'src/lib/Calendar'
import Moment from 'moment'

const year = Moment().year()
const month = Moment().month()

describe('Calendar', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })
  it('create', () => {
    vm = createTest(Calendar, {
      year,
      month
    }, true)
    expect(vm.selectedYear).to.equal(year)
    expect(vm.selectedMonth).to.equal(month)
  })
  it('prevMonth', () => {
    expect(vm.prevMonth.format('YYYY-MM-DD'))
      .to.equal(Moment().add(-1, 'month').format('YYYY-MM-DD'))
  })
  it('nextMonth', () => {
    expect(vm.nextMonth.format('YYYY-MM-DD'))
      .to.equal(Moment().add(1, 'month').format('YYYY-MM-DD'))
  })
  it('date', () => {
    expect(vm.date.format('YYYY-MM-DD')).to.equal(Moment().format('YYYY-MM-DD'))
  })
  it('on prevMonth', () => {
    const callback = sinon.spy()
    vm.$on('change', callback)
    vm.$el.querySelector('a.uk-datepicker-previous').click()
    expect(callback.called).to.be.true
    expect(callback.args[0][0]).to.have.property('_isAMomentObject')
  })
  it('on nextMonth', () => {
    const callback = sinon.spy()
    vm.$on('change', callback)
    vm.$el.querySelector('a.uk-datepicker-next').click()
    expect(callback.called).to.be.true
    expect(callback.args[0][0]).to.have.property('_isAMomentObject')
  })
})
