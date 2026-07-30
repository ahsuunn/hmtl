import Link from 'next/link'

interface Event {
  id: string
  title: string
  date: string
  endDate?: string
  location?: string
  shortDescription?: string
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  cover?: { url?: string; alt?: string }
}

interface EventTimelineProps {
  events: Event[]
  preview?: boolean
}

const statusMap = {
  upcoming: { label: 'Upcoming', className: 'badge-upcoming' },
  ongoing: { label: 'Ongoing', className: 'badge-ongoing' },
  completed: { label: 'Completed', className: 'badge-completed' },
  cancelled: { label: 'Cancelled', className: 'badge-cancelled' },
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function EventTimeline({ events, preview = false }: EventTimelineProps) {
  const displayedEvents = preview ? events.slice(0, 4) : events

  return (
    <div className="relative">
      {/* Vertical line */}
      <div
        className="absolute left-8 top-0 bottom-0 w-px hidden md:block"
        style={{ background: 'rgba(15, 51, 10, 0.1)' }}
      />

      <div className="space-y-8">
        {displayedEvents.map((event, index) => (
          <div key={event.id} className="relative flex gap-6 md:gap-8 group">
            {/* Timeline dot */}
            <div className="hidden md:flex flex-col items-center flex-shrink-0">
              <div
                className="w-4 h-4 rounded-full border-2 mt-2 z-10 transition-transform duration-200 group-hover:scale-125"
                style={{
                  borderColor:
                    event.status === 'upcoming'
                      ? 'var(--color-green)'
                      : event.status === 'ongoing'
                      ? 'var(--color-teal)'
                      : 'var(--color-slate)',
                  background:
                    event.status === 'completed'
                      ? 'var(--color-slate)'
                      : event.status === 'ongoing'
                      ? 'var(--color-teal)'
                      : 'var(--color-cream)',
                }}
              />
            </div>

            {/* Card */}
            <div
              className="flex-1 card p-6 group-hover:shadow-md transition-shadow"
              style={{ marginLeft: '1rem' }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <h3
                    className="font-heading text-xl font-semibold mb-1"
                    style={{ color: 'var(--color-forest)', fontStyle: 'italic', letterSpacing: 0 }}
                  >
                    {event.title}
                  </h3>
                  <p
                    className="font-body text-sm opacity-60"
                    style={{ color: 'var(--color-forest)', fontStyle: 'italic', letterSpacing: 0 }}
                  >
                    {formatDate(event.date)}
                    {event.endDate && ` — ${formatDate(event.endDate)}`}
                    {event.location && ` · ${event.location}`}
                  </p>
                </div>
                <span className={statusMap[event.status]?.className ?? 'badge-completed'}>
                  {statusMap[event.status]?.label ?? event.status}
                </span>
              </div>

              {event.shortDescription && (
                <p
                  className="font-body text-base opacity-75 line-clamp-2"
                  style={{ color: 'var(--color-forest)', fontStyle: 'italic', letterSpacing: 0 }}
                >
                  {event.shortDescription}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {preview && events.length > 4 && (
        <div className="mt-10 flex justify-center">
          <Link href="/events" className="btn-outline">
            Lihat Semua Events →
          </Link>
        </div>
      )}

      {displayedEvents.length === 0 && (
        <div className="text-center py-16 opacity-50">
          <p
            className="font-heading text-2xl mb-2"
            style={{ color: 'var(--color-forest)', fontStyle: 'italic', letterSpacing: 0 }}
          >
            Belum ada events
          </p>
          <p
            className="font-body"
            style={{ color: 'var(--color-forest)', fontStyle: 'italic', letterSpacing: 0 }}
          >
            Events akan ditampilkan di sini.
          </p>
        </div>
      )}
    </div>
  )
}
