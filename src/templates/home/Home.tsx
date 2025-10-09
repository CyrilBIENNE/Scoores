import styles from './Home.module.scss'
import Play from '@/icons/play'
import Android from '@/icons/logo-android'
import Ios from '@/icons/logo-ios'
import FlameMini from '@/icons/flame-mini'
import Image from 'next/image'
import { GAME_CONFIGS, SITE_VERSION } from 'configs/app.config'
import LinkSmart from 'components/LinkSmart/LinkSmart'
import { isNativePlatform } from '@/utils/basic/isNativePlatform'

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
            <LinkSmart className={styles.app} href={GAME_CONFIGS.shootout.slug} title="Shootout!">
              <Play size="40" />
              <span style={{ fontWeight: 400 }}>Play Shootout</span>
            </LinkSmart>
          </li>
        </ul>
        <div className={styles.footer}>
          <div className={styles.sign}>
            <div>
              P<strong style={{ fontWeight: 900, opacity: 0.4 }}>o</strong>wered by
            </div>
            <FlameMini />
            <div>Cyril</div>
          </div>
          {!isNativePlatform() && (
            <div className={styles.dl}>
              <div>
                <a
                  href="/apps/release/app-release.apk"
                  download="Scoores.apk"
                  title="Télécharger l'application Android"
                >
                  <Android size={32} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
