'use client'

import FunnelProvider from 'shared/clients/funnel/FunnelProvider'
import { createContext, useContext, useEffect } from 'react'
import { useFunnel } from 'shared/clients/funnel/FunnelProvider'
import { useSearchParams } from 'next/navigation'
import NewGameForm from './NewGameForm'

export interface ShootoutFormContextData {
  isLoading: boolean
}

export const ShootoutFormContext = createContext<ShootoutFormContextData>({
  isLoading: true,
})

type Props = {
  children?: any
  onEnded: any
}

export default function ShootoutForm({ children, onEnded }: Props) {
  return (
    <FunnelProvider storage={{ id: `shootout_game` /*expireHour: 0, type: 'sessionStorage'*/ }}>
      <ShootoutFormContent onEnded={onEnded}>{children}</ShootoutFormContent>
    </FunnelProvider>
  )
}

function ShootoutFormContent({ children, onEnded }: Props) {
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
    <ShootoutFormContext.Provider value={{ isLoading }}>
      {children}
      <NewGameForm onEnded={onEnded} />
    </ShootoutFormContext.Provider>
  )
}

export function useShootoutForm() {
  const data = useContext(ShootoutFormContext)
  return data
}
