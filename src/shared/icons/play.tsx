type Props = {
  size?: string
  color?: string
}
export default function Icon({ size, color }: Props) {
  return (
    <svg
      data-sanity-icon="play"
      width={size ?? '1em'}
      height={size ?? '1em'}
      viewBox="0 0 23 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 18.5V6.5L17.5 12.5L7.5 18.5Z"
        fill={color ?? 'currentColor'}
        stroke={color ?? 'currentColor'}
        strokeWidth="1.2"
        strokeLinejoin="round"
      ></path>
    </svg>
  )
}
