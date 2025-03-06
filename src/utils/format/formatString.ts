export function truncate(input: string, limit: number) {
  if (!input || input?.length <= limit) return input

  const array = input?.split(' ')
  let result = ''
  for (let i = 0; i < array.length; i++) {
    if (result.length + 1 + array[i].length <= limit) {
      result = result + array[i] + ' '
    } else {
      return result.trim() + '...'
    }
  }

  return result
}

export const ucFirst = (phrase: any) => {
  return phrase
    .toLowerCase()
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
