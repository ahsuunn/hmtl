import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | HMTL',
    default: 'HMTL — Himpunan Mahasiswa Teknik Lingkungan',
  },
  description:
    'Himpunan Mahasiswa Teknik Lingkungan — Efficiency, Transparency, Creativity, Dedicated.',
  keywords: ['HMTL', 'Teknik Lingkungan', 'Environmental Engineering', 'Himpunan Mahasiswa'],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'HMTL',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-cream text-forest antialiased">{children}</body>
    </html>
  )
}

