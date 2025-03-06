'use client'

import styles from './Header.module.scss'
import Add from '@/icons/add'
import Link from 'next/link'
import MuteSound from '@/components/MuteSound/MuteSound'
import useShootout from 'templates/shootout/providers/useShootout'
import HeaderIcon from './components/HeaderIcon/HeaderIcon'

export default function Header() {
  const { isMute, setIsMute, isGameInProgress } = useShootout()
  const iconSize = '32px'

  function newGame(isGameInProgress: boolean) {
    if (!isGameInProgress || (isGameInProgress && confirm('Voulez-vous abandonner la partie en cours ?')))
      window.location.reload()
  }

  function rules() {
    alert('roules')
  }

  return (
    <header className={styles.header}>
      <div>SHOOTOUT</div>
      <div className={styles.icons}>
        <Link title="Nouvelle partie" href="/shootout" onClick={() => newGame(isGameInProgress)}>
          <Add size={iconSize} stroke={2} />
        </Link>
        <MuteSound isMute={isMute} size={iconSize} callback={() => setIsMute(!isMute)} />
        <HeaderIcon callback={rules} title="Règles" size={iconSize}>
          <strong>?</strong>
        </HeaderIcon>
      </div>
    </header>
  )
}
