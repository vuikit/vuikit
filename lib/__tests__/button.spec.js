import { destroyVM, createVue, getSnapshot } from './_util'

describe('Button', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('renders correctly', () => {
    const snapshot = getSnapshot(`
      <vk-button type="submit" color="primary" width="1-1" size="mini" :active="true" :disabled="true">
        Button
      </vk-button>
    `)
    expect(snapshot).toMatchSnapshot()
  })

  it('triggers event click when the button was clicked', () => {
    const vm = createVue(`<vk-button />`)
    const button = vm.$children[0]
    const cb = jest.fn()
    button.$on('click', cb)
    button.$el.click()
    expect(cb).toHaveBeenCalled()
    expect(cb.mock.calls[0].length).toBe(1)
  })
})
