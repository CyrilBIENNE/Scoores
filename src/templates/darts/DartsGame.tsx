'use client'

import styles from './DartsGame.module.scss'
import { DartsGameConfig } from './Darts/Darts.typs'
import { useState } from 'react'
import DartsForm from './forms/DartForm'
import Darts from './Darts/Darts'

export default function DartsGame() {
  const [gameConfig, setGameConfig] = useState<DartsGameConfig | undefined>(undefined)

  const onEnded = (res: any) => {
    const q = res?.questions
    setGameConfig({
      name1: q?.name1,
      name2: q?.name2,
      dartGame: undefined,
    })
  }

  return (
    <div className={styles.container}>
      {gameConfig ? (
        <Darts config={gameConfig} />
      ) : (
        <div style={{ width: '480px', maxWidth: '100%' }}>
          <h1>Nouvelle partie de Darts</h1>
          <DartsForm onEnded={onEnded} />
        </div>
      )}
    </div>
  )
}
