import { createVue, destroyVM, queryByTag, queryByTagAll } from '../util'

describe('ButtonRadio', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('create', () => {
    vm = createVue(`
      <vk-button-radio>
        <vk-button :value="10">Button 1</vk-button>
        <vk-button :value="20">Button 2</vk-button>
        <vk-button :value="30">Button 3</vk-button>
      </vk-button-radio>
    `)
    expect(vm.$el.classList.contains('uk-button-group')).to.be.true
  })

  it('click', () => {
    vm = createVue(`
      <vk-button-radio>
        <vk-button :value="10">Button 1</vk-button>
        <vk-button :value="20">Button 2</vk-button>
        <vk-button :value="30">Button 3</vk-button>
      </vk-button-radio>`
    )
    const radio = queryByTag(vm, 'vk-button-radio')
    const buttons = queryByTagAll(vm, 'vk-button')
    const cb = sinon.spy()

    radio.$on('change', cb)
    buttons[0].$el.click()
    expect(cb).to.have.been.called
  })
})
