import { get, has, set } from '../object'

const obj = { deep: { value: 0 } }

test('get', () => {
  expect(get(obj, 'deep.value')).toEqual(0)
})

test('has', () => {
  expect(has(obj, 'deep.foo')).toBe(false)
  expect(has(obj, 'deep.value')).toBe(true)
})

test('set', () => {
  set(obj, 'test.value.deep', 1)
  expect(obj.test.value.deep).toEqual(1)
})
