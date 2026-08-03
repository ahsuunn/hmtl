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
    card?: { url?: string }
  }
}

interface PromoBannerProps {
  slides?: BannerSlide[]
  autoPlayInterval?: number // in ms, default 5000
  heightClassName?: string
}

export default function PromoBanner({
  slides = [],
  autoPlayInterval = 5000,
  heightClassName = 'min-h-[320px] md:min-h-[420px] lg:min-h-[460px] aspect-[16/7]',
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
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="relative rounded-3xl overflow-hidden p-8 text-center flex flex-col items-center justify-center min-h-[220px]"
          style={{
            background: 'linear-gradient(135deg, #01494B 0%, #0F330A 100%)',
          }}
        >
          <h2
            className="font-heading text-2xl font-bold mb-2"
            style={{ color: 'var(--color-cream)', letterSpacing: 0 }}
          >
            Belum ada foto banner
          </h2>
          <p
            className="font-body text-sm opacity-70"
            style={{ color: 'var(--color-cream)', letterSpacing: 0 }}
          >
            Upload foto di CMS admin untuk menampilkan banner slider di sini.
          </p>
        </div>
      </div>
    )
  }

  const currentSlide = slides[currentIndex]
  const isExternal = currentSlide.linkUrl?.startsWith('http')
  const imageUrl =
    currentSlide.sizes?.banner?.url ||
    currentSlide.sizes?.hero?.url ||
    currentSlide.sizes?.card?.url ||
    currentSlide.url ||
    '/placeholder.jpg'

  const Component = currentSlide.linkUrl ? 'a' : 'div'
  const linkProps = currentSlide.linkUrl
    ? {
        href: currentSlide.linkUrl,
        target: isExternal ? '_blank' : undefined,
        rel: isExternal ? 'noopener noreferrer' : undefined,
      }
    : {}

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div
        className={`relative rounded-3xl overflow-hidden group shadow-xl bg-forest/20 ${heightClassName}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Pure Photo Banner Container */}
        <Component {...linkProps} className="absolute inset-0 block cursor-pointer">
          <Image
            src={imageUrl}
            alt={currentSlide.alt}
            fill
            className="object-cover transition-all duration-700"
            priority={currentIndex === 0}
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </Component>

        {/* Navigation Arrows (Prev / Next) — visible on multi-slides */}
        {count > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all opacity-80 hover:opacity-100 bg-forest/70 hover:bg-forest text-cream backdrop-blur-md shadow-md"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all opacity-80 hover:opacity-100 bg-forest/70 hover:bg-forest text-cream backdrop-blur-md shadow-md"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Bottom Index Dots */}
        {count > 1 && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-forest/40 backdrop-blur-md">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-8 bg-green' : 'w-2.5 bg-cream/50 hover:bg-cream'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
