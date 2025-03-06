import styles from './FunnelChoice.module.scss'

import useFunnelKey from 'shared/clients/funnel/hooks/useFunnelKey'
import ChoiceButton, { ChoiceAnswer } from 'shared/clients/funnel/bloks/FunnelChoice/ChoiceButton'
import { useEffect, useState } from 'react'
import { cleanInputValue } from '../../hooks/utils'

type Props = {
  customKey: string
  desktopGrow: boolean
  mobileDouble: boolean
  choices: ChoiceAnswer[]
  required?: boolean
  isSingleInput?: boolean
  onNext?: any
  default?: string
  isSaving?: boolean
}

const FunnelChoice = (props: Props) => {
  const { value, onChange } = useFunnelKey(props.customKey, props.default)
  const [onSingleInputChanged, setOnSingleInputChanged] = useState(false)

  const onChoiceClick = (value: any) => {
    onChange(value)
    if (props.isSingleInput) setOnSingleInputChanged(true)
  }

  useEffect(() => {
    if (onSingleInputChanged) props.onNext(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSingleInputChanged])

  return (
    <div data-mobile-double={props.mobileDouble} data-desktop-grow={props.desktopGrow} className={styles.multiInput}>
      {props.choices.map((choice, i) => (
        <ChoiceButton
          {...choice}
          selected={value == cleanInputValue(choice.value) && value !== ''}
          onChange={onChoiceClick}
          key={i}
          isSaving={props.isSaving && props.isSingleInput}
        />
      ))}
    </div>
  )
}

export default FunnelChoice
