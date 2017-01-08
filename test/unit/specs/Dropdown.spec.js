import { createVue, destroyVM, triggerEvent, queryByTag } from '../util'

const DELAY = 10

describe('Dropdown', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('create', () => {
    vm = createVue(`
      <button>
        <vk-dropdown>Dropdown</vk-dropdown>
      </button>`)

    const dropdown = queryByTag(vm, 'vk-dropdown')
    expect(dropdown.$el.classList.contains('uk-dropdown')).to.true
    expect(dropdown.$el.style.display).to.equal('none')
    expect(dropdown.$el.innerText).to.equal('Dropdown')
  })

  it('target', done => {
    vm = createVue({
      template: `
        <div>
          <vk-button />
          <vk-dropdown :target="target">Dropdown</vk-dropdown>
        </div>`,
      data: () => ({
        target: false
      })
    })

    const dropdown = queryByTag(vm, 'vk-dropdown')
    const button = queryByTag(vm, 'vk-button')
    expect(dropdown.targetElement).to.equal(vm.$el)
    vm.target = button
    setTimeout(_ => {
      expect(dropdown.targetElement).to.equal(button)
      done()
    }, DELAY)
  })

  it('placement', done => {
    vm = createVue({
      template: `
        <button>
          <vk-dropdown :placement="placement" :modifiers="modifiers">Dropdown</vk-dropdown>
        </button>`,
      data: () => ({
        placement: 'right',
        modifiers: {
          flip: {
            enabled: false
          }
        }
      })
    })

    const dropdown = queryByTag(vm, 'vk-dropdown')
    expect(dropdown.$el.getAttribute('x-placement')).to.equal('right')
    vm.placement = 'left-start'
    setTimeout(_ => {
      expect(dropdown.$el.getAttribute('x-placement')).to.equal('left-start')
      done()
    }, DELAY)
  })

  describe('Events', () => {
    it('clickIn', done => {
      vm = createVue(`
        <button>
          <vk-dropdown :show="true">
            <div ref="content">Content</div>
          </vk-dropdown>
        </button>`)
      const dropdown = queryByTag(vm, 'vk-dropdown')
      const content = vm.$refs.content
      const cb = sinon.spy()

      dropdown.$on('clickIn', cb)
      triggerEvent(content, 'click', true)
      setTimeout(_ => {
        expect(cb).to.have.been.called
        done()
      }, DELAY)
    })

    it('clickOut', done => {
      vm = createVue(`<button><vk-dropdown :show="true" /></button>`)
      const dropdown = queryByTag(vm, 'vk-dropdown')
      const cb = sinon.spy()

      dropdown.$on('clickOut', cb)
      triggerEvent(document, 'click')
      setTimeout(_ => {
        expect(cb).to.have.been.called
        done()
      }, DELAY)
    })

    it('targetClick', done => {
      vm = createVue(`<button><vk-dropdown :show="true" /></button>`)
      const dropdown = queryByTag(vm, 'vk-dropdown')
      const cb = sinon.spy()

      dropdown.$on('targetClick', cb)
      triggerEvent(vm.$el, 'click')
      setTimeout(_ => {
        expect(cb).to.have.been.called
        done()
      }, DELAY)
    })

    it('targetMouseenter', done => {
      vm = createVue(`<button><vk-dropdown :show="true" /></button>`)
      const dropdown = queryByTag(vm, 'vk-dropdown')
      const cb = sinon.spy()

      dropdown.$on('targetMouseenter', cb)
      triggerEvent(vm.$el, 'mouseenter')
      setTimeout(_ => {
        expect(cb).to.have.been.called
        done()
      }, DELAY)
    })

    it('targetMouseleave', done => {
      vm = createVue(`<button><vk-dropdown :show="true" /></button>`)
      const dropdown = queryByTag(vm, 'vk-dropdown')
      const cb = sinon.spy()

      dropdown.$on('targetMouseleave', cb)
      triggerEvent(vm.$el, 'mouseleave')
      setTimeout(_ => {
        expect(cb).to.have.been.called
        done()
      }, DELAY)
    })
  })
})
