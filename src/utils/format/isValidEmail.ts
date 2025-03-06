export default function isValidEmail(str: string = ''): boolean {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

  return regex.test(str)
}
