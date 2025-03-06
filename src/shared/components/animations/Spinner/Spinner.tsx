import styles from './Spinner.module.scss'
type Props = {
  center?: boolean
}

const Spinner = (props: Props) => {
  const style: any = {}
  if (props.center) style['margin'] = 'auto'

  return (
    <svg
      className={styles.spinner}
      width="173"
      height="153"
      viewBox="0 0 173 153"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <g className={styles.innerCircle}>
        <path
          d="M68.0391 91.0361C59.9941 80.8235 61.7512 66.0228 71.9637 57.9777"
          stroke="#7047EB"
          strokeWidth="14.4148"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M101.098 94.9607C111.31 86.9156 113.067 72.1148 105.022 61.9023"
          stroke="#7047EB"
          strokeWidth="14.4148"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g className={styles.outterCircle}>
        <path
          d="M58.5783 124.884C31.8394 109.447 22.678 75.2558 38.1157 48.5169"
          stroke="#7047EB"
          strokeWidth="14.4148"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M114.483 28.054C141.222 43.4918 150.384 77.6827 134.946 104.422"
          stroke="#7047EB"
          strokeWidth="14.4148"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

export default Spinner
