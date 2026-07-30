'use client'

import Image from 'next/image'
import { useState } from 'react'

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

interface GalleryGridProps {
  items: MediaItem[]
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [lightbox, setLightbox] = useState<MediaItem | null>(null)

  return (
    <>
      {/* Masonry-style grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="break-inside-avoid relative overflow-hidden rounded-xl cursor-zoom-in group"
            onClick={() => setLightbox(item)}
          >
            <Image
              src={item.sizes?.card?.url || item.url || '/placeholder.jpg'}
              alt={item.alt}
              width={400}
              height={300}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
              style={{
                background: 'linear-gradient(to top, rgba(15,51,10,0.8) 0%, transparent 60%)',
              }}
            >
              {item.caption && (
                <p
                  className="font-body text-xs"
                  style={{ color: 'var(--color-cream)', letterSpacing: 0 }}
                >
                  {item.caption}
                </p>
              )}
              <div className="absolute top-3 right-3 flex gap-2">
                {item.linkUrl && (
                  <span
                    className="p-1 rounded-md"
                    style={{ background: 'rgba(1,73,75,0.8)', color: 'var(--color-cream)' }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                )}
                <span className="p-1 rounded-md" style={{ background: 'rgba(15,51,10,0.6)' }}>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="rgba(247,244,213,0.9)"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(15, 51, 10, 0.95)', backdropFilter: 'blur(8px)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-cream opacity-70 hover:opacity-100 transition-opacity"
            style={{ color: 'var(--color-cream)' }}
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.url || '/placeholder.jpg'}
              alt={lightbox.alt}
              width={1200}
              height={900}
              className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
            />

            <div className="mt-4 text-center flex flex-col items-center gap-3">
              {lightbox.caption && (
                <p
                  className="font-body text-base opacity-70"
                  style={{ color: 'var(--color-cream)', letterSpacing: 0 }}
                >
                  {lightbox.caption}
                </p>
              )}

              {lightbox.linkUrl && (
                <a
                  href={lightbox.linkUrl}
                  target={lightbox.linkUrl.startsWith('http') ? '_blank' : undefined}
                  rel={lightbox.linkUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="btn-primary text-sm py-2 px-5"
                >
                  Kunjungi Link Redirect ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
