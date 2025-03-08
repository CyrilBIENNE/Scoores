'use client'

import styles from './Header.module.scss'
import Add from '@/icons/add'
import LogoIcon from '@/icons/logo-icon'
import Link from 'next/link'
import MuteSound from '@/components/MuteSound/MuteSound'
import useShootout from 'templates/shootout/providers/useShootout'
import HeaderIcon from './components/HeaderIcon/HeaderIcon'
import { GAME_CONFIGS } from 'configs/configs.type'
import { useRouter } from 'next/navigation'

export default function Header() {
  const { isMute, setIsMute, isGameInProgress } = useShootout()
  const iconSize = '32px'
  const currentGame = GAME_CONFIGS.shootout
  const router = useRouter()

  function newGame(isGameInProgress: boolean) {
    if (!isGameInProgress || (isGameInProgress && confirm('Voulez-vous abandonner la partie en cours ?')))
      window.location.reload()
  }
  function home(isGameInProgress: boolean) {
    if (!isGameInProgress || (isGameInProgress && confirm('Voulez-vous abandonner la partie en cours ?')))
      router.push('/')
  }

  function rules() {
    alert('Règles à venir')
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo} title="Home" onClick={() => home(isGameInProgress)}>
        <LogoIcon size={'52px'} />
      </div>
      <div className={styles.gTitle}>{currentGame.name}</div>
      <div className={styles.icons}>
        <Link title="Nouvelle partie" href={currentGame.slug} onClick={() => newGame(isGameInProgress)}>
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
