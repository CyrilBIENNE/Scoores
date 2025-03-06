'use client'

import styles from './FunnelInput.module.scss'

import { useEffect, useState } from 'react'
import useFunnelKey from 'shared/clients/funnel/hooks/useFunnelKey'
import Input from './Input/Input'
import { dynamicCondition } from '@/utils/basic/dynamicData'
import isValidEmail from '@/utils/format/isValidEmail'

type Props = {
  type: string
  customKey?: string
  label: string
  error?: string
  required?: boolean
  autofocus?: boolean
  default?: string
  regex?: string
  errors?: any[]
  maxLength?: number
  mb?: number
  noshadow?: boolean
  callbackValue?: any
}

const FunnelInput = (props: Props) => {
  const { value, onChange: onKeyChange } = useFunnelKey(props.customKey, props.default)
  const [error, setError] = useState<string | null>(null)

  const onFocus = (focus: any) => {
    if (focus) return null
    manageError(value)
  }

  const onChange = (newValue: any) => {
    if (props.callbackValue) newValue = props.callbackValue(newValue)

    if (error) manageError(newValue)
    onKeyChange(newValue)
  }

  const manageError = (val: any) => {
    let error: string | null = null
    if ('string' == typeof val && val.replace(' ', '') == '' && props.error) error = props.error
    if ('email' == props.type && !isValidEmail(val)) error = 'Veuillez saisir un email valide'
    if (props.errors) {
      for (const customError of props.errors) {
        if (customError.regex) {
          const regex = new RegExp(customError.regex)
          if (!regex.test(val)) error = customError.text
        } else if (customError.condition) {
          if (dynamicCondition(customError.condition, { val })) error = customError.text
        }
      }
    }
    setError(error)
  }

  useEffect(() => {
    if (value) manageError(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { required, type, label, maxLength } = { ...props }
  const style: any = {}
  if (undefined !== props.mb) style['marginBottom'] = `${props.mb}px`
  if (undefined !== props.noshadow) style['boxShadow'] = `none`

  return (
    <div style={style} className={styles.funnelInput} data-error={error ? true : false}>
      <Input {...{ value, error, onFocus, onChange, label, required, type, maxLength, autofocus: props?.autofocus }} />
    </div>
  )
}

export default FunnelInput
