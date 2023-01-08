// this function will return spesific property of object in given array
export const getPropertyValueByIdx = (data: any, attribute: string, currentIdx: number, key: string): any => {
  if (!data) return -1 // data is undefined
  if (currentIdx > data.length - 1 || currentIdx < 0) return -1 // currentIdx is out of range
  if (currentIdx === 0 && key === 'prev') return -1 // currentIdx is first index
  if (currentIdx === data.length - 1 && key === 'next') return -1 // currentIdx is last index
  if (data.length > 0 && key === 'prev') return data[currentIdx - 1][attribute]
  if (data.length > 0 && key === 'next') return data[currentIdx + 1][attribute]
  return -1
}
