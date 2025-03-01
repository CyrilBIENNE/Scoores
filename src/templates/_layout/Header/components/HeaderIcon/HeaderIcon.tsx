import styles from './HeaderIcon.module.scss'

type Props = {
  children: React.ReactNode
  size?: string
  color?: string
  title?: string
  callback?: () => void
}
export default function HeaderIcon({ children, size, color, callback, title }: Props) {
  const styled = { '--size': size } as React.CSSProperties
  return (
    <div
      className={styles.headerIcon}
      style={styled}
      data-color={color ?? 'currentColor'}
      onClick={callback}
      title={title}
    >
      {children}
    </div>
  )
}
