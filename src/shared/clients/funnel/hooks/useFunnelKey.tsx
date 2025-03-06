'use client'

import { useEffect } from 'react'
import { useFunnel } from 'shared/clients/funnel/FunnelProvider'
import { dynamicData } from '@/utils/basic/dynamicData'

export default function useFunnelKey(key?: string, defaultJS?: string): any {
  const { data: value, addQuestion } = useFunnel((s: any) => s?.questions?.[key ?? 'test'])

  const onChange = async (value: any) => (key ? addQuestion(key, value) : null)

  useEffect(() => {
    if (!defaultJS) return

    if (!value && value !== '') {
      const data = dynamicData(defaultJS)
      if (data) onChange(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultJS])

  return { value: value ?? '', onChange }
}
