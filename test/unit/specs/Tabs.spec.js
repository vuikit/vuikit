import { createVue, destroyVM } from '../util'

describe('Tabs', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })
  it('create', () => {
    vm = createVue(`
      <vk-tabs>
        <vk-tabs-item name="Tab 1">Content Tab 1</vk-tabs-item>
        <vk-tabs-item name="Tab 2">Content Tab 2</vk-tabs-item>
        <vk-tabs-item name="Tab 3">Content Tab 3</vk-tabs-item>
        <vk-tabs-item disabled name="Tab 4">Content Tab 4</vk-tabs-item>
      </vk-tabs>
    `)
    expect(vm.$el.querySelector('.uk-tab')).to.exist
    expect(vm.$el.querySelector('.uk-list')).to.exist
  })
})
