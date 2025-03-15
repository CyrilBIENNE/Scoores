'use client'

import styles from './Zone.module.scss'
import Play from '@/icons/play'
import Cri from '@/icons/cri'
import TimeBloc from '../TimeBlock/TimeBlock'
import Button from '@/blocs/basic/Button/Button'
import { ColorType } from 'shared/helpers/color.type'
import { secondesToMinutes } from '@/utils/format/secondesToMinutes'
import { ShootoutGamePlayer } from '../../../providers/Shootout.type'

type Props = {
  player: ShootoutGamePlayer
  currentPlayer?: ShootoutGamePlayer
  localTime: number
  isLocalPause: boolean
  setIsLocalPause: (isLocalPause: boolean) => void
  onChangePlayer: (player: ShootoutGamePlayer) => void
  onNewShot: () => void
}
export default function ZoneClient({
  player,
  currentPlayer,
  localTime,
  isLocalPause,
  setIsLocalPause,
  onChangePlayer,
  onNewShot,
}: Props) {
  const styleZone: any = {}
  if (player?.number == 1) {
    styleZone['marginBottom'] = '24px'
  }

  if (currentPlayer?.number != player.number)
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
      <div className={styles.actionZone}>
        {localTime > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <Button
              label="New Shot"
              callback={() => {
                onNewShot()
              }}
              type={ColorType.PRIMARY}
              size="lg"
            />
          </div>
        )}
        <div className={styles.subAction}>
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 24 }}>
            {localTime <= 0 && (
              <Button
                label="New Shot"
                callback={() => {
                  onNewShot()
                }}
                type={ColorType.PRIMARY}
                size="lg"
              />
            )}
            <TimeBloc
              isAlert={localTime <= 5}
              isEnded={localTime <= 0 ? true : false}
              size="lg"
              style={{ marginLeft: -4 }}
              status={localTime == 0 ? 'ended' : isLocalPause ? 'paused' : 'running'}
              callback={() => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                localTime > 0 ? setIsLocalPause(!isLocalPause) : null
              }}
            >
              {secondesToMinutes(localTime)}
            </TimeBloc>
          </div>
        </div>
      </div>
    </>
  )
}
