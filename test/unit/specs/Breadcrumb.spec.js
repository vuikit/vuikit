import { createVue, destroyVM } from '../util'

describe('Breadcrumb', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('create', () => {
    vm = createVue(`
      <vk-breadcrumb location="/blog">
        <vk-breadcrumb-item path="/">Home</vk-breadcrumb-item>
        <vk-breadcrumb-item path="/blog">Blog</vk-breadcrumb-item>
        <vk-breadcrumb-item path="/blog/category">Category</vk-breadcrumb-item>
        <vk-breadcrumb-item path="/blog/category/post" disabled>Post</vk-breadcrumb-item>
      </vk-breadcrumb>
    `)
    expect(vm.$el.querySelector('.uk-active').innerText).to.equal('Blog')
  })
  it('click', () => {
    vm = createVue(`
      <vk-breadcrumb ref="breadcrumb" location="/blog">
        <vk-breadcrumb-item path="/">Home</vk-breadcrumb-item>
        <vk-breadcrumb-item path="/blog">Blog</vk-breadcrumb-item>
        <vk-breadcrumb-item path="/blog/category">Category</vk-breadcrumb-item>
        <vk-breadcrumb-item path="/blog/category/post" disabled>Post</vk-breadcrumb-item>
      </vk-breadcrumb>
    `)
    const breadcrumb = vm.$refs.breadcrumb
    const callback = sinon.spy()

    breadcrumb.$on('change', callback)
    vm.$el.querySelector('a').click()

    expect(callback).to.have.been.calledWith('/')
  })
})
