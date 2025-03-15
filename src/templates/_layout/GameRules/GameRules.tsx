import styles from './GameRules.module.scss'

export default function GameRules({ children }: { children: React.ReactNode }) {
  return <div className={styles.help}>{children}</div>
}
