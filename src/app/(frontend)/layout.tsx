import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getPayload } from '@/lib/payload'
import '../globals.css'

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

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload()
  const settings = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null)

  const socialLinks =
    (settings?.socialLinks as { platform: string; url: string }[] | undefined) ?? []

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
      <body className="font-body bg-cream text-forest antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer socialLinks={socialLinks} />
      </body>
    </html>
  )
}
