import { createVue, destroyVM } from '../util'

const DELAY = 100

describe('Pagination', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('render activePage 1', () => {
    vm = createVue(`
      <vk-pagination :activePage="1" :total="200" />
    `)

    // prev buttons should be disabled and a span
    expect(vm.$el.querySelector('li.uk-disabled.uk-pagination-previous span')).to.exist
    // next buttons should be visible and a link
    expect(vm.$el.querySelector('li.uk-pagination-next a')).to.exist
    expect(vm.$el.querySelector('li.uk-disabled.uk-pagination-next a')).to.not.exist
    // page 1 should be the only active and a span
    expect(vm.$el.querySelectorAll('li.uk-active span').length).to.equal(1)
    expect(vm.$el.querySelector('li.uk-active span').textContent).to.equal('1')
    // pages above 1 should be a link
    expect(vm.$el.querySelectorAll('li a')[0].textContent).to.equal('2')
    // pre last page should be a ...
    expect(vm.$el.querySelectorAll('li')[6].textContent.trim()).to.equal('...')
    // last page should be 20
    expect(vm.$el.querySelectorAll('li')[7].textContent.trim()).to.equal('20')
  })

  it('render activePage 10', () => {
    vm = createVue(`
      <vk-pagination :activePage="10" :total="200" />
    `)

    // prev/next buttons should be visible and a link
    expect(vm.$el.querySelector('li.uk-pagination-previous a')).to.exist
    expect(vm.$el.querySelector('li.uk-disabled.uk-pagination-previous a')).to.not.exist
    expect(vm.$el.querySelector('li.uk-pagination-next a')).to.exist
    expect(vm.$el.querySelector('li.uk-disabled.uk-pagination-next a')).to.not.exist
    // after first page should be a ...
    expect(vm.$el.querySelectorAll('li')[2].textContent.trim()).to.equal('...')
    // pre last page should be a ...
    expect(vm.$el.querySelectorAll('li')[8].textContent.trim()).to.equal('...')
    // page 10 should be the only active and a span
    expect(vm.$el.querySelectorAll('li.uk-active span').length).to.equal(1)
    expect(vm.$el.querySelector('li.uk-active span').textContent).to.equal('10')
  })

  it('render activePage 20', () => {
    vm = createVue(`
      <vk-pagination :activePage="20" :total="200" />
    `)

    // prev buttons should be visible and a link
    expect(vm.$el.querySelector('li.uk-pagination-previous a')).to.exist
    expect(vm.$el.querySelector('li.uk-disabled.uk-pagination-previous a')).to.not.exist
    // next buttons should be disabled and a span
    expect(vm.$el.querySelector('li.uk-disabled.uk-pagination-next span')).to.exist
    // page 20 should be the only active and a span
    expect(vm.$el.querySelectorAll('li.uk-active span').length).to.equal(1)
    expect(vm.$el.querySelector('li.uk-active span').textContent).to.equal('20')
    // pages below 20 should be a link
    expect(vm.$el.querySelectorAll('li a')[6].textContent).to.equal('19')
    // after first page should be a ...
    expect(vm.$el.querySelectorAll('li')[2].textContent.trim()).to.equal('...')
  })

  it('compact', () => {
    vm = createVue(`
      <vk-pagination :total="1" compact />
    `)

    expect(vm.$el.querySelector('li.uk-pagination-previous')).to.not.exist
    expect(vm.$el.querySelector('li.uk-pagination-next')).to.not.exist
  })

  it('align', done => {
    vm = createVue({
      template: `
        <vk-pagination :total="1" :align="align" />
      `,
      data: () => ({
        align: 'left'
      })
    })

    expect(vm.$el.classList.contains('uk-pagination-left')).to.be.true
    expect(vm.$el.classList.contains('uk-pagination-right')).to.be.false

    vm.align = 'right'
    setTimeout(_ => {
      expect(vm.$el.classList.contains('uk-pagination-right')).to.be.true
      expect(vm.$el.classList.contains('uk-pagination-left')).to.be.false
      done()
    }, DELAY)
  })

  it('pageRange', () => {
    vm = createVue(`
      <vk-pagination :total="200" :limit="10" :pageRange="3" />
    `)

    expect(vm.$el.querySelectorAll('li').length).to.equal(11)
  })

  it('limit', () => {
    vm = createVue(`
      <vk-pagination :total="100" :limit="1" />
    `)

    expect(vm.$el.querySelectorAll('li').length).to.equal(9)
  })

  it('@change', done => {
    vm = createVue(`
      <vk-pagination :total="200" :limit="10" :activePage="1" />
    `)
    const cb = sinon.spy()
    const pagination = vm.$children[0]

    pagination.$on('change', cb)
    vm.$el.querySelectorAll('li a')[4].click()
    setTimeout(() => {
      const args = cb.args[0]
      const { page } = args[0]
      expect(cb).to.have.been.called
      expect(args).to.length(1)
      expect(page).to.equal(20)
      done()
    }, DELAY)
  })
})
