import { createVue, destroyVM, queryByTag } from '../util'

describe('Button', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('type', () => {
    vm = createVue(`
      <vk-button type="primary" />
    `)

    expect(vm.$el.classList.contains('uk-button-primary')).to.be.true
  })

  it('nativeType', () => {
    vm = createVue(`
      <vk-button nativeType="submit" />
    `)

    expect(vm.$el.getAttribute('type')).to.be.equal('submit')
  })

  it('active', () => {
    vm = createVue(`
      <vk-button :active="true" />
    `)

    expect(vm.$el.classList.contains('uk-active')).to.be.true
  })

  it('disabled', () => {
    vm = createVue(`
      <vk-button :disabled="true" />
    `)

    expect(vm.$el.hasAttribute('disabled')).to.be.true
  })

  it('size', () => {
    vm = createVue(`
      <vk-button size="mini" />
    `)

    expect(vm.$el.classList.contains('uk-button-mini')).to.be.true
  })

  it('width', () => {
    vm = createVue(`
      <vk-button width="1-1" />
    `)

    expect(vm.$el.classList.contains('uk-width-1-1')).to.be.true
  })

  it('click', () => {
    vm = createVue(`
      <vk-button />
    `)

    const button = queryByTag(vm, 'vk-button')
    const cb = sinon.spy()
    button.$on('click', cb)
    button.$el.click()
    expect(cb).to.have.been.called
    expect(cb.args[0]).to.length(1)
  })
})
