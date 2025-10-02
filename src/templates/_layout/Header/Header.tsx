'use client'

import styles from './Header.module.scss'
import Add from '@/icons/add'
import LogoIcon from '@/icons/logo-icon'
import Link from 'next/link'
import MuteSound from '@/components/MuteSound/MuteSound'
import HeaderIcon from './components/HeaderIcon/HeaderIcon'
import { GAME_CONFIGS } from 'configs/app.config'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Panel from '@/components/layout/Panel/Panel'
import useAppData from '../AppContext/useAppData'
import dynamic from 'next/dynamic'
import { HelpTypes } from './Help.type'

const ShootoutGameRules = dynamic(() => import('templates/shootout/ShootoutGameRules/ShootoutGameRules'))

export default function Header() {
  const [isHelp, setIsHelp] = useState(false)
  const { isLoading, isMute, setIsMute, isGameInProgress, helpType } = useAppData()
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
  useEffect(() => {
    if (!isLoading) setIsHelp(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [helpType])

  return (
    <>
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <div className={styles.logo} title="Home" onClick={() => home(isGameInProgress)}>
            <div className={styles.logoM}>
              <LogoIcon size={'52px'} />
            </div>
            <div className={styles.logoD}>
              <Image src="/img/logo.svg" alt="Scoores" width={90} height={42} />
            </div>
          </div>
          {/* <div className={styles.gTitle}>{currentGame.name}</div> */}
          <div className={styles.icons}>
            <Link
              title="Nouvelle partie"
              href={currentGame.slug}
              onClick={() => newGame(isGameInProgress)}
              data-yellow={true}
            >
              <Add size={iconSize} stroke={2} />
            </Link>
            <MuteSound isMute={isMute} size={iconSize} callback={() => setIsMute(!isMute)} />
            <HeaderIcon callback={() => setIsHelp(!isHelp)} title="Règles" size={iconSize}>
              <strong>?</strong>
            </HeaderIcon>
          </div>
        </div>
      </header>
      <Panel onClose={() => setIsHelp(false)} isOpen={!!helpType && isHelp}>
        {helpType == HelpTypes.shootout && <ShootoutGameRules />}
      </Panel>
    </>
  )
}
