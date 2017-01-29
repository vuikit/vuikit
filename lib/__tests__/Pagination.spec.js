import Vue from 'vue'
import Vuikit from 'vuikit'
import {
  createVue,
  destroyVM,
  renderSnapshot
} from 'jest/util'
import waitForUpdate from 'jest/wait-for-update'

Vue.use(Vuikit)

describe('Pagination', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  fit('renders correctly', () => {
    vm = createVue(`
      <vk-pagination>
        <vk-pagination-first />
        <vk-pagination-prev />
        <vk-pagination-pages :active="1" :total="200" :limit="10" />
        <vk-pagination-next />
        <vk-pagination-last />
      </vk-pagination>
    `)
    expect(renderSnapshot(vm)).toMatchSnapshot()
    destroyVM(vm)

    vm = createVue(`
      <vk-pagination>
        <vk-pagination-first />
        <vk-pagination-prev />
        <vk-pagination-pages :active="10" :total="200" :limit="10" />
        <vk-pagination-next />
        <vk-pagination-last />
      </vk-pagination>
    `)
    expect(renderSnapshot(vm)).toMatchSnapshot()
    destroyVM(vm)

    vm = createVue(`
      <vk-pagination>
        <vk-pagination-first />
        <vk-pagination-prev />
        <vk-pagination-pages :active="20" :total="200" :limit="10" />
        <vk-pagination-next />
        <vk-pagination-last />
      </vk-pagination>
    `)
    expect(renderSnapshot(vm)).toMatchSnapshot()
    destroyVM(vm)

    vm = createVue(`
      <vk-pagination :limit="10" :active="10" :total="200">
        <vk-pagination-first />
        <vk-pagination-prev />
        <vk-pagination-next />
        <vk-pagination-last />
      </vk-pagination>
    `)
    expect(renderSnapshot(vm)).toMatchSnapshot()
    destroyVM(vm)
  })

  it.skip('triggers event change when a not active page is clicked', done => {
    vm = createVue(`
      <vk-pagination>
        <vk-pagination-prev />
        <vk-pagination-pages :active="20" :total="200" :limit="10" />
      </vk-pagination>
    `, true)

    const cb = jest.fn()
    const pagination = vm.$children[0]

    pagination.$on('change', cb)
    vm.$el.querySelector('li a').click()
    waitForUpdate(() => {
      const args = cb.mock.calls[0]
      const { page } = args[0]
      expect(cb).toHaveBeenCalled()
      expect(args).toHaveLength(1)
      expect(page).toEqual(20)
    }).then(done)
  })
})
