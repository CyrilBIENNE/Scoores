'use client'

import styles from './FunnelArrayInput.module.scss'
import stylesInput from '../FunnelInput/FunnelInput.module.scss'
import { useEffect, useState } from 'react'
import useFunnelKey from 'shared/clients/funnel/hooks/useFunnelKey'
import { dynamicCondition } from '@/utils/basic/dynamicData'
import isValidEmail from '@/utils/format/isValidEmail'
import Input from '../FunnelInput/Input/Input'
import Add from '@/icons/add'
import Cross from '@/icons/cross'

type Props = {
  type: string
  customKey?: string
  label: string
  defaultLabel?: string
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

const FunnelArrayInput = (props: Props) => {
  const { value, onChange: onKeyChange } = useFunnelKey(props.customKey, props.default)
  const [error, setError] = useState<string | null>(null)
  const [errorIndexes, setErrorIndexes] = useState([])
  const [values, setValues] = useState<any>(value && typeof value != 'string' ? value : props.default ?? [])

  const onFocus = (focus: any) => {
    if (focus) return null
    manageError(value)
  }

  const addItem = () => {
    if (values.length < 21) {
      values.push('Joueur ' + (values.length + 1))
      setValues([...values])
    }
  }
  const removeItem = (index: number) => {
    values.splice(index, 1)
    setValues([...values])
  }

  const onChange = (newValue: any) => {
    if (props.callbackValue) newValue = props.callbackValue(newValue)
    if (error) manageError(newValue)
    onKeyChange(newValue)
  }

  const onChangeItem = (index: number, val: any) => {
    values[index] = val
    setValues([...values])
  }

  const manageError = (values: []) => {
    let totalErrors = 0
    const _errors: any = []
    for (const i in values) {
      const val: any = values[i]
      let error: string | null = null
      if ('string' == typeof val && val.replace(/ /g, '') == '' && props.error) error = 'Champ requis'
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
      _errors.push(error)
      if (error) totalErrors++
    }
    setError(totalErrors > 0 ? 'Champ requis' : null)
    setErrorIndexes(_errors)
  }

  useEffect(() => {
    if (values) {
      setValues(values)
      onChange([...values])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  useEffect(() => {
    if (value) manageError(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { type, maxLength } = { ...props }
  const style: any = {}
  if (undefined !== props.mb) style['marginBottom'] = `${props.mb}px`
  if (undefined !== props.noshadow) style['boxShadow'] = `none`

  return (
    <>
      <div className={styles.addItem}>
        <span>{props.label}</span>
        <div className={styles.icon} onClick={addItem} title="Ajouter un joueur">
          <Add size="32px" stroke={2} />
        </div>
      </div>
      <div className={styles.items}>
        {values.map((val: any, i: number) => (
          <div key={i} className={styles.item}>
            <div style={style} className={stylesInput.funnelInput} data-error={errorIndexes[i] ? true : false}>
              <Input
                {...{
                  error: errorIndexes[i],
                  customKey: undefined,
                  onFocus,
                  onChange: (value: any) => onChangeItem(i, value),
                  label: props.defaultLabel + ' ' + (i + 1),
                  required: true,
                  type,
                  maxLength,
                  autofocus: props?.autofocus,
                  value: `${val}`,
                }}
              />
            </div>
            <div className={styles.icon} onClick={() => removeItem(i)} title="Supprimer">
              <Cross size="36px" />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default FunnelArrayInput
