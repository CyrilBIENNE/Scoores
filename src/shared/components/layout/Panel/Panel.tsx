'use client'

import styles from './Panel.module.scss'
import Close from '@/icons/close'

type Props = {
  children: any
  onClose: any
  isOpen: boolean
}

export default function Panel({ children, onClose, isOpen }: Props) {
  return (
    <div className={styles.panel} data-swp={isOpen ? 'true' : undefined}>
      <div className="container">
        <div className={styles.close} onClick={onClose}>
          <Close size={36} />
        </div>
        {children}
      </div>
    </div>
  )
}
