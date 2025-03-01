import { ShootoutGamePlayer } from '../../../providers/Shootout.type'
import styles from './Zone.module.scss'
import Image from 'next/image'

type Props = {
  children: React.ReactNode
  color: string
  isActive: boolean
  player: ShootoutGamePlayer
}
export default function Zone({ color, children, isActive, player }: Props) {
  return (
    <div className={styles.z} data-color={color} data-active={isActive}>
      <Image className={styles.bg} src={`/img/bg-${player.number}.jpg`} layout="fill" objectFit="cover" alt="Snooker" />
      <div className={styles.c}></div>
      <div className={styles.player}>{player.name}</div>
      {children}
    </div>
  )
}
