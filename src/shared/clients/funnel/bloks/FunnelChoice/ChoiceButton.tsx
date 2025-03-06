import styles from './FunnelChoice.module.scss'
import Image from 'next/image'
import Loader from 'shared/components/animations/Loader/Loader'

export interface ChoiceAnswer {
  // supprimer ?
  _uid?: string
  component?: string
  _editable?: any

  text: string
  value: string | number | boolean
  image?: string
}
export interface Choice extends ChoiceAnswer {
  datas?: any
  idValue?: string
  selected?: boolean
  isSaving?: boolean
}

type Props = Choice & {
  onChange: (value: any) => void
}

const ChoiceButton = (props: Props) => {
  return (
    <>
      <div
        className={styles.choiceButton}
        onClick={() => props.onChange(props.value)}
        id={props.idValue + '_' + props._uid}
        data-selected={props.selected}
        {...props.datas}
      >
        {props.image && (
          <Image
            src={props.image}
            width="24"
            height="24"
            alt={'operator.name'}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        )}
        <span className={styles.textBtn} style={props.image ? { marginLeft: '12px' } : undefined}>
          {props.text}
        </span>
        {props.isSaving && props.selected && <Loader />}
      </div>
    </>
  )
}

export default ChoiceButton
