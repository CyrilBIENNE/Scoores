export default function Icon({ className, size, color }: any) {
  return (
    <svg
      className={className}
      width={size ?? '20'}
      height={size ? size - 1 : '19'}
      viewBox={`0 0 20 19`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.25 4.8125L7.65625 13.4062L3.75 9.5"
        stroke={color ?? '#00425C'}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
