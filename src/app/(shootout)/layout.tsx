import 'shared/styles/app.scss'
import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import Header from '../../templates/_layout/Header/Header'
import AppProvider from 'templates/_layout/AppContext/AppContext'
import Head from 'templates/_layout/Head/Head'
import RegisterSW from 'app/RegisterSW'

const geistSans = Geist({
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#93733a',
}

export const metadata: Metadata = {
  title: 'Shootout',
  description: 'Snooker, Shootout & Co. Scorekeeper',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={geistSans.className}>
      <Head />
      <body>
        <RegisterSW />
        <AppProvider>
          <Header />
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
