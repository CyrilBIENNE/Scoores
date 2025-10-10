'use client'

import { useEffect } from 'react'

export default function RegisterSW() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => console.log('✅ Service worker enregistré :', reg.scope))
          .catch((err) => console.error('❌ Échec enregistrement SW :', err))
      })
    }
  }, [])

  return null
}
