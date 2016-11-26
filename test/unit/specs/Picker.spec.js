import { createTest, destroyVM } from '../util'
import Picker from 'src/lib/Picker'

const fields = [{
  name: 'name',
  pickable: 'id'
}, {
  name: 'hits',
  pickable: true
}, {
  name: 'description'
}]

const rows = [{
  id: 1,
  name: 'Item 1',
  hits: 34,
  description: 'The item description'
}, {
  id: 2,
  name: 'Item 2',
  hits: 56,
  description: 'The item description'
}]

describe('Picker', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })
  it('create', () => {
    vm = createTest(Picker, {
      fields,
      rows
    })
    const elm = vm.$el
    expect(elm.classList.contains('uk-table')).to.be.true
  })
})
