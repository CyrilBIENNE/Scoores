'use client'

import styles from './GameButtons.module.scss'
import Button from '@/blocs/basic/Button/Button'
import TimeBloc from '../TimeBlock/TimeBlock'

import { ShootoutGamePlayer } from 'templates/shootout/Shootout/Shootout.type'
import { ColorType } from 'shared/helpers/color.type'
import { secondesToMinutes } from '@/utils/format/secondesToMinutes'

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
          label={'Switch player ' + (currentPlayer?.number == 1 ? '2' : '1')}
          callback={() => onChangePlayer()}
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
      {currentPlayer && (
        <Button
          label="New Shot"
          callback={() => {
            onNewShot()
          }}
          type={ColorType.PRIMARY}
          size="lg"
        />
      )}
    </div>
  )
}
