export default function Icon({ color, stroke }: any) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 15L12 9L6 15"
        stroke={color ?? 'white'}
        strokeWidth={stroke ?? 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
