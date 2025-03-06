import Link from 'next/link'
import styles from './NestedCard.module.scss'

type Props = {
  url: string
  className?: any
  children: any
  target?: string
  rel?: string
  noPrefetch?: boolean
  title?: string
  callback?: any
}

export default function NestedCard({ url, className, children, target, rel, noPrefetch, title, callback }: Props) {
  const attributes: any = {}
  if (target) attributes.target = target
  if (rel) attributes.rel = rel
  if (title) attributes.title = title

  return (
    <div className={`${styles.card}  ${className ?? ''}`}>
      {callback ? (
        <div className={styles.nestedLink} onClick={() => callback()}></div>
      ) : (
        <Link prefetch={noPrefetch ? false : true} className={styles.nestedLink} href={url} {...attributes}>
          {title}
        </Link>
      )}
      {children}
    </div>
  )
}
