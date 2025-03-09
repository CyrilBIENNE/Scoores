'use client'

import styles from './NewGameForm.module.scss'
import Funnel from 'shared/clients/funnel/Funnel'
import { useFunnel } from 'shared/clients/funnel/FunnelProvider'
import useFunnelSteps from 'shared/clients/funnel/hooks/useFunnelSteps'
import { shootoutConfig } from '../default.config'
import Refresh from '@/icons/refresh'
import { useEffect, useRef } from 'react'

type Props = {
  onEnded?: any
}

export default function NewGameForm({ onEnded }: Props) {
  const { step, nav } = useFunnelSteps('funnel_shootout', steps)
  const { data: funnel, isLoading, setFunnel } = useFunnel()
  const buttonRef = useRef<HTMLDivElement>(null)

  function reset() {
    if (buttonRef?.current) buttonRef.current.blur()
    setFunnel({
      ...funnel,
      questions: {
        name1: 'Player 1',
        name2: 'Player 2',
        totalTime: shootoutConfig.S_TotalTime,
        localTime1: shootoutConfig.S_LocalTime1,
        totalTimeChangeLocal: shootoutConfig.S_TotalTimeChangeLocal,
        localTime2: shootoutConfig.S_LocalTime2,
        version: shootoutConfig,
      },
    })
  }

  useEffect(() => {
    if (isLoading) return
    if (funnel.lastStep == 'isEnded') {
      setFunnel({ ...funnel, lastStep: 'step1' })
      setFunnel({ ...funnel, lastStep: 'step1' })
      setTimeout(() => {
        return onEnded ? onEnded(funnel) : null
      }, 500)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [funnel, isLoading])

  return (
    <>
      <h1>New Game</h1>
      <div ref={buttonRef} className={styles.reset} onClick={reset} title="Recharger les valeurs par défaut">
        <Refresh /> <span>Recharger les valeurs par défaut</span>
      </div>
      <Funnel {...step} onNext={() => nav.onNext()} nav={nav} previous={'Précédent'} btnFullWidth={true} />
    </>
  )
}

const steps: any = [
  {
    if: '',
    _uid: 'step1',
    titre: 'Réglez votre partie',
    bypass: false,
    component: 'step_funnel',
    next: 'Lancer la partie',
    questions: [
      {
        if: '',
        _uid: 'shootout-fm-1s',
        type: 'string',
        error: 'Définir le nom du joueur 1',
        label: 'Nom du joueur 1',
        default: `'Player 1'`,
        required: true,
        component: 'funnel_blok_input',
        customKey: 'name1',
        errors: [],
      },
      {
        if: '',
        _uid: 'shootout-fm-2ds',
        type: 'string',
        error: 'Définir le nom du joueur 2',
        label: 'Nom du joueur 2',
        default: `'Player 2'`,
        required: true,
        component: 'funnel_blok_input',
        customKey: 'name2',
        errors: [],
      },
      {
        if: '',
        _uid: 'shootout-fm-3',
        type: 'number',
        error: 'Définir la durée de la partie',
        label: 'Durée de la partie en secondes',
        default: shootoutConfig.S_TotalTime,
        required: true,
        component: 'funnel_blok_input',
        customKey: 'totalTime',
        errors: [],
      },
      {
        if: '',
        _uid: 'shootout-fm-4',
        type: 'number',
        error: 'Définir la durée du shot',
        label: 'Durée du shot en secondes',
        default: shootoutConfig.S_LocalTime1,
        required: true,
        component: 'funnel_blok_input',
        customKey: 'localTime1',
        errors: [],
      },
      {
        if: '',
        _uid: 'shootout-fm-5',
        type: 'number',
        error: 'Définir la durée de la 2e période',
        label: 'Durée de la 2e période en secondes',
        default: shootoutConfig.S_TotalTimeChangeLocal,
        required: true,
        component: 'funnel_blok_input',
        customKey: 'totalTimeChangeLocal',
        errors: [],
      },
      {
        if: '',
        _uid: 'shootout-fm-6',
        type: 'number',
        error: 'Définir la durée du shot en 2e période',
        label: 'Durée du shot en 2e période en secondes',
        default: shootoutConfig.S_LocalTime2,
        required: true,
        component: 'funnel_blok_input',
        customKey: 'localTime2',
        errors: [],
      },
      {
        if: '',
        _uid: 'shootout-fm-7',
        type: 'hidden',
        default: `'${shootoutConfig.version}'`,
        component: 'funnel_blok_input_hidden',
        customKey: 'version',
        errors: [],
      },
    ],
  },
]
