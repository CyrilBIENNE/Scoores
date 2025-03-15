export const TOTAL_TIME = 10 * 60
export const TOTAL_TIME_CHANGE_LOCAL = 5 * 60
export const LOCAL_TIME_1 = 5 // 15
export const LOCAL_TIME_2 = 10
export const ALERT_LOCAL_TIME = 5
export const ALERT_TOTAL_TIME = 60

export type ShootoutGameConfig = {
  name1?: string
  name2?: string
  totalTime: number
  localTime1: number
  localTime2: number
  totalTimeChangeLocal: number
}

export interface ShootoutGame {
  player1: ShootoutGamePlayer
  player2: ShootoutGamePlayer
  totalShots: number
  totalTime: number
  winner: ShootoutGamePlayer
  config: ShootoutGameConfig
}

export interface ShootoutGamePlayer {
  number: number
  name: string
  totalTime: number
  shots: number
  turns: number
  win?: boolean
}
