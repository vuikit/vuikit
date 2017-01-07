import { createVue, destroyVM, queryByTag } from '../util'
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

describe('Table Column', () => {
  describe('rendering', () => {
    it('header', done => {
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

      setTimeout(_ => {
        const ths = toArray(vm.$el.querySelectorAll('thead th'))
        expect(ths.map(node => node.textContent).filter(o => o))
          .to.eql(['Name', 'Release', 'Director', 'Runtime '])
        done()
      }, DELAY)
    })

    it('scopedSlots', done => {
      const vm = createVue({
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
  })
})

describe('Table Column Select', () => {
  describe('events', () => {
    const createTable = () => {
      return createVue({
        template: `
          <vk-table :data="testData">
            <vk-table-column-select trackBy="release" />
            <vk-table-column header="Name" cell="name" />
            <vk-table-column header="Release" cell="release" />
            <vk-table-column header="Director" cell="director" />
            <vk-table-column header="Runtime " cell="runtime" />
          </vk-table>
        `,
        data: () => ({
          testData: getTestData()
        })
      }, true)
    }

    it('select', done => {
      const vm = createTable()
      const testData = getTestData()
      const select = queryByTag(vm, 'vk-table-column-select')
      const cb = sinon.spy()

      select.$on('select', cb)
      setTimeout(_ => {
        vm.$el.querySelectorAll('tbody tr input[type="checkbox"]')[1].click()
        setTimeout(_ => {
          const cbArgs = cb.args[0]
          expect(cb).to.have.been.called
          expect(cbArgs).to.length(2)
          expect(cbArgs[0]).to.equal(testData[1].release)
          expect(cbArgs[1]).to.have.property('name').to.equal(testData[1].name)
          destroyVM(vm)
          done()
        }, DELAY)
      }, DELAY)
    })

    it('selectRow', done => {
      const vm = createTable()
      const testData = getTestData()
      const select = queryByTag(vm, 'vk-table-column-select')
      const cb = sinon.spy()

      select.$on('selectRow', cb)
      setTimeout(_ => {
        vm.$el.querySelectorAll('tbody tr')[1].click()
        setTimeout(_ => {
          const cbArgs = cb.args[0]
          expect(cb).to.have.been.called
          expect(cbArgs).to.length(2)
          expect(cbArgs[0]).to.equal(testData[1].release)
          expect(cbArgs[1]).to.have.property('name').to.equal(testData[1].name)
          destroyVM(vm)
          done()
        }, DELAY)
      }, DELAY)
    })

    it('selectAll', done => {
      const vm = createTable()
      const testData = getTestData()
      const select = queryByTag(vm, 'vk-table-column-select')
      const cb = sinon.spy()

      select.$on('selectAll', cb)
      setTimeout(_ => {
        vm.$el.querySelector('thead th input[type="checkbox"]').click()
        setTimeout(_ => {
          const cbArgs = cb.args[0]
          expect(cb).to.have.been.called
          expect(cbArgs).to.length(2)
          expect(cbArgs[0]).to.length(testData.length)
          expect(cbArgs[0][0]).to.equal(testData[0].release)
          expect(cbArgs[1][0]).to.deep.equal(testData[0])
          destroyVM(vm)
          done()
        }, DELAY)
      }, DELAY)
    })
  })

  describe('methods', () => {
    const createTable = () => {
      return createVue({
        template: `
          <vk-table :data="testData">
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
      }, true)
    }

    it('getRowId', done => {
      const vm = createTable()
      const select = queryByTag(vm, 'vk-table-column-select')

      // with trackBy should return the row trackBy value
      expect(select.getRowId(vm.testData[1])).to.equal(vm.testData[1].release)

      vm.trackBy = ''
      setTimeout(_ => {
        // with no trackBy should return the row index
        expect(select.getRowId(vm.testData[1])).to.equal(1)
        destroyVM(vm)
        done()
      }, DELAY)
    })

    it('isSelected', done => {
      const vm = createTable()
      const select = queryByTag(vm, 'vk-table-column-select')

      setTimeout(_ => {
        expect(select.isSelected(vm.testData[0])).to.be.true
        destroyVM(vm)
        done()
      }, DELAY)
    })

    it('isAllSelected', done => {
      const vm = createTable()
      const select = queryByTag(vm, 'vk-table-column-select')

      setTimeout(_ => {
        expect(select.isAllSelected()).to.be.true
        destroyVM(vm)
        done()
      }, DELAY)
    })
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
  })
})
