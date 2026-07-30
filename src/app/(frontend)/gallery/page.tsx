import type { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import GalleryGrid from '@/components/GalleryGrid'

export const metadata: Metadata = {
  title: 'Gallery — HMTL',
  description:
    'Galeri foto kegiatan HMTL — dokumentasi seminar, kegiatan lapangan, dan momen organisasi.',
}

export const revalidate = 60

export default async function GalleryPage() {
  const payload = await getPayload()

  const data = await payload.find({
    collection: 'media',
    limit: 100,
    sort: '-createdAt',
  })

  const media = data.docs

  // Group by category
  const categories = ['events', 'organization', 'environment', 'general'] as const
  type MediaCategory = typeof categories[number]

  const grouped: Record<MediaCategory, typeof media> = {
    events: media.filter((m) => m.category === 'events'),
    organization: media.filter((m) => m.category === 'organization'),
    environment: media.filter((m) => m.category === 'environment'),
    general: media.filter((m) => m.category === 'general' || !m.category),
  }

  const categoryLabels: Record<MediaCategory, string> = {
    events: 'Events & Kegiatan',
    organization: 'Organisasi',
    environment: 'Lingkungan',
    general: 'Umum',
  }

  return (
    <div className="min-h-screen pt-24 pb-32">
      {/* Page Header */}
      <div
        className="py-20 mb-16 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #01494B 0%, #0F330A 100%)',
        }}
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
          <span
            className="section-label block mb-2"
            style={{ color: 'rgba(247, 244, 213, 0.6)' }}
          >
            Dokumentasi
          </span>
          <h1
            className="font-heading text-5xl md:text-6xl font-bold"
            style={{ color: 'var(--color-cream)', fontStyle: 'italic', letterSpacing: 0 }}
          >
            Photo Gallery
          </h1>
          <p
            className="font-body text-xl mt-4 max-w-2xl opacity-80"
            style={{ color: 'var(--color-cream)', fontStyle: 'italic', letterSpacing: 0 }}
          >
            Setiap momen berharga dari perjalanan HMTL — diabadikan dalam gambar.
          </p>
          <p
            className="font-body text-sm mt-4 opacity-60"
            style={{ color: 'var(--color-cream)', fontStyle: 'italic', letterSpacing: 0 }}
          >
            {media.length} foto dokumentasi
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {media.length > 0 ? (
          <div className="space-y-20">
            {categories
              .filter((cat) => grouped[cat].length > 0)
              .map((cat) => (
                <section key={cat}>
                  <div className="flex items-center gap-3 mb-8">
                    <h2
                      className="font-heading text-2xl md:text-3xl font-bold"
                      style={{
                        color: 'var(--color-forest)',
                        fontStyle: 'italic',
                        letterSpacing: 0,
                      }}
                    >
                      {categoryLabels[cat]}
                    </h2>
                    <span
                      className="font-body text-sm px-2 py-0.5 rounded-full"
                      style={{
                        background: 'rgba(1, 73, 75, 0.1)',
                        color: 'var(--color-teal)',
                        fontStyle: 'italic',
                        letterSpacing: 0,
                      }}
                    >
                      {grouped[cat].length}
                    </span>
                  </div>
                  <GalleryGrid
                    items={grouped[cat].map((m) => ({
                      id: String(m.id),
                      url: m.url ?? undefined,
                      alt: m.alt,
                      caption: m.caption ?? undefined,
                      sizes: {
                        card: {
                          url: (m.sizes as Record<string, { url?: string }>)?.card?.url,
                        },
                        thumbnail: {
                          url: (m.sizes as Record<string, { url?: string }>)?.thumbnail?.url,
                        },
                      },
                    }))}
                  />
                </section>
              ))}
          </div>
        ) : (
          <div className="text-center py-32 opacity-50">
            <div className="text-6xl mb-6">📷</div>
            <h2
              className="font-heading text-3xl font-bold mb-3"
              style={{ color: 'var(--color-forest)', fontStyle: 'italic', letterSpacing: 0 }}
            >
              Belum ada foto
            </h2>
            <p
              className="font-body text-lg"
              style={{ color: 'var(--color-forest)', fontStyle: 'italic', letterSpacing: 0 }}
            >
              Foto akan ditampilkan di sini setelah di-upload melalui admin.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
