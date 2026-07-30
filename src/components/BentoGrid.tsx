'use client'

import Image from 'next/image'
import { useState, useCallback } from 'react'

export interface MediaItem {
  id: string
  url?: string
  alt: string
  caption?: string
  linkUrl?: string
  bentoPosition?: string
  sizes?: {
    card?: { url?: string }
    thumbnail?: { url?: string }
  }
}

interface BentoGridProps {
  items: MediaItem[]
}

/**
 * ENVMovement Bento Grid Layout:
 * - Left: 1 Large 1:1 Showcase item spanning 2 rows (Position 1)
 * - Right: 2 Landscape items stacked vertically (Position 2 on Top, Position 3 on Bottom)
 * - Clicking any image opens a full Lightbox Slider with Next/Prev navigation.
 */
export default function BentoGrid({ items }: BentoGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (!items.length) return null

  // Sort/assign items to positions 1, 2, 3
  const pos1 = items.find((i) => i.bentoPosition === '1') || items[0]
  const pos2 = items.find((i) => i.bentoPosition === '2') || items[1] || items[0]
  const pos3 = items.find((i) => i.bentoPosition === '3') || items[2] || items[1] || items[0]

  const gridItems = [pos1, pos2, pos3].filter(Boolean)

  const openLightbox = (item: MediaItem) => {
    const idx = gridItems.findIndex((i) => i.id === item.id)
    setLightboxIndex(idx !== -1 ? idx : 0)
  }

  const nextLightbox = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % gridItems.length : 0))
  }, [lightboxIndex, gridItems.length])

  const prevLightbox = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + gridItems.length) % gridItems.length : 0))
  }, [lightboxIndex, gridItems.length])

  const currentLightboxItem = lightboxIndex !== null ? gridItems[lightboxIndex] : null

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[220px]">
        {/* Left: 1:1 Showcase Spanning 2 Rows */}
        {pos1 && (
          <div
            onClick={() => openLightbox(pos1)}
            className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group cursor-pointer bg-forest/20 shadow-lg min-h-[300px]"
          >
            <Image
              src={pos1.sizes?.card?.url || pos1.url || '/placeholder.jpg'}
              alt={pos1.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6"
              style={{
                background:
                  'linear-gradient(to top, rgba(15,51,10,0.9) 0%, rgba(1,73,75,0.3) 60%, transparent 100%)',
              }}
            >
              <span className="text-xs font-semibold text-green mb-1 uppercase tracking-wider">
                Showcase #1
              </span>
              {pos1.caption && (
                <p
                  className="font-body text-base md:text-lg font-medium"
                  style={{ color: 'var(--color-cream)', letterSpacing: 0 }}
                >
                  {pos1.caption}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Right Top Stacked Landscape */}
        {pos2 && (
          <div
            onClick={() => openLightbox(pos2)}
            className="md:col-span-1 md:row-span-1 relative rounded-3xl overflow-hidden group cursor-pointer bg-forest/20 shadow-md min-h-[200px]"
          >
            <Image
              src={pos2.sizes?.thumbnail?.url || pos2.url || '/placeholder.jpg'}
              alt={pos2.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
              style={{
                background:
                  'linear-gradient(to top, rgba(15,51,10,0.85) 0%, transparent 60%)',
              }}
            >
              {pos2.caption && (
                <p
                  className="font-body text-xs md:text-sm font-medium line-clamp-2"
                  style={{ color: 'var(--color-cream)', letterSpacing: 0 }}
                >
                  {pos2.caption}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Right Bottom Stacked Landscape */}
        {pos3 && (
          <div
            onClick={() => openLightbox(pos3)}
            className="md:col-span-1 md:row-span-1 relative rounded-3xl overflow-hidden group cursor-pointer bg-forest/20 shadow-md min-h-[200px]"
          >
            <Image
              src={pos3.sizes?.thumbnail?.url || pos3.url || '/placeholder.jpg'}
              alt={pos3.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
              style={{
                background:
                  'linear-gradient(to top, rgba(15,51,10,0.85) 0%, transparent 60%)',
              }}
            >
              {pos3.caption && (
                <p
                  className="font-body text-xs md:text-sm font-medium line-clamp-2"
                  style={{ color: 'var(--color-cream)', letterSpacing: 0 }}
                >
                  {pos3.caption}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Slider Modal */}
      {currentLightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(15, 51, 10, 0.95)', backdropFilter: 'blur(12px)' }}
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-cream opacity-70 hover:opacity-100 transition-opacity z-10"
            style={{ color: 'var(--color-cream)' }}
            onClick={() => setLightboxIndex(null)}
            aria-label="Close modal"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Slider Prev Button */}
          {gridItems.length > 1 && (
            <button
              className="absolute left-6 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110"
              style={{ background: 'rgba(247, 244, 213, 0.15)', color: 'var(--color-cream)' }}
              onClick={(e) => {
                e.stopPropagation()
                prevLightbox()
              }}
              aria-label="Previous photo"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Slider Next Button */}
          {gridItems.length > 1 && (
            <button
              className="absolute right-6 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110"
              style={{ background: 'rgba(247, 244, 213, 0.15)', color: 'var(--color-cream)' }}
              onClick={(e) => {
                e.stopPropagation()
                nextLightbox()
              }}
              aria-label="Next photo"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Main Modal Image Content */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentLightboxItem.url || '/placeholder.jpg'}
              alt={currentLightboxItem.alt}
              width={1200}
              height={900}
              className="w-full h-auto max-h-[75vh] object-contain rounded-2xl shadow-2xl"
            />

            <div className="mt-4 text-center flex flex-col items-center gap-2">
              {currentLightboxItem.caption && (
                <p
                  className="font-body text-base opacity-80 max-w-xl"
                  style={{ color: 'var(--color-cream)', letterSpacing: 0 }}
                >
                  {currentLightboxItem.caption}
                </p>
              )}

              {currentLightboxItem.linkUrl && (
                <a
                  href={currentLightboxItem.linkUrl}
                  target={currentLightboxItem.linkUrl.startsWith('http') ? '_blank' : undefined}
                  rel={currentLightboxItem.linkUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="btn-primary text-sm py-2 px-5 mt-1"
                >
                  Buka Link Redirect ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
