'use client'

import { useEffect, useState } from 'react'
import styles from '../ShootoutGame.module.scss'
import Pause from '@/icons/pause'
import Play from '@/icons/play'
import { secondesToMinutes } from '@/utils/format/secondesToMinutes'
import Zone from '../blocs/Zone/Zone'
import ZoneClient from '../blocs/Zone/Zone.client'
import useSound from 'use-sound'
import GameReport from '../blocs/GameReport/GameReport'
import RoundedBloc from '@/components/RoundedBloc/RoundedBloc'
import { shootoutConfig } from '../shootout.config'
import { ShootoutGameConfig, ShootoutGamePlayer } from './Shootout.type'
import WakeLock from '@/components/WakeLock/WakeLock'
import Button from '@/blocs/basic/Button/Button'
import useAppData from 'templates/_layout/AppContext/useAppData'

type Props = {
  config: ShootoutGameConfig
}

enum SOUNDS {
  localTimeAlert = 'localTimeAlert',
  changeMaxtime = 'changeMaxtime',
  endLocalTime = 'endLocalTime',
  endGame = 'endGame',
}

export default function Shootout({ config }: Props) {
  const [isMatchEnded, setIsMatchEnded] = useState(false)
  const [totalTime, setTotalTime] = useState(config.totalTime)
  const [localTime, setLocalTime] = useState(config.localTime1)
  const [isLocalPause, setIsLocalPause] = useState(true)
  const [isTotalPause, setIsTotalPause] = useState(true)
  const [maxLocalTime, setMaxLocalTime] = useState(config.localTime1)
  const [currentShotTime, setCurrentShotTime] = useState(config.localTime1)
  const [currentPlayer, setCurrentPlayer] = useState<ShootoutGamePlayer | undefined>(undefined)
  const [timestamp, setTimestamp] = useState<number | undefined>(undefined)
  const { isMute, setIsGameInProgress, isLoading } = useAppData()

  const [player1, setPlayer1] = useState<ShootoutGamePlayer>({
    number: 1,
    name: config.name1 ?? 'Player 1',
    shots: 0,
    turns: 0,
    totalTime: 0,
  })
  const [player2, setPlayer2] = useState<ShootoutGamePlayer>({
    number: 2,
    name: config.name2 ?? 'Player 2',
    shots: 0,
    turns: 0,
    totalTime: 0,
  })

  const [soundLocalTimeAlert] = useSound('/sounds/resonance-bell-decaying.mp3')
  const [soundChangeMaxtime] = useSound('/sounds/beep-08b.mp3')
  const [soundEndLocalTime] = useSound('/sounds/gameover.mp3')
  const [soundEndGame] = useSound('/sounds/bell-drum_c_major.mp3')

  function playSound(soundName: SOUNDS) {
    switch (soundName) {
      case SOUNDS.localTimeAlert:
        window?.navigator?.vibrate([200])
        if (!isMute) soundLocalTimeAlert()
        break
      case SOUNDS.changeMaxtime:
        window?.navigator?.vibrate([200, 100, 200, 100, 200])
        if (!isMute) {
          soundChangeMaxtime()
          setTimeout(() => soundChangeMaxtime(), 200)
        }
        break
      case SOUNDS.endLocalTime:
        window?.navigator?.vibrate([700, 100, 300])
        if (!isMute) soundEndLocalTime()
        break
      case SOUNDS.endGame:
        window?.navigator?.vibrate([700, 200, 700, 200, 700])
        if (!isMute) soundEndGame()
        break
      default:
        break
    }
  }

  function manageTimestamp() {
    if (currentPlayer && timestamp) {
      const newTotalTime =
        currentPlayer.totalTime + Math.min(currentShotTime, Math.round(Math.floor((Date.now() - timestamp) / 10)) / 100)
      currentPlayer.totalTime = Math.round(newTotalTime * 100) / 100
      //console.log(`On encaisse joueur ${currentPlayer.number}`, newTotalTime)
      updatePlayer(currentPlayer)
      setTimestamp(undefined)
    }

    return
  }

  function updatePlayer(player: ShootoutGamePlayer) {
    if (player.number == 2) {
      setPlayer2({ ...player })
    } else {
      setPlayer1({ ...player })
    }
  }

  function onChangePlayer(player: ShootoutGamePlayer) {
    manageTimestamp()
    setCurrentPlayer(player)
  }

  const onNewShot = () => {
    if (currentPlayer) {
      currentPlayer.shots++
      updatePlayer(currentPlayer)
    }
    manageTimestamp()
    setTimestamp(Date.now())
    setCurrentShotTime(maxLocalTime)
    setLocalTime(maxLocalTime)
    if (isLocalPause) setIsLocalPause(false)
    setIsTotalPause(false)
  }

  function onTotalPause(bool: boolean) {
    if (bool && !isLocalPause) setIsLocalPause(true)
    setIsTotalPause(bool ? true : false)
  }

  useEffect(() => {
    setIsGameInProgress(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!currentPlayer) return
    onNewShot()
    currentPlayer.turns++
    updatePlayer(currentPlayer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer])

  useEffect(() => {
    if (!isLocalPause) setTimestamp(Date.now())
    if (!isLocalPause && isTotalPause) setIsTotalPause(false)
    if (isLocalPause || localTime <= 0) return manageTimestamp()

    const timer = setInterval(() => {
      setLocalTime((prev) => {
        prev = (prev * 10 - 1) / 10
        if (prev <= shootoutConfig.S_AlertLocalTime && !prev.toString().split('.')[1] && prev != 0) {
          playSound(SOUNDS.localTimeAlert)
        }
        if (prev == 0) playSound(SOUNDS.endLocalTime)

        return prev
      })
    }, 100)
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLocalPause, isMute])

  useEffect(() => {
    if (totalTime <= 0 || isTotalPause) return
    const timerTotal = setInterval(() => {
      setTotalTime((prevTime) => prevTime - 0.1)
    }, 100)
    if (totalTime <= config.totalTimeChangeLocal && maxLocalTime != config.localTime2) {
      playSound(SOUNDS.changeMaxtime)
      setMaxLocalTime(config.localTime2)
    }

    return () => clearInterval(timerTotal)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalTime, isTotalPause, isMute])

  useEffect(() => {
    if (localTime <= 0) setIsLocalPause(true)
  }, [localTime])

  useEffect(() => {
    if (totalTime <= 0) {
      manageTimestamp()
      onTotalPause(true)
      setCurrentPlayer(undefined)
      playSound(SOUNDS.endGame)
      setIsMatchEnded(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalTime, isMute])

  if (isLoading) return <div>Chargement...</div>
  return (
    <div className={styles.shootout}>
      <div className={styles.zones}>
        <Zone color="blue" isActive={currentPlayer?.number == player1.number} player={player1}>
          {currentPlayer || !isMatchEnded ? (
            <ZoneClient
              player={player1}
              currentPlayer={currentPlayer}
              localTime={Math.ceil(localTime)}
              isLocalPause={isLocalPause}
              setIsLocalPause={setIsLocalPause}
              onChangePlayer={onChangePlayer}
              onNewShot={onNewShot}
            />
          ) : (
            <GameReport player={player1} />
          )}
        </Zone>
        <Zone color="red" isActive={currentPlayer?.number == player2.number} player={player2}>
          {!isMatchEnded ? (
            <ZoneClient
              player={player2}
              currentPlayer={currentPlayer}
              localTime={Math.ceil(localTime)}
              isLocalPause={isLocalPause}
              setIsLocalPause={setIsLocalPause}
              onChangePlayer={onChangePlayer}
              onNewShot={onNewShot}
            />
          ) : (
            <GameReport player={player2} />
          )}
        </Zone>
      </div>

      <div className={styles.middle}>
        {!isMatchEnded ? (
          <>
            <WakeLock />
            <div className={styles.time}>
              <RoundedBloc isAlert={totalTime <= shootoutConfig.S_AlertTotalTime}>
                <strong>Total</strong> <span className={styles.chrono}>{secondesToMinutes(Math.ceil(totalTime))}</span>
              </RoundedBloc>
            </div>
            {currentPlayer && (
              <div className={styles.totalPause} onClick={() => onTotalPause(!isTotalPause)} style={{ marginLeft: -4 }}>
                {!isTotalPause ? <Pause size="2em" /> : <Play size="2em" />}
              </div>
            )}
            <div className={styles.time} style={{ marginLeft: -4 }}>
              <RoundedBloc isAlert={maxLocalTime == config.localTime2}>
                <strong>Shot </strong>
                <span style={{ paddingLeft: 6 }}>{maxLocalTime}s</span>
              </RoundedBloc>
            </div>
          </>
        ) : (
          <>
            <RoundedBloc style={{ backgroundColor: '#FFF', fontWeight: 600 }}>
              Match terminé | {Math.max(player1.turns, player2.turns)} tours
            </RoundedBloc>

            <Button callback={() => window.location.reload()} label="Nouvelle partie" />
          </>
        )}
      </div>
    </div>
  )
}
