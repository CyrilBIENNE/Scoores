'use client'

import Funnel from 'shared/clients/funnel/Funnel'
import { useFunnel } from 'shared/clients/funnel/FunnelProvider'
import useFunnelSteps from 'shared/clients/funnel/hooks/useFunnelSteps'
import { useEffect } from 'react'
import { dartsConfig } from '../default.config'
import { GAME_CONFIGS } from 'configs/configs.type'

const dartsVersions = GAME_CONFIGS.darts?.versions?.map((version: any) => ({
  _uid: version.slug,
  text: version.name,
  value: version.slug,
  component: 'misc_funnel_choice_answer',
}))
type Props = {
  onEnded?: any
}

export default function NewGameForm({ onEnded }: Props) {
  const { step, nav } = useFunnelSteps('funnel_darts', steps)
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
        _uid: 'fm-3',
        error: 'Sélectionnez votre type de jeu',
        label: 'Type de jeu',
        required: true,
        component: 'funnel_blok_choice',
        choices: dartsVersions,
        customKey: 'dartGame',
        errors: [],
      },
      {
        if: '',
        _uid: 'fm-2ddd',
        type: 'string',
        error: 'Définir les  joueurs',
        label: 'Joueurs',
        required: true,
        default: ['Player 1', 'Player 2'],
        defaultLabel: 'Nom du joueur',
        component: 'funnel_blok_input_array',
        customKey: 'players',
        errors: [],
      },
      {
        if: '',
        _uid: 'fm-7',
        type: 'hidden',
        default: `'${dartsConfig.version}'`,
        component: 'funnel_blok_input_hidden',
        customKey: 'version',
        errors: [],
      },
    ],
  },
]
