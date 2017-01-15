import { createVue, destroyVM, toJSON } from './_util'
import waitForUpdate from './_wait-for-update'

describe('Pagination', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('renders correctly', () => {
    vm = createVue(`
      <vk-pagination :activePage="1" :total="200" compact align="left" />
    `)
    expect(toJSON(vm)).toMatchSnapshot()
    destroyVM(vm)

    vm = createVue(`
      <vk-pagination :activePage="10" :total="200" />
    `)
    expect(toJSON(vm)).toMatchSnapshot()
    destroyVM(vm)

    vm = createVue(`
      <vk-pagination :activePage="20" :total="200" />
    `)
    expect(toJSON(vm)).toMatchSnapshot()
    destroyVM(vm)

    vm = createVue(`
      <vk-pagination :total="200" :limit="10" :pageRange="3" />
    `)
    expect(toJSON(vm)).toMatchSnapshot()
    destroyVM(vm)

    vm = createVue(`
      <vk-pagination :total="100" :limit="1" />
    `)
    expect(toJSON(vm)).toMatchSnapshot()
    destroyVM(vm)
  })

  it('triggers event change when a not active page is clicked', done => {
    vm = createVue(`
      <vk-pagination :total="200" :limit="10" :activePage="1" />
    `, true)

    const cb = jest.fn()
    const pagination = vm.$children[0]

    pagination.$on('change', cb)
    vm.$el.querySelectorAll('li a')[4].click()
    waitForUpdate(() => {
      const args = cb.mock.calls[0]
      const { page } = args[0]
      expect(cb).toHaveBeenCalled()
      expect(args).toHaveLength(1)
      expect(page).toEqual(20)
    }).then(done)
  })
})
