import type { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import Hero from '@/components/Hero'
import EventTimeline from '@/components/EventTimeline'
import BentoGrid from '@/components/BentoGrid'
import ResourceLinks from '@/components/ResourceLinks'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'HMTL — Himpunan Mahasiswa Teknik Lingkungan',
  description:
    'Website resmi HMTL. Efficiency, Transparency, Creativity, Dedicated — membangun generasi lingkungan yang berdampak.',
}

export const revalidate = 60 // ISR — revalidate every 60 seconds

export default async function HomePage() {
  const payload = await getPayload()

  // ── Fetch Site Settings (global) ──
  const settings = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null)

  // ── Fetch upcoming & recent events, sorted by date ──
  const eventsData = await payload.find({
    collection: 'events',
    sort: 'date',
    limit: 8,
    where: {
      status: { not_equals: 'cancelled' },
    },
  })
  const events = eventsData.docs

  // ── Fetch featured media for bento grid ──
  const mediaData = await payload.find({
    collection: 'media',
    where: { isFeatured: { equals: true } },
    limit: 5,
  })
  const featuredMedia = mediaData.docs

  // ── Fetch featured public links for home page snippet ──
  const linksData = await payload.find({
    collection: 'links',
    where: {
      and: [
        { isPublic: { equals: true } },
        { isFeatured: { equals: true } },
      ],
    },
    limit: 6,
  })
  const featuredLinks = linksData.docs

  // ── Hero props from CMS or defaults ──
  const heroTitle = settings?.heroTitle ?? 'Himpunan Mahasiswa\nTeknik Lingkungan'
  const heroSubtitle =
    settings?.heroSubtitle ?? 'Efficiency · Transparency · Creativity · Dedicated'
  const heroImage =
    settings?.heroImage && typeof settings.heroImage === 'object'
      ? (settings.heroImage as { url?: string; sizes?: { hero?: { url?: string } } }).sizes?.hero
          ?.url ||
        (settings.heroImage as { url?: string }).url
      : undefined

  return (
    <>
      {/* ── Hero ── */}
      <Hero
        title={heroTitle}
        subtitle={heroSubtitle}
        imageUrl={heroImage}
        imageAlt="HMTL Hero Banner"
      />

      {/* ── Events Timeline ── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-12">
          <span className="section-label">Agenda & Kegiatan</span>
          <h2 className="section-title mt-1">Event Timeline</h2>
          <div className="divider-green" />
          <p
            className="font-body text-lg opacity-70 max-w-2xl"
            style={{ color: 'var(--color-forest)', fontStyle: 'italic', letterSpacing: 0 }}
          >
            Ikuti rangkaian kegiatan HMTL — seminar, workshop, pengabdian masyarakat, dan lebih banyak lagi.
          </p>
        </div>

        <EventTimeline
          events={events.map((e) => ({
            id: String(e.id),
            title: e.title,
            date: e.date,
            endDate: e.endDate ?? undefined,
            location: e.location ?? undefined,
            shortDescription: e.shortDescription ?? undefined,
            status: e.status as 'upcoming' | 'ongoing' | 'completed' | 'cancelled',
            cover:
              typeof e.cover === 'object' && e.cover
                ? { url: (e.cover as { url?: string }).url, alt: (e.cover as { alt?: string }).alt }
                : undefined,
          }))}
          preview
        />
      </section>

      {/* ── Bento Grid Media ── */}
      {featuredMedia.length > 0 && (
        <section
          className="py-24"
          style={{ background: 'linear-gradient(135deg, #0F330A 0%, #01494B 100%)' }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span
                  className="section-label"
                  style={{ color: 'rgba(247, 244, 213, 0.6)' }}
                >
                  Galeri Foto
                </span>
                <h2
                  className="section-title mt-1"
                  style={{ color: 'var(--color-cream)' }}
                >
                  Momen HMTL
                </h2>
                <div className="h-1 w-16 rounded-full bg-green-600 mb-0 mt-4" />
              </div>
              <Link
                href="/gallery"
                className="btn-outline"
                style={{
                  borderColor: 'rgba(247, 244, 213, 0.4)',
                  color: 'var(--color-cream)',
                }}
              >
                Lihat Semua Foto →
              </Link>
            </div>

            <BentoGrid items={featuredMedia.map((m) => ({
              id: String(m.id),
              url: m.url ?? undefined,
              alt: m.alt,
              caption: m.caption ?? undefined,
              sizes: {
                card: { url: (m.sizes as Record<string, { url?: string }>)?.card?.url },
                thumbnail: { url: (m.sizes as Record<string, { url?: string }>)?.thumbnail?.url },
              },
            }))} />
          </div>
        </section>
      )}

      {/* ── Resource Links Snippet ── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="section-label">Resource Center</span>
            <h2 className="section-title mt-1">Link & Sumber Daya</h2>
            <div className="divider-green" />
            <p
              className="font-body text-lg opacity-70 max-w-2xl"
              style={{ color: 'var(--color-forest)', fontStyle: 'italic', letterSpacing: 0 }}
            >
              Kumpulan link penting, referensi akademik, dan sumber daya untuk mahasiswa Teknik Lingkungan.
            </p>
          </div>
        </div>

        {featuredLinks.length > 0 ? (
          <ResourceLinks
            links={featuredLinks.map((l) => ({
              id: String(l.id),
              title: l.title,
              url: l.url,
              description: l.description ?? undefined,
              category: l.category,
              icon: l.icon ?? undefined,
            }))}
            preview
          />
        ) : (
          <div className="text-center py-16 opacity-50">
            <p
              className="font-heading text-2xl"
              style={{ color: 'var(--color-forest)', fontStyle: 'italic', letterSpacing: 0 }}
            >
              Belum ada resource yang difeatured
            </p>
          </div>
        )}
      </section>
    </>
  )
}
