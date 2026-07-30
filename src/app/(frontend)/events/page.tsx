import type { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import EventTimeline from '@/components/EventTimeline'

export const metadata: Metadata = {
  title: 'Events — HMTL',
  description:
    'Jadwal lengkap kegiatan HMTL — seminar, workshop, KKN, dan agenda organisasi lainnya.',
}

export const revalidate = 60

type Status = 'upcoming' | 'ongoing' | 'completed' | 'cancelled'

export default async function EventsPage() {
  const payload = await getPayload()

  const data = await payload.find({
    collection: 'events',
    sort: 'date',
    limit: 100,
    depth: 1,
  })

  const allEvents = data.docs

  // Separate by status
  const upcoming = allEvents.filter((e) =>
    ['upcoming', 'ongoing'].includes(e.status as string),
  )
  const past = allEvents.filter((e) =>
    ['completed', 'cancelled'].includes(e.status as string),
  )

  const mapEvent = (e: typeof allEvents[number]) => ({
    id: String(e.id),
    title: e.title,
    date: e.date,
    endDate: e.endDate ?? undefined,
    location: e.location ?? undefined,
    shortDescription: e.shortDescription ?? undefined,
    status: e.status as Status,
    cover:
      typeof e.cover === 'object' && e.cover
        ? {
            url: (e.cover as { url?: string }).url,
            alt: (e.cover as { alt?: string }).alt,
          }
        : undefined,
  })

  return (
    <div className="min-h-screen pt-24 pb-32">
      {/* Page Header */}
      <div
        className="py-20 mb-16"
        style={{
          background: 'linear-gradient(135deg, #0F330A 0%, #01494B 60%, #7CA134 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <span
            className="section-label mb-2 block"
            style={{ color: 'rgba(247, 244, 213, 0.6)' }}
          >
            Agenda & Kegiatan
          </span>
          <h1
            className="font-heading text-5xl md:text-6xl font-bold"
            style={{ color: 'var(--color-cream)', fontStyle: 'italic', letterSpacing: 0 }}
          >
            Event Timeline
          </h1>
          <p
            className="font-body text-xl mt-4 max-w-2xl opacity-80"
            style={{ color: 'var(--color-cream)', fontStyle: 'italic', letterSpacing: 0 }}
          >
            Semua kegiatan HMTL — dari agenda mendatang hingga kegiatan yang telah berlangsung.
          </p>
          <div className="flex gap-6 mt-8 text-sm font-body" style={{ fontStyle: 'italic', letterSpacing: 0 }}>
            <span className="badge-upcoming">{upcoming.length} Upcoming</span>
            <span
              className="px-3 py-1 rounded-full font-semibold"
              style={{
                background: 'rgba(247, 244, 213, 0.15)',
                color: 'var(--color-cream)',
                fontStyle: 'italic',
                letterSpacing: 0,
              }}
            >
              {past.length} Past
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Upcoming events */}
        {upcoming.length > 0 && (
          <section className="mb-20">
            <h2
              className="font-heading text-3xl font-bold mb-8"
              style={{ color: 'var(--color-forest)', fontStyle: 'italic', letterSpacing: 0 }}
            >
              Upcoming Events
            </h2>
            <EventTimeline events={upcoming.map(mapEvent)} />
          </section>
        )}

        {/* Past events */}
        {past.length > 0 && (
          <section>
            <h2
              className="font-heading text-3xl font-bold mb-8 opacity-60"
              style={{ color: 'var(--color-forest)', fontStyle: 'italic', letterSpacing: 0 }}
            >
              Past Events
            </h2>
            <div className="opacity-70">
              <EventTimeline events={past.map(mapEvent)} />
            </div>
          </section>
        )}

        {allEvents.length === 0 && (
          <div className="text-center py-32 opacity-50">
            <div className="text-6xl mb-6">📅</div>
            <h2
              className="font-heading text-3xl font-bold mb-3"
              style={{ color: 'var(--color-forest)', fontStyle: 'italic', letterSpacing: 0 }}
            >
              Belum ada events
            </h2>
            <p
              className="font-body text-lg"
              style={{ color: 'var(--color-forest)', fontStyle: 'italic', letterSpacing: 0 }}
            >
              Events akan ditampilkan di sini saat sudah ditambahkan melalui admin.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
