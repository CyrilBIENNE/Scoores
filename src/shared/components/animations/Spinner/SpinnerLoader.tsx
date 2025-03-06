import Spinner from './Spinner'
import styles from './Spinner.module.scss'

type Props = {
  css?: any
}

export default function SpinnerLoader(props: Props) {
  return (
    <div className={styles.centerAnim + ' ' + props.css}>
      <Spinner />
    </div>
  )
}
