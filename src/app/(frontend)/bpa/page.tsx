import type { Metadata } from 'next'
import Image from 'next/image'
import { getPayload } from '@/lib/payload'
import PromoBanner from '@/components/PromoBanner'
import PageLinkCards from '@/components/PageLinkCards'
import ContactSection from '@/components/ContactSection'

export const metadata: Metadata = {
  title: 'BPA — HMTL ITB',
  description:
    'Badan Perwakilan Anggota Himpunan Mahasiswa Teknik Lingkungan ITB — aspirasi, advokasi, dan pengawasan organisasi.',
}

export const revalidate = 60

export default async function BpaPage() {
  const payload = await getPayload()

  // ── BPA Banner Slider media
  const bpaBannerData = await payload.find({
    collection: 'media',
    where: { isFeaturedBpa: { equals: true } },
    sort: '-createdAt',
    limit: 10,
  })
  const bpaBannerMedia = bpaBannerData.docs

  // ── BPA Instagram thumbnail (first image only)
  const igData = await payload.find({
    collection: 'media',
    where: { isBpaInstagram: { equals: true } },
    sort: '-createdAt',
    limit: 1,
  })
  const igThumbnail = igData.docs[0] ?? null

  // ── BPA of the Month posters (slidable)
  const botmData = await payload.find({
    collection: 'media',
    where: { isBpaOfTheMonth: { equals: true } },
    sort: '-createdAt',
    limit: 10,
  })
  const botmMedia = botmData.docs

  // ── BPA featured resource links
  const linksData = await payload.find({
    collection: 'links',
    where: {
      and: [
        { isPublic: { equals: true } },
        { isFeaturedBpa: { equals: true } },
      ],
    },
    limit: 20,
  })
  const bpaLinks = linksData.docs

  const mapSlides = (docs: typeof bpaBannerMedia) =>
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
          className="absolute -top-16 -left-16 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'var(--color-green)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-56 h-56 rounded-full opacity-5"
          style={{ background: 'var(--color-cream)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h1
            className="font-heading text-5xl md:text-6xl font-bold"
            style={{ color: 'var(--color-cream)', letterSpacing: 0 }}
          >
            BPA HMTL ITB
          </h1>
          <p
            className="font-body text-xl mt-4 max-w-2xl opacity-80"
            style={{ color: 'var(--color-cream)', letterSpacing: 0 }}
          >
            Badan Perwakilan Anggota — aspirasi, advokasi, dan pengawasan untuk seluruh anggota HMTL ITB.
          </p>
        </div>
      </div>

      {/* ── 1. Foto-foto BPA Banner Slider ── */}
      <section className="py-12 bg-gradient-to-b from-forest/10 to-transparent">
        <div className="max-w-7xl mx-auto px-6 mb-4">
          <h2 className="section-title text-3xl font-bold" style={{ color: 'var(--color-forest)' }}>
            Foto-foto BPA
          </h2>
          <div className="divider-green mt-2" />
        </div>

        <PromoBanner
          slides={mapSlides(bpaBannerMedia)}
          autoPlayInterval={5000}
          heightClassName="min-h-[280px] md:min-h-[400px] lg:min-h-[480px]"
        />
      </section>

      {/* ── 2. Two-panel Row: IG thumbnail + BPA of the Month ── */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left — Instagram Thumbnail */}
          <div className="flex flex-col gap-3">
            <h2
              className="font-heading text-xl font-bold"
              style={{ color: 'var(--color-forest)', letterSpacing: 0 }}
            >
              Instagram BPA
            </h2>
            <div className="divider-green mb-1" />
            {igThumbnail ? (
              <a
                href={igThumbnail.linkUrl ?? 'https://instagram.com/bpahmtlitb'}
                target="_blank"
                rel="noopener noreferrer"
                className="relative rounded-2xl overflow-hidden block group shadow-md"
                style={{ maxHeight: '60vh', aspectRatio: '4/5' }}
              >
                <Image
                  src={
                    (igThumbnail.sizes as Record<string, { url?: string }>)?.card?.url ||
                    igThumbnail.url ||
                    '/placeholder.jpg'
                  }
                  alt={igThumbnail.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Instagram overlay badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md"
                  style={{ background: 'rgba(1, 73, 75, 0.75)' }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(124, 161, 52, 0.3)' }}>
                    <svg className="w-4 h-4" fill="none" stroke="var(--color-green)" viewBox="0 0 24 24" strokeWidth={2}>
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="var(--color-green)" stroke="none" />
                    </svg>
                  </div>
                  <span className="font-body text-xs font-semibold" style={{ color: 'var(--color-cream)', letterSpacing: 0 }}>
                    @bpahmtlitb
                  </span>
                </div>
              </a>
            ) : (
              <div
                className="rounded-2xl flex flex-col items-center justify-center text-center p-8"
                style={{ height: '320px', background: 'rgba(1, 73, 75, 0.06)' }}
              >
                <p className="font-body text-sm opacity-50" style={{ color: 'var(--color-forest)', letterSpacing: 0 }}>
                  Upload foto Instagram di CMS Admin dan centang &ldquo;Use as BPA Instagram Thumbnail&rdquo;.
                </p>
              </div>
            )}
          </div>

          {/* Right — BPA of the Month */}
          <div className="flex flex-col gap-3">
            <h2
              className="font-heading text-xl font-bold"
              style={{ color: 'var(--color-forest)', letterSpacing: 0 }}
            >
              BPA of the Month
            </h2>
            <div className="divider-green mb-1" />
            {botmMedia.length > 0 ? (
              <div style={{ maxHeight: '60vh', aspectRatio: '4/5' }} className="rounded-2xl overflow-hidden">
                <PromoBanner
                  slides={mapSlides(botmMedia)}
                  autoPlayInterval={6000}
                  heightClassName="h-full"
                />
              </div>
            ) : (
              <div
                className="rounded-2xl flex flex-col items-center justify-center text-center p-8"
                style={{ height: '320px', background: 'rgba(1, 73, 75, 0.06)' }}
              >
                <p className="font-body text-sm opacity-50" style={{ color: 'var(--color-forest)', letterSpacing: 0 }}>
                  Upload poster di CMS Admin dan centang &ldquo;BPA of the Month Poster&rdquo;.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 3. Highlighted Resources ── */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h2
          className="font-heading text-2xl md:text-3xl font-bold mb-2"
          style={{ color: 'var(--color-forest)', letterSpacing: 0 }}
        >
          Resource BPA
        </h2>
        <div className="divider-green mt-1 mb-6" />
        <PageLinkCards
          links={bpaLinks.map((l) => ({
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
          defaultVisible={4}
        />
      </section>

      {/* ── 4. Contact Section ── */}
      <ContactSection
        title="Kontak BPA HMTL ITB"
        contacts={[
          {
            label: 'ID Line',
            value: 'samlioraa',
            href: 'https://line.me/ti/p/samlioraa',
            type: 'line',
          },
          {
            label: 'Instagram',
            value: '@bpahmtlitb',
            href: 'https://instagram.com/bpahmtlitb',
            type: 'instagram',
          },
          {
            label: 'Email',
            value: 'bpahmtlitb@gmail.com',
            href: 'mailto:bpahmtlitb@gmail.com',
            type: 'email',
          },
        ]}
      />
    </div>
  )
}
