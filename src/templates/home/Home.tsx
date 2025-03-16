import Link from 'next/link'
import styles from './Home.module.scss'
import Play from '@/icons/play'
import FlameMini from '@/icons/flame-mini'
import Image from 'next/image'
import { SITE_VERSION } from 'configs/configs.type'

export default function Home() {
  return (
    <div className={styles.home}>
      <div className="flex-column">
        <div className="flex" style={{ gap: 0 }}>
          <div style={{ width: 32 }}></div>
          <Image src="/img/logo.svg" alt="Scoores" width={206} height={94} />
          <div style={{ width: 32, color: '#fff', opacity: 0.3, fontSize: 12, paddingTop: 10 }}>v{SITE_VERSION}</div>
        </div>
        <ul>
          <li>
            <Link className={styles.app} href={'/shootout'} title="Shootout!">
              <Play size="40" />
              <span>Play Shootout</span>
            </Link>
          </li>
        </ul>
        <div className={styles.footer}>
          <div>
            P<strong style={{ fontWeight: 900, opacity: 0.4 }}>o</strong>wered by
          </div>
          <FlameMini />
          <div>Cyril</div>
        </div>
      </div>
    </div>
  )
}
