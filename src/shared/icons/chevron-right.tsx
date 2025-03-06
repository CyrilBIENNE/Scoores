export default function ChevronRight({ size, className, color, stroke, lineCap }: any) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size ?? '12'}
      height={size ?? '12'}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke={color ?? 'currentColor'}
        strokeWidth={stroke ?? 2}
        strokeLinecap={lineCap ?? 'round'}
        strokeLinejoin={lineCap ?? 'round'}
        d="M 9 5 l 7 7 l -7 7"
      />
    </svg>
  )
}
