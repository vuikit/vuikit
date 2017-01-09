/* eslint-disable */

import { createVue, destroyVM, queryByTag } from '../util'
import checkbox from 'src/lib/Table/columns/checkbox'

const DELAY = 10
const testDataArr = []

const getTestData = function () {
  return [
    { name: 'Toy Story', slug: 'toy-story', release: '1995-11-22', director: 'John Lasseter', runtime: 80 },
    { name: 'A Bug\'s Life', slug: 'a-bugs-life', release: '1998-11-25', director: 'John Lasseter', runtime: 95 },
    { name: 'Toy Story 2', slug: 'toy-story-2', release: '1999-11-24', director: 'John Lasseter', runtime: 92 },
    { name: 'Monsters, Inc.', slug: 'monsters-inc', release: '2001-11-2', director: 'Peter Docter', runtime: 92 },
    { name: 'Finding Nemo', slug: 'finding-nemo', release: '2003-5-30', director: 'Andrew Stanton', runtime: 100 }
  ]
}

getTestData().forEach(cur => {
  Object.keys(cur).forEach(prop => {
    testDataArr.push(cur[prop].toString())
  })
})

describe('Table Column Select', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('Checkbox', done => {
    vm = createVue({
      template: `<div><checkbox :checked="checked" /></div>`,
      components: {
        checkbox
      },
      data: () => ({
        checked: false
      })
    }, true)
    const box = vm.$el.querySelector('input')

    box.click()
    setTimeout(_ => {
      expect(box.checked).to.be.false
      vm.checked = true
      setTimeout(_ => {
        expect(box.checked).to.be.true
        done()
      }, DELAY)
    }, DELAY)
  })

  it('render', done => {
    const vm = createVue({
      template: `
        <vk-table :data="testData">
          <vk-table-column-select headerClass="myHeaderClass" cellClass="myCellClass">
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

  describe('events', () => {
    it('selectAll', done => {
      vm = createVue({
        template: `
          <vk-table :data="testData">
            <vk-table-column-select trackBy="slug" />
          </vk-table>
        `,
        data: () => ({
          testData: getTestData()
        })
      })
      const testData = getTestData()
      const select = queryByTag(vm, 'vk-table-column-select')
      const cb = sinon.spy()

      select.$on('selectAll', cb)
      setTimeout(_ => {
        vm.$el.querySelector('thead th input[type="checkbox"]').click()
        setTimeout(_ => {
          const args = cb.args[0]
          expect(cb).to.have.been.called
          expect(args).to.length(2)
          expect(JSON.stringify(args[0])).to.equal(JSON.stringify(['toy-story', 'a-bugs-life', 'toy-story-2', 'monsters-inc', 'finding-nemo']))
          expect(JSON.stringify(args[1])).to.equal(JSON.stringify(testData))
          done()
        }, DELAY)
      }, DELAY)
    })

    it('select', done => {
      vm = createVue({
        template: `
          <vk-table :data="testData">
            <vk-table-column-select trackBy="slug" />
          </vk-table>
        `,
        data: () => ({
          testData: getTestData()
        })
      })
      const testData = getTestData()
      const select = queryByTag(vm, 'vk-table-column-select')
      const cb = sinon.spy()
      select.$on('select', cb)

      setTimeout(_ => {
        const box = vm.$el.querySelector('tbody tr input[type="checkbox"]')
        box.click()
        setTimeout(_ => {
          const args = cb.args[0]
          expect(cb).to.have.been.called
          expect(args).to.length(2)
          expect(args[0]).to.equal('toy-story')
          expect(JSON.stringify(args[1])).to.equal(JSON.stringify(testData[0]))
          done()
        }, DELAY)
      }, DELAY)
    })

    it('selectRow', done => {
      vm = createVue({
        template: `
          <vk-table :data="testData">
            <vk-table-column-select trackBy="slug" />
          </vk-table>
        `,
        data: () => ({
          testData: getTestData()
        })
      })
      const testData = getTestData()
      const select = queryByTag(vm, 'vk-table-column-select')
      const cb = sinon.spy()
      select.$on('selectRow', cb)

      setTimeout(_ => {
        const row = vm.$el.querySelector('tbody tr')
        row.click()
        setTimeout(_ => {
          const args = cb.args[0]
          expect(cb).to.have.been.called
          expect(args).to.length(2)
          expect(args[0]).to.equal('toy-story')
          expect(JSON.stringify(args[1])).to.equal(JSON.stringify(testData[0]))
          done()
        }, DELAY)
      }, DELAY)
    })
  })

  describe('methods', () => {
    it('getRowId', done => {
      vm = createVue({
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
      const select = queryByTag(vm, 'vk-table-column-select')

      // with trackBy should return the row trackBy value
      expect(select.getRowId(vm.testData[1])).to.equal(vm.testData[1].release)

      vm.trackBy = ''
      setTimeout(_ => {
        // with no trackBy should return the row index
        expect(select.getRowId(vm.testData[1])).to.equal(1)
        done()
      }, DELAY)
    })

    it('isSelected', done => {
      vm = createVue({
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
      const select = queryByTag(vm, 'vk-table-column-select')

      setTimeout(_ => {
        expect(select.isSelected(vm.testData[0])).to.be.true
        done()
      }, DELAY)
    })

    it('isAllSelected', done => {
      vm = createVue({
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
      const select = queryByTag(vm, 'vk-table-column-select')

      setTimeout(_ => {
        expect(select.isAllSelected()).to.be.true
        done()
      }, DELAY)
    })
  })
})
