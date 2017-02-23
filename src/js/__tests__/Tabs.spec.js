import Vue from 'vue'
import Vuikit from 'vuikit'
import {
  createVue,
  destroyVM,
  queryByTag,
  renderSnapshot,
  triggerEvent
} from 'jest/util'
import waitForUpdate from 'jest/wait-for-update'

Vue.use(Vuikit)

describe('Tabs', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('horizontal renders correctly', () => {
    vm = createVue(`
      <vk-tabs :activeTab="1">
        <vk-tab label="Tab 1">Content Tab 1</vk-tab>
        <vk-tab label="Tab 2" disabled>Content Tab 2</vk-tab>
        <vk-tab>
          <template slot="header">Header from slot</template>
        </vk-tab>
      </vk-tabs>
    `)
    expect(renderSnapshot(vm)).toMatchSnapshot()
  })

  it('vertical renders correctly', () => {
    vm = createVue(`
      <vk-tabs-vertical :activeTab="1">
        <vk-tab label="Tab 1">Content Tab 1</vk-tab>
        <vk-tab label="Tab 2" disabled>Content Tab 2</vk-tab>
        <vk-tab>
          <template slot="header">Header from slot</template>
        </vk-tab>
      </vk-tabs-vertical>
    `)
    expect(renderSnapshot(vm)).toMatchSnapshot()
  })

  it('triggers event change when a tab is clicked', done => {
    vm = createVue(`
      <vk-tabs activeTab="tab2">
        <vk-tab label="item" alias="tab1">Content Tab 1</vk-tab>
        <vk-tab label="item" alias="tab2">Content Tab 2</vk-tab>
      </vk-tabs>
    `)
    const cb = jest.fn()
    const tabs = queryByTag(vm, 'vk-tabs')

    tabs.$on('change', cb)
    waitForUpdate(() => {
      triggerEvent(tabs.$el.querySelector('li > a'), 'click')
    }).then(() => {
      const args = cb.mock.calls[0]
      expect(cb).toHaveBeenCalled()
      expect(args).toHaveLength(1)
      expect(args[0]).toEqual('tab1')
    }).then(done)
  })
})
