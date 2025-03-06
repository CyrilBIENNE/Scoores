import styles from './AddressSelect.module.scss'
import Address from 'shared/clients/funnel/bloks/FunnelSelect/AddressSelect/Address.type'
import { useState } from 'react'
import { codeHouseNumber, updateAddrCode } from './utils'
import Input from '../../FunnelInput/Input/Input'
import Button from '@/blocs/basic/Button/Button'
import { ColorType } from 'shared/helpers/color.type'

type Props = {
  callback: any
  icon?: string
  addr?: Address
  name?: string
  full_addr?: string
  city?: string
  citycode?: string
  postcode?: string
  label?: string
  openHouseNumber?: () => any
  isOpen?: boolean
  isClicked?: boolean
  adresseType?: string
}

const AddressItem = (props: Props) => {
  const [houseNumberValue, setHouseNumberValue] = useState('')

  const onSelectAddr = () => {
    const isHousenumberNeeded = !props.addr?.housenumber && props.adresseType == 'housenumber'
    if (!isHousenumberNeeded) return props.callback(props.addr)
    if (props.openHouseNumber) return props.openHouseNumber()
    return null
  }

  const addAddrHouseNumber = (fullCode: any) => {
    if (!props.addr) return
    const { code, indice } = codeHouseNumber(fullCode)
    const addr = updateAddrCode(props.addr, code, indice)
    props.callback(addr)
  }
  const { city, postcode, name, full_addr, adresseType } = { ...props }

  return (
    <div className={styles.item} onClick={() => onSelectAddr()}>
      <div className={styles.name + ' headnote'}>
        {adresseType == 'city' ? `${city}, ${postcode}` : name ? `${name}, ${postcode}, ${city}` : full_addr}
      </div>

      {props.isOpen && (
        <div className={styles.search}>
          <div className={styles.input}>
            <Input label={props.label} value={houseNumberValue} onChange={setHouseNumberValue} />
          </div>
          <div className={styles.buttonList}>
            <Button
              disabled={!houseNumberValue}
              type={ColorType.PRIMARY}
              callback={() => addAddrHouseNumber(houseNumberValue)}
              label={'Valider'}
            />
            <Button
              type={ColorType.SECONDARY}
              callback={() => addAddrHouseNumber(houseNumberValue)}
              label={'Pas de N° de voie'}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default AddressItem
