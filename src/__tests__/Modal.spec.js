import { createVue, destroyVM, triggerKeyEvent, queryByTag, toJSON } from './_util'
import waitForUpdate from './_wait-for-update'

describe('Modal', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('renders correctly', () => {
    vm = createVue(`
      <vk-modal :large="true" :lightbox="true" :blank="true" :show="true">Modal</vk-modal>
    `)
    expect(toJSON(vm)).toMatchSnapshot()
  })

  it('adds classes to document on display', done => {
    vm = createVue(`
      <vk-modal :show="true" :transition="false"></vk-modal>
    `)
    waitForUpdate(() => {
      expect(document.documentElement.classList.contains('uk-modal-page')).toBeTruthy()
    }).then(done)
  })

  it('removes classes from document when hidden', done => {
    vm = createVue({
      template: `
        <vk-modal :show="show" :transition="false"></vk-modal>
      `,
      data: () => ({
        show: true
      })
    })
    vm.show = false
    waitForUpdate(() => {
      expect(document.documentElement.classList.contains('uk-modal-page')).toBeFalsy()
    }).then(done)
  })

  it('triggers event escKey when pressed ESC', done => {
    vm = createVue(`
      <vk-modal :show="true" :transition="false"></vk-modal>
    `)
    const cb = jest.fn()
    const modal = queryByTag(vm, 'vk-modal')
    modal.$on('keyEsc', cb)
    triggerKeyEvent(document.documentElement, 27)
    waitForUpdate(() => {
      expect(cb).toHaveBeenCalled()
    }).then(done)
  })

  it('triggers event clickOut when clicked outside the Modal dialog', done => {
    vm = createVue(`
      <vk-modal :show="true" :transition="false"></vk-modal>
    `)
    const cb = jest.fn()
    const modal = queryByTag(vm, 'vk-modal')
    modal.$on('clickOut', cb)
    modal.$el.click()
    waitForUpdate(() => {
      expect(cb).toHaveBeenCalled()
    }).then(done)
  })

  it('triggers event clickIn when clicked inside the Modal dialog', done => {
    vm = createVue(`
      <vk-modal :show="true" :transition="false"></vk-modal>
    `)
    const cb = jest.fn()
    const modal = queryByTag(vm, 'vk-modal')
    modal.$on('clickIn', cb)
    modal.$refs.dialog.click()
    waitForUpdate(() => {
      expect(cb).toHaveBeenCalled()
    }).then(done)
  })

  it('triggers event inactive when other Modals becomes active', done => {
    vm = createVue({
      template: `
        <div>
          <vk-modal ref="modal1" :show="true" :transition="false">Modal 1</vk-modal>
          <vk-modal ref="modal2" :show="show" :transition="false">Modal 2</vk-modal>
        </div>
      `,
      data: () => ({
        show: false
      })
    }, true)
    const cb = jest.fn()
    vm.$refs.modal1.$on('inactive', cb)
    vm.show = true
    waitForUpdate(() => {
      expect(cb).toHaveBeenCalled()
    }).then(done)
  })
})
