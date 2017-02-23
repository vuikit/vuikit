import Vue from 'vue'
import Vuikit from 'vuikit'
import {
  createVue,
  destroyVM,
  triggerEvent,
  renderSnapshot
} from 'jest/util'
import waitForUpdate from 'jest/wait-for-update'

Vue.use(Vuikit)

describe('Pagination', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('renders correctly', () => {
    vm = createVue(`
      <vk-pagination :page="10" :total="200" :per-page="10">
        <vk-pagination-first />
        <vk-pagination-prev expand />
        <vk-pagination-pages />
        <vk-pagination-next expand />
        <vk-pagination-last />
      </vk-pagination>
    `)
    expect(renderSnapshot(vm)).toMatchSnapshot()
    destroyVM(vm)

    vm = createVue(`
      <vk-pagination :page="10" :total="200" :per-page="10" align="left">
        <vk-pagination-prev />
        <vk-pagination-next />
      </vk-pagination>
    `)
    expect(renderSnapshot(vm)).toMatchSnapshot()
    destroyVM(vm)

    vm = createVue(`
      <vk-pagination :page="10" :total="200" :per-page="10" align="right">
        <vk-pagination-first />
        <vk-pagination-last />
      </vk-pagination>
    `)
    expect(renderSnapshot(vm)).toMatchSnapshot()
    destroyVM(vm)

    vm = createVue(`
      <vk-pagination :page="1" :total="0" :per-page="10">
        <vk-pagination-pages />
      </vk-pagination>
    `)
    expect(renderSnapshot(vm)).toMatchSnapshot()
    destroyVM(vm)
  })

  it('triggers event change when a not active page is clicked', done => {
    vm = createVue(`
      <vk-pagination :page="20" :total="200" :per-page="10">
        <vk-pagination-pages />
      </vk-pagination>
    `, true)
    const pagination = vm.$children[0]
    const cb = jest.fn()

    pagination.$on('change', cb)
    waitForUpdate(() => {
      triggerEvent(vm.$el.querySelector('li a'), 'click')
    }).then(() => {
      const args = cb.mock.calls[0]
      const page = args[0]
      expect(cb).toHaveBeenCalled()
      expect(args).toHaveLength(1)
      expect(page).toEqual(1)
    }).then(done)
  })
})
