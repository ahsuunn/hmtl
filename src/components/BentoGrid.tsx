import Image from 'next/image'

interface MediaItem {
  id: string
  url?: string
  alt: string
  caption?: string
  linkUrl?: string
  sizes?: {
    card?: { url?: string }
    thumbnail?: { url?: string }
  }
}

interface BentoGridProps {
  items: MediaItem[]
}

/**
 * Modern Asymmetrical Bento Mosaic Grid —
 * Tile 0: Large Showcase (2x2)
 * Tile 1: Top Right Card (1x1)
 * Tile 2: Tall Portrait Feature (1x2)
 * Tile 3 & 4: Compact Cards (1x1)
 */
export default function BentoGrid({ items }: BentoGridProps) {
  if (!items.length) return null

  const [first, ...rest] = items

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[220px]">
      {/* Tile 0: Hero showcase tile — 2 cols & 2 rows */}
      <BentoItem item={first} className="sm:col-span-2 sm:row-span-2 min-h-[300px]" isLarge />

      {/* Tile 1: Top Right */}
      {rest[0] && <BentoItem item={rest[0]} className="col-span-1 row-span-1" />}

      {/* Tile 2: Tall Portrait Feature */}
      {rest[1] && <BentoItem item={rest[1]} className="col-span-1 row-span-2 hidden sm:block" />}

      {/* Tile 3: Bottom Left */}
      {rest[2] && <BentoItem item={rest[2]} className="col-span-1 row-span-1" />}

      {/* Tile 4: Bottom Center */}
      {rest[3] && <BentoItem item={rest[3]} className="col-span-1 row-span-1" />}
    </div>
  )
}

function BentoItem({
  item,
  className = '',
  isLarge = false,
}: {
  item: MediaItem
  className?: string
  isLarge?: boolean
}) {
  const isExternal = item.linkUrl?.startsWith('http')
  const Component = item.linkUrl ? 'a' : 'div'

  const linkProps = item.linkUrl
    ? {
        href: item.linkUrl,
        target: isExternal ? '_blank' : undefined,
        rel: isExternal ? 'noopener noreferrer' : undefined,
      }
    : {}

  return (
    <Component
      {...linkProps}
      className={`relative rounded-3xl overflow-hidden group block bg-forest/20 shadow-md hover:shadow-2xl transition-all duration-500 ${className} ${
        item.linkUrl ? 'cursor-pointer' : ''
      }`}
    >
      <Image
        src={
          isLarge
            ? item.sizes?.card?.url || item.url || '/placeholder.jpg'
            : item.sizes?.thumbnail?.url || item.url || '/placeholder.jpg'
        }
        alt={item.alt}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes={isLarge ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 50vw, 33vw'}
      />

      {/* Gradient overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5"
        style={{
          background: 'linear-gradient(to top, rgba(15,51,10,0.9) 0%, rgba(1,73,75,0.3) 50%, transparent 100%)',
        }}
      >
        {item.caption && (
          <p
            className={`font-body font-medium ${isLarge ? 'text-base' : 'text-xs md:text-sm'} line-clamp-2`}
            style={{ color: 'var(--color-cream)', letterSpacing: 0 }}
          >
            {item.caption}
          </p>
        )}

        {item.linkUrl && (
          <span
            className="inline-flex items-center gap-1 text-xs font-semibold mt-2"
            style={{ color: 'var(--color-green)', letterSpacing: 0 }}
          >
            Buka Link {isExternal ? '↗' : '→'}
          </span>
        )}
      </div>
    </Component>
  )
}
