import { createVue, destroyVM, queryByTag, queryByTagAll } from '../util'
import { hasClass } from 'helpers/dom'

const DELAY = 30

describe('Tabs', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('render', () => {
    vm = createVue(`
      <vk-tabs :activeTab="1" bottom center flip width="1-1">
        <vk-tab label="Tab 1">Content Tab 1</vk-tab>
        <vk-tab label="Tab 2" disabled>Content Tab 2</vk-tab>
        <vk-tab>
          <template slot="header">Header from slot</template>
        </vk-tab>
      </vk-tabs>
    `)

    const tabs = queryByTagAll(vm, 'vk-tab')
    const content = vm.$el.querySelector('.uk-margin').children[0]

    // Wrapper
    expect(hasClass(vm.$el, 'uk-flex')).to.be.true
    expect(hasClass(vm.$el, 'uk-flex-column-reverse')).to.be.true
    expect(vm.$el.querySelector('div div.uk-tab-center')).to.exist
    expect(vm.$el.querySelector('div div.uk-tab-center-bottom')).to.exist
    // Tabs Wrapper
    expect(vm.$el.querySelector('div div ul.uk-tab')).to.exist
    expect(vm.$el.querySelector('div div ul.uk-tab-flip')).to.exist
    expect(vm.$el.querySelector('div div ul.uk-tab-bottom')).to.exist
    expect(vm.$el.querySelector('div div ul.uk-tab-grid')).to.exist

    // Tab 1
    expect(hasClass(tabs[0].$el, 'uk-active')).to.be.true
    expect(hasClass(tabs[0].$el, 'uk-width-1-1')).to.be.true
    expect(tabs[0].$el.innerText.trim()).to.equal('Tab 1')
    expect(content.innerText).to.equal('Content Tab 1')
    // Tab 2
    expect(hasClass(tabs[1].$el, 'uk-disabled')).to.be.true
    expect(hasClass(tabs[1].$el, 'uk-width-1-1')).to.be.true
    // Tab 3
    expect(tabs[2].$el.innerText.trim()).to.equal('Header from slot')
    expect(hasClass(tabs[2].$el, 'uk-width-1-1')).to.be.true
  })

  it('@change & alias', done => {
    vm = createVue(`
      <vk-tabs activeTab="tab1">
        <vk-tab alias="tab1">Content Tab 1</vk-tab>
        <vk-tab alias="tab2">Content Tab 2</vk-tab>
      </vk-tabs>
    `)

    const cb = sinon.spy()
    const tabsWrapper = queryByTag(vm, 'vk-tabs')
    const tabs = queryByTagAll(vm, 'vk-tab')

    tabsWrapper.$on('change', cb)
    tabs[1].$el.children[0].click()
    setTimeout(_ => {
      const args = cb.args[0]
      expect(cb).to.have.been.called
      expect(args).to.length(1)
      expect(args[0]).to.equal('tab2')
      done()
    }, DELAY)
  })

  it('vertical variation', () => {
    vm = createVue(`
      <vk-tabs-vertical :activeTab="1" flip width="1-1" contentWidth="1-2">
        <vk-tab>Content Tab 1</vk-tab>
      </vk-tabs-vertical>
    `)

    // Wrapper
    expect(hasClass(vm.$el, 'uk-grid')).to.be.true
    expect(hasClass(vm.$el, 'uk-flex')).to.be.true
    expect(hasClass(vm.$el, 'uk-flex-row-reverse')).to.be.true
    expect(vm.$el.querySelector('div div.uk-width-medium-1-1')).to.exist
    expect(vm.$el.querySelector('div div.uk-width-medium-1-2')).to.exist
    // Tabs Wrapper
    expect(vm.$el.querySelector('div div ul.uk-tab')).to.exist
    expect(vm.$el.querySelector('div div ul.uk-tab-right')).to.exist
    expect(vm.$el.querySelector('div div ul.uk-tab-left')).to.not.exist
  })
})
