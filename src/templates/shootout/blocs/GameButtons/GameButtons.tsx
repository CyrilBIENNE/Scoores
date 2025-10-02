'use client'

import styles from './GameButtons.module.scss'
import Button from '@/blocs/basic/Button/Button'
import TimeBloc from '../TimeBlock/TimeBlock'

import { ShootoutGamePlayer } from 'templates/shootout/Shootout/Shootout.type'
import { ColorType } from 'shared/helpers/color.type'
import { secondesToMinutes } from '@/utils/format/secondesToMinutes'
import { vibrate } from '@/utils/basic/vibrate'
import Refresh from '@/icons/refresh'
import Switch from '@/icons/switch'

type Props = {
  currentPlayer?: ShootoutGamePlayer
  localTime: number
  isLocalPause: boolean
  setIsLocalPause: (isLocalPause: boolean) => void
  onChangePlayer: (player?: ShootoutGamePlayer) => void
  onNewShot: () => void
}
export default function GameButtons({
  currentPlayer,
  localTime,
  isLocalPause,
  setIsLocalPause,
  onChangePlayer,
  onNewShot,
}: Props) {
  if (!currentPlayer) return <></>

  return (
    <div className={styles.action}>
      {currentPlayer && (
        <Button
          callback={() => {
            vibrate(currentPlayer.number == 2 ? [100] : [100, 50, 100])
            onChangePlayer()
          }}
          type={ColorType.PRIMARY}
          size="lg"
          data-full-width={true}
          icon={
            <span className={styles.svg}>
              <Switch />
            </span>
          }
        >
          <span>
            Switch to Player<strong style={{ paddingLeft: 4, width: 28 }}>{currentPlayer.number}</strong>
          </span>
        </Button>
      )}
      <TimeBloc
        isAlert={localTime <= 5}
        isEnded={localTime <= 0 ? true : false}
        size="lg"
        status={localTime == 0 ? 'ended' : isLocalPause ? 'paused' : 'running'}
        callback={() => {
          if (localTime > 0) vibrate(isLocalPause ? [300, 100, 100] : [400])
          // eslint-disable-next-line
          localTime > 0 ? setIsLocalPause(!isLocalPause) : null
        }}
      >
        {secondesToMinutes(localTime)}
      </TimeBloc>
      {currentPlayer && (
        <Button
          label="New Shot"
          callback={() => {
            vibrate([100])
            onNewShot()
          }}
          type={ColorType.PRIMARY}
          size="lg"
          data-full-width={true}
          icon={
            <span className={styles.svg}>
              <Refresh size={40} />
            </span>
          }
        />
      )}
    </div>
  )
}
