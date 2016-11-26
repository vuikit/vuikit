import { createVue, createTest, destroyVM, triggerKeyEvent } from '../util'
import Modal from 'src/lib/Modal'

describe('Modal', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })
  it('create', () => {
    vm = createVue(`
      <div>
        <vk-modal :show="true"></vk-modal>
      </div>
    `, true)
    const modal = vm.$children[0]
    expect(document.querySelector('.uk-modal')).to.exist
    expect(modal.$el.style.display).to.not.equal('none')
  })
  it('show', done => {
    vm = createVue({
      template: `
        <div>
          <vk-modal :show="show"></vk-modal>
        </div>
      `,
      data: () => ({
        show: false
      })
    }, true)
    vm.show = true
    setTimeout(() => {
      expect(document.documentElement.classList.contains('uk-modal-page')).to.be.true
      done()
    }, 10)
  })
  it('hide', done => {
    vm = createVue({
      template: `
        <div>
          <vk-modal :show="show"></vk-modal>
        </div>
      `,
      data: () => ({
        show: false
      })
    }, true)
    vm.show = true
    setTimeout(() => {
      vm.show = false
      setTimeout(() => {
        expect(document.documentElement.classList.contains('uk-modal-page')).to.be.false
        done()
      }, 150)
    }, 150)
  })
  it('ariaHidden', done => {
    vm = createVue({
      template: `
        <div>
          <vk-modal :show="show"></vk-modal>
        </div>
      `,
      data: () => ({
        show: false
      })
    }, true)
    vm.show = true
    const modal = vm.$children[0]
    setTimeout(() => {
      expect(modal.$el.getAttribute('aria-hidden')).to.equal('false')
      done()
    }, 10)
  })
  it('lightbox', () => {
    vm = createTest(Modal, {
      lightbox: true
    }, true)
    const dialog = vm.$refs.dialog
    expect(dialog.classList.contains('uk-modal-dialog-lightbox')).to.be.true
  })
  it('large', () => {
    vm = createTest(Modal, {
      large: true
    }, true)
    const dialog = vm.$refs.dialog
    expect(dialog.classList.contains('uk-modal-dialog-large')).to.be.true
  })

  describe('events', () => {
    beforeEach(done => {
      vm = createVue({
        template: `
          <div>
            <vk-modal :show="show"></vk-modal>
          </div>
        `,
        data: () => ({
          show: false
        })
      }, true)
      vm.show = true
      setTimeout(done, 150)
    })

    it('escKey', done => {
      const callback = sinon.spy()
      const modal = vm.$children[0]
      modal.$on('keyEsc', callback)
      triggerKeyEvent(document.documentElement, 27)
      setTimeout(() => {
        expect(callback).to.have.been.called
        done()
      }, 150)
    })
    it('clickOut', done => {
      const callback = sinon.spy()
      const modal = vm.$children[0]
      modal.$on('clickOut', callback)
      modal.$el.click()
      setTimeout(() => {
        expect(callback.called).to.be.true
        done()
      }, 150)
    })
    it('clickIn', done => {
      const callback = sinon.spy()
      const modal = vm.$children[0]
      modal.$on('clickIn', callback)
      modal.$refs.dialog.click()
      setTimeout(() => {
        expect(callback.called).to.be.true
        done()
      }, 150)
    })
    it('inactive', done => {
      const vm2 = createVue({
        template: `
          <div>
            <vk-modal :show="show"></vk-modal>
          </div>
        `,
        data: () => ({
          show: false
        })
      }, true)
      const callback = sinon.spy()
      const modal = vm.$children[0]
      modal.$on('inactive', callback)
      vm2.show = true
      setTimeout(() => {
        expect(callback.called).to.be.true
        done()
      }, 150)
    })
  })
})
