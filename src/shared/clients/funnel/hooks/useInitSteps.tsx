import { useEffect, useState } from 'react'

export default function useInitSteps(initSteps: any[], questions: any, isLoading: boolean): any {
  const [steps, setSteps] = useState(initSteps)
  const [stepsIsLoading, setStepsIsLoading] = useState(true)

  // Bypass address
  useEffect(() => {
    if (isLoading) return
    const newSteps: any[] = []
    for (const step of initSteps) {
      if (step.bypass) {
        let bypass = true
        for (const question of step.questions) {
          if (
            question.customKey &&
            (!(question.customKey in questions) || questions[question.customKey] === undefined)
          ) {
            bypass = false
          }
        }
        step.bypassStep = bypass
      } else {
        step.bypassStep = false
      }
      newSteps.push(step)
    }
    setSteps(newSteps)
    setStepsIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initSteps, isLoading])

  return { steps, stepsIsLoading }
}
