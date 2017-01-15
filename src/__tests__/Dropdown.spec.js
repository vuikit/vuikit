import { createVue, destroyVM, triggerEvent, queryByTag, toJSON } from './_util'

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
    expect(toJSON(vm)).toMatchSnapshot()
  })

  it('gets the target correctly', () => {
    vm = createVue({
      template: `
        <div>
          <vk-button />
          <vk-dropdown :target="target" :transition="false">Dropdown</vk-dropdown>
        </div>`,
      data: () => ({
        target: false
      })
    }, true)

    const dropdown = queryByTag(vm, 'vk-dropdown')
    const button = queryByTag(vm, 'vk-button')
    expect(dropdown.targetElement).toEqual(vm.$el)
    vm.target = button
    return vm.$nextTick().then(() => {
      expect(dropdown.targetElement).toEqual(button)
    })
  })

  it('calculates the placement correctly', () => {
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
    return vm.$nextTick().then(() => {
      expect(dropdown.$el.getAttribute('x-placement')).toEqual('right')
    })
  })

  it('triggers event clickIn when clicked inside the dropdown', () => {
    vm = createVue(`
      <button>
        <vk-dropdown :show="true">
          <div ref="content">Content</div>
        </vk-dropdown>
      </button>`)
    const dropdown = queryByTag(vm, 'vk-dropdown')
    const content = vm.$refs.content
    const cb = jest.fn()

    dropdown.$on('clickIn', cb)
    triggerEvent(content, 'click', true)
    return vm.$nextTick().then(() => {
      expect(cb).toHaveBeenCalled()
    })
  })

  it('triggers event clickOut when clicked outside the dropdown', () => {
    vm = createVue(`<button><vk-dropdown :show="true" /></button>`)
    const dropdown = queryByTag(vm, 'vk-dropdown')
    const cb = jest.fn()

    dropdown.$on('clickOut', cb)
    triggerEvent(document, 'click')
    return vm.$nextTick().then(() => {
      expect(cb).toHaveBeenCalled()
    })
  })

  it('triggers event targetClick when clicked the target', () => {
    vm = createVue(`<button><vk-dropdown :show="true" /></button>`)
    const dropdown = queryByTag(vm, 'vk-dropdown')
    const cb = jest.fn()

    dropdown.$on('targetClick', cb)
    triggerEvent(vm.$el, 'click')
    return vm.$nextTick().then(() => {
      expect(cb).toHaveBeenCalled()
    })
  })

  it('triggers event targetMouseenter when target triggers mouseenter', () => {
    vm = createVue(`<button><vk-dropdown :show="true" /></button>`)
    const dropdown = queryByTag(vm, 'vk-dropdown')
    const cb = jest.fn()

    dropdown.$on('targetMouseenter', cb)
    triggerEvent(vm.$el, 'mouseenter')
    return vm.$nextTick().then(() => {
      expect(cb).toHaveBeenCalled()
    })
  })

  it('triggers event targetMouseleave when target triggers mouseleave', () => {
    vm = createVue(`<button><vk-dropdown :show="true" /></button>`)
    const dropdown = queryByTag(vm, 'vk-dropdown')
    const cb = jest.fn()

    dropdown.$on('targetMouseleave', cb)
    triggerEvent(vm.$el, 'mouseleave')
    return vm.$nextTick().then(() => {
      expect(cb).toHaveBeenCalled()
    })
  })
})
