import { createVue, destroyVM, queryByTag } from '../util'

const DELAY = 10
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
  describe('events', () => {
    it('sort', done => {
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
      const cb = sinon.spy()

      table.$on('sort', cb)
      setTimeout(_ => {
        vm.$el.querySelector('thead th').click()
        setTimeout(_ => {
          const cbArgs = cb.args[0]
          expect(cb).to.have.been.called
          expect(cbArgs).to.length(1)
          destroyVM(vm)
          done()
        }, DELAY)
      }, DELAY)
    })

    it('custom class', done => {
      const vm = createVue({
        template: `
          <vk-table :data="testData">
            <vk-table-column-sort headerClass="myHeaderClass" cellClass="myCellClass">
          </vk-table>
        `,
        data: () => ({
          testData: getTestData()
        })
      })

      setTimeout(_ => {
        expect(vm.$el.querySelector('thead th').classList.contains('myHeaderClass')).to.be.true
        expect(vm.$el.querySelector('tbody td').classList.contains('myCellClass')).to.be.true
        done()
      }, DELAY)
    })
  })
})
