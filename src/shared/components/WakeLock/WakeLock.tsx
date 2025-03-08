'use client'

import { useEffect } from 'react'

export default function WakeLock({}: any) {
  useEffect(() => {
    let wakeLock: any = null

    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLock = await navigator.wakeLock.request('screen')
        }
      } catch (err) {
        console.error("Échec de l'activation de Wake Lock:", err)
      }
    }

    // Demander à ce que l'écran reste allumé lors du chargement du composant
    requestWakeLock()

    // Libérer le wake lock lorsqu'on quitte la page ou que le composant est démonté
    return () => {
      if (wakeLock) wakeLock.release()
    }
  }, [])

  return <></>
}
