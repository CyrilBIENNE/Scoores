'use client'

import { createContext, useEffect, useState } from 'react'
import { cleanInputValue } from 'shared/clients/funnel/hooks/utils'
import { useContext } from 'react'

const STORAGE_VERSION_PREFIX = ''

export interface FunnelStructure {
  _id?: string
  createdAt?: Date
  updatedAt?: Date
  questions: { [key: string]: any }
  lastStep?: string
  expire?: Date
  version?: string
}

type Props = {
  storage?: {
    type?: 'sessionStorage' | 'localStorage' | undefined // sessionStorage or localStorage, if empty data reset on page load
    id?: string // only for sessionStorage or localStorage
    expireHour?: number //  only for sessionStorage or localStorage
    version?: string
  }
  initParams?: { [key: string]: any }
  children: any[] | any
}

export const initFunnel = (initParams: any = {}, expire?: Date): FunnelStructure => ({
  questions: {},
  lastStep: undefined,
  expire,
  ...initParams,
})

export interface FunnelContextData {
  funnel?: FunnelStructure
  isLoading: boolean
  addQuestion: (key: string, value: any) => void
  addParam: (key: string, value: any) => void
  setFunnel: (funnel: FunnelStructure) => void
}

export const FunnelContext = createContext<FunnelContextData>({
  isLoading: true,
  addQuestion: () => {},
  addParam: () => {},
  setFunnel: () => {},
})

export default function FunnelProvider({ storage: storageConfig, initParams, children }: Props) {
  const { type, id, expireHour, version } = storageConfig ?? {}

  const [storage, setStorage] = useState<any | undefined>(undefined)
  const expire = expireHour ? new Date(Date.now() + expireHour * 60 * 60 * 1000) : undefined
  const storage_name = `${STORAGE_VERSION_PREFIX}_${id ?? 'default'}`
  const [funnel, setFunnel] = useState<FunnelStructure>(initFunnel(initParams, expire))
  const [isLoading, setIsLoading] = useState(true)

  const addQuestion = (key: string, value: any) =>
    setFunnel((prev) => ({ ...prev, questions: { ...prev.questions, [key]: cleanInputValue(value) } }))
  const addParam = (key: string, value: any) => setFunnel((prev) => ({ ...prev, [key]: cleanInputValue(value) }))

  useEffect(() => {
    if (!type) return setIsLoading(false)
    setStorage(type == 'sessionStorage' ? sessionStorage : localStorage)
  }, [type])

  useEffect(() => {
    if (!storage) return
    const storageFunnel = JSON.parse(storage.getItem(storage_name))
    if (!storageFunnel) return setIsLoading(false)
    setFunnel(
      new Date() >= new Date(storageFunnel.expire) || version !== storageFunnel.version
        ? initFunnel(initParams, expire)
        : storageFunnel
    )
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storage, storage_name])

  useEffect(() => {
    if (!storage) return
    storage.setItem(storage_name, JSON.stringify(funnel))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [funnel])

  return (
    <FunnelContext.Provider value={{ funnel, isLoading, setFunnel, addQuestion, addParam }}>
      {children}
    </FunnelContext.Provider>
  )
}

export function useFunnel(transform: any = (state: any) => state) {
  const context = useContext(FunnelContext)

  return { ...context, data: transform(context.funnel) }
}
