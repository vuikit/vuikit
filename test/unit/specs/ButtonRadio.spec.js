import { createVue, destroyVM } from '../util'
import { toArray } from 'src/helpers/util'

describe('ButtonRadio', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('create', () => {
    vm = createVue(`
      <vk-button-radio>
        <vk-button :value="10">Button 1</vk-button>
        <vk-button :value="20">Button 2</vk-button>
        <vk-button :value="30">Button 3</vk-button>
      </vk-button-radio>
    `)
    expect(vm.$el.classList.contains('uk-button-group')).to.be.true
  })
  it('buttons', () => {
    vm = createVue(`
      <vk-button-radio>
        <vk-button :value="10">Button 1</vk-button>
        <vk-button :value="20">Button 2</vk-button>
        <vk-button :value="30">Button 3</vk-button>
      </vk-button-radio>
    `)
    expect(toArray(vm.$el.querySelectorAll('button')).every(btn =>
      btn.hasAttribute('aria-checked')
    )).to.be.true
  })
  it('click', done => {
    vm = createVue({
      template: `
        <vk-button-radio ref="radio"
          :value="value"
          @change="value = arguments[0]">
          <vk-button :value="10">Button 1</vk-button>
          <vk-button :value="20">Button 2</vk-button>
          <vk-button :value="30">Button 3</vk-button>
        </vk-button-radio>
      `,
      data: () => ({
        value: []
      })
    })
    const radio = vm.$refs.radio
    const callback = sinon.spy()

    radio.$on('change', callback)
    vm.$el.children[0].click()
    setTimeout(_ => {
      expect(radio.$children[0].active).to.be.true
      expect(radio.$children[1].active).to.be.false
      expect(radio.$children[2].active).to.be.false
      done()
    }, 300)
  })
})
