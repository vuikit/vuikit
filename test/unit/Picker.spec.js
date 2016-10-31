import Vue from 'vue/dist/vue.js'
import VkPicker from '../../src/lib/Picker'
import VkTable from '../../src/lib/Table'
import VkDropdown from '../../src/lib/Dropdown'

Vue.component('VkPicker', VkPicker)
Vue.component('VkTable', VkTable)
Vue.component('VkDropdown', VkDropdown)

describe('Picker', () => {
  let $vm, spy

  beforeEach(() => {
    spy = jasmine.createSpy()
    $vm = new Vue({
      data: {
        message: ''
      },
      methods: {
        spy
      },
      template: `
      <vk-picker
        :fields="[{
          name: 'name',
          pickable: 'id'
        }, {
          name: 'hits',
          pickable: true
        }, {
          name: 'description'
        }]"
        :rows="[{
          id: 1,
          name: 'Item 1',
          hits: 34,
          description: 'The item description'
        }, {
          id: 2,
          name: 'Item 2',
          hits: 56,
          description: 'The item description'
        }]"
        @pick="spy(arguments[0], arguments[1])">
      </vk-picker>`
    }).$mount()
    document.body.appendChild($vm.$el)
  })

  afterEach(() => {
    document.body.removeChild($vm.$el)
  })

  it('should work pick of items', done => {
    expect($vm.message).toBe('')
    $vm.$el.querySelectorAll('tr')[1].querySelectorAll('td a')[1].click()
    waitForUpdate(() => {
      expect(spy.calls.count()).toBe(1)
      let args1 = spy.calls.argsFor(0)
      expect(args1[0]).toEqual(34)
      expect(args1[1]).toEqual('hits')
      $vm.$el.querySelectorAll('tr')[2].querySelectorAll('td a')[0].click()
    }).then(() => {
      expect(spy.calls.count()).toBe(2)
      let args2 = spy.calls.argsFor(1)
      expect(args2[0]).toEqual(2)
      expect(args2[1]).toEqual('name')
    }).then(done)
  })
})
