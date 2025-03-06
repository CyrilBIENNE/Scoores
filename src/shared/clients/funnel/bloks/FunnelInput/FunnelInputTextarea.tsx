'use client'

import styles from './FunnelInput.module.scss'

import { useEffect, useState } from 'react'
import useFunnelKey from 'shared/clients/funnel/hooks/useFunnelKey'
import { dynamicCondition } from '@/utils/basic/dynamicData'
import Textarea from './Textarea/Textarea'

type Props = {
  rows?: number
  customKey?: string
  label: string
  error?: string
  required?: boolean
  autofocus?: boolean
  default?: string
  regex?: string
  errors?: any[]
  minLength?: number
  maxLength?: number
  mb?: number
  noshadow?: boolean
}

const FunnelInputTextarea = (props: Props) => {
  const { value, onChange: onKeyChange } = useFunnelKey(props.customKey, props.default)
  const [error, setError] = useState<string | null>(null)

  const onFocus = (focus: any) => {
    if (focus) return null
    manageError(value)
  }

  const onChange = (newValue: any) => {
    if (error) manageError(newValue)
    onKeyChange(newValue)
  }

  const manageError = (val: any) => {
    let error: string | null = null
    if (val == '' && props.error) error = props.error
    if (minLength && val.length < minLength) error = `${minLength} caractères minimum.`
    if (maxLength && val.length > maxLength) error = `${maxLength} caractères maximum.`
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

  const { required, label, rows, minLength, maxLength } = { ...props }
  const style: any = {}
  if (undefined !== props.mb) style['marginBottom'] = `${props.mb}px`
  if (undefined !== props.noshadow) style['boxShadow'] = `none`

  return (
    <>
      <div style={style} className={styles.funnelInput} data-error={error ? true : false}>
        <Textarea
          {...{
            value,
            error,
            onFocus,
            onChange,
            label,
            required,
            minLength,
            maxLength,
            rows,
            autofocus: props?.autofocus,
          }}
        />
      </div>
    </>
  )
}

export default FunnelInputTextarea
