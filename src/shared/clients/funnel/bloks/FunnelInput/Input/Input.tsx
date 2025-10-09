import styles from './Input.module.scss'

import { useState, useEffect } from 'react'
import Close from '@/icons/closed'

type Props = {
  value: string
  onChange: any
  onFocus?: any
  label?: string
  error?: string | null
  type?: string
  required?: boolean
  autofocus?: boolean
  maxLength?: number
  onClear?: () => void
}

export default function Input(props: Props) {
  const [isFocus, setIsFocus] = useState(props.autofocus ? true : false)
  const [value, setValue] = useState('')

  useEffect(() => {
    if (props.value !== value) setValue(props.value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value])

  const handleChange = (event: any) => {
    setValue(event.target.value)
    props.onChange(event.target.value)
  }

  const clear = () => {
    props.onChange('')
    if (props.onClear) props.onClear()
  }

  const onFocus = (focus: any, force = false) => {
    setIsFocus(focus)
    if (props.onFocus) props.onFocus(focus, force)
  }

  return (
    <label className={styles.wrapper} data-focus={isFocus} data-value={value ?? ''}>
      <div className={styles.inputWrapper}>
        {props.error && <p className={styles.error}> {props.error}</p>}
        {(!props.error || (!isFocus && value == '')) && (
          <p className={styles.label}>{props.label + (props.required ? ' *' : '')}</p>
        )}
        <input
          className={styles.input}
          value={value}
          autoFocus={props.autofocus ? true : false}
          type={props.type ?? 'text'}
          onFocus={() => onFocus(true)}
          onBlur={() => onFocus(false)}
          onChange={handleChange}
          autoComplete="off"
          maxLength={props.maxLength}
          {...('number' == props.type ? { pattern: '[0-9]*', inputMode: 'numeric' } : {})}
        />
      </div>
      {value && <Close onClick={clear} class={styles.close} />}
    </label>
  )
}
