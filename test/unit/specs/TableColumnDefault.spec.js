import { createVue, destroyVM } from '../util'
import { toArray } from 'helpers/util'

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

describe('Table Column Default', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  describe('rendering', () => {
    it('header', done => {
      vm = createVue({
        template: `
          <vk-table :data="testData">
            <vk-table-column header="Name" cell="name" />
            <vk-table-column header="Release" cell="release" />
            <vk-table-column header="Director" cell="director" />
            <vk-table-column header="Runtime " cell="runtime" />
          </vk-table>
        `,
        data: () => ({
          testData: getTestData()
        })
      })

      setTimeout(_ => {
        const ths = toArray(vm.$el.querySelectorAll('thead th'))
        expect(ths.map(node => node.textContent).filter(o => o))
          .to.eql(['Name', 'Release', 'Director', 'Runtime '])
        done()
      }, DELAY)
    })

    it('scopedSlots', done => {
      vm = createVue({
        template: `
          <vk-table :data="testData">
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
      })

      setTimeout(_ => {
        expect(vm.$el.querySelector('thead th').textContent.trim()).to.eql('Custom Header')
        expect(vm.$el.querySelector('tbody td').textContent.trim()).to.eql('Custom Cell')
        done()
      }, DELAY)
    })

    it('custom class', done => {
      vm = createVue({
        template: `
          <vk-table :data="testData">
            <vk-table-column headerClass="myHeaderClass" cellClass="myCellClass">
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
