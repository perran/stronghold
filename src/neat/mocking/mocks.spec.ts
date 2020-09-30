import { externalFunc } from './external'
jest.mock('./external')
const mockedExternalFunc = externalFunc as jest.Mocked<typeof externalFunc>

describe('a complete mockery', () => {
  describe('mock gets called', () => {
    const innerFunc = (val: number, str: string): { val: number; str: string } => {
      return { val, str }
    }

    let mockableFunc = innerFunc

    const realFunc = (val: number, str: string): void => {
      mockableFunc(val, str)
    }

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('checks how many times it has been called', () => {
      mockableFunc = jest.fn()
      realFunc(123, 'asd')
      expect(mockableFunc).toHaveBeenCalledTimes(1)
    })

    it('checks it has been called with p1 as anything and p2 as exact value', () => {
      mockableFunc = jest.fn()
      realFunc(123, 'asd')
      expect(mockableFunc).toHaveBeenCalledWith(expect.anything(), 'asd')
    })

    it('checks it throws an error', () => {
      mockableFunc = jest.fn(() => {
        throw new Error('Boom!')
      })

      expect(() => {
        realFunc(123, 'throwError')
      }).toThrow('Boom!')
    })

    it('checks it will throw an error', () => {
      mockableFunc = jest.fn(() => {
        throw new Error('Boom!')
      })

      expect(realFunc).toThrow()

      expect(() => {
        realFunc(123, 'throwError')
      }).toThrow('Boom!')
    })
  })

  describe('async mock gets called', () => {
    let mockableFunc = async (): Promise<number> => {
      return 123
    }

    const realFunc = async (): Promise<number> => {
      return mockableFunc()
    }

    it('returns a the mocked response', async () => {
      mockableFunc = jest.fn(async () => {
        return 666
      })

      const actual = await realFunc()
      expect(actual).toBe(666)
    })

    it('rejects with an error', async () => {
      mockableFunc = jest.fn(async () => {
        throw new Error('Boom!')
      })

      expect.assertions(1)
      await expect(realFunc()).rejects.toThrow('Boom!')
    })
  })

  describe('from imported function', () => {
    const realFunc = (): string => {
      return externalFunc('hej')
    }

    it('returns the mocked value', () => {
      ;(mockedExternalFunc as any).mockReturnValue('mocked external')

      const actual = realFunc()
      expect(actual).toBe('mocked external')
      expect(mockedExternalFunc).toHaveBeenCalledWith('hej')
    })
  })
})
