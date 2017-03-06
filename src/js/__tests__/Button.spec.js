import Vue from 'vue'
import Vuikit from 'vuikit'
import {
  createVue,
  createTest,
  destroyVM,
  renderSnapshot,
  queryByTag,
  queryByTagAll
} from 'jest/util'

Vue.use(Vuikit)

describe('Button', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('renders correctly', () => {
    vm = createVue(`
      <div>
        <vk-button>Default</vk-button>
        <vk-button primary>Primary</vk-button>
        <vk-button secondary>Secondary</vk-button>
        <vk-button danger>Danger</vk-button>
        <vk-button text>Text</vk-button>
        <vk-button link>Link</vk-button>
        <vk-button large>Large</vk-button>
        <vk-button small>small</vk-button>
        <vk-button type="submit">Submit Type</vk-button>
        <vk-button active>Active</vk-button>
        <vk-button disabled>disabled</vk-button>
      </div>
    `)
    expect(renderSnapshot(vm)).toMatchSnapshot()
  })

  it('triggers event click when the button was clicked', () => {
    vm = createTest(Vuikit.Button)
    const cb = jest.fn()
    vm.$on('click', cb)
    vm.$el.click()
    expect(cb).toHaveBeenCalled()
  })
})

describe('ButtonCheckbox', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('renders correctly', () => {
    vm = createVue(`
      <vk-button-checkbox :value="[10, 30]" group>
        <vk-button :value="10">Button 1</vk-button>
        <vk-button :value="20">Button 2</vk-button>
        <vk-button :value="30">Button 3</vk-button>
      </vk-button-checkbox>
    `)
    expect(renderSnapshot(vm)).toMatchSnapshot()
  })

  it('triggers event change when a button was clicked', () => {
    vm = createVue(`
      <vk-button-checkbox>
        <vk-button :value="10">Button 1</vk-button>
        <vk-button :value="20">Button 2</vk-button>
        <vk-button :value="30">Button 3</vk-button>
      </vk-button-checkbox>`
    )
    const checkbox = queryByTag(vm, 'vk-button-checkbox')
    const buttons = queryByTagAll(vm, 'vk-button')
    const cb = jest.fn()

    checkbox.$on('change', cb)
    buttons[0].$el.click()
    expect(cb).toHaveBeenCalled()
  })
})

describe('ButtonRadio', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('renders correctly', () => {
    vm = createVue(`
      <vk-button-radio :value="10" group>
        <vk-button :value="10">Button 1</vk-button>
        <vk-button :value="20">Button 2</vk-button>
        <vk-button :value="30">Button 3</vk-button>
      </vk-button-radio>
    `)
    expect(renderSnapshot(vm)).toMatchSnapshot()
  })

  it('triggers event change when a button was clicked', () => {
    const vm = createVue(`
      <vk-button-radio>
        <vk-button :value="10">Button 1</vk-button>
        <vk-button :value="20">Button 2</vk-button>
        <vk-button :value="30">Button 3</vk-button>
      </vk-button-radio>`
    , true)
    const cb = jest.fn()
    const radio = vm.$children[0]
    radio.$on('change', cb)
    radio.$children[0].$el.click()
    expect(cb).toHaveBeenCalled()
    destroyVM(vm)
  })
})
