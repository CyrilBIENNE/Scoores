import AddressApi from '@/utils/services/AddressApi'
import FunnelSelect from '../FunnelSelect'
import AddressItem from './AddressItem'
import GeolocItem from './GeolocItem'
import useFunnelSelect from '../useFunnelSelect'
import { useState } from 'react'
import Address from 'shared/clients/funnel/bloks/FunnelSelect/AddressSelect/Address.type'

type Props = {
  center?: boolean
  univers?: string
  onSubmit?: any
  link?: string
  label?: string
  value?: any
  if?: any
  required?: boolean
  customKey: string
  isSingleInput?: boolean
  hasGeoloc?: boolean
  onNext?: any
  labelAddressCode?: string
  adresseType?: string
  fullWidth?: boolean
  hasBtn?: boolean
  onClear?: () => void
}

export default function AddressSelect(props: Props) {
  const minChar = props.adresseType == 'city' ? 2 : 5

  const onApiUpdate = (res: any) => {
    core.setResult(res)
    core.onSearchEnded()
  }

  const onChange = (value: any) => {
    if (value == '') {
      core.setResult([])
      return AddressApi.clear()
    }

    return AddressApi.autocomplete(value, minChar, onApiUpdate, props.adresseType)
  }

  const core = useFunnelSelect(props, onChange, (addr) => addr.label ?? '', minChar)

  const [selectedIndex, setSelectedIndex] = useState(null)
  const [isClicked, setIsClicked] = useState(true)

  const selected = (i: any) => {
    setSelectedIndex(i)
    setIsClicked(false)
  }

  const result: Address[] | any[] = core.result

  return (
    <FunnelSelect {...props} core={core}>
      {props.hasGeoloc && <GeolocItem AddressApi={AddressApi} onChange={core.onSelect} />}
      {result.map((addr, i) => (
        <AddressItem
          {...addr}
          addr={addr}
          key={i}
          callback={core.onSelect}
          label={'N° de voie'}
          isOpen={!addr.housenumber ? i == selectedIndex : false}
          isClicked={isClicked}
          openHouseNumber={() => selected(i)}
          adresseType={props.adresseType}
        />
      ))}
    </FunnelSelect>
  )
}
