import styles from '../Input/Input.module.scss'

import { useState, useEffect } from 'react'
import Close from '@/icons/close'

type TextareaProps = {
  value: string
  onChange: any
  onFocus?: any
  label?: string
  placeholder?: string
  error?: string | null
  required?: boolean
  autofocus?: boolean
  rows?: number
  minLength?: number
  maxLength?: number
}

export default function Textarea(props: TextareaProps) {
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
  }

  const onFocus = (focus: any, force = false) => {
    setIsFocus(focus)
    if (props.onFocus) props.onFocus(focus, force)
  }

  return (
    <label className={styles.wrapper} data-focus={isFocus} data-value={value ?? ''} data-type="textarea">
      <div className={styles.inputWrapper}>
        {props.error && <p className={styles.error}> {props.error}</p>}
        {(!props.error || (!isFocus && value == '')) && (
          <p className={styles.label}>{props.label + (props.required ? ' *' : '')}</p>
        )}
        <textarea
          className={styles.input}
          value={value}
          autoFocus={props.autofocus ? true : false}
          onFocus={() => onFocus(true)}
          onBlur={() => onFocus(false)}
          onChange={handleChange}
          autoComplete="off"
          rows={props.rows ?? 3}
          placeholder={props.placeholder ?? ''}
        />
      </div>
      {value && <Close onClick={clear} class={styles.close} />}

      <span className={styles.carcount + ' footnote'}>
        {value.length}
        {!props.minLength && props.maxLength
          ? '/' + props.maxLength + ' caractères maxi'
          : props.minLength
          ? '/' + props.minLength + ' caractères mini'
          : ''}
      </span>
    </label>
  )
}
