import 'shared/styles/app.scss'
import { Geist } from 'next/font/google'
import type { Viewport } from 'next'
import AppProvider from 'templates/_layout/AppContext/AppContext'
import Head from 'templates/_layout/Head/Head'
import RegisterSW from 'app/RegisterSW'
import Header from 'templates/_layout/Header/Header'

export const dynamic = 'force-static'

const geistSans = Geist({
  weight: ['500', '600', '700', '900'],
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#333',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={geistSans.className}>
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
