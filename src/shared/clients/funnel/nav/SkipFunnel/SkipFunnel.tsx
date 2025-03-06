import styles from './SkipFunnel.module.scss'

import ChevronRight from '@/icons/chevron-right'

export default function SkipFunnel({ onClose }: { onClose: () => any }) {
  return (
    <div className={styles.skip} onClick={onClose}>
      <b className="headnote">Accéder directement au résultat</b> <ChevronRight size={18} />
    </div>
  )
}
