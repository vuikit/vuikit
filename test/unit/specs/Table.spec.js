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

describe('Table', () => {
  describe('rendering', () => {
    const vm = createVue({
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

    it('row length', () => {
      expect(vm.$el.querySelectorAll('tbody tr')).to.length(getTestData().length)
    })

    it('row data', () => {
      const cells = toArray(vm.$el.querySelectorAll('td'))
        .map(node => node.textContent)
      expect(cells).to.eql(testDataArr)
      destroyVM(vm)
    })
  })

  describe('attributes', () => {
    const vm = createVue({
      template: `
        <vk-table :data="testData" condensed striped hover>
          <vk-table-column header="Name" cell="name" />
        </vk-table>
      `,
      data: () => ({
        testData: getTestData()
      })
    })

    it('condensed', done => {
      setTimeout(_ => {
        expect(vm.$el.classList.contains('uk-table-condensed')).to.true
        done()
      }, DELAY)
    })

    it('striped', done => {
      setTimeout(_ => {
        expect(vm.$el.classList.contains('uk-table-striped')).to.true
        done()
      }, DELAY)
    })

    it('hover', done => {
      setTimeout(_ => {
        expect(vm.$el.classList.contains('uk-table-hover')).to.true
        done()
      }, DELAY)
    })
  })
})
