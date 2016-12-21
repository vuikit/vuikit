import { createVue, destroyVM, queryByTag, queryByTagAll } from '../util'

describe('ButtonCheckbox', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('create', () => {
    vm = createVue(`
      <vk-button-checkbox :value="[10, 30]">
        <vk-button :value="10">Button 1</vk-button>
        <vk-button :value="20">Button 2</vk-button>
        <vk-button :value="30">Button 3</vk-button>
      </vk-button-checkbox>
    `)
    const buttons = queryByTagAll(vm, 'vk-button')

    expect(vm.$el.classList.contains('uk-button-group')).to.be.true
    expect(buttons[0].active).to.be.true
    expect(buttons[1].active).to.be.false
    expect(buttons[2].active).to.be.true
  })

  it('click', () => {
    vm = createVue(`
      <vk-button-checkbox>
        <vk-button :value="10">Button 1</vk-button>
        <vk-button :value="20">Button 2</vk-button>
        <vk-button :value="30">Button 3</vk-button>
      </vk-button-checkbox>`
    )
    const checkbox = queryByTag(vm, 'vk-button-checkbox')
    const buttons = queryByTagAll(vm, 'vk-button')
    const cb = sinon.spy()

    checkbox.$on('change', cb)
    buttons[0].$el.click()
    expect(cb).to.have.been.called
  })
})
