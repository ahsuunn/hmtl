import type { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import ResourceLinks from '@/components/ResourceLinks'

export const metadata: Metadata = {
  title: 'Resource Center — HMTL',
  description:
    'Kumpulan link dan sumber daya untuk mahasiswa Teknik Lingkungan — referensi akademik, tools, regulasi, dan dokumen penting.',
}

export const revalidate = 60

export default async function ResourcesPage() {
  const payload = await getPayload()

  const data = await payload.find({
    collection: 'links',
    where: {
      isPublic: { equals: true },
    },
    sort: 'category',
    limit: 200,
  })

  const links = data.docs

  // Get unique categories for filter display
  const categories = [...new Set(links.map((l) => l.category))].filter(Boolean)

  return (
    <div className="min-h-screen pt-24 pb-32">
      {/* Page Header */}
      <div
        className="py-20 mb-16 relative overflow-hidden"
        style={{ background: 'var(--color-teal)' }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'var(--color-cream)' }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full opacity-5"
          style={{ background: 'var(--color-green)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h1
            className="font-heading text-5xl md:text-6xl font-bold"
            style={{ color: 'var(--color-cream)', letterSpacing: 0 }}
          >
            Resource Center
          </h1>
          <p
            className="font-body text-xl mt-4 max-w-2xl opacity-80"
            style={{ color: 'var(--color-cream)', letterSpacing: 0 }}
          >
            Link penting, referensi akademik, dan sumber daya pilihan untuk mahasiswa Teknik Lingkungan.
          </p>
          <p
            className="font-body text-sm mt-4 opacity-60"
            style={{ color: 'var(--color-cream)', letterSpacing: 0 }}
          >
            {links.length} resource tersedia dalam {categories.length} kategori
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {links.length > 0 ? (
          <ResourceLinks
            links={links.map((l) => ({
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
          />
        ) : (
          <div className="text-center py-16 opacity-50">
            <p
              className="font-heading text-2xl mb-2"
              style={{ color: 'var(--color-forest)', letterSpacing: 0 }}
            >
              Belum ada resource
            </p>
            <p
              className="font-body"
              style={{ color: 'var(--color-forest)', letterSpacing: 0 }}
            >
              Resource links akan ditampilkan di sini.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}


