import { createVue, destroyVM, triggerEvent, queryByTag, toJSON } from './_util'
import { each } from 'helpers/util'
import waitForUpdate from './_wait-for-update'

describe('Tooltip', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('renders correctly', () => {
    vm = createVue(`
      <button><vk-tooltip content="Content"></button>
    `)
    expect(toJSON(vm)).toMatchSnapshot()
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

  it('calculates the placement correctly', () => {
    vm = createVue(`
      <button><vk-tooltip placement="top" /></button>
    `)
    const tooltip = queryByTag(vm, 'vk-tooltip')
    expect(tooltip.$el.getAttribute('x-placement')).toEqual('top')
    expect(tooltip.$el.classList.contains('uk-tooltip-top')).toBeTruthy()

    // check placement conversion popper > uikit
    const placements = {
      'top': 'top',
      'top-start': 'top-left',
      'top-end': 'top-right',
      'right': 'right',
      'right-start': 'right',
      'right-end': 'right',
      'bottom': 'bottom',
      'bottom-start': 'bottom-left',
      'bottom-end': 'bottom-right',
      'left': 'left',
      'left-start': 'left',
      'left-end': 'left'
    }
    each(placements, (value, key) => {
      expect(tooltip.convertPlacement(key)).toEqual(value)
    })
  })

  it('displays when the show prop is set to true', done => {
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
