import VolumeOff from '@/icons/volume_off'
import VolumeOn from '@/icons/volume_on'

type Props = {
  isMute: boolean
  size?: string
  color?: string
  callback?: () => void
}
export default function MuteSound({ isMute, size, color, callback }: Props) {
  return (
    <span onClick={callback ? () => callback() : undefined}>
      {isMute ? <VolumeOff size={size} color={color} /> : <VolumeOn size={size} color={color} />}
    </span>
  )
}
