import Vue from 'vue/dist/vue.js'
import VkTable from '../../src/lib/Table'
import { orderBy } from 'lodash'

Vue.component('VkTable', VkTable)

describe('VkTable', () => {
  let $vm

  beforeEach(() => {
    $vm = new Vue({
      data: {
        striped: false,
        condensed: false,
        hover: false,
        sortOrder: {
          name: 'desc'
        },
        rawRows: [
          { name: 'Item B', id: 1, desc: 'Description 1' },
          { name: 'Item A', id: 2, desc: 'Description 2' }
        ],
      },
      computed: {
        rows () {
          const by = Object.keys(this.sortOrder)[0]
          const dir = this.sortOrder[by]
          return orderBy(this.rawRows, [item => item[by]], dir)
        }
      },
      methods: {
        sortRows (sortOrder) {
          this.sortOrder = sortOrder
        }
      },
      template: `<vk-table ref="table"
        :fields="[{
          name: 'id',
          sortBy: true
        }, {
          name: 'name',
          sortBy: true
        }, {
          name: 'desc',
          header: 'Description',
          headerClass: 'uk-text-right',
          cellClass: 'uk-text-right'
        }]"
        :rows="rows"
        :striped="striped"
        :condensed="condensed"
        :hover="hover"
        :sort-order="sortOrder"
        @sort="
          sortRows(arguments[0])
        ">
      </vk-table>`
    }).$mount()
    document.body.appendChild($vm.$el)
  })

  it('should set condensed style', done => {
    expect($vm.$el.classList.contains('uk-table-condensed')).toBeFalsy()
    $vm.condensed = true
    waitForUpdate(() => {
      expect($vm.$el.classList.contains('uk-table-condensed')).toBeTruthy()
    }).then(done)
  })

  it('should set hover style', done => {
    expect($vm.$el.classList.contains('uk-table-hover')).toBeFalsy()
    $vm.hover = true
    waitForUpdate(() => {
      expect($vm.$el.classList.contains('uk-table-hover')).toBeTruthy()
    }).then(done)
  })

  it('should set striped style', done => {
    expect($vm.$el.classList.contains('uk-table-striped')).toBeFalsy()
    $vm.striped = true
    waitForUpdate(() => {
      expect($vm.$el.classList.contains('uk-table-striped')).toBeTruthy()
    }).then(done)
  })

  it('should render correct rows and columns', () => {
    let tr = $vm.$el.querySelectorAll('tbody tr')
    checkRowOrdering(tr, 'id', 'asc')
  })

  it('should render correct header fields', () => {
    let th = $vm.$el.querySelectorAll('thead th')
    expect(th[0].innerHTML).toBe('Id<i class="uk-icon-justify uk-margin-small-left uk-invisible vk-icon-arrow-down"></i>')
    expect(th[1].innerHTML).toBe('Name<i class="uk-icon-justify uk-margin-small-left vk-icon-arrow-up"></i>')
    expect(th[2].innerHTML).toBe('Description')
  })

  it('should sort the rows by ID', done => {
    let tr = $vm.$el.querySelectorAll('tbody tr')
    $vm.$el.querySelectorAll('thead th')[0].click()
    waitForUpdate(() => {
      checkRowOrdering(tr, 'id', $vm.sortOrder.id)
      $vm.$el.querySelectorAll('thead th')[1].click()
    }).then(() => {
      checkRowOrdering(tr, 'id', $vm.sortOrder.id)
      $vm.$el.querySelectorAll('thead th')[0].click()
    }).then(() => {
      checkRowOrdering(tr, 'id', $vm.sortOrder.id)
    }).then(done)
  })

  it('should sort the rows by name', done => {
    let tr = $vm.$el.querySelectorAll('tbody tr')
    $vm.$el.querySelectorAll('thead th')[0].click()
    waitForUpdate(() => {
      checkRowOrdering(tr, 'name', $vm.sortOrder.name)
      $vm.$el.querySelectorAll('thead th')[1].click()
    }).then(() => {
      checkRowOrdering(tr, 'name', $vm.sortOrder.name)
      $vm.$el.querySelectorAll('thead th')[0].click()
    }).then(() => {
      checkRowOrdering(tr, 'name', $vm.sortOrder.name)
    }).then(done)
  })

  function checkRowOrdering (tr, field, direction) {
    let id1, id2
    if (field === 'id') {
      id1 = direction === 'asc' ? 0 : 1
      id2 = direction === 'asc' ? 1 : 0
    } else if (field === 'name') {
      id1 = direction === 'asc' ? 1 : 0
      id2 = direction === 'asc' ? 0 : 1
    }
    expect(tr[id1].children[0].innerHTML).toBe('1')
    expect(tr[id1].children[1].innerHTML).toBe('Item B')
    expect(tr[id1].children[2].innerHTML).toBe('Description 1')
    expect(tr[id2].children[0].innerHTML).toBe('2')
    expect(tr[id2].children[1].innerHTML).toBe('Item A')
    expect(tr[id2].children[2].innerHTML).toBe('Description 2')
  }
})

