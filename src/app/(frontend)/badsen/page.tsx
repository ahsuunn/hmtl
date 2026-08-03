import type { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import PromoBanner from '@/components/PromoBanner'
import PageLinkCards from '@/components/PageLinkCards'
import ContactSection from '@/components/ContactSection'

export const metadata: Metadata = {
  title: 'Badsen — HMTL ITB',
  description:
    'Badan Kesenatoran Himpunan Mahasiswa Teknik Lingkungan ITB — legislatif dan pengawasan himpunan.',
}

export const revalidate = 60

export default async function BadsenPage() {
  const payload = await getPayload()

  // ── Badsen Banner Slider media
  const badsenBannerData = await payload.find({
    collection: 'media',
    where: { isFeaturedBadsen: { equals: true } },
    sort: '-createdAt',
    limit: 10,
  })
  const badsenBannerMedia = badsenBannerData.docs

  // ── Badsen featured resource links
  const linksData = await payload.find({
    collection: 'links',
    where: {
      and: [
        { isPublic: { equals: true } },
        { isFeaturedBadsen: { equals: true } },
      ],
    },
    limit: 20,
  })
  const badsenLinks = linksData.docs

  const mapSlides = (docs: typeof badsenBannerMedia) =>
    docs.map((m) => ({
      id: String(m.id),
      url: m.url ?? undefined,
      alt: m.alt,
      caption: m.caption ?? undefined,
      linkUrl: m.linkUrl ?? undefined,
      sizes: {
        banner: { url: (m.sizes as Record<string, { url?: string }>)?.banner?.url },
        hero: { url: (m.sizes as Record<string, { url?: string }>)?.hero?.url },
      },
    }))

  return (
    <div className="min-h-screen pb-32">
      {/* ── Page Header ── */}
      <div
        className="pt-28 pb-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #01494B 0%, #0F330A 100%)' }}
      >
        <div
          className="absolute -top-16 -right-16 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'var(--color-green)' }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-56 h-56 rounded-full opacity-5"
          style={{ background: 'var(--color-cream)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h1
            className="font-heading text-5xl md:text-6xl font-bold"
            style={{ color: 'var(--color-cream)', letterSpacing: 0 }}
          >
            Badan Kesenatoran
          </h1>
          <p
            className="font-body text-sm font-semibold mt-1 opacity-70"
            style={{ color: 'var(--color-green)', letterSpacing: 0 }}
          >
            HMTL ITB
          </p>
          <p
            className="font-body text-xl mt-4 max-w-2xl opacity-80"
            style={{ color: 'var(--color-cream)', letterSpacing: 0 }}
          >
            Lembaga legislatif dan pengawas himpunan — menjaga amanah dan integritas HMTL ITB.
          </p>
        </div>
      </div>

      {/* ── 1. Foto-foto Badsen Banner Slider ── */}
      <section className="py-12 bg-gradient-to-b from-forest/10 to-transparent">
        <div className="max-w-7xl mx-auto px-6 mb-4">
          <h2 className="section-title text-3xl font-bold" style={{ color: 'var(--color-forest)' }}>
            Foto-foto Badsen
          </h2>
          <div className="divider-green mt-2" />
        </div>

        <PromoBanner
          slides={mapSlides(badsenBannerMedia)}
          autoPlayInterval={5000}
          heightClassName="min-h-[280px] md:min-h-[400px] lg:min-h-[480px]"
        />
      </section>

      {/* ── 2. Highlighted Resources ── */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2
          className="font-heading text-2xl md:text-3xl font-bold mb-2"
          style={{ color: 'var(--color-forest)', letterSpacing: 0 }}
        >
          Resource Badsen
        </h2>
        <div className="divider-green mt-1 mb-6" />
        <PageLinkCards
          links={badsenLinks.map((l) => ({
            id: String(l.id),
            title: l.title,
            url: l.url,
            description: l.description ?? undefined,
            category:
              typeof l.category === 'object' && l.category
                ? (l.category as { title?: string }).title || 'General'
                : String(l.category || 'General'),
            icon: l.icon ?? undefined,
          }))}
          defaultVisible={2}
        />
      </section>

      {/* ── 3. Contact Section ── */}
      <ContactSection
        title="Kontak Badan Kesenatoran HMTL ITB"
        contacts={[
          {
            label: 'ID Line',
            value: 'firzadanendra',
            href: 'https://line.me/ti/p/firzadanendra',
            type: 'line',
          },
          {
            label: 'Instagram',
            value: '@kesenatoran_hmtl',
            href: 'https://instagram.com/kesenatoran_hmtl',
            type: 'instagram',
          },
          {
            label: 'Email',
            value: 'badsenhmtlitb@gmail.com',
            href: 'mailto:badsenhmtlitb@gmail.com',
            type: 'email',
          },
        ]}
      />
    </div>
  )
}
