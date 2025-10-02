import { Haptics } from '@capacitor/haptics'

export function vibrate(pattern: number[]) {
  const canVibrate = typeof window?.navigator?.vibrate == 'function'
  if (canVibrate) {
    try {
      window?.navigator?.vibrate(pattern)
    } catch {
      let delay = 0
      for (let i = 0; i < pattern.length; i++) {
        const duration = pattern[i]
        if (i % 2 === 0) {
          setTimeout(() => {
            Haptics.vibrate({ duration })
          }, delay)
        }
        delay += duration
      }
    }
  }
}
