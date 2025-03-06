import styles from './AddressSelect.module.scss'

import DotTyping from 'shared/components/animations/DotTyping/DotTyping'
import { useState } from 'react'
import AddressItem from './AddressItem'

type Props = {
  id?: string
  callback?: any
  AddressApi: any
  onChange: any
  dataKey?: string
  index?: number
  idSelect?: string
  idValue?: string
}

const GeolocItem = (props: Props) => {
  const dictionaries = {
    title: 'Tester sur ma position',
    text: 'Autoriser accès GPS',
    error: "Impossible d'accéder à votre position",
  }
  const [isLocating, setIsLocating] = useState(false)
  const [isError, setIsError] = useState(false)

  const getLocation = async () => {
    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(await onSuccess, onError)
  }

  const onSuccess = async ({ coords }: any) => {
    const addr = await props.AddressApi.getAddrFromCoords(coords.longitude, coords.latitude)
    setIsLocating(false)
    props.onChange(addr)
  }

  const onError = () => {
    setIsLocating(false)
    setIsError(true)
  }

  let style = {}
  if (isLocating) style = { opacity: '0.4' }

  return (
    <div style={{ position: 'relative' }} id={props.id}>
      <div style={style}>
        <AddressItem
          full_addr={!isError ? dictionaries.title : dictionaries.error}
          icon="/img/icon/map-pin.svg"
          callback={getLocation}
        />
      </div>
      {isLocating && (
        <div
          className={styles.loading}
          style={{
            position: 'absolute',
            top: '50%',
            width: '100%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <DotTyping color={true} />
        </div>
      )}
    </div>
  )
}

export default GeolocItem
