type Props = {
  bg?: string
  color?: string
  size?: string
}
export default function Icon({ size, color, bg }: Props) {
  return (
    <svg
      version="1.1"
      id="logo_icon"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={size ?? '60px'}
      height={size ?? '60px'}
      viewBox="0 0 60 60"
    >
      <g>
        <rect fill={bg ?? '#333333'} width={size ?? '60'} height={size ?? '60'} />
        <path fill="none" stroke="#FFB200" strokeWidth="5" d="M43,47c-3.6,0-6.5-2.9-6.5-6.5S39.4,34,43,34" />
        <path
          fill="none"
          stroke={color ?? '#FFB200'}
          strokeWidth="5"
          d="M32.2,11.7c-5.2-1.9-10.9,0.9-12.8,6.1
		c-1.9,5.2,0.9,10.9,6.1,12.8c5.2,1.9,7.9,7.6,6.1,12.8s-7.6,7.9-12.8,6.1"
        />
      </g>
    </svg>
  )
}
