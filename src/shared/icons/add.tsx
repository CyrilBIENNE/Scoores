type Props = {
  size?: string
  color?: string
  stroke?: number
}
export default function Icon({ size, color, stroke }: Props) {
  return (
    <svg
      viewBox="0 0 25 25"
      width={size ?? '1em'}
      height={size ?? '1em'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 5V20M5 12.5H20"
        stroke={color ?? 'currentColor'}
        strokeWidth={stroke ?? '1.2'}
        strokeLinejoin="round"
      ></path>
    </svg>
  )
}
