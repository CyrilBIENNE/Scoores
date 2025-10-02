import Link from 'next/link'
import { isNativePlatform } from '@/utils/basic/isNativePlatform'

function ensureTrailingSlash(p: string) {
  if (/\.[a-z0-9]+$/i.test(p)) return p // déjà un fichier (ex: .html)
  return p.endsWith('/') ? p : p + '/'
}
function toIndexHtml(p: string) {
  if (/\.[a-z0-9]+$/i.test(p)) return p
  const base = p.endsWith('/') ? p : p + '/'
  return base + 'index.html'
}

/**
 * En Web/Dev: garde /route/ (Next Router)
 * En Natif: force /route/index.html pour éviter le 404 du loader
 */
export default function LinkSmart({ href, children, ...rest }: any) {
  const hrefStr = typeof href === 'string' ? href : href.toString()
  if (isNativePlatform()) {
    return (
      <a href={toIndexHtml(hrefStr)} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link href={ensureTrailingSlash(hrefStr)} {...rest}>
      {children}
    </Link>
  )
}
