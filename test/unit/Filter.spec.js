import Vue from 'vue/dist/vue.js'
import VkFilter from '../../src/lib/Filter'
Vue.component('VkFilter', VkFilter)

describe('VkFilter', () => {
  let $vm, spy

  beforeEach(() => {
    spy = jasmine.createSpy('emitter')
    $vm = new Vue({
      data: {
        showReset: true,
        emited: false,
        query: ''
      },
      methods: {
        spy
      },
      template: `<vk-filter
        :filters="[
          { name: 'Filter Foo', query: 'from:hi@retrace.io,foo@gmail.com subject:vacations date:1/10/2013-15/04/2014 photos' },
          { name: 'Filter Bar', query: 'subject:bar date:-15/04/2014' }
        ]"
        :parser="{
          keywords: ['from', 'subject'],
          ranges: ['date']
        }"
        :showReset="showReset"
        @query="spy">
        <input v-model="query"/>
      </vk-filter>`
    }).$mount()
    document.body.appendChild($vm.$el)
  })

  // it('should call query handler with parsed search line in args', done => {
  //   let search = 'from:hi@retrace.io subject:unitTest'
  //   $vm.$el.querySelector('input').value = search
  //   triggerEvent($vm.$el.querySelector('input'), 'input')
  //   waitForUpdate(() => {
  //     console.log('IN TIMROUE')
  //     expect(spy.calls.count()).toBe(1)
  //     const args = spy.calls.allArgs()
  //     console.log(args)
  //     // expect(args[0][0]).toEqual({from: 'hi@retrace.io', subject: 'unitTest'})
  //     // expect(args[0][1]).toBe(search)
  //   }).then(done)
  // })

  // it('should show / hide cross button', done => {
  //   let search = 'from:hi@retrace.io subject:unitTest'
  //   $vm.$el.querySelector('input').value = search
  //   triggerEvent($vm.$el.querySelector('input'), 'input')
  //
  //   waitForUpdate(() => {
  //     expect($vm.$el.querySelector('.uk-icon-remove')).not.toBeNull()
  //     $vm.showReset = false
  //   }).then(() => {
  //     expect($vm.$el.querySelector('.uk-icon-remove')).toBeNull()
  //   }).then(done)
  // })
})

