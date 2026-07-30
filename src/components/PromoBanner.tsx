'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'

interface BannerSlide {
  id: string
  url?: string
  alt: string
  caption?: string
  linkUrl?: string
  sizes?: {
    banner?: { url?: string }
    hero?: { url?: string }
  }
}

interface PromoBannerProps {
  slides?: BannerSlide[]
  autoPlayInterval?: number // in ms, default 5000
}

export default function PromoBanner({
  slides = [],
  autoPlayInterval = 5000,
}: PromoBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const hasSlides = slides.length > 0
  const count = slides.length

  const nextSlide = useCallback(() => {
    if (!count) return
    setCurrentIndex((prev) => (prev + 1) % count)
  }, [count])

  const prevSlide = useCallback(() => {
    if (!count) return
    setCurrentIndex((prev) => (prev - 1 + count) % count)
  }, [count])

  // Auto-play timer
  useEffect(() => {
    if (!hasSlides || count <= 1 || isHovered) return

    const timer = setInterval(() => {
      nextSlide()
    }, autoPlayInterval)

    return () => clearInterval(timer)
  }, [hasSlides, count, isHovered, autoPlayInterval, nextSlide])

  if (!hasSlides) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div
          className="relative rounded-3xl overflow-hidden p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[180px]"
          style={{
            background: 'linear-gradient(135deg, #01494B 0%, #0F330A 100%)',
          }}
        >
          <span
            className="section-label mb-1 text-xs"
            style={{ color: 'rgba(247, 244, 213, 0.6)' }}
          >
            Banner / Campaign
          </span>
          <h2
            className="font-heading text-2xl font-bold mb-2"
            style={{ color: 'var(--color-cream)', letterSpacing: 0 }}
          >
            Belum ada banner promo
          </h2>
          <p
            className="font-body text-sm opacity-70"
            style={{ color: 'var(--color-cream)', letterSpacing: 0 }}
          >
            Upload media dengan kategori &quot;Banner / Slider&quot; melalui admin CMS untuk menampilkan banner slider di sini.
          </p>
        </div>
      </section>
    )
  }

  const currentSlide = slides[currentIndex]
  const isExternal = currentSlide.linkUrl?.startsWith('http')
  const imageUrl =
    currentSlide.sizes?.banner?.url ||
    currentSlide.sizes?.hero?.url ||
    currentSlide.url ||
    '/placeholder.jpg'

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div
        className="relative rounded-3xl overflow-hidden group shadow-lg min-h-[220px] md:min-h-[280px] flex items-center bg-forest"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Current Banner Image */}
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={currentSlide.alt}
            fill
            className="object-cover transition-opacity duration-700"
            priority={currentIndex === 0}
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          {/* Subtle dark gradient overlay for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(15,51,10,0.85) 0%, rgba(1,73,75,0.4) 60%, transparent 100%)',
            }}
          />
        </div>

        {/* Content / Caption overlay */}
        <div className="relative z-10 p-8 md:p-12 max-w-2xl">
          {currentSlide.caption && (
            <p
              className="font-heading text-2xl md:text-4xl font-bold leading-snug drop-shadow-sm mb-3"
              style={{ color: 'var(--color-cream)', letterSpacing: 0 }}
            >
              {currentSlide.caption}
            </p>
          )}

          {currentSlide.linkUrl && (
            <a
              href={currentSlide.linkUrl}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="btn-primary inline-flex items-center gap-2 mt-2 py-2.5 px-5 text-sm font-semibold shadow-md"
              style={{ background: 'var(--color-cream)', color: 'var(--color-forest)' }}
            >
              Buka Link {isExternal ? '↗' : '→'}
            </a>
          )}
        </div>

        {/* Navigation Arrows (Prev / Next) — visible on multi-slides */}
        {count > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all opacity-70 hover:opacity-100 group-hover:scale-110"
              style={{
                background: 'rgba(15, 51, 10, 0.65)',
                backdropFilter: 'blur(4px)',
                color: 'var(--color-cream)',
              }}
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all opacity-70 hover:opacity-100 group-hover:scale-110"
              style={{
                background: 'rgba(15, 51, 10, 0.65)',
                backdropFilter: 'blur(4px)',
                color: 'var(--color-cream)',
              }}
              aria-label="Next slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Bottom Index Dots */}
        {count > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-8 bg-green-500' : 'w-2.5 bg-cream/50 hover:bg-cream'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
