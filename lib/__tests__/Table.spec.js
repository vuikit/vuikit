import Vue from 'vue'
import Vuikit from 'vuikit'
import {
  destroyVM,
  renderSnapshot,
  createVue,
  queryByTag,
  triggerEvent
} from 'jest/util'
import waitForUpdate from 'jest/wait-for-update'

Vue.use(Vuikit)

const testDataArr = []
const getTestData = function () {
  return [
    { name: 'Toy Story', release: '1995-11-22', director: 'John Lasseter', runtime: 80 },
    { name: 'A Bug\'s Life', release: '1998-11-25', director: 'John Lasseter', runtime: 95 },
    { name: 'Toy Story 2', release: '1999-11-24', director: 'John Lasseter', runtime: 92 },
    { name: 'Monsters, Inc.', release: '2001-11-2', director: 'Peter Docter', runtime: 92 },
    { name: 'Finding Nemo', release: '2003-5-30', director: 'Andrew Stanton', runtime: 100 }
  ]
}

getTestData().forEach(cur => {
  Object.keys(cur).forEach(prop => {
    testDataArr.push(cur[prop].toString())
  })
})

describe('Table', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('renders correctly', done => {
    vm = createVue({
      template: `
        <vk-table :data="testData">
          <vk-table-column header="Name" cell="name" headerClass="myHeaderClass" cellClass="myCellClass" />
          <vk-table-column>
            <template slot="header" scope="props">
              Custom Header
            </template>
            <template slot="cell" scope="props">
              Custom Cell
            </template>
          </vk-table-column>
        </vk-table>
      `,
      data: () => ({
        testData: getTestData()
      })
    }, true)
    waitForUpdate(() => {
      expect(document.body.innerHTML).toMatchSnapshot()
    }).then(done)
  })
})

describe('Table Column Sort', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('renders correctly', done => {
    vm = createVue({
      template: `
        <vk-table :data="testData">
          <vk-table-column-sort cell="name" headerClass="myHeaderClass" cellClass="myCellClass">
          <vk-table-column-sort>
            <template slot="header" scope="props">
              Custom Header
            </template>
            <template slot="cell" scope="props">
              Custom Cell
            </template>
          </vk-table-column-sort>
        </vk-table>
      `,
      data: () => ({
        testData: getTestData()
      })
    }, true)
    waitForUpdate(() => {
      expect(document.body.innerHTML).toMatchSnapshot()
    }).then(done)
  })

  it.skip('triggers event sort when the column header is clicked', done => {
    vm = createVue({
      template: `
        <vk-table :data="testData">
          <vk-table-column-sort cell="name"></vk-table-column-sort>
        </vk-table>
      `,
      data: () => ({
        testData: getTestData()
      })
    }, true)
    const table = queryByTag(vm, 'vk-table')
    const cb = jest.fn()

    table.$on('sort', cb)
    waitForUpdate(() => {
      triggerEvent(vm.$el.querySelector('thead th'), 'click')
    }).then(() => {
      const cbArgs = cb.mock.calls[0]
      expect(cb).toHaveBeenCalled()
      expect(cbArgs).toHaveLength(1)
    }).then(done)
  })
})

describe('Table Column Select', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('renders correctly', () => {
    vm = createVue({
      template: `
        <vk-table ref="table" :data="testData">
          <vk-table-column-select headerClass="myHeaderClass" cellClass="myCellClass">
        </vk-table>
      `,
      data: () => ({
        testData: getTestData()
      })
    }, true)
    expect(document.body.innerHTML).toMatchSnapshot()
  })

  it('triggers event selectAll when column checkbox is clicked', done => {
    vm = createVue({
      template: `
        <vk-table ref="table" :data="testData">
          <vk-table-column-select trackBy="slug" />
        </vk-table>
      `,
      data: () => ({
        testData: getTestData()
      })
    })
    const select = queryByTag(vm, 'vk-table-column-select')
    const cb = jest.fn()

    select.$on('selectAll', cb)
    waitForUpdate(() => {
      vm.$el.querySelector('thead th input[type="checkbox"]').click()
    }).then(() => {
      expect(cb).toHaveBeenCalled()
    }).then(done)
  })

  it('triggers event select when a row checkbox is clicked', done => {
    vm = createVue({
      template: `
        <vk-table ref="table" :data="testData">
          <vk-table-column-select trackBy="slug" />
        </vk-table>
      `,
      data: () => ({
        testData: getTestData()
      })
    })
    const select = queryByTag(vm, 'vk-table-column-select')
    const cb = jest.fn()
    select.$on('select', cb)

    waitForUpdate(() => {
      vm.$el.querySelector('tbody tr input[type="checkbox"]').click()
    }).then(() => {
      expect(cb).toHaveBeenCalled()
    }).then(done)
  })

  it('triggers event selectRow when a row tr tag is clicked', done => {
    vm = createVue({
      template: `
        <vk-table ref="table" :data="testData">
          <vk-table-column-select trackBy="slug" />
        </vk-table>
      `,
      data: () => ({
        testData: getTestData()
      })
    })
    const select = queryByTag(vm, 'vk-table-column-select')
    const cb = jest.fn()
    select.$on('selectRow', cb)

    waitForUpdate(() => {
      vm.$el.querySelector('tbody tr').click()
    }).then(() => {
      expect(cb).toHaveBeenCalled()
    }).then(done)
  })

  it('gets the right row id using the getRowId method', done => {
    vm = createVue({
      template: `
        <vk-table ref="table" :data="testData">
          <vk-table-column-select trackBy="release" :selection="selection" />
        </vk-table>
      `,
      data: () => ({
        selection: {},
        testData: getTestData()
      }),
      created () {
        this.testData.forEach(row => {
          this.$set(this.selection, row.release, true)
        })
      }
    }, true)
    const select = queryByTag(vm, 'vk-table-column-select')
    waitForUpdate(() => {
      expect(select.getRowId(vm.testData[1])).toEqual(vm.testData[1].release)
    }).then(done)
  })

  it('determines if the row is selected using isSelected', done => {
    vm = createVue({
      template: `
        <vk-table ref="table" :data="testData">
          <vk-table-column-select :trackBy="trackBy" :selection="selection" />
        </vk-table>
      `,
      data: () => ({
        testData: getTestData(),
        selection: {},
        trackBy: 'release'
      }),
      created () {
        this.testData.forEach(row => {
          this.$set(this.selection, row.release, true)
        })
      }
    })
    const select = queryByTag(vm, 'vk-table-column-select')
    waitForUpdate(() => {
      expect(select.isSelected(vm.testData[0])).toBeTruthy()
    }).then(done)
  })

  it('determines if all rows are selected using isAllSelected', done => {
    vm = createVue({
      template: `
        <vk-table ref="table" :data="testData">
          <vk-table-column-select :trackBy="trackBy" :selection="selection" />
        </vk-table>
      `,
      data: () => ({
        testData: getTestData(),
        selection: {},
        trackBy: 'release'
      }),
      created () {
        this.testData.forEach(row => {
          this.$set(this.selection, row.release, true)
        })
      }
    })
    const select = queryByTag(vm, 'vk-table-column-select')
    waitForUpdate(() => {
      expect(select.isAllSelected()).toBeTruthy()
    }).then(done)
  })
})
