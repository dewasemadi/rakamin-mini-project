export const removeCharInString = (str: string, char: string): number => {
  if (isNaN(parseInt(str))) return 0
  if (str.length === 0) return 0
  if (str.length > 0 && str.includes(char)) return parseInt(str.replace(char, ''))
  return parseInt(str)
}
