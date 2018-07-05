import { get } from '../object'

test('get', () => {
  const obj = { deep: { value: 0 } }
  expect(get(obj, 'deep.value')).toEqual(0)
})
