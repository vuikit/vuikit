import Vue from 'vue'
import Vuikit from 'vuikit'
import {
  createVue,
  destroyVM,
  triggerEvent,
  queryByTag,
  renderSnapshot
} from 'jest/util'
import waitForUpdate from 'jest/wait-for-update'

Vue.use(Vuikit)

describe('Tooltip', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('renders correctly', () => {
    vm = createVue(`
      <button><vk-tooltip content="Content" /></button>
    `)
    expect(renderSnapshot(vm)).toMatchSnapshot()
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

  it('displays when the show prop is set to true', done => {
    vm = createVue(`
      <button><vk-tooltip /></button>
    `, true)
    const tooltip = queryByTag(vm, 'vk-tooltip')
    const cb = jest.fn()

    // set cb
    tooltip.$on('show', cb)
    // fake time
    jest.useFakeTimers()
    // mock mouse event
    triggerEvent(vm.$el, 'mouseenter')
    // make sure all timers have run
    jest.runAllTimers()
    // expect
    waitForUpdate(() => {
      expect(cb).toHaveBeenCalled()
      expect(tooltip.$el.style.display).not.toEqual('none')
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
