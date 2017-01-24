import { createVue, destroyVM, triggerEvent, queryByTag, getSnapshot } from './_util'
import { each } from 'helpers/util'
import waitForUpdate from './_wait-for-update'

describe('Tooltip', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('renders correctly', () => {
    const snapshot = getSnapshot(`
      <button><vk-tooltip content="Content"></button>
    `)
    expect(snapshot).toMatchSnapshot()
  })

  it('fallback to parent target by default', done => {
    vm = createVue({
      template: `
        <div>
          <vk-button />
          <vk-tooltip :target="target" />
        </div>`,
      data: () => ({
        target: false
      })
    })

    const tooltip = queryByTag(vm, 'vk-tooltip')
    const button = queryByTag(vm, 'vk-tooltip')
    expect(tooltip.targetElement).toEqual(vm.$el)
    vm.target = button
    waitForUpdate(() => {
      expect(tooltip.targetElement).toEqual(button)
    }).then(done)
  })

  it.skip('displays when the show prop is set to true', done => {
    vm = createVue(`
      <button><vk-tooltip /></button>
    `)
    const tooltip = queryByTag(vm, 'vk-tooltip')
    const cb = jest.fn()

    tooltip.$on('show', cb)
    triggerEvent(vm.$el, 'mouseenter')
    waitForUpdate(() => {
      expect(tooltip.$el.style.display).not.toEqual('none')
      expect(cb).toHaveBeenCalled()
    }).then(done)
  })

  it('hides and triggers hide event on target mouseleave', done => {
    vm = createVue(`
      <button><vk-tooltip /></button>
    `)
    const tooltip = queryByTag(vm, 'vk-tooltip')
    const cb = jest.fn()

    tooltip.$on('hide', cb)
    triggerEvent(vm.$el, 'mouseenter')
    triggerEvent(vm.$el, 'mouseleave')
    waitForUpdate(() => {
      expect(tooltip.$el.style.display).toEqual('none')
      expect(cb).toHaveBeenCalled()
    }).then(done)
  })

  it('hides when show prop is set to false', done => {
    vm = createVue(`
      <button><vk-tooltip /></button>
    `)
    const tooltip = queryByTag(vm, 'vk-tooltip')
    const cb = jest.fn()

    tooltip.$on('hide', cb)
    triggerEvent(vm.$el, 'mouseenter')
    triggerEvent(vm.$el, 'mouseleave')
    waitForUpdate(() => {
      expect(tooltip.$el.style.display).toEqual('none')
      expect(cb).toHaveBeenCalled()
    }).then(done)
  })
})
