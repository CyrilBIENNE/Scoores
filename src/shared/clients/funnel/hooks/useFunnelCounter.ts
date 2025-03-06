'use client'

import { useState } from 'react'
import { useFunnel } from 'shared/clients/funnel/FunnelProvider'

export default function useFunnelCounter(max: number) {
  const { isLoading, data: nFunnelCounter } = useFunnel((s: any) => s.nFunnelCounter)
  const [showBlockModal, setShowBlockModal] = useState(false)

  return { isBlocked: !isLoading && nFunnelCounter >= max, showBlockModal, setShowBlockModal }
}
