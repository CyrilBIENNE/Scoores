import 'shared/styles/app.scss'
import type { Viewport } from 'next'
import { Geist } from 'next/font/google'
import Header from '../../templates/_layout/Header/Header'
import ShootoutProvider from 'templates/shootout/providers/ShootoutContext'

const geistSans = Geist({
  weight: ['400', '500', '700', '900'],
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#d19300',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={geistSans.className}>
      <body>
        <ShootoutProvider>
          <Header />
          {children}
        </ShootoutProvider>
      </body>
    </html>
  )
}
