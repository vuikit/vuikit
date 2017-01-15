import { createVue, destroyVM, toJSON } from './_util'

describe('ButtonRadio', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('renders correctly', () => {
    vm = createVue(`
      <vk-button-radio :value="10">
        <vk-button :value="10">Button 1</vk-button>
        <vk-button :value="20">Button 2</vk-button>
        <vk-button :value="30">Button 3</vk-button>
      </vk-button-radio>
    `)
    expect(toJSON(vm)).toMatchSnapshot()
  })

  it('triggers event change when a button was clicked', () => {
    const vm = createVue(`
      <vk-button-radio>
        <vk-button :value="10">Button 1</vk-button>
        <vk-button :value="20">Button 2</vk-button>
        <vk-button :value="30">Button 3</vk-button>
      </vk-button-radio>`
    , true)
    const cb = jest.fn()
    const radio = vm.$children[0]
    radio.$on('change', cb)
    radio.$children[0].$el.click()
    expect(cb).toHaveBeenCalled()
    destroyVM(vm)
  })
})
