'use client'

import { useEffect } from 'react'

export default function RegisterSW() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            console.log('✅ Service worker enregistré :', reg.scope)

            // 🔁 Forcer l'activation immédiate du nouveau SW
            if (reg.waiting) {
              reg.waiting.postMessage({ type: 'SKIP_WAITING' })
              console.log('♻️ Nouveau SW activé immédiatement')
            }

            // Écoute quand un nouveau SW est prêt
            reg.addEventListener('updatefound', () => {
              const newWorker = reg.installing
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed') {
                    newWorker.postMessage({ type: 'SKIP_WAITING' })
                    console.log('🚀 Nouveau service worker installé et activé')
                  }
                })
              }
            })
          })
          .catch((err) => console.error('❌ Erreur SW :', err))
      })
    }
  }, [])

  return null
}
