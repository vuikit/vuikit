import { createTest, destroyVM } from '../util'
import Button from 'src/lib/Button'

describe('Button', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })
  it('create', () => {
    vm = createTest(Button, {
      color: 'primary'
    }, true)
    let buttonElm = vm.$el
    expect(buttonElm.classList.contains('uk-button-primary')).to.be.true
  })
  it('type', () => {
    vm = createTest(Button, {
      type: 'submit'
    }, true)
    let buttonElm = vm.$el
    expect(buttonElm.getAttribute('type')).to.be.equal('submit')
  })
  it('ariaType', () => {
    vm = createTest(Button, {
      ariaType: 'checked'
    }, true)
    let buttonElm = vm.$el
    expect(buttonElm.hasAttribute('aria-checked')).to.be.true
  })
  it('disabled', () => {
    vm = createTest(Button, {
      disabled: true
    }, true)
    let buttonElm = vm.$el
    expect(buttonElm.hasAttribute('disabled')).to.be.true
  })
  it('active', () => {
    vm = createTest(Button, {
      active: true
    }, true)
    let buttonElm = vm.$el
    expect(buttonElm.getAttribute('aria-pressed')).to.be.ok
    expect(buttonElm.classList.contains('uk-active')).to.be.true
  })
  it('size', () => {
    vm = createTest(Button, {
      size: 'mini'
    }, true)
    let buttonElm = vm.$el
    expect(buttonElm.classList.contains('uk-button-mini')).to.be.true
  })
  it('width', () => {
    vm = createTest(Button, {
      width: '1-1'
    }, true)
    let buttonElm = vm.$el
    expect(buttonElm.classList.contains('uk-width-1-1')).to.be.true
  })
})
