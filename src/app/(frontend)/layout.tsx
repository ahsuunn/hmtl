import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getPayload } from '@/lib/payload'

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload()
  const settings = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null)

  const socialLinks =
    (settings?.socialLinks as { platform: string; url: string }[] | undefined) ?? []

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer socialLinks={socialLinks} />
    </>
  )
}


