import { createVue, destroyVM, queryByTag, queryByTagAll, getSnapshot } from './_util'
import waitForUpdate from './_wait-for-update'

describe('Tabs', () => {
  let vm
  let snapshot
  afterEach(() => {
    destroyVM(vm)
  })

  it('renders correctly', () => {
    snapshot = getSnapshot(`
      <vk-tabs :activeTab="1" bottom center flip width="1-1">
        <vk-tab label="Tab 1">Content Tab 1</vk-tab>
        <vk-tab label="Tab 2" disabled>Content Tab 2</vk-tab>
        <vk-tab>
          <template slot="header">Header from slot</template>
        </vk-tab>
      </vk-tabs>
    `)
    expect(snapshot).toMatchSnapshot()

    snapshot = getSnapshot(`
      <vk-tabs-vertical :activeTab="1" flip width="1-1" contentWidth="1-2">
        <vk-tab>Content Tab 1</vk-tab>
      </vk-tabs-vertical>
    `)
    expect(snapshot).toMatchSnapshot()
  })

  it('triggers event change when a tab is clicked', done => {
    vm = createVue(`
      <vk-tabs activeTab="tab1">
        <vk-tab alias="tab1">Content Tab 1</vk-tab>
        <vk-tab alias="tab2">Content Tab 2</vk-tab>
      </vk-tabs>
    `)

    const cb = jest.fn()
    const tabsWrapper = queryByTag(vm, 'vk-tabs')
    const tabs = queryByTagAll(vm, 'vk-tab')

    tabsWrapper.$on('change', cb)
    waitForUpdate(() => {
      tabs[1].$el.children[0].click()
    }).then(() => {
      const args = cb.mock.calls[0]
      expect(cb).toHaveBeenCalled()
      expect(args).toHaveLength(1)
      expect(args[0]).toEqual('tab2')
    }).then(done)
  })
})
