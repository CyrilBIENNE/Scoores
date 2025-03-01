'use client'

import styles from './Header.module.scss'
import Cog from '@/icons/cog'
import Add from '@/icons/add'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import MuteSound from '@/components/MuteSound/MuteSound'
import useShootout from 'templates/shootout/providers/useShootout'
import HeaderIcon from './components/HeaderIcon/HeaderIcon'

export default function Header() {
  const router = useRouter()
  const { isMute, setIsMute, isGameInProgress, isLoading } = useShootout()
  const iconSize = '32px'

  function parameters() {
    if (confirm('Vous abandonner la partie en cours ?')) {
      router.push('/shootout/parameters')
    }
  }

  function rules() {
    alert('roules')
  }

  return (
    <header className={styles.header}>
      <div>SHOOTOUT</div>
      <div className={styles.icons}>
        {!isLoading && (
          <>
            {!isGameInProgress && (
              <Link title="Nouvelle partie" href="/shootout">
                <Add size={iconSize} stroke={2} />
              </Link>
            )}
            <MuteSound isMute={isMute} size={iconSize} callback={() => setIsMute(!isMute)} />
          </>
        )}
        <HeaderIcon callback={rules} title="Règles" size={iconSize}>
          <strong>?</strong>
        </HeaderIcon>
        {!isLoading && !isGameInProgress && (
          <span onClick={parameters} title="Réglages">
            <Cog size={iconSize} />
          </span>
        )}
      </div>
    </header>
  )
}
