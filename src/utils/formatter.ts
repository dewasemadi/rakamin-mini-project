export const removeCharInString = (str: string, char: string): any => {
  if (isNaN(parseInt(str))) return 'not-a-number'
  if (str.length === 0) return 'not-a-number'
  if (str.length > 0 && str.includes(char)) return parseInt(str.replace(char, ''))
  return parseInt(str)
}
