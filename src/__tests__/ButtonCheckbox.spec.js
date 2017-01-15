import { createVue, destroyVM, queryByTag, queryByTagAll, toJSON } from './_util'

describe('ButtonCheckbox', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('renders correctly', () => {
    vm = createVue(`
      <vk-button-checkbox :value="[10, 30]">
        <vk-button :value="10">Button 1</vk-button>
        <vk-button :value="20">Button 2</vk-button>
        <vk-button :value="30">Button 3</vk-button>
      </vk-button-checkbox>
    `)
    expect(toJSON(vm)).toMatchSnapshot()
  })

  it('triggers event change when a button was clicked', () => {
    const vm = createVue(`
      <vk-button-checkbox>
        <vk-button :value="10">Button 1</vk-button>
        <vk-button :value="20">Button 2</vk-button>
        <vk-button :value="30">Button 3</vk-button>
      </vk-button-checkbox>`
    )
    const checkbox = queryByTag(vm, 'vk-button-checkbox')
    const buttons = queryByTagAll(vm, 'vk-button')
    const cb = jest.fn()

    checkbox.$on('change', cb)
    buttons[0].$el.click()
    expect(cb).toHaveBeenCalled()
    destroyVM(vm)
  })
})
