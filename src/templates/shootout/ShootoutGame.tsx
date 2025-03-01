'use client'

import { shootoutConfig } from './providers/default.config'
import useShootout from './providers/useShootout'
import styles from './ShootoutGame.module.scss'
import { useEffect, useState } from 'react'

export default function ShootoutGame() {
  const [gameConfig, setGameConfig] = useState(shootoutConfig)
  const [name1, setName1] = useState('Player 1')
  const [name2, setName2] = useState('Player 2')
  const { setIsGameInProgress, isLoading } = useShootout()

  useEffect(() => {
    setIsGameInProgress(true)
  }, [])

  if (isLoading) return <>Loading...</>

  return (
    <div className={styles.params}>
      <div className="table">
        <div>
          <div>
            <strong>Nom joueur 1</strong>
          </div>
          <div>{name1}</div>
        </div>
        <div>
          <div>
            <strong>Nom joueur 2</strong>
          </div>
          <div>{name2}</div>
        </div>
        <div>
          <div>
            <strong>Temps total</strong>
          </div>
          <div>{gameConfig.S_TotalTime} secondes</div>
        </div>
        <div>
          <div>
            <strong>Temps de shot 1</strong>
          </div>
          <div>{gameConfig.S_LocalTime1} secondes</div>
        </div>
        <div>
          <div>
            <strong>Changement de temps de shot au bout de</strong>
          </div>
          <div>{gameConfig.S_TotalTime} secondes</div>
        </div>
        <div>
          <div>
            <strong>Temps de shot 2</strong>
          </div>
          <div>{gameConfig.S_LocalTime1} secondes</div>
        </div>
      </div>
    </div>
  )
}
