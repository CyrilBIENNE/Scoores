import styles from './FunnelProgress.module.scss'

type Props = {
  progress: number
}
export default function FunnelProgress(props: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.progress} style={{ width: `${props.progress}%` }}></div>
    </div>
  )
}
