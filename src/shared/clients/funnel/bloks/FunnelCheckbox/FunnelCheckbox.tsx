import useFunnelKey from 'shared/clients/funnel/hooks/useFunnelKey'
import styles from './FunnelCheckbox.module.scss'
import Checkbox from '@/icons/checkbox'
import { useEffect } from 'react'

type Props = {
  customKey: string
  text: string | any
  text_before?: string
  required?: boolean
  _uid: string
  isSingleInput?: boolean
  onNext?: any
  default?: boolean
}

export default function FunnelCheckbox(props: Props) {
  const { value, onChange } = useFunnelKey(props.customKey)

  useEffect(() => {
    if (value !== true && value !== false && undefined != props.default) onChange(props.default)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const onCheckboxClick = (e: any) => {
    onChange(e.target.checked)
    if (props.isSingleInput) props.onNext()
  }

  return (
    <div className={styles.checkbox}>
      <input id={props._uid} type="checkbox" checked={value} onChange={onCheckboxClick} />
      <label htmlFor={props._uid}>
        <div className={styles.checkboxLabel}>
          {props.text_before && (
            <p className="headnote" style={{ marginLeft: 0, marginRight: 12 }}>
              {props.text_before}
            </p>
          )}
          <div className={styles.label}>
            <Checkbox />
          </div>
          <p className="headnote" style={{ marginLeft: props.text_before ? 6 : 12 }}>
            {props.text}
          </p>
        </div>
      </label>
    </div>
  )
}
