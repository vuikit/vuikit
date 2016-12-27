import { createVue, destroyVM, queryByTagAll } from '../util'

const DELAY = 10

describe('Subnav', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })
  it('create', () => {
    vm = createVue(`
      <vk-subnav :activeItem="1" line pill>
        <vk-subnav-item label="Item 1" />
        <vk-subnav-item label="Item 2" disabled />
        <vk-subnav-item>Item 3</vk-subnav-item>
      </vk-subnav>
    `)

    const items = queryByTagAll(vm, 'vk-subnav-item')

    expect(vm.$el.classList.contains('uk-subnav')).to.be.true
    expect(vm.$el.classList.contains('uk-subnav-line')).to.be.true
    expect(vm.$el.classList.contains('uk-subnav-pill')).to.be.true
    expect(items[0].$el.classList.contains('uk-active')).to.be.true
    expect(items[1].$el.classList.contains('uk-disabled')).to.be.true
    expect(items[0].$el.innerText).to.equal('Item 1')
    expect(items[1].$el.innerText).to.equal('Item 2')
    expect(items[2].$el.innerText).to.equal('Item 3')
  })

  it('@change', done => {
    vm = createVue(`
      <vk-subnav :activeItem="1">
        <vk-subnav-item label="Item 1" />
        <vk-subnav-item label="Item 2" alias="item2"/>
      </vk-subnav>
    `)
    const subnav = vm.$children[0]
    const items = queryByTagAll(vm, 'vk-subnav-item')
    const cb = sinon.spy()
    subnav.$on('change', cb)

    items[1].$el.children[0].click()
    setTimeout(_ => {
      const args = cb.args[0]
      expect(cb).to.have.been.called
      expect(args).to.length(1)
      expect(args[0]).to.equal('item2')
      done()
    }, DELAY)
  })
})
