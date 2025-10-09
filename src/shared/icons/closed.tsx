type Props = {
  onClick?: any
  class?: string
  color?: string
  size?: number
}

export default function Icon(props: Props) {
  const { size, color, onClick } = props
  const attributes: any = {}
  if (onClick) attributes['onClick'] = onClick
  if (props.class) attributes['className'] = props.class
  return (
    <div {...attributes}>
      <svg width={size ?? '19'} height={size ?? '18'} viewBox="0 0 19 18" fill="none">
        <path d="M13.584 4.5L4.58398 13.5" stroke={color ?? '#A7A9BE'} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.58398 4.5L13.584 13.5" stroke={color ?? '#A7A9BE'} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
