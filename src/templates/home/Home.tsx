import Link from 'next/link'
import styles from './Home.module.scss'
import Play from '@/icons/play'

export default function Home() {
  return (
    <div className={styles.home}>
      <ul>
        <li>
          <Link className={styles.app} href={'/shootout'} title="Shootout!">
            <Play size="40" />
            <span>Play Shootout</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}
