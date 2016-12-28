import { createVue, destroyVM, queryByTag, queryByTagAll } from '../util'

const DELAY = 10

describe('Breadcrumb', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('render', () => {
    vm = createVue(`
      <vk-breadcrumb location="/blog">
        <vk-breadcrumb-item path="/">Home</vk-breadcrumb-item>
        <vk-breadcrumb-item label="Blog" path="/blog" />
        <vk-breadcrumb-item label="Category" path="/blog/category" />
        <vk-breadcrumb-item label="Post" path="/blog/category/post" disabled />
      </vk-breadcrumb>
    `)
    const items = queryByTagAll(vm, 'vk-breadcrumb-item')

    // Label/Defaul Slot
    expect(items[0].$el.innerText.trim()).to.equal('Home')
    expect(items[2].$el.innerText.trim()).to.equal('Category')
    // only one active item with span
    expect(vm.$el.querySelectorAll('li.uk-active').length).to.equal(1)
    expect(vm.$el.querySelector('li.uk-active span')).to.be.span
    expect(vm.$el.querySelector('li.uk-active span').innerText.trim()).to.equal('Blog')
    // disable item should be span
    expect(vm.$el.querySelectorAll('li span')[1].innerText.trim()).to.equal('Post')
  })

  it('@change', done => {
    vm = createVue(`
      <vk-breadcrumb location="/">
        <vk-breadcrumb-item label="Home" path="/" />
        <vk-breadcrumb-item label="Blog" path="/blog" />
      </vk-breadcrumb>
    `)
    const breadcrumb = queryByTag(vm, 'vk-breadcrumb')
    const items = queryByTagAll(vm, 'vk-breadcrumb-item')
    const cb = sinon.spy()

    breadcrumb.$on('change', cb)
    items[1].$el.querySelector('a').click()

    setTimeout(_ => {
      const args = cb.args[0]
      expect(cb).to.have.been.called
      expect(args).to.length(1)
      expect(args[0]).to.equal('/blog')
      done()
    }, DELAY)
  })
})
