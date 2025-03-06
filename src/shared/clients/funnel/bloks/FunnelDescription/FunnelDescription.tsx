import styles from './FunnelDescription.module.scss'

type Props = {
  description?: string
}

const funnelDescription = (props: Props) => {
  return <p className={styles.description}>{props.description}</p>
}

export default funnelDescription
