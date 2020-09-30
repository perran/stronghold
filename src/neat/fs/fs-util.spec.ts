import { getFilenames, readFile } from './fs-util'
import path from 'path'

describe('fs util', () => {
  describe('when getting filenames from a valid dir', () => {
    it('gets a list of all file names in that dir', async () => {
      const fullPath = path.join(__dirname, 'test-files')
      const fileNames = await getFilenames(fullPath)
      expect(fileNames).toEqual(['test1.txt', 'test2.txt'])
    })
  })

  describe('when reading a file', () => {
    it('gets its content', async () => {
      const fullPath = path.resolve(__dirname, 'test-files', 'test1.txt')
      const actual = await readFile(fullPath)
      expect(actual).toEqual(expect.stringContaining('one'))
    })
  })
})
