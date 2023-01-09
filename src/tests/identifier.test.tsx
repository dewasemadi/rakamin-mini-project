import { getPropertyValueByIdx } from 'utils/identifier'

const dummy = [
  {
    id: 215,
    title: 'Gabut',
    created_by: '142',
    created_at: '2023-01-07T16:47:48.214Z',
    updated_at: '2023-01-07T16:47:48.214Z',
    description: 'January - February',
  },
  {
    id: 216,
    title: 'Testing 2',
    created_by: '142',
    created_at: '2023-01-07T16:48:04.190Z',
    updated_at: '2023-01-07T16:48:04.190Z',
    description: 'Bebas',
  },
  {
    id: 217,
    title: 'Testing 3',
    created_by: '142',
    created_at: '2023-01-07T22:57:17.033Z',
    updated_at: '2023-01-07T22:57:17.033Z',
    description: 'Desc 3',
  },
  {
    id: 218,
    title: 'Testing 4',
    created_by: '142',
    created_at: '2023-01-07T22:57:26.405Z',
    updated_at: '2023-01-07T22:57:26.405Z',
    description: 'Desc 4',
  },
  {
    id: 219,
    title: 'Testing 4',
    created_by: '142',
    created_at: '2023-01-07T22:58:01.248Z',
    updated_at: '2023-01-07T22:58:01.248Z',
    description: 'Desc 4',
  },
]

describe('identifier', () => {
  it('should return -1 when data is empty', () => {
    const result = getPropertyValueByIdx([], 'id', 0, 'next')
    expect(result).toBe(-1)
  })

  it('should return -1 when index out of range', () => {
    const result = getPropertyValueByIdx(dummy, 'id', -1, 'prev')
    expect(result).toBe(-1)
  })

  it('should return -1 when index out of range', () => {
    const result = getPropertyValueByIdx(dummy, 'id', 6, 'next')
    expect(result).toBe(-1)
  })

  it('should return -1 when currentIdx is 0 and key is prev', () => {
    const result = getPropertyValueByIdx(dummy, 'id', 0, 'prev')
    expect(result).toBe(-1)
  })

  it('should return -1 when currentIdx is 4 and key is next', () => {
    const result = getPropertyValueByIdx(dummy, 'id', 4, 'next')
    expect(result).toBe(-1)
  })

  it('should return 216 when currentIdx is 0 and key is next', () => {
    const result = getPropertyValueByIdx(dummy, 'id', 0, 'next')
    expect(result).toBe(216)
  })

  it('should return 215 when currentIdx is 1 and key is prev', () => {
    const result = getPropertyValueByIdx(dummy, 'id', 1, 'prev')
    expect(result).toBe(215)
  })
})
