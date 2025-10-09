import 'shared/styles/app.scss'
import { Geist } from 'next/font/google'
import type { Viewport } from 'next'
import AppProvider from 'templates/_layout/AppContext/AppContext'

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
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
