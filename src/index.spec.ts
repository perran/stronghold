import { add } from './index'

describe('add', () => {
  it('returns the sum of given values', () => {
    expect(add(3, 5)).toBe(8)
  })
})
