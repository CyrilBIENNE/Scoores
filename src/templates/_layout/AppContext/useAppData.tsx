import { useContext } from 'react'
import { AppContext, AppContextData } from './AppContext'
import { AppStructure } from './App.type'

export type AppData = AppContextData & {
  data: AppStructure | undefined
}

export default function useAppData(transform: any = (state: any) => state): AppData {
  const appContext = useContext(AppContext)

  return {
    ...appContext,
    data: transform(appContext.appData),
  }
}
