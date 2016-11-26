import { createTest, destroyVM } from '../util'
import Pagination from 'src/lib/Pagination'

describe('Pagination', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })
  it('create', () => {
    vm = createTest(Pagination, {
      total: 10,
      limit: 1,
      page: 5
    })
    const elm = vm.$el
    // prev
    expect(elm.querySelector('li.uk-pagination-previous')).to.exist
    // next
    expect(elm.querySelector('li.uk-pagination-next')).to.exist
    // page
    expect(elm.querySelector('li.uk-active span'))
      .to.have.property('textContent').to.equal('5')
  })
  it('compact', () => {
    vm = createTest(Pagination, {
      total: 1,
      compact: true
    })
    const elm = vm.$el
    expect(elm.querySelector('li.uk-pagination-previous')).to.not.exist
    expect(elm.querySelector('li.uk-pagination-next')).to.not.exist
  })
  it('align left', () => {
    vm = createTest(Pagination, {
      total: 1,
      align: 'left'
    })
    const elm = vm.$el
    expect(elm.classList.contains('uk-pagination-left')).to.be.true
  })
  it('align right', () => {
    vm = createTest(Pagination, {
      total: 1,
      align: 'right'
    })
    const elm = vm.$el
    expect(elm.classList.contains('uk-pagination-right')).to.be.true
  })
  it('pageRange', () => {
    vm = createTest(Pagination, {
      total: 200,
      limit: 10,
      pageRange: 3
    })
    expect(vm.$el.querySelectorAll('li').length).to.equal(11)
  })
  it('limit', () => {
    vm = createTest(Pagination, {
      total: 100,
      limit: 1
    })
    const elm = vm.$el
    expect(elm.querySelectorAll('li').length).to.equal(9)
  })
  it('@change', done => {
    vm = createTest(Pagination, {
      total: 100,
      limit: 1
    })
    const callback = sinon.spy()
    vm.$on('change', callback)
    vm.$el.querySelector('li:nth-child(5) a').click()
    setTimeout(() => {
      expect(callback).to.have.been.called
      done()
    }, 150)
  })
})
