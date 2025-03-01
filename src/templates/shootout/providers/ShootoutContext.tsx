/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { createContext, useEffect, useState } from 'react'
import { ShootoutStructure } from './Shootout.type'
import { shootoutConfig } from './default.config'

type Props = {
  initParams?: { [key: string]: any }
  children: any
}

export interface ShootoutContextData {
  shootout?: ShootoutStructure
  isLoading?: boolean
  setShootout: (shootout: ShootoutStructure) => void
  isMute: boolean
  setIsMute: (isMute: boolean) => void
  isGameInProgress: boolean
  setIsGameInProgress: (bool: boolean) => void
}

export interface ShootoutFrontData {
  shootout: ShootoutStructure
  isLoading: boolean
  fnFront: ShootoutContextData
}

export const initShootout = () => {
  const shootout: ShootoutStructure = {
    config: shootoutConfig,
    games: [],
    isMute: false,
  }
  return shootout
}

export const ShootoutContext = createContext<ShootoutContextData>({
  setShootout: () => {},
  isLoading: true,
  isMute: false,
  setIsMute: () => {},
  isGameInProgress: false,
  setIsGameInProgress: () => {},
})

const ShootoutProvider = ({ children }: Props) => {
  const shootoutName = `shootout`
  const [shootout, setShootout] = useState<ShootoutStructure>(initShootout())
  const [isMute, setIsMute] = useState(false)
  const [isGameInProgress, setIsGameInProgress] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isLoading) return
  }, [isLoading])

  useEffect(() => {
    if (isLoading) return
    setShootout({ ...shootout, isMute: isMute })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMute])

  useEffect(() => {
    const tmpStorage = localStorage.getItem(shootoutName)
    const storageShootout = tmpStorage ? JSON.parse(tmpStorage) : undefined
    let finalShootout = shootout

    if (storageShootout?.config) {
      finalShootout = storageShootout
      if (finalShootout?.config.version !== shootoutConfig.version) {
        finalShootout.config = shootoutConfig
        localStorage.setItem(shootoutName, JSON.stringify(finalShootout))
      }
      setShootout(finalShootout)
    } else {
      localStorage.setItem(shootoutName, JSON.stringify(shootout))
    }

    setIsMute(finalShootout.isMute)

    return setIsLoading(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shootoutName])

  useEffect(() => {
    if (isLoading) return
    if (!shootout) return
    localStorage.setItem(shootoutName, JSON.stringify(shootout))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, shootout])

  return (
    <ShootoutContext.Provider
      value={{
        shootout,
        isLoading,
        setShootout,
        setIsMute,
        isMute,
        isGameInProgress,
        setIsGameInProgress,
      }}
    >
      {children}
    </ShootoutContext.Provider>
  )
}

export default ShootoutProvider
