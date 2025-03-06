'use client'

import { useState } from 'react'

export default function useModal(defaultState: boolean = false): any {
  const [isOpen, setIsOpen] = useState(defaultState)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen(!isOpen)

  return { isOpen, open, close, toggle }
}
