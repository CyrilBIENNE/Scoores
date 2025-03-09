import 'shared/styles/app.scss'
import { Geist } from 'next/font/google'
import type { Viewport } from 'next'
import ShootoutProvider from 'templates/shootout/providers/ShootoutContext'

export const viewport: Viewport = {
  themeColor: '#93733a',
}

const geistSans = Geist({
  weight: ['400', '700', '900'],
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={geistSans.className}>
      <body>
        <ShootoutProvider>{children}</ShootoutProvider>
      </body>
    </html>
  )
}
