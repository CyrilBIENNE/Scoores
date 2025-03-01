import Link from 'next/link'
import ClientButton from '@/blocs/basic/Button/Button.client'
import { ButtonProps } from './Button.type'

export default function Button(props: ButtonProps) {
  const { icon, label, children, target, rel, link, callback, disabled, fullWidth, isCenter, size } = props
  let { type } = props
  if (isCenter) type = 'secondary'
  const attributes: any = {
    className: 'btn btn-' + (type ?? 'primary') + (icon ? ' ' + (icon && ' btn-icon') : ''),
    title: label,
    target: target ?? undefined,
    rel: rel ?? undefined,
    'data-disabled': disabled ?? false,
    'data-full-width': fullWidth ?? false,
    'data-size': size ?? 'md',
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
    <Link href={link ?? '#'} {...attributes}>
      {content}
    </Link>
  )
}
