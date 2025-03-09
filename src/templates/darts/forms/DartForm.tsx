'use client'

import { createContext, useContext, useEffect } from 'react'
import FunnelProvider, { useFunnel } from 'shared/clients/funnel/FunnelProvider'
import { useSearchParams } from 'next/navigation'
import NewGameForm from './NewGameForm'

export interface DartsFormContextData {
  isLoading: boolean
}

export const DartsFormContext = createContext<DartsFormContextData>({
  isLoading: true,
})

type Props = {
  children?: any
  onEnded: any
}

export default function DartsForm({ children, onEnded }: Props) {
  return (
    <FunnelProvider storage={{ id: `dart_game` /*expireHour: 0/>*/, type: 'localStorage' }}>
      <DartsFormContent onEnded={onEnded}>{children}</DartsFormContent>
    </FunnelProvider>
  )
}

function DartsFormContent({ children, onEnded }: Props) {
  const { isLoading } = useFunnel()
  const searchParams = useSearchParams()
  const funnelParam = searchParams.get('funnel')

  useEffect(() => {
    if (isLoading) return
  }, [funnelParam, isLoading])

  useEffect(() => {
    if (isLoading) return
    //if (funnel.lastStep == 'isEnded') setIsNew(false)
  }, [isLoading])

  return (
    <DartsFormContext.Provider value={{ isLoading }}>
      {children}
      <NewGameForm onEnded={onEnded} />
    </DartsFormContext.Provider>
  )
}

export function useDartsForm() {
  const data = useContext(DartsFormContext)
  return data
}
