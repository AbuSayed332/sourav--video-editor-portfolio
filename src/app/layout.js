import '../styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sourav Alam Prodhan - Video Editor & Graphics Designer',
  description: 'Professional video editing and graphics design portfolio showcasing creative work and expertise',
  keywords: 'video editing, graphics design, motion graphics, branding, portfolio',
  authors: [{ name: 'Alex Creative' }],
  openGraph: {
    title: 'Alex Creative - Video Editor & Graphics Designer',
    description: 'Professional video editing and graphics design portfolio',
    url: 'https://alexcreative.com',
    siteName: 'Alex Creative Portfolio',
    images: [
      {
        url: 'https://alexcreative.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sourav Alam Prodhan - Video Editor & Graphics Designer',
    description: 'Professional video editing and graphics design portfolio',
    creator: '@alexcreative',
    images: ['https://alexcreative.com/twitter-image.jpg'],
  },
}

export const viewport = {
  themeColor: '#a855f7',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}