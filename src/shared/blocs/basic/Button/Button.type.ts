import { ColorType } from 'shared/helpers/color.type'

export type ButtonProps = {
  link?: string
  callback?: () => void
  type?: ColorType | string
  label?: string
  children?: React.ReactNode
  icon?: any
  fullWidth?: boolean
  target?: string
  rel?: string
  disabled?: boolean
  isCenter?: boolean
  size?: 'sm' | 'md' | 'lg'
  style?: React.CSSProperties
}
