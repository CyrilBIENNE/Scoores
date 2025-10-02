import { Capacitor } from '@capacitor/core'

export function isNativePlatform() {
  try {
    return Capacitor?.isNativePlatform?.() === true || process.env.NEXT_PUBLIC_IS_APP === 'true'
  } catch {
    return process.env.NEXT_PUBLIC_IS_APP === 'true'
  }
}
