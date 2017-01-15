import { createVue, destroyVM, queryByTagAll, toJSON } from './_util'
import waitForUpdate from './_wait-for-update'

describe('Subnav', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('renders correctly', () => {
    vm = createVue(`
      <vk-subnav :activeItem="1" line pill>
        <vk-subnav-item label="Item 1" />
        <vk-subnav-item label="Item 2" disabled />
        <vk-subnav-item>Item 3</vk-subnav-item>
      </vk-subnav>
    `)
    expect(toJSON(vm)).toMatchSnapshot()
  })

  it('triggers event change on item click', done => {
    vm = createVue(`
      <vk-subnav :activeItem="1">
        <vk-subnav-item label="Item 1" />
        <vk-subnav-item label="Item 2" alias="item2"/>
      </vk-subnav>
    `)
    const subnav = vm.$children[0]
    const items = queryByTagAll(vm, 'vk-subnav-item')
    const cb = jest.fn()

    subnav.$on('change', cb)
    waitForUpdate(() => {
      items[1].$el.children[0].click()
    }).then(() => {
      const args = cb.mock.calls[0]
      expect(cb).toHaveBeenCalled()
      expect(args).toHaveLength(1)
      expect(args[0]).toEqual('item2')
    }).then(done)
  })
})
