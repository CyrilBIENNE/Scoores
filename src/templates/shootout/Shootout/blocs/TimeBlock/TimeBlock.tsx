import styles from './TimeBlock.module.scss'

import Pause from '@/icons/pause'
import Play from '@/icons/play'
import Cri from '@/icons/cri'

type Props = {
  isAlert?: boolean
  status?: 'ended' | 'paused' | 'running'
  isEnded?: boolean
  children?: React.ReactNode
  callback?: () => void
  size?: 'sm' | 'md' | 'lg'
  style?: React.CSSProperties
}
export default function TimeBloc({ children, status, isAlert, isEnded, callback, size, style }: Props) {
  return (
    <div
      className={styles.timeBlock}
      data-alert={isAlert}
      data-size={size}
      data-is-ended={isEnded ? 'true' : 'false'}
      onClick={() => callback && callback()}
      style={style}
    >
      {status == 'running' ? <Pause size="70" /> : status == 'paused' ? <Play size="70" /> : <Cri size="70" />}
      <div className={styles.time}>{children}</div>
    </div>
  )
}
