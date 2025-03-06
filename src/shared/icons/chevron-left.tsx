export default function Icon({ size, className, color, stroke, lineCap }: any) {
  return (
    <svg
      className={className}
      width={size ?? '24'}
      height={size ?? '24'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 16 19 L 9 12 L 16 5"
        stroke={color ?? '#2E336B'}
        strokeWidth={stroke ?? 2}
        strokeLinecap={lineCap ?? 'round'}
        strokeLinejoin={lineCap ?? 'round'}
      />
    </svg>
  )
}
