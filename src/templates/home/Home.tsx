import Link from 'next/link'
import styles from './Home.module.scss'
import Play from '@/icons/play'
import Image from 'next/image'

export default function Home() {
  return (
    <div className={styles.home}>
      <div className="flex-column">
        <Image src="/img/logo.svg" alt="Scoores" width={200} height={120} />
        <ul>
          <li>
            <Link className={styles.app} href={'/shootout'} title="Shootout!">
              <Play size="40" />
              <span>Play Shootout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
