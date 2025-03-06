export function treatPhone(phone?: string) {
  if (!phone) return undefined

  phone = phone.replace(/[^0-9]/g, '')

  if (phone.startsWith('+33')) phone = phone.substring(3)
  if (phone.startsWith('330') || phone.startsWith('33')) phone = phone.substring(2)

  if (phone.length != 9 && phone.length != 10) return undefined

  phone = phone.padStart(10, '0')

  if (phone[0] !== '0' || phone[1] === '0' || phone.startsWith('08')) return undefined

  return phone
}

export function isValidPhone(phone?: string, isTreatPhone = true) {
  if (isTreatPhone) phone = treatPhone(phone)

  if (!phone || phone.length !== 10 || phone <= '0100001000' || parseInt(phone.slice(3)) < 10000) return false

  const invalidPatterns = [
    '000000',
    '111111',
    '222222',
    '333333',
    '444444',
    '555555',
    '666666',
    '777777',
    '888888',
    '999999',
    '234567',
    '01020304',
    '02030405',
    '03040506',
    '04050607',
  ]

  for (const pattern of invalidPatterns) {
    if (phone.includes(pattern)) {
      return false
    }
  }

  //TODO gérer les phone blaklist issu de l'admin

  return true
}
