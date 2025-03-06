import { secondesToMinutes } from '@/utils/format/secondesToMinutes'
import styles from './GameReport.module.scss'
import { ShootoutGamePlayer } from 'templates/shootout/providers/Shootout.type'

type Props = {
  player: ShootoutGamePlayer
}
export default function GameReport({ player }: Props) {
  return (
    <div className={styles.report}>
      <table>
        <tbody>
          <tr>
            <td>Temps de jeu</td>
            <td>{secondesToMinutes(Math.round(player.totalTime), true)}</td>
          </tr>
          <tr>
            <td>{`${player.shots} Shot${player.shots > 1 ? 's' : ''}`}</td>
            <td>{player.totalTime > 0 ? Math.round((player.shots * 100) / player.totalTime) / 100 : 0} s/Shot</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
