import Vue from 'vue'
import Vuikit from 'vuikit'
import waitForUpdate from 'jest/wait-for-update'
import {
  createVue,
  destroyVM,
  queryByTag,
  queryByTagAll,
  renderSnapshot
} from 'jest/util'

Vue.use(Vuikit)

describe('Breadcrumb', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('renders correctly', () => {
    vm = createVue(`
      <vk-breadcrumb location="/blog">
        <vk-breadcrumb-item path="/">Home</vk-breadcrumb-item>
        <vk-breadcrumb-item label="Blog" path="/blog" />
        <vk-breadcrumb-item label="Category" path="/blog/category" />
        <vk-breadcrumb-item label="Post" path="/blog/category/post" disabled />
      </vk-breadcrumb>
    `)
    expect(renderSnapshot(vm)).toMatchSnapshot()
  })

  it('triggers event change when item is clicked', done => {
    vm = createVue(`
      <vk-breadcrumb location="/">
        <vk-breadcrumb-item label="Home" path="/" />
        <vk-breadcrumb-item label="Blog" path="/blog" />
      </vk-breadcrumb>
    `)
    const breadcrumb = queryByTag(vm, 'vk-breadcrumb')
    const items = queryByTagAll(vm, 'vk-breadcrumb-item')
    const cb = jest.fn()

    breadcrumb.$on('change', cb)
    waitForUpdate(() => {
      items[1].$el.querySelector('a').click()
    }).then(() => {
      expect(cb).toHaveBeenCalledWith('/blog')
    }).then(done)
  })
})
