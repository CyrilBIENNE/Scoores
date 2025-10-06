'use client'

import { createContext, useEffect, useState } from 'react'
import { AppStructure } from './App.type'
import { HelpTypes } from '../Header/Help.type'
import { APP_CONFIG } from 'configs/app.config'

type Props = {
  initParams?: { [key: string]: any }
  children: any
}

export interface AppContextData {
  appData?: AppStructure
  isLoading?: boolean
  setAppData: (appData: AppStructure) => void
  isMute: boolean
  setIsMute: (isMute: boolean) => void
  isGameInProgress: boolean
  currentGame?: string
  setIsGameInProgress: (bool: boolean) => void
  helpType?: HelpTypes
  setHelpType: (helpType: HelpTypes) => void
}

export interface AppFrontData {
  appData: AppStructure
  isLoading: boolean
  fnFront: AppContextData
}

export const initApdata = () => {
  const appData: AppStructure = {
    version: '1.0.0',
    isMute: false,
    helpType: undefined,
  }
  return appData
}

export const AppContext = createContext<AppContextData>({
  setAppData: () => {},
  isLoading: true,
  isMute: false,
  setIsMute: () => {},
  isGameInProgress: false,
  setIsGameInProgress: () => {},
  helpType: undefined,
  setHelpType: () => {},
})

const AppProvider = ({ children }: Props) => {
  const appName = `scoores`
  const [appData, setAppData] = useState<AppStructure>(initApdata())
  const [isMute, setIsMute] = useState(false)
  const [isGameInProgress, setIsGameInProgress] = useState(false)
  const [helpType, setHelpType] = useState<HelpTypes | undefined>(undefined)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isLoading) return
  }, [isLoading])

  useEffect(() => {
    if (isLoading) return
    setAppData({ ...appData, isMute: isMute })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMute])

  useEffect(() => {
    const tmpStorage = localStorage.getItem(appName)
    const storageApp = tmpStorage ? JSON.parse(tmpStorage) : undefined
    let finalAppData = appData
    if (storageApp?.version) {
      finalAppData = storageApp
      if (finalAppData?.version !== APP_CONFIG.version) {
        finalAppData = APP_CONFIG
        localStorage.setItem(appName, JSON.stringify(finalAppData))
      }
      setAppData(finalAppData)
    } else {
      localStorage.setItem(appName, JSON.stringify(appData))
    }

    setIsMute(finalAppData.isMute)

    return setIsLoading(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appName])

  useEffect(() => {
    if (isLoading) return
    if (!appData) return
    localStorage.setItem(appName, JSON.stringify(appData))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, appData])

  return (
    <AppContext.Provider
      value={{
        appData,
        isLoading,
        setAppData,
        setIsMute,
        isMute,
        isGameInProgress,
        setIsGameInProgress,
        helpType,
        setHelpType,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
