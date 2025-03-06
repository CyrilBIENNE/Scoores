import styles from './Loader.module.scss'

type Props = {
  white?: boolean
  center?: boolean
  size?: number
}

const Loader = (props: Props) => {
  return (
    <svg
      className={styles.loader}
      data-white={props.white}
      style={props.center ? { margin: 'auto' } : {}}
      width={props.size ?? '15'}
      height={props.size ? props.size + 1 : '16'}
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 8C15 12.1421 11.6421 15.5 7.5 15.5C3.35786 15.5 0 12.1421 0 8C0 3.85786 3.35786 0.5 7.5 0.5C11.6421 0.5 15 3.85786 15 8ZM1.5 8C1.5 11.3137 4.18629 14 7.5 14C10.8137 14 13.5 11.3137 13.5 8C13.5 4.68629 10.8137 2 7.5 2C4.18629 2 1.5 4.68629 1.5 8Z"
        fill="#F7F7FC"
      />
      <path
        d="M7.5 0.500002C8.48491 0.500002 9.46018 0.693995 10.3701 1.07091C11.2801 1.44782 12.1069 2.00026 12.8033 2.6967C13.4997 3.39314 14.0522 4.21993 14.4291 5.12988C14.806 6.03982 15 7.01509 15 8L13.5 8C13.5 7.21207 13.3448 6.43185 13.0433 5.7039C12.7418 4.97595 12.2998 4.31451 11.7426 3.75736C11.1855 3.20021 10.5241 2.75825 9.7961 2.45672C9.06815 2.1552 8.28793 2 7.5 2L7.5 0.500002Z"
        fill="white"
      />
    </svg>
  )
}

export default Loader
