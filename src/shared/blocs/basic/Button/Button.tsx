import Link from 'next/link'
import ClientButton from '@/blocs/basic/Button/Button.client'
import { ButtonProps } from './Button.type'
import { ColorType } from 'shared/helpers/color.type'

export default function Button(props: ButtonProps) {
  const { icon, label, children, target, rel, link, callback, disabled, fullWidth, isCenter, size, type, style } = props

  const attributes: any = {
    className: 'btn btn-' + (type ?? ColorType.PRIMARY) + (icon ? ' ' + (icon && ' btn-icon') : ''),
    title: label,
    target: target ?? undefined,
    rel: rel ?? undefined,
    'data-disabled': disabled ?? false,
    'data-full-width': fullWidth ?? false,
    'data-size': size ?? 'md',
    style: style ?? {},
  }
  if (isCenter) attributes['style'] = { marginLeft: 'auto', marginRight: 'auto' }
  if (target) attributes['target'] = target

  Object.entries(props).forEach(([key, value]) => {
    if (key.indexOf('data-') === 0) attributes[key] = value
  })

  const content = (
    <>
      {icon ?? ''}
      {children ?? label}
    </>
  )

  if (typeof callback == 'function') {
    return <ClientButton {...{ attributes, content, callback }} />
  }

  return (
    <Link href={link ?? '#'} {...attributes} style={style}>
      {content}
    </Link>
  )
}
