type Props = {
  size?: string
  color?: string
}
export default function Icon({ size, color }: Props) {
  return (
    <svg
      data-sanity-icon="reset"
      width={size ?? '32px'}
      height={size ?? '32px'}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 11L4.56189 13.5L2 11"
        stroke={color ?? 'currentColor'}
        strokeWidth="1.5"
        strokeLinejoin="round"
      ></path>
      <path
        d="M9.50001 15.5L15.5 9.5M9.5 9.5L15.5 15.5M4.56189 13.5C4.52104 13.1724 4.5 12.8387 4.5 12.5C4.5 8.08172 8.08172 4.5 12.5 4.5C16.9183 4.5 20.5 8.08172 20.5 12.5C20.5 16.9183 16.9183 20.5 12.5 20.5C9.75033 20.5 7.32466 19.1128 5.88468 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      ></path>
    </svg>
  )
}
