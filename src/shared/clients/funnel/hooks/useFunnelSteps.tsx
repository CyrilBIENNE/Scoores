'use client'

import { useEffect, useState } from 'react'
import useInitSteps from './useInitSteps'
import { useFunnel } from 'shared/clients/funnel/FunnelProvider'
import { dynamicCondition } from '@/utils/basic/dynamicData'

export default function useFunnelSteps(name: string, initSteps: any[], onEnded?: () => any): any {
  const { data: funnel, addParam, isLoading } = useFunnel()

  const [index, setIndex] = useState(0)
  const { steps /*, stepsIsLoading*/ } = useInitSteps(initSteps, funnel?.questions, isLoading)
  const [isEnded, setIsEnded] = useState(false)

  // For refresh or clearFunnel
  const lastStep = funnel?.lastStep ?? null
  useEffect(() => {
    if (lastStep) {
      if (lastStep == 'isEnded') {
        if (onEnded) onEnded()
        return setIsEnded(true)
      }
      for (let i = 0; i < steps.length; i++) {
        if (steps[i]['_uid'] == lastStep) changeIndex(i)
      }
    } else {
      changeIndex(0)
    }
    setIsEnded(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastStep])

  // Progress
  const realProgress = isEnded ? 1 : (index + 1) / steps.length
  const progress = realProgress * 100

  const changeIndex = (n: number, step = 1) => {
    const i = getNextStep(n, step)
    if (i == null) return
    if (i == 'isEnded') {
      addParam('lastStep', 'isEnded')
      if (onEnded) onEnded()
      return setIsEnded(true)
    }
    setIndex(i)
    addParam('lastStep', steps[i]['_uid'])
  }

  const getNextStep = (i: number, step = 1): any => {
    if (i < 0) return null
    if (i >= steps.length) return 'isEnded'
    if (step < 0 && steps[i].component == 'step_funnel_animation') return getNextStep(i + step, step)
    if (steps[i].bypassStep) return getNextStep(i + step, step)
    if (!dynamicCondition(steps[i]['if'], { funnel })) return getNextStep(i + step, step)

    return i
  }

  const [isSaving, setIsSaving] = useState(false)

  const onPrevious = () => changeIndex(index - 1, -1)
  const onNext = async () => {
    //clickFunnelStepEvent(name, index, funnel, steps[index].questions)
    changeIndex(index + 1)
  }

  const quickFinish = () => {
    addParam('lastStep', 'isEnded')
  }

  return {
    step: steps[index],
    nav: { index, isEnded, isSaving, progress, onNext, onPrevious, setIsSaving, quickFinish },
  }
}
