type Props = {
  size?: string
  color?: string
}
export default function Icon({ size, color }: Props) {
  return (
    <svg
      data-sanity-icon="pause"
      width={size ?? '1em'}
      height={size ?? '1em'}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10.5 7.5H8.5V17.5H10.5V7.5Z" fill={color ?? 'currentColor'}></path>
      <path d="M16.5 7.5H14.5V17.5H16.5V7.5Z" fill={color ?? 'currentColor'}></path>
      <path d="M10.5 7.5H8.5V17.5H10.5V7.5Z" stroke={color ?? 'currentColor'} strokeWidth="1.2"></path>
      <path d="M16.5 7.5H14.5V17.5H16.5V7.5Z" stroke={color ?? 'currentColor'} strokeWidth="1.2"></path>
    </svg>
  )
}
