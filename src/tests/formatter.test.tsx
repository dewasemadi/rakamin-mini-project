import { removeCharInString } from 'utils/formatter'

describe('removeCharInString', () => {
  it('should remove % in 100%', () => {
    const result = removeCharInString('100%', '%')
    expect(result).toBe(100)
  })

  it('should return 0 when input length is 0', () => {
    const result = removeCharInString('', '%')
    expect(result).toBe('not-a-number')
  })

  it('should return 5 when input is 5', () => {
    const result = removeCharInString('5', '%')
    expect(result).toBe(5)
  })

  it('should return 0 when input is %', () => {
    const result = removeCharInString('%', '%')
    expect(result).toBe('not-a-number')
  })
})
