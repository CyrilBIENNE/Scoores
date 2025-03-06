'use client'

import styles from './FunnelPhone.module.scss'

import { useEffect, useState } from 'react'
import useFunnelKey from 'shared/clients/funnel/hooks/useFunnelKey'
import Input from '../FunnelInput/Input/Input'

type Props = {
  type: string
  customKey?: string
  label: string
  required?: boolean
  autofocus?: boolean
  default?: string
}

const ERROR_TXT: string | null = 'Numéro de téléphone non valide'
const ERROR_REGEX = new RegExp('^(\\+33|0033|0)[1-79]([0-9]{2}){4}')

const FunnelPhone = (props: Props) => {
  const { value, onChange: onKeyChange } = useFunnelKey(props.customKey, props.default)
  const [error, setError] = useState<string | null>(null)
  const [phone, setPhone] = useState<string>('')

  const onFocus = (focus: any) => {
    if (focus) return null
    manageError(value)
  }

  const onChange = (newValue: any) => {
    if (error) manageError(newValue)
    setPhone(newValue)
    onKeyChange(ERROR_REGEX.test(newValue) ? newValue : undefined)
  }

  const manageError = (val: any) => {
    setError(val.replace(' ', '') == '' || !ERROR_REGEX.test(val) ? ERROR_TXT : null)
  }

  useEffect(() => {
    if (value) manageError(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { required, label, autofocus } = { ...props }
  const style: any = {}

  return (
    <div style={style} className={styles.funnelInput} data-error={error ? true : false}>
      <Input {...{ value: phone, error, onFocus, onChange, label, required, type: 'tel', autofocus }} />
    </div>
  )
}

export default FunnelPhone
