'use client'

import styles from './Zone.module.scss'
import Pause from '@/icons/pause'
import Play from '@/icons/play'
import Cri from '@/icons/cri'
import TimeBloc from '../TimeBlock/TimeBlock'
import Button from '@/blocs/basic/Button/Button'
import { ColorType } from 'shared/helpers/color.type'
import { secondesToMinutes } from '@/utils/secondesToMinutes'
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
  if (currentPlayer?.number != player.number)
    return (
      <>
        <div style={{ color: '#FFF', position: 'absolute', top: 5, right: 5, zIndex: 9, opacity: 0.5 }}>
          {player.totalTime}
        </div>
        <div className={styles.actionZone}>
          <div className={styles.action} onClick={() => onChangePlayer(player)}>
            <Play size="90" />
          </div>
        </div>
      </>
    )

  return (
    <>
      <div style={{ color: '#FFF', position: 'absolute', top: 5, right: 5, zIndex: 9, opacity: 0.5 }}>
        {player.totalTime}
      </div>
      {localTime == 0 && (
        <div className={styles.failed}>
          <Cri size="90%" color="rgba(255, 0, 0, 0.6)" />
        </div>
      )}
      <div className={styles.actionZone}>
        <div style={{ marginBottom: '1rem' }}>
          {localTime > 0 && (
            <Button
              label="New Shot"
              callback={() => {
                onNewShot()
              }}
              type={ColorType.WHITE}
              size="lg"
            />
          )}
        </div>
        <div className={styles.subAction}>
          {!isLocalPause && localTime > 0 ? (
            <div
              className={styles.action}
              onClick={() => {
                if (localTime > 0) {
                  setIsLocalPause(true)
                } else {
                  return false
                }
              }}
              data-failed={localTime == 0}
            >
              <Pause size="40" />
            </div>
          ) : (
            localTime > 0 && (
              <div
                className={styles.action}
                onClick={() => {
                  setIsLocalPause(false)
                }}
              >
                <Play size="40" />
              </div>
            )
          )}
          <TimeBloc
            isAlert={localTime <= 5}
            isEnded={localTime <= 0 ? true : false}
            size="lg"
            style={{ marginLeft: -4 }}
          >
            {secondesToMinutes(localTime)}
          </TimeBloc>
        </div>
      </div>
    </>
  )
}
