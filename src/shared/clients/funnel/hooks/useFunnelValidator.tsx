'use client'

import { useEffect, useState } from 'react'
import { useFunnel } from 'shared/clients/funnel/FunnelProvider'
import { dynamicCondition } from '@/utils/basic/dynamicData'

export default function useFunnelValidator(questions: any): any {
  const { data: funnel } = useFunnel()
  const { data } = useFunnel((state: any) => ({ ...state?.questions }))
  const [isValid, setIsValid] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const singleInput: any[] = []
    let allValid = true
    for (const question of questions) {
      // Si pas un input ou pas afficher
      if (!question.customKey || !dynamicCondition(question.if, { funnel })) continue

      const value = data[question.customKey] ?? ''
      if (question.required && value == '') allValid = false
      if (question.errors) {
        for (const customError of question.errors) {
          if (customError.regex) {
            const regex = new RegExp(customError.regex)
            if (!regex.test(value)) allValid = false
          } else if (customError.condition) {
            if (dynamicCondition(customError.condition, { val: value })) allValid = false
          }
        }
      }
      if (question.regex) {
        const regex = new RegExp(question.regex)
        if (!regex.test(value)) allValid = false
      }
      if (question.isSingleInput) singleInput.push(question)

      if (question.customKey == 'calendar') {
        if (data.calendar == null || data.calendar.length < question.timeSlotMin) allValid = false
      }
    }

    setIsValid(allValid)
    setIsHidden(singleInput.length == 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, questions])

  return { isValid, isHidden }
}
