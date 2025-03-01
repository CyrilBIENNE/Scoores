import styles from './TimeBlock.module.scss'

type Props = {
  isAlert?: boolean
  isEnded?: boolean
  children?: React.ReactNode
  callback?: () => void
  size?: 'sm' | 'md' | 'lg'
  style?: React.CSSProperties
}
export default function TimeBloc({ children, isAlert, isEnded, callback, size, style }: Props) {
  return (
    <div
      className={styles.timeBlock}
      data-alert={isAlert}
      data-size={size}
      data-is-ended={isEnded ? 'true' : 'false'}
      onClick={() => callback && callback()}
      style={style}
    >
      {children}
    </div>
  )
}
