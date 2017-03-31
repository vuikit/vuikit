/* eslint-env jest */
import matrix from '../date-matrix'
import MockDate from 'mockdate'

describe('data-matrix', () => {
  const dec14 = [
    [-30, 1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27],
    [28, 29, 30, 31, -1, -2, -3],
    [-4, -5, -6, -7, -8, -9, -10]
  ]
  const dec14w1 = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30, 31, -1, -2, -3, -4],
    [-5, -6, -7, -8, -9, -10, -11]
  ]
  const jan15 = [
    [-28, -29, -30, -31, 1, 2, 3],
    [4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30, 31],
    [-1, -2, -3, -4, -5, -6, -7]
  ]

  it('accepts Object as argument', () => {
    expect(
      matrix({ year: 2014, month: 11, weekStartsOn: 1 }, true).toString()
    ).toEqual(dec14w1.toString())
  })

  it('accepts Date Object as argument', () => {
    expect(
      matrix(new Date(2014, 11), true).toString()
    ).toEqual(dec14.toString())
  })

  it('accept no arguments', () => {
    MockDate.set(new Date(2015, 0).valueOf())
    expect(
      matrix(undefined, true).toString()
    ).toEqual(jan15.toString())
    MockDate.reset()
  })
})
