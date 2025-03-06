'use client'

import styles from './ShootoutGame.module.scss'
import useShootout from './providers/useShootout'
import Shootout from './Shootout/Shootout'
import { useState } from 'react'
import ShootoutForm from './forms/ShootoutParamatersForm'
import { ShootoutGameConfig } from './Shootout/Shootout.type'

export default function ShootoutGame() {
  const { isLoading: isShootoutloading } = useShootout()
  const [gameConfig, setGameConfig] = useState<ShootoutGameConfig | undefined>(undefined)

  const onEnded = (res: any) => {
    const q = res?.questions
    setGameConfig({
      name1: q?.name1,
      name2: q?.name2,
      totalTime: q.totalTime,
      localTime1: q.localTime1,
      localTime2: q.localTime2,
      totalTimeChangeLocal: q.totalTimeChangeLocal,
    })
  }

  if (isShootoutloading) return <>Loading...</>

  return (
    <>
      {gameConfig ? (
        <Shootout config={gameConfig} />
      ) : (
        <div className={styles.container}>
          <ShootoutForm onEnded={onEnded} />
        </div>
      )}
    </>
  )
}
