'use client'

import styles from './Panel.module.scss'
import Close from '@/icons/Close'

type Props = {
  children: any
  onClose: any
  isOpen: boolean
}

export default function Panel({ children, onClose, isOpen }: Props) {
  if (!isOpen) return <></>

  return (
    <div className={styles.panel}>
      <div className="container">
        <div className={styles.close} onClick={onClose}>
          <Close size={36} />
        </div>
        {children}
      </div>
    </div>
  )
}
