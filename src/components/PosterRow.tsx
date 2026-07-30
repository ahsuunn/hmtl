import Image from 'next/image'

interface PosterItem {
  id: string
  url?: string
  alt: string
  caption?: string
  linkUrl?: string
  sizes?: {
    poster?: { url?: string }
    card?: { url?: string }
  }
}

interface PosterRowProps {
  posters: PosterItem[]
}

export default function PosterRow({ posters }: PosterRowProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-8">
        <h2 className="section-title mt-1">Upcoming Event Posters</h2>
        <div className="divider-green" />
        <p
          className="font-body text-base opacity-70 max-w-2xl"
          style={{ color: 'var(--color-forest)', letterSpacing: 0 }}
        >
          Poster resmi agenda, publikasi, dan flyer kegiatan terbaru HMTL.
        </p>
      </div>

      {posters.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {posters.map((poster) => {
            const isExternal = poster.linkUrl?.startsWith('http')
            const Component = poster.linkUrl ? 'a' : 'div'
            const linkProps = poster.linkUrl
              ? {
                  href: poster.linkUrl,
                  target: isExternal ? '_blank' : undefined,
                  rel: isExternal ? 'noopener noreferrer' : undefined,
                }
              : {}

            return (
              <Component
                key={poster.id}
                {...linkProps}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block bg-forest/5 aspect-[3/4]"
              >
                <Image
                  src={
                    poster.sizes?.poster?.url ||
                    poster.sizes?.card?.url ||
                    poster.url ||
                    '/placeholder.jpg'
                  }
                  alt={poster.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(15,51,10,0.9) 0%, rgba(15,51,10,0.3) 60%, transparent 100%)',
                  }}
                >
                  {poster.caption && (
                    <p
                      className="font-body text-xs line-clamp-3 mb-2"
                      style={{ color: 'var(--color-cream)', letterSpacing: 0 }}
                    >
                      {poster.caption}
                    </p>
                  )}

                  {poster.linkUrl && (
                    <span
                      className="inline-flex items-center gap-1 text-xs font-semibold"
                      style={{ color: 'var(--color-green)', letterSpacing: 0 }}
                    >
                      Buka Info {isExternal ? '↗' : '→'}
                    </span>
                  )}
                </div>
              </Component>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12 opacity-50">
          <p
            className="font-heading text-xl mb-1"
            style={{ color: 'var(--color-forest)', letterSpacing: 0 }}
          >
            Belum ada poster event
          </p>
          <p
            className="font-body text-sm"
            style={{ color: 'var(--color-forest)', letterSpacing: 0 }}
          >
            Poster kegiatan terbaru akan ditampilkan di sini.
          </p>
        </div>
      )}
    </section>
  )
}
