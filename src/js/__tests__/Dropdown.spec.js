import Vue from 'vue'
import Vuikit from 'vuikit'
import {
  createVue,
  destroyVM,
  triggerEvent,
  queryByTag,
  renderSnapshot
} from 'jest/util'

Vue.use(Vuikit)

describe('Dropdown', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('renders correctly', () => {
    vm = createVue(`
      <button>
        <vk-dropdown>Dropdown</vk-dropdown>
      </button>
    `)
    expect(renderSnapshot(vm)).toMatchSnapshot()
  })

  it('gets the target correctly', () => {
    vm = createVue({
      template: `
        <div>
          <button ref="button" />
          <vk-dropdown :target="target" :transition="false">Dropdown</vk-dropdown>
        </div>`,
      data: () => ({
        target: false
      })
    }, true)

    const dropdown = queryByTag(vm, 'vk-dropdown')
    const button = vm.$refs.button
    expect(dropdown.targetElement).toEqual(vm.$el)
    vm.target = button
    return vm.$nextTick().then(() => {
      expect(dropdown.targetElement).toEqual(button)
    })
  })

  it('triggers event click-in when clicked inside the dropdown', () => {
    vm = createVue(`
      <button>
        <vk-dropdown :show="true">
          <div ref="content">Content</div>
        </vk-dropdown>
      </button>`)
    const dropdown = queryByTag(vm, 'vk-dropdown')
    const content = vm.$refs.content
    const cb = jest.fn()

    dropdown.$on('click-in', cb)
    triggerEvent(content, 'click', true)
    return vm.$nextTick().then(() => {
      expect(cb).toHaveBeenCalled()
    })
  })

  it('triggers event click-out when clicked outside the dropdown', () => {
    vm = createVue(`<button><vk-dropdown :show="true" /></button>`)
    const dropdown = queryByTag(vm, 'vk-dropdown')
    const cb = jest.fn()

    dropdown.$on('click-out', cb)
    triggerEvent(document, 'click')
    return vm.$nextTick().then(() => {
      expect(cb).toHaveBeenCalled()
    })
  })

  it('triggers event click-target when clicked the target', () => {
    vm = createVue(`<button><vk-dropdown :show="true" /></button>`)
    const dropdown = queryByTag(vm, 'vk-dropdown')
    const cb = jest.fn()

    dropdown.$on('click-target', cb)
    triggerEvent(vm.$el, 'click')
    return vm.$nextTick().then(() => {
      expect(cb).toHaveBeenCalled()
    })
  })

  it('triggers event mouseenter when target triggers mouseenter', () => {
    vm = createVue(`<button><vk-dropdown :show="true" /></button>`)
    const dropdown = queryByTag(vm, 'vk-dropdown')
    const cb = jest.fn()

    dropdown.$on('mouseenter', cb)
    triggerEvent(vm.$el, 'mouseenter')
    return vm.$nextTick().then(() => {
      expect(cb).toHaveBeenCalled()
    })
  })

  it('triggers event mouseleave when target triggers mouseleave', () => {
    vm = createVue(`<button><vk-dropdown :show="true" /></button>`)
    const dropdown = queryByTag(vm, 'vk-dropdown')
    const cb = jest.fn()

    dropdown.$on('mouseleave', cb)
    triggerEvent(vm.$el, 'mouseleave')
    return vm.$nextTick().then(() => {
      expect(cb).toHaveBeenCalled()
    })
  })
})
