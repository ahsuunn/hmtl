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
 * Bento grid layout — first item is large (spans 2 rows),
 * rest fill a mosaic 2-3 col grid.
 */
export default function BentoGrid({ items }: BentoGridProps) {
  if (!items.length) return null

  const [first, ...rest] = items

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px]">
      {/* Hero item — spans 2 rows and 2 cols */}
      <BentoItem item={first} isLarge />

      {/* Remaining items */}
      {rest.slice(0, 4).map((item, i) => (
        <BentoItem key={item.id} item={item} isTall={i === 1} />
      ))}
    </div>
  )
}

function BentoItem({
  item,
  isLarge = false,
  isTall = false,
}: {
  item: MediaItem
  isLarge?: boolean
  isTall?: boolean
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
      className={`relative rounded-2xl overflow-hidden group block ${
        isLarge ? 'col-span-2 row-span-2' : ''
      } ${isTall ? 'row-span-2' : ''} ${item.linkUrl ? 'cursor-pointer' : ''}`}
    >
      <Image
        src={
          isLarge
            ? item.sizes?.card?.url || item.url || '/placeholder.jpg'
            : item.sizes?.thumbnail?.url || item.url || '/placeholder.jpg'
        }
        alt={item.alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes={isLarge ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 50vw, 33vw'}
      />

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
        style={{
          background: 'linear-gradient(to top, rgba(15,51,10,0.85) 0%, transparent 60%)',
        }}
      >
        {item.caption && (
          <p
            className={`font-body ${isLarge ? 'text-sm' : 'text-xs'}`}
            style={{ color: 'var(--color-cream)', letterSpacing: 0 }}
          >
            {item.caption}
          </p>
        )}

        {item.linkUrl && (
          <span
            className="inline-flex items-center gap-1 text-xs font-semibold mt-1"
            style={{ color: 'var(--color-green)', letterSpacing: 0 }}
          >
            Buka Link {isExternal ? '↗' : '→'}
          </span>
        )}
      </div>
    </Component>
  )
}
