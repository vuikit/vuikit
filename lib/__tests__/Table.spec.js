import Vue from 'vue'
import Vuikit from 'vuikit'
import {
  destroyVM,
  createVue,
  queryByTag,
  triggerEvent
} from 'jest/util'
import waitForUpdate from 'jest/wait-for-update'

Vue.use(Vuikit)

const testDataArr = []
const getTestData = function () {
  return [
    { slug: 'toy-story', name: 'Toy Story', release: '1995-11-22' },
    { slug: 'a-bugs-life', name: 'A Bug\'s Life', release: '1998-11-25' },
    { slug: 'toy-story-2', name: 'Toy Story 2', release: '1999-11-24' },
    { slug: 'monsters-inc.', name: 'Monsters, Inc.', release: '2001-11-2' },
    { slug: 'finding-nemo', name: 'Finding Nemo', release: '2003-5-30' }
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
          <vk-table-columns :definition="definition" />
        </vk-table>
      `,
      data: () => ({
        testData: getTestData(),
        definition: [
          {
            header: 'Slug',
            cell: 'slug'
          },
          {
            type: 'sort',
            header: 'Name',
            headerClass: 'header-class',
            cell: 'name',
            cellClass: 'cellClass'
          },
          {
            headerRender: ({ row }) => 'Custom Header Render',
            cellRender: ({ row }) => 'Custom Cell Render'
          }
        ]
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

  it('triggers event sort when the column header is clicked', done => {
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
      triggerEvent(vm.$el.querySelector('thead th a'), 'click')
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
        <vk-table :data="testData">
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
        <vk-table :data="testData">
          <vk-table-column-select />
        </vk-table>
      `,
      data: () => ({
        testData: getTestData()
      })
    })
    const select = queryByTag(vm, 'vk-table-column-select')
    const cb = jest.fn()

    select.$on('select-all', cb)
    waitForUpdate(() => {
      vm.$el.querySelector('thead th input[type="checkbox"]').click()
    }).then(() => {
      expect(cb).toHaveBeenCalled()
    }).then(done)
  })

  it('triggers event select when a row checkbox is clicked', done => {
    vm = createVue({
      template: `
        <vk-table :data="testData">
          <vk-table-column-select />
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
})
