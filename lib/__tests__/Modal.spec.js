import Vue from 'vue'
import Vuikit from 'vuikit'
import {
  createVue,
  destroyVM,
  triggerKeyEvent,
  triggerEvent,
  queryByTag,
  renderSnapshot
} from 'jest/util'
import waitForUpdate from 'jest/wait-for-update'

Vue.use(Vuikit)

describe('Modal', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('renders correctly', done => {
    vm = createVue(`
      <vk-modal
        :show="true">
        <vk-modal-close />
        <vk-modal-header>
          <h2 class="uk-modal-title">Headline</h2>
        </vk-modal-header>
        <vk-modal-body>Content</vk-modal-body>
        <vk-modal-footer class="uk-text-right">
          Footer
        </vk-modal-footer>
      </vk-modal>
    `)
    waitForUpdate(() => {
      expect(renderSnapshot(vm)).toMatchSnapshot()
    }).then(done)
  })

  it('adds classes to document on display', done => {
    vm = createVue(`
      <vk-modal :show="true">
        <vk-modal-body>Content</vk-modal-body>
      </vk-modal>
    `)
    waitForUpdate(() => {
      expect(document.documentElement.classList.contains('uk-modal-page')).toBeTruthy()
    }).then(done)
  })

  it('removes classes from document when hidden', () => {
    vm = createVue({
      template: `
        <vk-modal :show="show">
          <vk-modal-body>Content</vk-modal-body>
        </vk-modal>
      `,
      data: () => ({
        show: true
      })
    }, true)
    vm.show = false
    // force after leave hook until find a better workaround
    vm.$children[0].afterLeave()
    expect(document.documentElement.classList.contains('uk-modal-page')).toBeFalsy()
  })

  it('triggers event escKey when pressed ESC', done => {
    vm = createVue(`
      <vk-modal :show="true">
        <vk-modal-body>Content</vk-modal-body>
      </vk-modal>
    `)
    const cb = jest.fn()
    const modal = queryByTag(vm, 'vk-modal')
    modal.$on('key-esc', cb)
    triggerKeyEvent(document.documentElement, 27)
    waitForUpdate(() => {
      expect(cb).toHaveBeenCalled()
    }).then(done)
  })

  it('triggers event click-out when clicked outside the Modal dialog', done => {
    vm = createVue(`
      <vk-modal :show="true">
        <vk-modal-body>Content</vk-modal-body>
      </vk-modal>
    `)
    const cb = jest.fn()
    const modal = queryByTag(vm, 'vk-modal')
    modal.$on('click-out', cb)
    waitForUpdate(() => {
      triggerEvent(modal.$el, 'click')
      expect(cb).toHaveBeenCalled()
    }).then(done)
  })

  it('triggers event click-in when clicked inside the Modal dialog', done => {
    vm = createVue(`
      <vk-modal :show="true">
        <vk-modal-body>Content</vk-modal-body>
      </vk-modal>
    `)
    const cb = jest.fn()
    const modal = queryByTag(vm, 'vk-modal')
    modal.$on('click-in', cb)
    waitForUpdate(() => {
      triggerEvent(modal.$refs.panel, 'click')
      expect(cb).toHaveBeenCalled()
    }).then(done)
  })

  it('triggers event inactive when other Modals becomes active', done => {
    vm = createVue({
      template: `
        <div>
          <vk-modal ref="modal1" :show="show.modal1">
            <vk-modal-body>Content</vk-modal-body>
          </vk-modal>
          <vk-modal ref="modal2" :show="show.modal2">
            <vk-modal-body>Content</vk-modal-body>
          </vk-modal>
        </div>
      `,
      data: () => ({
        show: {
          modal1: true,
          modal2: false
        }
      })
    }, true)
    const cb = jest.fn()
    vm.$refs.modal1.$on('inactive', cb)
    waitForUpdate(() => {
      vm.show.modal2 = true
      // force enter hooks until find a better workaround
      vm.$refs.modal2.beforeEnter()
      vm.$refs.modal2.afterEnter()
    }).then(() => {
      expect(cb).toHaveBeenCalled()
    }).then(done)
  })
})
