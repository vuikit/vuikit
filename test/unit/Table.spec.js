import Vue from 'vue/dist/vue.js'
import VkTable from '../../src/lib/Table'
import { orderBy } from 'lodash'

Vue.component('VkTable', VkTable)

describe('VkTable', () => {
  let $vm

  beforeEach(() => {
    $vm = new Vue({
      data: {
        selectable: true,
        striped: false,
        condensed: false,
        hover: false,
        selectedRows: [],
        sortOrder: {
          name: 'asc'
        },
        rows: [
          { id: 1, name: 'Item A', hits: 100, desc: 'Description 1' },
          { id: 2, name: 'Item B', hits: 40, desc: 'Description 2' },
          { id: 3, name: 'Item C', hits: 700, desc: 'Description 3' }
        ],
        selection: {},
        fields: [{
          name: 'name',
          sortBy: true
        }, {
          name: 'hits',
          sortBy: true,
          headerClass: 'vk-table-width-minimum'
        }, {
          name: 'desc',
          header: 'Description',
          cell (h, { props }) {
            return props.row[ props.field.name ]
          }
        }]
      },
      computed: {
        sortedRows () {
          const by = Object.keys(this.sortOrder)[0]
          const dir = this.sortOrder[by]
          return orderBy(this.rows, [item => item[by]], dir)
        }
      },
      template: `<vk-table
        class="uk-form"
        ref="table"
        trackBy="id"
        :fields="fields"
        :rows="sortedRows"
        :selectable="selectable"
        :selection="selection"
        :condensed="condensed"
        :striped="striped"
        :hover="hover"
        :sort-order="sortOrder"
        @sort="
          sortOrder = arguments[0]
        "
        @clickRow="
          selection[arguments[0]]
            ? $delete(selection, arguments[0])
            : $set(selection, arguments[0], true)
        "
        @select="
          selection[arguments[0]]
            ? $delete(selection, arguments[0])
            : $set(selection, arguments[0], true)
        "
        @selectAll="
          Object.keys(selection).length !== rows.length
            ? arguments[0].forEach(function(rowId) { $set(selection, rowId, true) })
            : selection = {}
        ">
      </vk-table>`
    }).$mount()
    document.body.appendChild($vm.$el)
  })

  afterEach(() => {
    document.body.removeChild($vm.$el)
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
    checkRowOrdering(tr)
  })

  it('should render correct header fields', () => {
    let th = $vm.$el.querySelectorAll('thead th')
    expect(th[0].innerHTML).toBe('<input type="checkbox">')
    expect(th[1].innerHTML).toBe('<span class="uk-position-relative">Name<i class="uk-icon-justify uk-margin-small-left vk-icon-arrow-down"></i></span>')
    expect(th[2].innerHTML).toBe('<span class="uk-position-relative">Hits<i class="uk-icon-justify uk-margin-small-left uk-invisible vk-icon-arrow-down"></i></span>')
    expect(th[3].innerHTML).toBe('Description')
  })

  it('should sort the rows by name', done => {
    let tr = $vm.$el.querySelectorAll('tbody tr')
    $vm.$el.querySelectorAll('thead th')[1].click()
    waitForUpdate(() => {
      checkRowOrdering(tr)
      $vm.$el.querySelectorAll('thead th')[1].click()
    }).then(() => {
      checkRowOrdering(tr)
      $vm.$el.querySelectorAll('thead th')[0].click()
    }).then(() => {
      checkRowOrdering(tr)
    }).then(done)
  })

  it('should sort the rows by hits', done => {
    let tr = $vm.$el.querySelectorAll('tbody tr')
    $vm.$el.querySelectorAll('thead th')[2].click()
    waitForUpdate(() => {
      checkRowOrdering(tr)
      $vm.$el.querySelectorAll('thead th')[1].click()
    }).then(() => {
      checkRowOrdering(tr)
      $vm.$el.querySelectorAll('thead th')[0].click()
    }).then(() => {
      checkRowOrdering(tr)
    }).then(done)
  })

  it('should work bulk select', done => {
    expect($vm.selection).toEqual({})
    $vm.$el.querySelectorAll('thead tr th')[0].querySelector('input').click()
    waitForUpdate(() => {
      expect($vm.selection).toEqual({1: true, 2: true, 3: true})
      $vm.$el.querySelectorAll('thead tr th')[0].querySelector('input').click()
    }).then(() => {
      expect($vm.selection).toEqual({})
    }).then(done)
  })

  it('should select items in right order', done => {
    expect($vm.selection).toEqual({})
    $vm.$el.querySelectorAll('tbody tr td:nth-child(1) input')[2].click()
    waitForUpdate(() => {
      expect($vm.selection).toEqual({3: true})
      $vm.$el.querySelectorAll('tbody tr td:nth-child(1) input')[0].click()
    }).then(() => {
      expect($vm.selection).toEqual({3: true, 1: true})
      $vm.$el.querySelectorAll('tbody tr td:nth-child(1) input')[1].click()
    }).then(() => {
      expect($vm.selection).toEqual({3: true, 1: true, 2: true})
    }).then(done)
  })

  function checkRowOrdering (tr) {
    let id1, id2, id3
    let orderField = Object.keys($vm.sortOrder)[0]
    let orderDirection = $vm.sortOrder[Object.keys($vm.sortOrder)[0]]
    if (orderField === 'hits') {
      id1 = 1
      id2 = orderDirection === 'asc' ? 0 : 2
      id3 = orderDirection === 'asc' ? 2 : 0
    } else if (orderField === 'name') {
      id1 = orderDirection === 'asc' ? 0 : 2
      id2 = 1
      id3 = orderDirection === 'asc' ? 2 : 0
    }
    expect(tr[id1].children[0].innerHTML).toBe('<input type="checkbox">')
    expect(tr[id1].children[1].innerHTML).toBe('Item A')
    expect(tr[id1].children[2].innerHTML).toBe('100')
    expect(tr[id1].children[3].innerHTML).toBe('Description 1')

    expect(tr[id2].children[0].innerHTML).toBe('<input type="checkbox">')
    expect(tr[id2].children[1].innerHTML).toBe('Item B')
    expect(tr[id2].children[2].innerHTML).toBe('40')
    expect(tr[id2].children[3].innerHTML).toBe('Description 2')

    expect(tr[id3].children[0].innerHTML).toBe('<input type="checkbox">')
    expect(tr[id3].children[1].innerHTML).toBe('Item C')
    expect(tr[id3].children[2].innerHTML).toBe('700')
    expect(tr[id3].children[3].innerHTML).toBe('Description 3')
  }
})
