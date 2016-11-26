import { createTest, destroyVM } from '../util'
import Datepicker from 'src/lib/Datepicker'
import Moment from 'moment'

const today = Moment()

describe('Datepicker', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })
  it('create', () => {
    vm = createTest(Datepicker, {
      year: today.year(),
      month: today.month(),
      dates: [
        today
      ]
    }, true)
    expect(parseInt(vm.$el.querySelector('.uk-active').innerText))
      .to.equal(today.date())
  })
  it('disabled', () => {
    vm = createTest(Datepicker, {
      year: today.year(),
      month: today.month(),
      disabledDates: [
        today
      ]
    }, true)
    expect(parseInt(vm.$el.querySelector('.uk-datepicker-table-disabled').innerText))
      .to.equal(today.date())
  })
  it('@pick', () => {
    vm = createTest(Datepicker, true)
    const callback = sinon.spy()
    vm.$on('pick', callback)
    vm.$el.querySelector('td a').click()
    expect(callback.called).to.be.true
    expect(callback.args[0][0]).to.have.property('_isAMomentObject')
  })
  it('@unpick', done => {
    vm = createTest(Datepicker, {
      dates: [
        today
      ]
    }, true)
    const callback = sinon.spy()
    vm.$on('unpick', callback)
    vm.$el.querySelector('.uk-active').click()
    expect(callback.called).to.be.true
    expect(callback.args[0][0]).to.have.property('_isAMomentObject')
    done()
  })
})
