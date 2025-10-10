import 'shared/styles/app.scss'
import { Geist } from 'next/font/google'
import type { Viewport } from 'next'
import AppProvider from 'templates/_layout/AppContext/AppContext'
import Head from 'templates/_layout/Head/Head'
import RegisterSW from 'app/RegisterSW'

export const viewport: Viewport = {
  themeColor: '#93733a',
}

const geistSans = Geist({
  weight: ['500', '600', '700', '900'],
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
    <html lang="fr" className={geistSans.className}>
      <Head />
      <body>
        <AppProvider>{children}</AppProvider>
        <RegisterSW />
      </body>
    </html>
  )
}
