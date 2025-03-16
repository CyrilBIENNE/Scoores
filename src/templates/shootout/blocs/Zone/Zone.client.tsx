'use client'

import styles from './Zone.module.scss'
import Play from '@/icons/play'
import Cri from '@/icons/cri'
import { ShootoutGamePlayer } from 'templates/shootout/Shootout/Shootout.type'

type Props = {
  player: ShootoutGamePlayer
  currentPlayer?: ShootoutGamePlayer
  localTime: number
  isLocalPause: boolean
  setIsLocalPause: (isLocalPause: boolean) => void
  onChangePlayer: (player?: ShootoutGamePlayer) => void
  onNewShot: () => void
}
export default function ZoneClient({ player, currentPlayer, localTime, onChangePlayer }: Props) {
  const styleZone: any = {}
  if (player?.number == 1) {
    styleZone['marginBottom'] = '24px'
  }

  if (!currentPlayer)
    return (
      <>
        {/* <div className={styles.timer}>{secondesToMinutes(Math.round(player.totalTime))}</div> */}
        <div className={styles.actionZone}>
          <div className={styles.action} onClick={() => onChangePlayer(player)} style={styleZone}>
            <Play size="90" />
          </div>
        </div>
      </>
    )

  return (
    <>
      {/* <div className={styles.timer}>{secondesToMinutes(Math.round(player.totalTime))}</div> */}
      {localTime == 0 && (
        <div className={styles.failed}>
          <Cri size="90%" color="rgba(0, 0, 0, 0.2)" />
        </div>
      )}
    </>
  )
}
