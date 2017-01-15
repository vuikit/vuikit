import { createVue, destroyVM, queryByTag, toJSON } from './_util'
import waitForUpdate from './_wait-for-update'

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

describe('Table Column Sort', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('renders correctly', done => {
    vm = createVue({
      template: `
        <vk-table :data="testData">
          <vk-table-column-sort headerClass="myHeaderClass" cellClass="myCellClass">
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
    })
    waitForUpdate(() => {
      expect(toJSON(vm)).toMatchSnapshot()
    }).then(done)
  })

  it('triggers event sort when the column header is clicked', done => {
    const vm = createVue({
      template: `
        <vk-table :data="testData">
          <vk-table-column-sort />
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
      vm.$el.querySelector('thead th').click()
    }).then(() => {
      const cbArgs = cb.mock.calls[0]
      expect(cb).toHaveBeenCalled()
      expect(cbArgs).toHaveLength(1)
    }).then(done)
  })
})
