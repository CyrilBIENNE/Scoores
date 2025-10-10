'use client'

import { useEffect } from 'react'

export default function RegisterSW() {
  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator && typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            // 🔁 Forcer l'activation immédiate du nouveau SW
            if (reg.waiting) {
              reg.waiting.postMessage({ type: 'SKIP_WAITING' })
              //console.info('♻️ Nouveau SW activé immédiatement')
            }
            // Écoute quand un nouveau SW est prêt
            reg.addEventListener('updatefound', () => {
              const newWorker = reg.installing
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed') {
                    newWorker.postMessage({ type: 'SKIP_WAITING' })
                    //console.info('🚀 Nouveau service worker installé et activé')
                  }
                })
              }
            })
          })
          .catch((err) => console.error('❌ Erreur SW :', err))
      })
    }
  }, [])

  return <></>
}
