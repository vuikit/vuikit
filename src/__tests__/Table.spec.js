import { createVue, destroyVM, toJSON } from './_util'
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

describe('Table', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('renders correctly', done => {
    vm = createVue({
      template: `
        <vk-table :data="testData" condensed striped hover />
      `,
      data: () => ({
        testData: getTestData()
      })
    })
    waitForUpdate(() => {
      expect(toJSON(vm)).toMatchSnapshot()
    }).then(done)
  })
})
