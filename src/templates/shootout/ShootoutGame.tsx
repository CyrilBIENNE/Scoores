'use client'

import styles from './ShootoutGame.module.scss'
import Shootout from './Shootout/Shootout'
import { useEffect, useState } from 'react'
import ShootoutForm from './forms/ShootoutParamatersForm'
import { ShootoutGameConfig } from './Shootout/Shootout.type'
import useAppData from '../_layout/AppContext/useAppData'
import { HelpTypes } from 'templates/_layout/Header/Help.type'

export default function ShootoutGame() {
  const { isLoading: isShootoutloading } = useAppData()
  const [gameConfig, setGameConfig] = useState<ShootoutGameConfig | undefined>(undefined)
  const { setHelpType } = useAppData()

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

  useEffect(() => {
    setHelpType(HelpTypes.shootout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
