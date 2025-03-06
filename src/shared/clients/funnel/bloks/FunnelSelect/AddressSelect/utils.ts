import Address from 'shared/clients/funnel/bloks/FunnelSelect/AddressSelect/Address.type'

const codeIndice = ['bis', 'ter', 'quater', 'quinquies']

export function codeHouseNumber(fullCode: any) {
  let code = ''
  let indice = ''
  if (fullCode) {
    const letters = fullCode.match(/[^\d]+|\d+/g)
    code = letters[0]
    indice = letters[1] ? letters[1].replace(/ /g, '') : ''
  }

  return {
    code,
    indice,
  }
}

export function updateAddrCode(addr: Address, code: any, indice: any) {
  function addLeadingZeros(code: any, totalLength: any) {
    return String(code).padStart(totalLength, '0')
  }

  const addrUpdate = {
    ...addr,
    housenumber: code + indice,
    type: 'housenumber',
    name: code + ' ' + (indice ? indice + ' ' : '') + addr.name,
    label: code + ' ' + (indice ? indice + ' ' : '') + addr.label,
    street: addr.name,
    id: addr.id + '_' + addLeadingZeros(code, 5) + (codeIndice.includes(indice) ? `_${indice}` : ''),
  }
  return addrUpdate
}
