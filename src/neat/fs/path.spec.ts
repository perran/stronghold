import path from 'path'

describe.skip('path', () => {
  describe('current directory', () => {
    it('finds this directory', () => {
      expect(__dirname).toBe('/home/perhjelm/projects/stronghold/src/neat/fs')
    })

    it('adds path separators between given values', () => {
      const actual = path.join('test', 'fest')
      expect(actual).toBe('test/fest')
    })

    it('builds a path by joins and traversals adding path separators', () => {
      const actual = path.resolve(__dirname, 'test-files', '..', '..')
      expect(actual).toBe('/home/perhjelm/projects/stronghold/src/neat')
    })
  })
})
