import { useState } from 'react'
import OutSideDiv from '@/components/layout/OutSideDiv/OutSideDiv'
import stylesFunnel from '../FunnelSelect.module.scss'
import styles from './CustomSelect.module.scss'
import stylesInput from '../../FunnelInput/Input/Input.module.scss'
import stylesFunnelInput from '../../FunnelInput/FunnelInput.module.scss'
import Close from '@/icons/close'
import useFunnelKey from 'shared/clients/funnel/hooks/useFunnelKey'

type jsonType = {
  label: string
}

type Props = {
  center?: boolean
  onSubmit?: any
  label?: string
  name?: string
  value?: any
  fullWidth?: boolean
  required?: boolean
  jsonValues: jsonType[]
  default?: string
  customKey?: any

  onFocus?: any
  error?: string | null
  type?: string
  autofocus?: boolean
  maxLength?: number
}

export default function CustomSelect(props: Props) {
  const [isFocus, setIsFocus] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const { value, onChange: setValue } = useFunnelKey(props.customKey, props.default)
  const [error, setError] = useState<string | null>(null)

  function onSelect(item: jsonType | undefined) {
    setIsOpen(false)
    setValue(item ?? undefined)
    setError(null)
  }

  const clear = () => {
    onSelect({ label: '' })
    setIsOpen(false)
  }

  const onFocus = (focus: any, force = false) => {
    if (false === focus) setIsOpen(false)

    if (props.onFocus) props.onFocus(focus, force)
  }

  const onBlur = () => {
    manageError(value)

    if (isOpen) {
      setTimeout(() => {
        //setIsOpen(false)
        setIsFocus(false)
      }, 150) // ne pas mettre moins
    }
  }

  const manageError = (val: any) => {
    let error: string | null = null
    if ((!val || val.label == '') && props.required) error = props.error ?? 'Ce champ est requis'
    setError(error)
  }

  return (
    <OutSideDiv callback={() => setIsOpen(false)}>
      <div
        data-open={isOpen}
        className={stylesFunnelInput.funnelInput}
        data-fullwidth={props.fullWidth}
        data-error={error ? true : false}
      >
        <label
          className={stylesInput.wrapper}
          onClick={() => setIsOpen(true)}
          data-focus={isFocus}
          data-value={value?.value ?? ''}
        >
          <div className={stylesInput.inputWrapper}>
            {error && !isOpen && <p className={stylesInput.error}> {error}</p>}
            {(!error || isOpen || (!isFocus && value?.value == '')) && (
              <p className={stylesInput.label}>{props.label + (props.required ? ' *' : '')}</p>
            )}
            <input
              className={stylesInput.input}
              value={value?.label}
              autoFocus={props.autofocus ? true : false}
              type={props.type ?? 'text'}
              onFocus={() => onFocus(true)}
              onBlur={() => onBlur()}
              autoComplete="off"
              maxLength={props.maxLength}
              readOnly={true}
            />
          </div>
          {value?.label && <Close onClick={clear} class={stylesInput.close} />}
        </label>
        {isOpen && (
          <div className={stylesFunnel.droplist}>
            {props.jsonValues.map((item: any, i: number) => (
              <div className={styles.item} key={i} onClick={() => onSelect(item)}>
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </OutSideDiv>
  )
}
