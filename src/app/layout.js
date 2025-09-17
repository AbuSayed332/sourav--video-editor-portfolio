import '../styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

// TODO: Replace placeholder values with actual information for Sourav Alam Prodhan.
const siteUrl = 'https://your-deployment-link.com'; // TODO: Add deployment link

export const metadata = {
  title: 'Sourav Alam Prodhan - Video Editor & Graphics Designer',
  description: 'Professional video editing and graphics design portfolio showcasing creative work and expertise.',
  keywords: 'video editing, graphics design, motion graphics, branding, portfolio, Sourav Alam Prodhan',
  authors: [{ name: 'Sourav Alam Prodhan' }],
  creator: 'Sourav Alam Prodhan',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Sourav Alam Prodhan - Video Editor & Graphics Designer',
    description: 'Professional video editing and graphics design portfolio.',
    url: siteUrl,
    siteName: 'Sourav Alam Prodhan Portfolio',
    images: [
      {
        url: '/icon.png', // Should be in /public/og-image.png
        width: 1200,
        height: 630,
        alt: 'Sourav Alam Prodhan Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sourav Alam Prodhan - Video Editor & Graphics Designer',
    description: 'Professional video editing and graphics design portfolio.',
    creator: '@sourav_handle', // TODO: Add Twitter handle
    images: ['/twitter-image.png'], // Should be in /public/twitter-image.png
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

export const viewport = {
  themeColor: '#a855f7',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* In Next.js App Router, <head> is automatically managed via the metadata object. */}
      <body className={`${inter.className} bg-gray-900 text-gray-100 antialiased`}>
        {/* The wrapping <div id="root"> is not necessary in the App Router. */}
        {children}
      </body>
    </html>
  )
}