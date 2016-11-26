import { createVue, destroyVM } from '../util'
import { toArray } from 'src/helpers/util'

describe('ButtonCheckbox', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('create', () => {
    vm = createVue(`
      <vk-button-checkbox>
        <vk-button :value="10">Button 1</vk-button>
        <vk-button :value="20">Button 2</vk-button>
        <vk-button :value="30">Button 3</vk-button>
      </vk-button-checkbox>
    `)
    expect(vm.$el.classList.contains('uk-button-group')).to.be.true
  })
  it('buttons', () => {
    vm = createVue(`
      <vk-button-checkbox>
        <vk-button :value="10">Button 1</vk-button>
        <vk-button :value="20">Button 2</vk-button>
        <vk-button :value="30">Button 3</vk-button>
      </vk-button-checkbox>
    `)
    expect(toArray(vm.$el.querySelectorAll('button')).every(btn =>
      btn.hasAttribute('aria-checked')
    )).to.be.true
  })
  it('click', done => {
    vm = createVue({
      template: `
        <vk-button-checkbox ref="checkbox"
          :value="value"
          @change="value = arguments[0]">
          <vk-button :value="10">Button 1</vk-button>
          <vk-button :value="20">Button 2</vk-button>
          <vk-button :value="30">Button 3</vk-button>
        </vk-button-checkbox>
      `,
      data: () => ({
        value: []
      })
    })
    const checkbox = vm.$refs.checkbox
    const callback = sinon.spy()

    checkbox.$on('change', callback)

    vm.$el.children[0].click()
    setTimeout(_ => {
      vm.$el.children[1].click()
      setTimeout(_ => {
        expect(checkbox.$children[0].active).to.be.true
        expect(checkbox.$children[1].active).to.be.true
        expect(checkbox.$children[2].active).to.be.false
        done()
      }, 300)
    }, 300)
  })
})
