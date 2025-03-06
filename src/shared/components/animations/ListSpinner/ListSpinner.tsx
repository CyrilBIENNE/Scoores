import styles from './ListSpinner.module.scss'

import Loader from '@/components/animations/Loader/Loader'

export default function ListSpinner({ list }: { list: string[] }) {
  return (
    <div className={styles.wrapper}>
      <Loader size={32} />
      <ul>
        {list.map((text, i) => (
          <li key={i}>{text}</li>
        ))}
      </ul>
    </div>
  )
}
