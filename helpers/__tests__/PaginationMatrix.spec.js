/* eslint-env jest */
import matrix from '../pagination-matrix'

describe('pagination-matrix', () => {
  it('accept arguments', () => {
    expect(matrix({ total: 800, page: 50, perPage: 5, range: 4 }))
      .toEqual([1, '...', 46, 47, 48, 49, 50, 51, 52, 53, 54, '...', 160])
  })

  it('accept no arguments', () => {
    expect(matrix()).toEqual([ 1, 2, 3, 4, 5, 6, 7, '...', 20 ])
  })
})
