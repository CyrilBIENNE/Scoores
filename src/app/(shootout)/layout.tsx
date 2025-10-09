import 'shared/styles/app.scss'
import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import Header from '../../templates/_layout/Header/Header'
import AppProvider from 'templates/_layout/AppContext/AppContext'

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
      <head>
        <link rel="manifest" href="/custom-manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-icon.png" />
        <meta name="theme-color" content="#333333" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Scoores" />
      </head>
      <body>
        <AppProvider>
          <Header />
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
