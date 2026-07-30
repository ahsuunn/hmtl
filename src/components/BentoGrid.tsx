import Image from 'next/image'

interface MediaItem {
  id: string
  url?: string
  alt: string
  caption?: string
  sizes?: {
    card?: { url?: string }
    thumbnail?: { url?: string }
  }
}

interface BentoGridProps {
  items: MediaItem[]
}

/**
 * Bento grid layout — first item is large (spans 2 rows),
 * rest fill a mosaic 2-3 col grid.
 */
export default function BentoGrid({ items }: BentoGridProps) {
  if (!items.length) return null

  const [first, ...rest] = items

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px]">
      {/* Hero item — spans 2 rows and 2 cols */}
      <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden group">
        <Image
          src={first.sizes?.card?.url || first.url || '/placeholder.jpg'}
          alt={first.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 66vw"
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
          style={{ background: 'linear-gradient(to top, rgba(15,51,10,0.8) 0%, transparent 60%)' }}
        >
          {first.caption && (
            <p
              className="font-body text-sm"
              style={{ color: 'var(--color-cream)', letterSpacing: 0 }}
            >
              {first.caption}
            </p>
          )}
        </div>
      </div>

      {/* Remaining items */}
      {rest.slice(0, 4).map((item, i) => (
        <div
          key={item.id}
          className={`relative rounded-2xl overflow-hidden group ${i === 1 ? 'row-span-2' : ''}`}
        >
          <Image
            src={item.sizes?.thumbnail?.url || item.url || '/placeholder.jpg'}
            alt={item.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
            style={{ background: 'linear-gradient(to top, rgba(15,51,10,0.75) 0%, transparent 60%)' }}
          >
            {item.caption && (
              <p
                className="font-body text-xs"
                style={{ color: 'var(--color-cream)', letterSpacing: 0 }}
              >
                {item.caption}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}


