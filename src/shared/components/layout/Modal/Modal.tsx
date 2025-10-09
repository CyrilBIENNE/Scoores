'use client'

import styles from './Modal.module.scss'

import Close from '@/icons/closed'
import OutSideDiv from '../OutSideDiv/OutSideDiv'
import { createPortal } from 'react-dom'

type Props = {
  children?: any | string
  onClose?: () => any
  className?: string
  title?: string
}

const Modal = ({ children, onClose, className, title }: Props) => {
  return createPortal(
    <div className={styles.container}>
      <OutSideDiv styles={styles.outside} callback={onClose ? onClose : () => {}}>
        <div className={styles.wrapper + (className ? ' ' + className : '')}>
          <div className={styles.topbar}>
            {title ? <p className={`${styles.title} footnote`}>{title}</p> : <p></p>}
            {onClose && <Close size={16} color={'#ccc'} class={styles.icon} onClick={onClose} />}
          </div>
          {children}
        </div>
      </OutSideDiv>
    </div>,
    document.body
  )
}

export default Modal
