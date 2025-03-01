/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react'
import { ShootoutContext, ShootoutContextData } from './ShootoutContext'
import { ShootoutStructure } from './Shootout.type'

export type ShootoutData = ShootoutContextData & {
  data: ShootoutStructure | undefined
}

export default function useShootout(transform: any = (state: any) => state): ShootoutData {
  const shootoutContext = useContext(ShootoutContext)

  return {
    ...shootoutContext,
    data: transform(shootoutContext.shootout),
  }
}
