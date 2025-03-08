'use client'

import Funnel from 'shared/clients/funnel/Funnel'
import { useFunnel } from 'shared/clients/funnel/FunnelProvider'
import useFunnelSteps from 'shared/clients/funnel/hooks/useFunnelSteps'
import { shootoutConfig } from '../default.config'
import { useEffect } from 'react'

type Props = {
  onEnded?: any
}

export default function NewGameForm({ onEnded }: Props) {
  const { step, nav } = useFunnelSteps('funnel_shootout', steps)
  const { data: funnel, isLoading, setFunnel } = useFunnel()

  useEffect(() => {
    if (isLoading) return
    if (funnel.lastStep == 'isEnded') {
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
        label: 'Durée de la partie',
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
        label: 'Durée du shot',
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
        label: 'Durée de la partie',
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
        label: 'Durée du shot en 2e période',
        default: shootoutConfig.S_LocalTime2,
        required: true,
        component: 'funnel_blok_input',
        customKey: 'localTime2',
        errors: [],
      },
    ],
  },
]
